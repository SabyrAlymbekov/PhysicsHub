"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LoginSchema } from "@/lib/validations"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {FormError} from "@/components/shared/auth/form-error";
import {FormSuccess} from "@/components/shared/auth/form-success";
import {loginAction, loginWithGoogle} from "@/lib/actions/login.action";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSignInForm({ className }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const [state, setState] = React.useState<React.ReactNode>("")

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    async function onSubmit(values: z.infer<typeof LoginSchema>) {
        setIsLoading(true);
        const res = await loginAction(values);
        if (res?.success) {
            setState(<FormSuccess message={res.success}></FormSuccess>);
        } else if (res?.error) {
            setState(<FormError message={res.error}></FormError>);
        }
        setIsLoading(false)
    }

    const onLoginWithGoogle = async () => {
        setIsLoading(true);
        try {
            await loginWithGoogle()
        } catch (e) {
            setState(<FormError message="Internal server error"></FormError>);
        }
        setIsLoading(false)
    }

    return (
        <div className={cn("grid gap-6", className)}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                       <FormField
                           control={form.control}
                           name="email"
                           render={({ field }) => (
                           <FormItem className="grid gap-1">
                               <FormLabel className="sr-only">
                                   Email
                               </FormLabel>
                               <FormControl>
                                   <Input
                                       {...field}
                                       placeholder="name@example.com"
                                       type="email"
                                       autoCapitalize="none"
                                       autoComplete="email"
                                       autoCorrect="off"
                                       disabled={isLoading}
                                   />
                               </FormControl>
                               <FormMessage></FormMessage>
                           </FormItem>
                       )}></FormField>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="grid gap-1">
                                    <FormLabel className="sr-only">
                                        Password
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        placeholder="******"
                                        type="password"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                    />
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        ></FormField>
                        {state}
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            {isLoading ? (<Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>) : ""}
                            Войти
                        </Button>
                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Или продолжить с
              </span>
                    </div>
                </div>
                <Button variant="outline" type="button" disabled={isLoading} onClick={onLoginWithGoogle}>
                    {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.google className="mr-2 h-4 w-4" />
                    )}{" "}
                    Google
                </Button>
            </Form>
        </div>
    )
}