import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().email({ message: "Некорректный адрес электронной почты" }).max(255, {message: "Длина почты не должна превышать 255 символов"}),
    password: z.string().min(6, {message: "Пароль должен быть хотя бы в 6 символов"}).max(255, {message: "Длина пароля не должна превышать 255 символов"}),
})

export const SignUpSchema = z.object({
    email: z.string().email({ message: "Некорректный адрес электронной почты" }).max(255, {message: "Длина почты не должна превышать 255 символов"}),
    password: z.string().min(6, {message: "Пароль должен быть хотя бы в 6 символов"}).max(255, {message: "Длина пароля не должна превышать 255 символов"}),
    username: z.string().min(1, {
        message: "Поле имя не может быть пустым!"
    }).max(255, {
        message: "Длина имени не может превышать 255 символов"
    })
})


export const profileSchema = z.object({
    bio: z.string().min(3, {message: "описание должно быть как минимум в 3 символа."}).max(4096, {message: "описание должно быть меньше 4096 символов."}).or(z.undefined()),
    role: z.union([
        z.literal('ADMIN'),
        z.literal('TEAM'),
        z.literal('USER'),
      ]).or(z.undefined()),
    name: z.string().min(1, {message: "поле не должно быть пустым"}).max(128, {message: "длина не должна превосходить 128 символов"}).or(z.undefined()),
    projects: z.string().min(1, {message: "поле не должно быть пустым"}).max(4096, {message: "длина должна быть меньше 4096 символов."}).array().max(100, {message: "Кол-во проектов не должно превышать 100"}).or(z.undefined()),
    education: z.string().min(1, {message: "поле не должно быть пустым"}).max(4096, {message: "длина должна быть меньше 4096 символов."}).array().max(100, {message: "Кол-во полей не должно превышать 100"}).or(z.undefined()),
    achievements: z.string().min(1, {message: "поле не должно быть пустым"}).max(4096, {message: "длина должна быть меньше 4096 символов."}).array().max(100, {message: "Кол-во полей не должно превышать 100"}).or(z.undefined()),
    interests: z.string().min(1, {message: "поле не должно быть пустым"}).max(4096, {message: "длина должна быть меньше 4096 символов."}).array().max(100, {message: "Кол-во полей не должно превышать 100"}).or(z.undefined()),
    socials: z.string().min(1, {message: "поле не должно быть пустым"}).max(4096, {message: "длина должна быть меньше 4096 символов."}).array().max(100, {message: "Кол-во полей не должно превышать 100"}).or(z.undefined()),
    image: z.string().or(z.undefined()),
    rolesInTeam: z.string().min(1, {message: "поле не должно быть пустым"}).max(4096, {message: "длина должна быть меньше 4096 символов."}).array().max(100, {message: "Кол-во полей не должно превышать 100"}).or(z.undefined())
})