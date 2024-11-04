import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MdOutlineEdit } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

// TODO: use NextJS 15 parallel routes to improve performance

const ModalWrapper = (
    {
        children,
        name,
        type = "edit",
        isContacts = false
    }: {children: React.ReactNode, name: string, type?: "edit" | "add", isContacts?: boolean}
) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={`rounded-full w-fit ${type === "edit" && "ml-4"}`}>{
            (type == "edit" ? <MdOutlineEdit /> : (<h1 className='flex flex-row items-center gap-2'>Добавить {name} <IoMdAddCircle /></h1>))
        }</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать {name}</DialogTitle>
          <DialogDescription>
            Внесите изменения в {name} и нажмите сохранить.
            {isContacts && "\nДобавьте информацию о том как связаться с вами (ссылки на соц. сети, почта, телефон). Например https://instagram.com"}
          </DialogDescription>
        </DialogHeader>
            {children}
      </DialogContent>
    </Dialog>
  )
}

export default ModalWrapper