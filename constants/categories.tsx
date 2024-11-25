import { IoShirt } from "react-icons/io5";
import { IoGrid } from "react-icons/io5";
import { BsFillCupFill } from "react-icons/bs";
import { BsFillGrid1X2Fill } from "react-icons/bs";

export interface category {
    name: string;
    link: string;
    image: React.ReactNode
}

export const categoriesSelect: string[] = [
    "T-shirt",
    "Cup",
    "Other"
]

export const categories: category[] = [
    {
        name: "Все",
        image: <IoGrid className='w-7 h-7'/>,
        link: "/shop"
    }, {
        name: "Футболки",
        image: <IoShirt className='w-7 h-7'/>,
        link: "/shop/t-shirt"
    }, {
        name: "Кружки",
        image: <BsFillCupFill className='w-7 h-7'/>,
        link: "/shop/cup"
    }, {
        name: "Разное",
        image: <BsFillGrid1X2Fill className='w-7 h-7'/>,
        link: "/shop/other"
    },
]