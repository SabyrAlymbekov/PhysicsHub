"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import { storage } from "@/firebase";
import { updateTextbook } from "@/lib/actions/textbooks/updateTextbook";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import getTextbookById, { getTopicsByTextbookid } from "@/lib/actions/textbooks/getTextbookById";
import DeleteTextbookButton from "@/components/resources/deleteTextbook";
import { useRouter } from "next/navigation";
import { currentUser } from "@/lib/actions/authActions";

interface FormData {
  id: string;
  name: string;
  description: string;
  authors: string;
  category: string;
  topics: string;
  file: File | null;
  filePath: string | null;
}

export default function EditTextbookPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(()=>{
    const check = async () => {
      const user = await currentUser();
      if (user?.role !== "ADMIN") {
        router.replace('/')
      }
      setIsLoading(false);
    }
    check();
  }, [])

  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    description: "",
    authors: "",
    category: "textbook",
    topics: "",
    file: null,
    filePath: null,
  });
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    const fetchTextbookAndTopics = async () => {
      try {
        const textbook = await getTextbookById(params.id);
        if (textbook) {
          setFormData({
            ...formData,
            id: textbook.id,
            name: textbook.name,
            description: textbook.description || "",
            authors: textbook.authors.join(", "),
            category: textbook.tags[0] || "textbook",
            filePath: textbook.filePath,
          });

          const topics = await getTopicsByTextbookid(params.id);
          if (topics) {
            const topicsNames = topics.map((topic) => topic.name).join(", ");
            setFormData((prev) => ({ ...prev, topics: topicsNames }));
          }
        } else {
          console.error("Учебник не найден");
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных учебника:", error);
      }
    };
    fetchTextbookAndTopics();
  }, [params.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "file" && e.target instanceof HTMLInputElement && e.target.files) {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDeleteSuccess = () => {
    router.push("/materials");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let newFilePath = formData.filePath;

      if (formData.file) {
        const fileName = `${Date.now()}_${formData.file.name}`;
        const storageRef = ref(storage, `textbooks/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, formData.file);

        newFilePath = await new Promise<string>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error("Ошибка загрузки файла:", error);
              alert("Ошибка загрузки файла. Попробуйте снова.");
              reject(error);
            },
            async () => {
              const url = await getDownloadURL(ref(storage, `textbooks/${fileName}`));
              resolve(url);
            }
          );
        });

        if (formData.filePath) {
          const oldFileRef = ref(storage, formData.filePath);
          try {
            await deleteObject(oldFileRef);
            alert(`Старый файл ${formData.filePath} успешно удалён.`);
          } catch (error) {
            alert(`Ошибка при удалении старого файла ${formData.filePath}: сообщите разрабу пжпжпжпжпж`);
          }
        }
      }

      const authorsArray = formData.authors.split(",").map((item) => item.trim());
      const topicsArray = formData.topics.split(",").map((item) => item.trim().toLowerCase());

      try {
        await updateTextbook(
          formData.id,
          formData.name,
          formData.description || null,
          authorsArray,
          formData.category,
          topicsArray,
          newFilePath
        );
        alert("Учебник успешно обновлён!");
      } catch (error: any) {
        alert(`Ошибка при обновлении учебника: ${error.message}`);
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      alert("Произошла ошибка при обновлении учебника.");
    }
  };

  if (isLoading) {
    return (
      <div>Checking you...</div>
    )
  }

  return (
    <div className="container my-16">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-[500px]">
        <h2 className="font-bold text-4xl mb-2">Редактировать учебник/задачник</h2>
        <Input
          type="text"
          name="name"
          placeholder="Название"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Описание"
          value={formData.description}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="authors"
          placeholder="Авторы (через запятую)"
          value={formData.authors}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        >
          <option value="textbook">Учебник</option>
          <option value="problembook">Задачник</option>
        </select>
        <Input
          type="text"
          name="topics"
          placeholder="Темы (через запятую)"
          value={formData.topics}
          onChange={handleChange}
        />
        <Input type="file" name="file" onChange={handleChange} />

        <Button type="submit">Сохранить изменения</Button>
        {uploadProgress > 0 && <p>Прогресс загрузки: {uploadProgress.toFixed(2)}%</p>}
      </form>
      <div className="mt-8">
        <DeleteTextbookButton textbookId={params.id} onDeleteSuccess={handleDeleteSuccess} />
      </div>
    </div>
  );
}
