import React from "react";
import Link from "next/link";

const Books = ({ text, filename }) => {
    return <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-wrap">
            <Link download={filename}>
                {text}
            </Link>
        </th>
    </tr>
}

const ResourcesList = () => {
    return <section className="container relative mt-14">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-white uppercase bg-gradient rounded-lg">
            <tr>
                <th className='px-6 py-3' scope="col rounded-lg">Учебники</th>
            </tr>
            </thead>
            <tbody>
            <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-wrap">
                    Андрианов И.В., Маневич Л.И. Асимптотические методы и физические теории. М.: Знание, 1989
                </th>
            </tr>
            <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-wrap">
                    Ахматов А.С. (ред.) Физика. Часть 2. Оптика и волны. М.: Наука, 1973
                </th>
            </tr>
            <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-wrap">
                    Ахматов А.С. (ред.) Физика. Часть 2. Оптика и волны. М.: Наука, 1973
                </th>
            </tr>
            <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-wrap">
                    Ахматов А.С. (ред.) Физика. Часть 2. Оптика и волны. М.: Наука, 1973
                </th>
            </tr>
            <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-wrap">
                    Ахматов А.С. (ред.) Физика. Часть 2. Оптика и волны. М.: Наука, 1973
                </th>
            </tr>
            </tbody>
        </table>
    </section>
}

export default ResourcesList