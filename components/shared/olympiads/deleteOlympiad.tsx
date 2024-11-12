"use client";

import { useState } from "react";
import { deleteOlympiad } from "@/lib/actions/olympiads/deleteOlympiad";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface DeleteOlympiadButtonProps {
  olympiadId: string;
//   logoUrl: string;
//   coverUrl: string;
//   organizers: { logoUrl: string }[];
}

const DeleteOlympiadButton =  ({
  olympiadId,
//   logoUrl,
//   coverUrl,
//   organizers,
}: DeleteOlympiadButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Вы уверены, что хотите удалить эту олимпиаду? Это действие невозможно отменить. Внимание также пока олимпиада не удалится лучше не закрывать страницу иначе не все данные стерутся.")) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
    //   if (logoUrl) {
    //     const logoRef = ref(storage, logoUrl);
    //     await deleteObject(logoRef);
    //   }

    //   if (coverUrl) {
    //     const coverRef = ref(storage, coverUrl);
    //     await deleteObject(coverRef);
    //   }

    //   for (const organizer of organizers) {
    //     if (organizer.logoUrl) {
    //       const organizerLogoRef = ref(storage, organizer.logoUrl);
    //       await deleteObject(organizerLogoRef);
    //     }
    //   }

      const result = await deleteOlympiad({
        olympiadId,
      });

      if (result.message === "success") {
        setSuccess("Олимпиада успешно удалена.");
        router.refresh();
      } else if (result.message === "forbidden") {
        setError("У вас нет прав для удаления этой олимпиады.");
      } else {
        setError("Произошла ошибка при удалении олимпиады.");
      }
    } catch (err) {
      console.error("Error deleting Olympiad:", err);
      setError("Произошла ошибка при удалении олимпиады.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Удаление..." : "Удалить Олимпиаду"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default DeleteOlympiadButton;
