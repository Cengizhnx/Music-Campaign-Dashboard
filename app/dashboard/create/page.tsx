"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { trpc } from "@/lib/trpc";
import { v4 as uuidv4 } from "uuid";

export default function CreateCampaignPage() {
  const router = useRouter();
  const createMutation = trpc.campaigns.create.useMutation();
  const [form, setForm] = useState({
    title: "",
    brand: "",
    start_date: "",
    end_date: "",
    budget: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("campaign-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Görsel yüklenemedi: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from("campaign-images")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    try {
      await createMutation.mutateAsync({
        ...form,
        image_url: imageUrl,
      });
      router.push("/dashboard");
    } catch (err: any) {
      alert("Kampanya oluşturulamadı: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Yeni Kampanya Oluştur</h1>
      <input
        name="title"
        onChange={handleChange}
        value={form.title}
        placeholder="Başlık"
        className="mt-2 block w-full rounded border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <input
        name="brand"
        onChange={handleChange}
        value={form.brand}
        placeholder="Marka"
        className="mt-2 block w-full rounded border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <input
        type="date"
        name="start_date"
        onChange={handleChange}
        value={form.start_date}
        className="mt-2 block w-full rounded border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <input
        type="date"
        name="end_date"
        onChange={handleChange}
        value={form.end_date}
        className="mt-2 block w-full rounded border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <input
        name="budget"
        onChange={handleChange}
        value={form.budget}
        placeholder="Bütçe"
        className="mt-2 block w-full rounded border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <textarea
        name="description"
        rows={4}
        onChange={handleChange}
        value={form.description}
        placeholder="Açıklama"
        className="mt-2 block w-full rounded border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-2 block w-full rounded border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 w-full mt-5 rounded shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? "Kaydediliyor..." : "Kampanya Oluştur"}
      </button>
    </form>
  );
}
