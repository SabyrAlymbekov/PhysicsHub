"use client"

import { FormError } from '@/components/shared/auth/form-error';
import { FormSuccess } from '@/components/shared/auth/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { changeProfile } from '@/lib/actions/profile/changeProfile';
import React, { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

interface EditManyFieldsT {
    initialValue: string[];
    name: string;
    fieldName: string;
}

const EditManyFields = ({
    initialValue,
    name,
    fieldName
}: EditManyFieldsT) => {
    const [values, setValues] = useState<string[]>(initialValue);

    const handleAddNewValue = () => {
        const newValues = [...values, ""];
        setValues(newValues);
    }

    const handleDeleteValue = (id: number) => {
        const newValues = values.filter((_, curId) => curId != id);
        setValues(newValues);
    }

    const handleEditValue = (id: number, value: string) => {
        const newValues = [...values];
        newValues[id] = value;
        setValues(newValues);
    }

    const [state, setState] = useState<React.ReactNode>("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await changeProfile({[fieldName]: values});
        if (res.error) {
            setState(<FormError message={res.error} />)
        } else {
            setState(<FormSuccess message="Успешно" />)
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>{name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row gap-2 flex-wrap">
                  {values.map((value, index: number) => {
                    return (
                      <div key={index} className="w-full">
                        <Textarea className="text-lg" value={value} onChange={(e) => {
                            handleEditValue(index, e.target.value)
                        }} ></Textarea>
                        <h1 onClick={()=>{
                            handleDeleteValue(index)
                        }} className='rounded-full'><MdDeleteOutline /></h1>
                        <Separator className="my-1 w-full" />
                      </div>
                    );
                  })}
                  <h1 onClick={handleAddNewValue}  className='rounded-full'><IoMdAdd /></h1>
                </div>
              </CardContent>
            </Card>
            {state}
            <DialogFooter>
                <Button type="submit" className="mt-4">Сохранить</Button>
            </DialogFooter>
        </form>
    )
}

export default EditManyFields