import { getTeamMembers } from "@/lib/data/team";
import { ROLE_LABEL } from "@/lib/auth/session-context";
import { SampleDataBanner } from "@/components/system/SampleDataBanner";
import { PermissionGate } from "@/components/system/PermissionGate";
import { Shield } from "lucide-react";

/** PRD §19.3 Team. */
export default async function TeamSettingsPage() {
  const members = await getTeamMembers();

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-6 md:px-6 md:py-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-ink md:text-2xl">Tim & Hak Akses Staf</h1>
          <p className="mt-0.5 text-xs text-muted">{members.length} staf terdaftar</p>
        </div>
        <PermissionGate capability="teamRoleManage">
          <button className="tap-target rounded-xl bg-karyalo-green px-4 py-2 text-xs font-semibold text-warm-white hover:opacity-90 transition-colors">
            + Undang Anggota Staf
          </button>
        </PermissionGate>
      </div>

      <PermissionGate
        capability="teamRoleManage"
        showDenied
        deniedMessage="Hanya Owner / Pemilik Toko yang memiliki wewenang untuk mengundang anggota tim baru atau mengubah peran staf."
      >
        <></>
      </PermissionGate>

      <div className="my-4">
        <SampleDataBanner />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-warm-white shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-soft-sand text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold text-ink">Nama</th>
              <th className="hidden px-4 py-3 font-semibold text-ink sm:table-cell">Email</th>
              <th className="px-4 py-3 font-semibold text-ink">Role</th>
              <th className="px-4 py-3 font-semibold text-ink">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-soft-sand/40">
                <td className="px-4 py-3 font-medium text-ink">{m.name}</td>
                <td className="hidden px-4 py-3 text-muted sm:table-cell">{m.maskedEmail}</td>
                <td className="px-4 py-3 text-ink font-semibold">{ROLE_LABEL[m.role]}</td>
                <td className="px-4 py-3 text-muted">
                  <span className="inline-flex items-center gap-1 rounded-md bg-soft-sage px-2 py-0.5 text-xs font-semibold text-karyalo-green">
                    {m.status === "active" ? "Aktif" : "Diundang"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
