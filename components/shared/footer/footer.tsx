import React from 'react';
import Link from "next/link";
import tg from "@/public/assets/icons/telegram.svg"
import insta from "@/public/assets/icons/instagram.svg"

const Footer = () => {
    return (
        <footer className="w-full bg-white mt-auto">
            <div className="container flex items-center justify-between gap-10 py-3">
                <div className="flex gap-3 flex-col">
                    <div className="grid grid-cols-2 gap-2">
                        <Link className="hover:opacity-50" href="/">
                            Главная
                        </Link>
                        <Link className="hover:opacity-50" href="/weekly">
                            Задача недели
                        </Link>
                        <Link className="hover:opacity-50" href="/archive">
                            Архив
                        </Link>
                        <Link className="hover:opacity-50" href="/olympiads">
                            Олимпиады
                        </Link>
                        <Link className="hover:opacity-50" href="/resources">
                            Материалы
                        </Link>
                        <Link className="hover:opacity-50" href="/shop">
                            Мерч
                        </Link>
                    </div>

                </div>
                <div className="grid grid-cols-1 justify-items-center">
                    <span className="text-xl font-bold">Physics Hub 2024©</span>

                    <div className="flex gap-3">

                        <Link className="hover:opacity-50" href="/privacy-policy">
                            Privacy Policy
                        </Link>
                        |
                        <Link className="hover:opacity-50" href="/terms-of-service">
                            Terms of Service
                        </Link>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <span className="text-[15px]">+996-550-22-99</span>
                    <div className="w-7 h-7 rounded border-[1px] border-black flex items-center justify-center">
                        <img className="w-4" src={tg.src} alt=""/>
                    </div>
                    <div className="w-7 h-7 rounded border-[1px] border-black flex items-center justify-center">
                        <img className="w-4" src={insta.src} alt=""/>
                    </div>
                </div>


            </div>
        </footer>
    );
};

export default Footer;