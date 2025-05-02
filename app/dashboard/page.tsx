"use client";
import { trpc } from "@/lib/trpc";
import Link from "next/link";

export default function DashboardPage() {
  const { data: campaigns, isLoading } = trpc.campaigns.getAll.useQuery();
  const utils = trpc.useUtils();
  const deleteMutation = trpc.campaigns.delete.useMutation({
    onSuccess: () => utils.campaigns.getAll.invalidate(),
  });

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Bu kampanyayı silmek istiyor musun?");
    if (!confirm) return;
    deleteMutation.mutate({ id });
  };

  if (isLoading) return <p className="p-4">Yükleniyor...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
            <th className="px-4 py-3">Görsel</th>
            <th className="px-4 py-3">Başlık</th>
            <th className="px-4 py-3">Marka</th>
            <th className="px-4 py-3">Tarih</th>
            <th className="px-4 py-3">Bütçe</th>
            <th className="px-4 py-3">Açıklama</th>
            <th className="px-4 py-3 text-right">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {campaigns?.map((c) => (
            <tr key={c.id} className="border-t text-sm">
              <td className="px-4 py-2">
                <img
                  src={c.image_url}
                  alt={c.title}
                  className="w-20 h-12 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">{c.title}</td>
              <td className="px-4 py-2">{c.brand}</td>
              <td className="px-4 py-2">
                {c.start_date} → {c.end_date}
              </td>
              <td className="px-4 py-2">{c.budget}₺</td>
              <td className="px-4 py-2 truncate max-w-xs">{c.description}</td>
              <td className="px-4 py-2 text-right">
                <Link
                  href={`/dashboard/edit/${c.id}`}
                  className="text-blue-600 hover:underline mr-4"
                >
                  Düzenle
                </Link>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-600 hover:underline"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
