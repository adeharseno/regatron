import { createClient } from "@sanity/client";

const CONFIRMATION = "DELETE_CONTACT_AND_CATALOG";
const TARGET_TYPES = ["contactSubmission", "catalogItem"];
const BATCH_SIZE = 100;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-07-21";

if (!projectId || !dataset || !token) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_WRITE_TOKEN",
  );
}

const execute = process.argv.includes("--execute");
const confirmation = process.argv
  .find((argument) => argument.startsWith("--confirm="))
  ?.slice("--confirm=".length);

if (execute && confirmation !== CONFIRMATION) {
  throw new Error(
    `Deletion requires --confirm=${CONFIRMATION}. Run without --execute for a dry run.`,
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
  perspective: "raw",
});

function splitIntoBatches(items, size) {
  const batches = [];
  for (let index = 0; index < items.length; index += size) {
    batches.push(items.slice(index, index + size));
  }
  return batches;
}

async function cleanup() {
  const documents = await client.fetch(
    `*[_type in $types]{_id, _type} | order(_type asc, _id asc)`,
    { types: TARGET_TYPES },
  );

  const unexpectedDocument = documents.find(
    (document) => !TARGET_TYPES.includes(document._type),
  );
  if (unexpectedDocument) {
    throw new Error(
      `Safety check failed for document ${unexpectedDocument._id}`,
    );
  }

  const contacts = documents.filter(
    (document) => document._type === "contactSubmission",
  );
  const catalogItems = documents.filter(
    (document) => document._type === "catalogItem",
  );

  console.log(`Sanity project: ${projectId}`);
  console.log(`Dataset: ${dataset}`);
  console.log(`Contact submissions: ${contacts.length}`);
  console.log(`Catalog products: ${catalogItems.length}`);
  console.log(`Total targeted documents: ${documents.length}`);

  if (!execute) {
    console.log("\nDry run only. Nothing was deleted.");
    console.log(
      `To delete these documents, run again with --execute --confirm=${CONFIRMATION}`,
    );
    return;
  }

  if (documents.length === 0) {
    console.log("\nNothing to delete.");
    return;
  }

  let deleted = 0;
  for (const batch of splitIntoBatches(documents, BATCH_SIZE)) {
    let transaction = client.transaction();
    for (const document of batch) {
      transaction = transaction.delete(document._id);
    }
    await transaction.commit();
    deleted += batch.length;
    console.log(`Deleted ${deleted}/${documents.length} documents.`);
  }

  const remaining = await client.fetch(`count(*[_type in $types])`, {
    types: TARGET_TYPES,
  });
  if (remaining !== 0) {
    throw new Error(
      `Cleanup completed, but ${remaining} matching documents still remain.`,
    );
  }

  console.log("\nCleanup complete.");
  console.log(
    "Images/assets, catalogPage, and homepage content were not deleted.",
  );
}

cleanup().catch((error) => {
  console.error(
    "\nCleanup failed:",
    error instanceof Error ? error.message : error,
  );
  process.exitCode = 1;
});
