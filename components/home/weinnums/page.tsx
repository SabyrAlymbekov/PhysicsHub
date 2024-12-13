const WeInNums = () => {
  return (
    <div className="py-20 w-full bg-gray-100">
        <div className="container flex justify-between flex-col gap-8">
          <h1 className="font-bold text-4xl md:text-5xl 2xl:text-6xl">
            Сообщество из тысяч людей
          </h1>
          <p className="subtitle !text-left max-w-[1200px]">
            Physics Hub - международное сообщество для любителей науки, основанное Нурсултаном Раяповым, <span className="text-gradient">призёром олимпиад и членом сборной Кыргызстана по физике.</span> 
          </p>
          <div className="flex items-center w-full">
            <div className="flex flex-row justify-between items-center w-[400px] lg:w-[600px] max-sm:flex-col max-sm:items-start max-sm:gap-8">
            <div className="flex flex-col gap-2.5">
                <h2 className="text-gradient text-4xl md:text-5xl 2xl:text-6xl font-extrabold">
                  11k
                </h2>
                <p className="text-gray-600 text-lg md:text-xl 2xl:text-2xl font-semibold">
                  Участников
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                <h2 className="text-gradient text-4xl md:text-5xl 2xl:text-6xl font-extrabold">
                  19
                </h2>
                <p className="text-gray-600 text-lg md:text-xl 2xl:text-2xl font-semibold">
                  Стран
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                <h2 className="text-gradient text-4xl md:text-5xl 2xl:text-6xl font-extrabold">
                  2+
                </h2>
                <p className="text-gray-600 text-lg md:text-xl 2xl:text-2xl font-semibold">
                  Лет
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default WeInNums
