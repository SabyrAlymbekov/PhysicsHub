"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { currentUser } from "@/lib/actions/authActions";
import { getOlympiadById } from "@/lib/actions/olympiads/getOlympiadById";
import { updateOlympiad } from "@/lib/actions/olympiads/UpdateOlympiad";
import { uploadFile } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Organizer, Stage } from "@prisma/client";
import Image from "next/image";

export default function EditOlympiadPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [formData, setFormData] = useState<any>({
    id: "",
    name: "",
    description: "",
    registrationStart: "",
    registrationEnd: "",
    resultsDate: "",
    resultsUrl: "",
    participantCount: 0,
    socialLinks: "",
    registrationFormUrl: "",
    stages: [],
    organizers: [],
    logoUrl: "",
    logoStorageUrl: "",
    coverUrl: "",
    coverStorageUrl: "",
    regulationsUrl: "",
    regulationsStorageUrl: "",
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [regulations, setRegulations] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = await currentUser();
      if (!user || user.role !== "ADMIN") {
        router.replace("/");
        return;
      }

      try {
        const olympiad = await getOlympiadById(params.id);
        if (olympiad) {
          setFormData({
            ...olympiad,
            registrationStart: olympiad.registrationStart
              ? new Date(olympiad.registrationStart).toISOString().split("T")[0]
              : "",
            registrationEnd: olympiad.registrationEnd
              ? new Date(olympiad.registrationEnd).toISOString().split("T")[0]
              : "",
            resultsDate: olympiad.resultsDate
              ? new Date(olympiad.resultsDate).toISOString().split("T")[0]
              : "",
            stages: olympiad.stages || [],
            organizers: olympiad.organizers || [],
          });
        } else {
          console.error("Olympiad not found");
        }
      } catch (error) {
        console.error("Error fetching Olympiad data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStageChange = (index: number, field: string, value: string) => {
    const newStages = [...formData.stages];
    newStages[index] = { ...newStages[index], [field]: value };
    setFormData({ ...formData, stages: newStages });
  };

  const handleOrganizerChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newOrganizers = [...formData.organizers];
    newOrganizers[index] = { ...newOrganizers[index], [field]: value };
    setFormData({ ...formData, organizers: newOrganizers });
  };

  const handleOrganizerFileChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    const updatedOrganizers = [...formData.organizers];
    updatedOrganizers[index] = {
      ...updatedOrganizers[index],
      logoFile: file,
    };
    setFormData({ ...formData, organizers: updatedOrganizers });
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    setter(file);
  };

  const addStage = () => {
    setFormData({
      ...formData,
      stages: [...formData.stages, { name: "", startDate: "", endDate: "" }],
    });
  };

  const removeStage = (index: number) => {
    const newStages = formData.stages.filter((_: Stage, i: number) => i !== index);
    setFormData({ ...formData, stages: newStages });
  };

  const addOrganizer = () => {
    setFormData({
      ...formData,
      organizers: [
        ...formData.organizers,
        { name: "", link: "", logoUrl: "", logoStorageUrl: "" },
      ],
    });
  };

  const removeOrganizer = (index: number) => {
    const newOrganizers = formData.organizers.filter((_: Organizer, i: number) => i !== index);
    setFormData({ ...formData, organizers: newOrganizers });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const logoData = logo
        ? await uploadFile(logo, "olympiads/logos")
        : [formData.logoUrl, formData.logoStorageUrl];
      const coverData = cover
        ? await uploadFile(cover, "olympiads/covers")
        : [formData.coverUrl, formData.coverStorageUrl];
      const regulationsData = regulations
        ? await uploadFile(regulations, "olympiads/regulations")
        : [formData.regulationsUrl, formData.regulationsStorageUrl];

      const organizerLogos = await Promise.all(
        formData.organizers.map(async (org: any) => {
          if (org.logoFile) {
            const [url, storageUrl] = await uploadFile(
              org.logoFile,
              "olympiads/organizers/logos"
            );
            return { url, storageUrl };
          } else {
            return { url: org.logoUrl, storageUrl: org.logoStorageUrl };
          }
        })
      );

      const updatedOrganizers = formData.organizers.map(
        (org: any, index: number) => ({
          id: org.id,
          name: org.name,
          link: org.link,
          logoUrl: organizerLogos[index].url,
          logoStorageUrl: organizerLogos[index].storageUrl,
        })
      );

      const payload = {
        id: formData.id,
        name: formData.name,
        description: formData.description,
        registrationStart: formData.registrationStart,
        registrationEnd: formData.registrationEnd,
        resultsDate: formData.resultsDate,
        participantCount: formData.participantCount,
        socialLinks: formData.socialLinks,
        registrationFormUrl: formData.registrationFormUrl,
        stages: formData.stages,
        organizers: updatedOrganizers,
        logoUrl: logoData[0],
        coverUrl: coverData[0],
        regulationsUrl: regulationsData[0],
        logoStorageUrl: logoData[1],
        coverStorageUrl: coverData[1],
        regulationsStorageUrl: regulationsData[1],
        resultsUrl: formData.resultsUrl,
      };

      const res = await updateOlympiad(payload);

      if (res?.message === "success") {
        alert("Олимпиада успешно обновлена!");
        router.push(`/olympiads/${formData.id}`);
      } else {
        alert("Ошибка при обновлении олимпиады!");
      }
    } catch (error) {
      console.error("Ошибка при обновлении олимпиады:", error);
      alert("Произошла ошибка при обновлении олимпиады.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container my-16">
      <h1 className="title mb-6">Редактировать олимпиаду</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-[500px] gap-6"
      >
        <Label className="subtitle !text-left !text-black">
          Название:
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />
        </Label>

        <Label className="subtitle !text-left !text-black">
          Описание:
          <Textarea
            name="description"
            value={formData.description || ""}
            onChange={handleInputChange}
            
            disabled={isSubmitting}
          />
        </Label>

        <Label className="subtitle !text-left !text-black">
          Дата начала регистрации:
          <Input
            type="date"
            name="registrationStart"
            value={formData.registrationStart}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        </Label>

        <Label className="subtitle !text-left !text-black">
          Дата окончания регистрации:
          <Input
            type="date"
            name="registrationEnd"
            value={formData.registrationEnd}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        </Label>

        <Label className="subtitle !text-left !text-black">
          Дата публикации результатов:
          <Input
            type="date"
            name="resultsDate"
            value={formData.resultsDate}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        </Label>

        <Label className="subtitle !text-left !text-black">
          Ссылка на результаты:
          <Input
            type="text"
            name="resultsUrl"
            value={formData.resultsUrl || ""}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        </Label>

        <Label className="subtitle !text-left !text-black">
          Количество участников:
          <Input
            type="number"
            name="participantCount"
            value={formData.participantCount}
            onChange={handleInputChange}
            
            disabled={isSubmitting}
          />
        </Label>

        <Label className="subtitle !text-left !text-black">
          Ссылки на соцсети: (в формате название:ссылка без пробелов и запятыми
          для перечисления. Например instagram:https://instagram.com)
          <Textarea
            name="socialLinks"
            value={formData.socialLinks}
            onChange={handleInputChange}
            
            disabled={isSubmitting}
          />
        </Label>

        <Label className="subtitle !text-left !text-black">
          Ссылка на форму регистрации:
          <Input
            type="text"
            name="registrationFormUrl"
            value={formData.registrationFormUrl}
            onChange={handleInputChange}
            
            disabled={isSubmitting}
          />
        </Label>

        <h1 className="subtitle !text-left !text-black">
          Этапы:
          {formData.stages.map((stage: any, index: number) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <Label>
                Название этапа:
                <Input
                  type="text"
                  value={stage.name}
                  onChange={(e) =>
                    handleStageChange(index, "name", e.target.value)
                  }
                  placeholder="Введите название этапа"
                  required
                  disabled={isSubmitting}
                />
              </Label>

              <Label>
                Дата начала:
                <Input
                  type="date"
                  value={stage.startDate || ""}
                  onChange={(e) =>
                    handleStageChange(index, "startDate", e.target.value)
                  }
                  disabled={isSubmitting}
                />
              </Label>

              <Label>
                Дата окончания:
                <Input
                  type="date"
                  value={stage.endDate || ""}
                  onChange={(e) =>
                    handleStageChange(index, "endDate", e.target.value)
                  }
                  disabled={isSubmitting}
                />
              </Label>

              <Label>
                Ссылка для решения задач:
                <Input
                  type="text"
                  value={stage.toPracticeLink || ""}
                  onChange={(e) =>
                    handleStageChange(index, "toPracticeLink", e.target.value)
                  }
                  disabled={isSubmitting}
                />
              </Label>

              <Button
                type="button"
                onClick={() => removeStage(index)}
                disabled={isSubmitting}
              >
                Удалить этап
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addStage} disabled={isSubmitting}>
            Добавить этап
          </Button>
        </h1>

        <h1 className="subtitle !text-left !text-black">
          Организаторы:
          {formData.organizers.map((org: any, index: number) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <Label>
                Название:
                <Input
                  type="text"
                  value={org.name}
                  onChange={(e) =>
                    handleOrganizerChange(index, "name", e.target.value)
                  }
                  placeholder="Введите название организатора"
                  required
                  disabled={isSubmitting}
                />
              </Label>

              <Label>
                Ссылка на них:
                <Input
                  type="text"
                  value={org.link}
                  onChange={(e) =>
                    handleOrganizerChange(index, "link", e.target.value)
                  }
                  required
                  disabled={isSubmitting}
                />
              </Label>

              <Label className="subtitle !text-left !text-black">
                Логотип:
                {org.logoUrl && (
                  <div>
                    <Image
                      src={org.logoUrl}
                      alt="Логотип организатора"
                      width={100}
                      height={100}
                    />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleOrganizerFileChange(index, e)}
                  disabled={isSubmitting}
                />
              </Label>

              <Button
                type="button"
                onClick={() => removeOrganizer(index)}
                disabled={isSubmitting}
              >
                Удалить
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addOrganizer} disabled={isSubmitting}>
            Добавить организатора
          </Button>
        </h1>

        <Label className="subtitle !text-left !text-black">
          Логотип:
          {formData.logoUrl && (
            <div>
              <Image
                      src={formData.logoUrl}
                      alt="Логотип"
                      width={100}
                      height={100}
                    />
            </div>
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setLogo)}
            disabled={isSubmitting}
          />
        </Label>

        <Label className="subtitle !text-left !text-black">
          Обложка:
          {formData.coverUrl && (
            <div>
              <Image
                      src={formData.logoUrl}
                      alt="Обложка"
                      width={1364}
                      height={196}
                    />
            </div>
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setCover)}
            disabled={isSubmitting}
          />
        </Label>

        <Label className="subtitle !text-left !text-black">
          Положение (опционально):
          {formData.regulationsUrl && (
            <div>
              <a
                href={formData.regulationsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Скачать существующее положение
              </a>
            </div>
          )}
          <Input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, setRegulations)}
            disabled={isSubmitting}
          />
        </Label>

        <Button type="submit" disabled={isSubmitting}>
          Сохранить изменения
        </Button>
      </form>
    </div>
  );
}
