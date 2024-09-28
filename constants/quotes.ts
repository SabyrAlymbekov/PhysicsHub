export interface Quote {
    text: string;
    author: string;
    about: string;
}

// TODO: Implement getting Quotes from MongoDB and adding new ones from admin panel
export const Quotes: Quote[] = [
    {
        text: "Для тех из нас, кто верит в физику, линия раздела между прошлым, настоящим и будущим — это только иллюзия, какой бы прочной она не была.",
        author: "Альберт Эйнштейн",
        about: "Альберт Эйнштейн - физик-теоретик, один из основателей современной теоретической физики, лауреат Нобелевской премии, общественный деятель-… 1879–1955"
    },
    {
        text: "Везде исследуйте всечасно, Что есть велико и прекрасно.",
        author: "Ломоносов М. В.",
        about: "Михаи́л Васи́льевич Ломоно́сов — первый крупный русский учёный-естествоиспытатель, известный также как полимат. Статский советник, профессор химии, действительный член Санкт-Петербургской Императорской академии наук и почётный член Королевской Шведской и Болонской академий наук… 1711–1765"
    }
]

export function GetRandomQuote() {
    const randInd = Math.floor(Math.random()*Quotes.length);

    return Quotes[randInd];
}