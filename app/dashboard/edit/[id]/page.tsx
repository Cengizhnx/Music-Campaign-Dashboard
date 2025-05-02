"use client";
import { useParams, useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function EditPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";
  const router = useRouter();

  const utils = trpc.useUtils();
  const { data: campaign } = trpc.campaigns.getAll.useQuery();
  const updateMutation = trpc.campaigns.update.useMutation({
    onSuccess: () => {
      utils.campaigns.getAll.invalidate();
    },
  });

  const current = campaign?.find((c) => c.id === id);

  const [form, setForm] = useState({
    title: "",
    brand: "",
    start_date: "",
    end_date: "",
    budget: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (current) {
      setForm({
        title: current.title,
        brand: current.brand,
        start_date: current.start_date,
        end_date: current.end_date,
        budget: current.budget,
        description: current.description,
      });
      setImageUrl(current.image_url);
    }
  }, [current]);

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

    let newImageUrl = imageUrl;

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const fileName = `${id}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("campaign-images")
        .upload(fileName, imageFile, { upsert: true });

      if (uploadError) {
        alert("Görsel yüklenemedi: " + uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("campaign-images")
        .getPublicUrl(fileName);

      newImageUrl = data.publicUrl;
    }

    updateMutation.mutate({
      id: id as string,
      ...form,
      budget: form.budget.toString(),
      image_url: newImageUrl,
    });

    router.push("/dashboard");
  };

  if (!current) return <p className="p-6">Yükleniyor...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kampanyayı Güncelle</h1>
      <input
        name="title"
        onChange={handleChange}
        value={form.title}
        className="mt-2 block w-full rounded border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <input
        name="brand"
        onChange={handleChange}
        value={form.brand}
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
        className="mt-2 block w-full rounded border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <textarea
        name="description"
        onChange={handleChange}
        value={form.description}
        className="mt-2 block w-full rounded border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="mevcut görsel"
          className="w-full mt-2 h-60 object-cover mb-2 rounded"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-2 block w-full rounded border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 w-full mt-5 rounded shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Güncelle
      </button>
    </form>
  );
}
