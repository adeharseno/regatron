"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config"; // Path mengarah ke sanity.config.ts/mjs di root

export default function StudioPage() {
  return <NextStudio config={config} />;
}