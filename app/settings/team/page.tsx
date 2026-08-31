import { getTeamMembers } from "@/lib/data/team";
import { ROLE_LABEL } from "@/lib/auth/session-context";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";
import { PermissionGate } from "@/components/system/PermissionGate";

/** PRD §19.3 Team. */
export default async function TeamSettingsPage() {
  const members = await getTeamMembers();

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold text-ink md:text-2xl">Tim</h1>
        <PermissionGate capability="teamRoleManage">
          <button className="tap-target rounded-full bg-karyalo-green px-4 py-2 text-xs font-medium text-warm-white hover:opacity-90">
            Undang Anggota
          </button>
        </PermissionGate>
      </div>
      <p className="mb-4 text-sm text-muted">{members.length} anggota</p>
      <SampleDataBanner />
      <div className="overflow-hidden rounded-(--radius-card) border border-border bg-warm-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-soft-sand text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Nama</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((m) => (
              <tr key={m.id}>
                <td className="px-4 py-3 font-medium text-ink">{m.name}</td>
                <td className="hidden px-4 py-3 text-xs text-muted sm:table-cell">{m.maskedEmail}</td>
                <td className="px-4 py-3 text-xs text-ink">{ROLE_LABEL[m.role]}</td>
                <td className="px-4 py-3 text-xs text-muted">{m.status === "active" ? "Aktif" : "Diundang"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
