import React from "react";
import Image from "next/image"
import Link from "next/link"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import {GetRandomQuote} from "@/constants/quotes";
import type { Quote } from "@/constants/quotes";

interface AuthenticationLayoutProps {
    children: React.ReactNode;
}

export default function AuthenticationLayout({ children }: AuthenticationLayoutProps) {
    const quote: Quote = GetRandomQuote();
    return (
        <div
            className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
                <div className="absolute inset-0 bg-zinc-900"/>
                <Link className="relative z-20 flex items-center text-lg font-medium" href="/">
                    <Image
                        src="/assets/icons/logo.png"
                        width={24}
                        height={24}
                        className="mr-2 h-6 w-6"
                        alt="logo"
                    ></Image>
                    Physics Hub
                </Link>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;
                            {quote.text}
                            &rdquo;
                        </p>
                        <footer className="text-sm">
                            <HoverCard>
                                <HoverCardTrigger>{quote.author}</HoverCardTrigger>
                                <HoverCardContent>
                                    {quote.about}
                                </HoverCardContent>
                            </HoverCard>
                        </footer>
                    </blockquote>
                </div>
            </div>
            {children}
        </div>
    )
}