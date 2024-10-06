import React from 'react'
import Link from 'next/link'
import Goals from "@/components/home/goals/Goals";
import WhyUs from "@/components/home/why_us/whyUs";

function Main() {
  return (
      <>
          <section className='bg-gray-100 w-full mt-[66px] py-5 md:py-24'>
              <div className='container py-10 flex flex-col justify-center gap-5'>
                  <h1 className='title'>Physics hub</h1>
                  <p className='subtitle'>Physics hub – это платформа для изучения физики
                      <br/>
                      Мы собрали <span className='text-gradient'>качественные и тщательно отобранные </span> задачи и
                      лекции в одном архиве
                      <br/>
                      Наша цель сделать изучение физики <span className='text-gradient'>доступным для всех</span>!
                  </p>
                  <div className="relative w-fit mx-auto mt-4">
                      <div
                          className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[#62cff4] to-[#2c67f2] opacity-50 blur-lg"></div>
                      <Link href="/archive"
                            className="relative flex md:py-5 md:px-8 py-3 px-6 items-center justify-center rounded-lg bg-white text-black w-fit paragraph-medium md:base-bold">
                          Решать задачи
                      </Link>
                  </div>
              </div>
          </section>
          <Goals/>
          <WhyUs/>
      </>
  )
}

export default Main