"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteTextbook } from "@/lib/actions/textbooks/deleteTextbook";

interface DeleteTextbookButtonProps {
  textbookId: string;
  onDeleteSuccess: () => void; // Callback после успешного удаления
}

export default function DeleteTextbookButton({ textbookId, onDeleteSuccess }: DeleteTextbookButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm("Вы уверены, что хотите удалить этот учебник? Это действие нельзя отменить.");
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await deleteTextbook(textbookId);
      alert("Учебник успешно удалён.");
      onDeleteSuccess(); // Например, перенаправить пользователя или обновить список
    } catch (error: any) {
      alert(`Ошибка при удалении учебника: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Удаление..." : "Удалить Учебник"}
    </Button>
  );
}
