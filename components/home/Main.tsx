import React from 'react'
import Link from 'next/link'

function Main() {
  return (
    <section className='bg-gray-100 w-full py-5 md:py-24'>
        <div className='container py-10 flex flex-col justify-center gap-5'>
            <h1 className='title'>Попращайтесь с проблемами в понимании <span className='text-gradient'>физики</span></h1>
            <p className='subtitle'>Physics Hub – это платформа, которая оптимизирует ваше обучение.
                <br/>
                Наша цель сделать изучение физики <span className='text-gradient'>удобным для всех</span>!
            </p>
        <div className="relative w-fit mx-auto mt-4">
        <div
            className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[#62cff4] to-[#2c67f2] opacity-50 blur-lg"
        ></div>
            <Link href="/archive" className="relative flex md:py-5 md:px-8 py-3 px-6 items-center justify-center rounded-lg bg-white text-black w-fit paragraph-medium md:base-bold">
                Решать задачи
            </Link>
        </div>
        </div>
    </section>
  )
}

export default Main
