import React from 'react';
import Link from "next/link";
import tg from "@/public/assets/icons/telegram.svg"
import insta from "@/public/assets/icons/instagram.svg"
import Image from "next/image"

const Footer = () => {
    return (
      <>
          <footer className="md:block hidden w-full bg-white mt-auto border-t">
              <div className="container flex items-center justify-between gap-10 py-3">
                  <div className="flex gap-3 flex-col">
                      <div className="grid grid-cols-2 gap-2">
                          <Link className="hover:opacity-50" href="/">
                              Главная
                          </Link>
                          <Link className="hover:opacity-50" href="/olympiads">
                              Олимпиады
                          </Link>
                          <Link className="hover:opacity-50" href="/materials">
                              Материалы
                          </Link>
                          <Link className="hover:opacity-50" href="/shop">
                              Мерч
                          </Link>
                          <Link href="/team" className="hover:opacity-50">
                              Наша команда
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
                      <span className="text-[15px]">+996700796184</span>
                      <a className="w-7 h-7 rounded border-[1px] border-black flex items-center justify-center" href="https://t.me/phys_hub">
                            <Image className="w-4" src={tg} alt="link"  width={7} height={7}/>
                          </a>
                          <a className="w-7 h-7 rounded border-[1px] border-black flex items-center justify-center" href="https://www.instagram.com/_physicshub_rus/?igsh=MWppMmhvcmdidXVvNg%3D%3D">
                            <Image className="w-4" src={insta} alt="link"  width={7} height={7}/>
                          </a>
                  </div>
              </div>
          </footer>
          <footer className="md:hidden w-full bg-white mt-auto border-t">
              <div className="container flex items-center sm:flex-row flex-col justify-between gap-5 py-3">
                  <div className="flex gap-3 flex-col ">
                      <div className="grid text-sm grid-cols-2 mini:grid-cols-2 sm:grid-cols-1 gap-2">
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
                          <Link className="hover:opacity-50" href="/materials">
                              Материалы
                          </Link>
                          <Link className="hover:opacity-50" href="/shop">
                              Мерч
                          </Link>
                          <Link href="/team" className="hover:opacity-50">
                              Наша команда
                          </Link>

                      </div>

                  </div>
                  <div className="grid grid-cols-1 justify-items-center">
                      <span className="text-lg font-bold">Physics Hub 2024©</span>

                      <div className="flex text-sm gap-3">

                          <Link className="hover:opacity-50" href="/privacy-policy">
                              Privacy Policy
                          </Link>
                          |
                          <Link className="hover:opacity-50" href="/terms-of-service">
                              Terms of Service
                          </Link>
                      </div>
                  </div>
                  <div className="flex gap-3 flex-col items-center">
                      <span className="text-[14px]">+996-550-22-99</span>
                      <div className="flex gap-3">

                          <a className="w-7 h-7 rounded border-[1px] border-black flex items-center justify-center" href="https://t.me/phys_hub">
                            <Image className="w-4" src={tg} alt="link"  width={7} height={7}/>
                          </a>
                          <a className="w-7 h-7 rounded border-[1px] border-black flex items-center justify-center" href="https://www.instagram.com/_physicshub_rus/?igsh=MWppMmhvcmdidXVvNg%3D%3D">
                            <Image className="w-4" src={insta} alt="link"  width={7} height={7}/>
                          </a>
                      </div>
                  </div>
              </div>
          </footer>
      </>
    );
};

export default Footer;