"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { changeProfile } from '@/lib/actions/profile/changeProfile'
import { FormSuccess } from '@/components/shared/auth/form-success'
import { FormError } from '@/components/shared/auth/form-error'
import { DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

interface EditFieldFormProps {
    fieldName: string;
    initialValue: string;
    Name: string;
    userId?: string;
}

const EditFieldForm: React.FC<EditFieldFormProps> = ({ Name, fieldName, initialValue, userId }) => {
    const [value, setValue] = useState(initialValue);
    const [state, setState] = useState<React.ReactNode>("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let res;
        if (userId) {
            res = await changeProfile({[fieldName]: value}, userId)
        } else {
            res = await changeProfile({[fieldName]: value});
        }
        if (res.error) {
            setState(<FormError message={res.error} />)
        } else {
            setState(<FormSuccess message="Успешно" />)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor={fieldName}>{Name}</Label>
            {
                (fieldName !== 'bio' ? <Input
                    type="text"
                    id={fieldName}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={`Введите ${Name}`}
                /> : <Textarea
                    id={fieldName}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={`Введите ${Name}`}
                >

                </Textarea>)
            }
            {state}
            <DialogFooter>
                <Button type="submit" className="mt-4">Сохранить</Button>
            </DialogFooter>
        </form>
    );
};

export default EditFieldForm; 