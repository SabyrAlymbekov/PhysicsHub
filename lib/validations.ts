import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().email({ message: "Некорректный адрес электронной почты" }).max(255, {message: "Длина почты не должна превышать 255 символов"}),
    password: z.string().min(6, {message: "Пароль должен быть хотя бы в 6 символов"}).max(255, {message: "Длина пароля не должна превышать 255 символов"}),
})

export const SignUpSchema = z.object({
    email: z.string().email({ message: "Некорректный адрес электронной почты" }).max(255, {message: "Длина почты не должна превышать 255 символов"}),
    password: z.string().min(6, {message: "Пароль должен быть хотя бы в 6 символов"}).max(255, {message: "Длина пароля не должна превышать 255 символов"}),
    name: z.string().min(1, {
        message: "Поле имя не может быть пустым!"
    }).max(255, {
        message: "Длина имени не может превышать 255 символов"
    })
})