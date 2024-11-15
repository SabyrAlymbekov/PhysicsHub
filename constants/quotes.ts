export interface Quote {
    text: string;
    author: string;
    about: string;
}

// TODO: Implement getting Quotes from MongoDB and adding new ones from admin panel
export const Quotes: Quote[] = [
   
    
    {
        text: "Сложнее всего начать действовать, все остальное зависит только от упорства.",
        author: "Амелия Эрхарт",
        about: "Амелия Эрхарт -  пионер авиации и американская писательница. Стала первой женщиной-пилотом, перелетевшей Атлантический океан. "
    },
    {
        text: "If people don't think you are crazy, then you're not dreaming big enough.",
        author: "Маршалл Д. Тич",
        about: "Маршалл Д. Тич - Пират из аниме One Piece с наградой 2 миллиарда 247 миллионов белли, Йонко, бывший Шичибукай, пользователь Дьявольских Фруктов"
    }
]

export function GetRandomQuote() {
    const randInd = Math.floor(Math.random()*Quotes.length);

    return Quotes[randInd];
}
