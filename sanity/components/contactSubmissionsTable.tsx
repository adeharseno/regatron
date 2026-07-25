'use client'

import { useCallback, useEffect, useState } from 'react'
import { useClient } from 'sanity'
import { useRouter } from 'sanity/router'
import { apiVersion } from '../env'

interface ContactSubmissionRow {
  _id: string
  fullName?: string
  company?: string
  phone?: string
  email?: string
  inquiryType?: string
  message?: string
  locale?: string
  status?: 'new' | 'contacted' | 'closed'
  submittedAt?: string
}

const submissionsQuery = `*[_type == "contactSubmission"] | order(submittedAt desc) {
  _id,
  fullName,
  company,
  phone,
  email,
  inquiryType,
  message,
  locale,
  status,
  submittedAt
}`

const statusLabels = {
  new: 'Baru',
  contacted: 'Sudah Dihubungi',
  closed: 'Selesai',
}

export function ContactSubmissionsTable() {
  const client = useClient({ apiVersion })
  const router = useRouter()
  const [rows, setRows] = useState<ContactSubmissionRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadRows = useCallback(async () => {
    try {
      setError(false)
      const data = await client.fetch<ContactSubmissionRow[]>(submissionsQuery)
      setRows(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [client])

  useEffect(() => {
    void loadRows()

    const subscription = client
      .listen('*[_type == "contactSubmission"]')
      .subscribe(() => {
        void loadRows()
      })

    return () => subscription.unsubscribe()
  }, [client, loadRows])

  return (
    <div style={{ padding: 24, minHeight: '100%' }}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <div>
          <h1 style={{ fontSize: 24, margin: 0 }}>Form Submissions</h1>
          <p style={{ color: '#6e7683', margin: '6px 0 0' }}>
            {rows.length} submission tersimpan
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadRows()}
          style={{
            background: '#fff',
            border: '1px solid #d8dce2',
            borderRadius: 4,
            cursor: 'pointer',
            padding: '9px 14px',
          }}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Memuat submission...</p>
      ) : error ? (
        <p style={{ color: '#b42318' }}>
          Submission tidak dapat dimuat. Silakan refresh halaman.
        </p>
      ) : rows.length === 0 ? (
        <div
          style={{
            background: '#fff',
            border: '1px solid #e3e5e8',
            borderRadius: 6,
            padding: 32,
            textAlign: 'center',
          }}
        >
          Belum ada form yang disubmit.
        </div>
      ) : (
        <div
          style={{
            background: '#fff',
            border: '1px solid #e3e5e8',
            borderRadius: 6,
            overflowX: 'auto',
          }}
        >
          <table
            style={{
              borderCollapse: 'collapse',
              minWidth: 1080,
              width: '100%',
            }}
          >
            <thead>
              <tr style={{ background: '#f6f7f8', textAlign: 'left' }}>
                {[
                  'Waktu',
                  'Nama',
                  'Perusahaan',
                  'Kontak',
                  'Kebutuhan',
                  'Pesan',
                  'Status',
                  '',
                ].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      borderBottom: '1px solid #e3e5e8',
                      fontSize: 12,
                      letterSpacing: '0.04em',
                      padding: '12px 14px',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row._id}>
                  <td style={cellStyle}>
                    {row.submittedAt
                      ? new Date(row.submittedAt).toLocaleString('id-ID')
                      : '—'}
                    <div style={{ color: '#6e7683', fontSize: 11 }}>
                      {row.locale?.toUpperCase() || '—'}
                    </div>
                  </td>
                  <td style={{ ...cellStyle, fontWeight: 600 }}>
                    {row.fullName || '—'}
                  </td>
                  <td style={cellStyle}>{row.company || '—'}</td>
                  <td style={cellStyle}>
                    <div>{row.email || '—'}</div>
                    <div style={{ color: '#6e7683', marginTop: 4 }}>
                      {row.phone || '—'}
                    </div>
                  </td>
                  <td style={cellStyle}>{row.inquiryType || '—'}</td>
                  <td
                    style={{
                      ...cellStyle,
                      maxWidth: 260,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={row.message}
                  >
                    {row.message || '—'}
                  </td>
                  <td style={cellStyle}>
                    <span
                      style={{
                        background:
                          row.status === 'new'
                            ? '#fff3cd'
                            : row.status === 'contacted'
                              ? '#dbeafe'
                              : '#dcfce7',
                        borderRadius: 999,
                        display: 'inline-block',
                        fontSize: 12,
                        padding: '5px 9px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {statusLabels[row.status || 'new']}
                    </span>
                  </td>
                  <td style={cellStyle}>
                    <button
                      type="button"
                      onClick={() =>
                        router.navigateIntent('edit', {
                          id: row._id,
                          type: 'contactSubmission',
                        })
                      }
                      style={{
                        background: '#1a1a1a',
                        border: 0,
                        borderRadius: 4,
                        color: '#fff',
                        cursor: 'pointer',
                        padding: '8px 12px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Buka
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const cellStyle = {
  borderBottom: '1px solid #eceef0',
  fontSize: 13,
  padding: '14px',
  verticalAlign: 'top',
} as const
