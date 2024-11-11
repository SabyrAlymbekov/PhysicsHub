export interface Quote {
    text: string;
    author: string;
    about: string;
}

// TODO: Implement getting Quotes from MongoDB and adding new ones from admin panel
export const Quotes: Quote[] = [
   
    {
        text: "Научись тому, что учишь, и научи тому, что знаешь.",
        author: "Конфуций",
        about: "Конфуций - великий древнекитайский мыслитель, просветитель и основатель конфуцианской школы, один из десяти самых знаменитых мировых культурных деятелей в истории."
    },
    {
        text: "Сложнее всего начать действовать, все остальное зависит только от упорства.",
        author: "Амелия Эрхарт",
        about: "Амелия Эрхарт -  пионер авиации и американская писательница. Стала первой женщиной-пилотом, перелетевшей Атлантический океан. "
    }
]

export function GetRandomQuote() {
    const randInd = Math.floor(Math.random()*Quotes.length);

    return Quotes[randInd];
}
