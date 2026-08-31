import { getAuditLog } from "@/lib/data/team";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";

/** PRD §21 Audit Log — actor, timestamp, result untuk aksi sensitif. */
export default async function AuditLogPage() {
  const entries = await getAuditLog();

  return (
    <div className="mx-auto max-w-(--container-wide) px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-4 text-xl font-semibold text-ink md:text-2xl">Audit Log</h1>
      <SampleDataBanner />
      <div className="overflow-hidden rounded-(--radius-card) border border-border bg-warm-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-soft-sand text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Aktor</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Resource</th>
              <th className="px-4 py-3 font-medium">Hasil</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">Waktu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {entries.map((e) => (
              <tr key={e.id}>
                <td className="px-4 py-3 text-ink">{e.actor}</td>
                <td className="px-4 py-3 text-ink">{e.action}</td>
                <td className="hidden px-4 py-3 text-xs text-muted sm:table-cell">{e.resource}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium ${e.result === "success" ? "text-status-success" : "text-status-critical"}`}>
                    {e.result === "success" ? "Berhasil" : "Gagal"}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-xs text-muted md:table-cell">{e.timestampLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
