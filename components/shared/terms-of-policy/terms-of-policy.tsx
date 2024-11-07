import React from 'react';

const TermsOfPolicy = () => {
    return (
        <section className="bg-gray-100 mt-[66px] w-full py-5 md:py-20">
            <div className="container flex flex-col gap-6">
                <h1 className="text-5xl font-bold text-gray-900">
                    Условия использования
                </h1>

                <p>Дата вступления в силу: [Дата]</p>

                <p>Добро пожаловать на Physics Hub! Пожалуйста, внимательно прочитайте эти Условия использования,
                    прежде чем начать пользоваться нашим сайтом. Используя наш сайт, вы соглашаетесь соблюдать и быть
                    связанным этими условиями.</p>
                <ul className="flex flex-col gap-4">
                    <li>1. Принятие условий</li>
                    <ul className="flex flex-col gap-4">
                        <li>• Используя сайт Physics Hub (далее – “Сайт”), вы подтверждаете, что прочитали, поняли
                            и соглашаетесь соблюдать эти Условия использования.
                        </li>
                        <li>• Если вы не согласны с этими условиями, пожалуйста, прекратите использование сайта.</li>
                    </ul>

                    <li>2. Использование сайта</li>
                    <ul className="flex flex-col gap-4">
                        <li>• Вам предоставляется право использовать наш сайт в личных, некоммерческих целях.</li>
                        <li>• Вы обязуетесь не использовать сайт в целях, противоречащих законодательству, и не пытаться
                            нарушить работу сайта.
                        </li>
                        <li>• Вы не должны загружать на сайт или распространять через него вредоносное программное
                            обеспечение, спам или любой иной контент, нарушающий закон.
                        </li>
                    </ul>

                    <li>3. Создание учетной записи</li>
                    <ul className="flex flex-col gap-4">
                        <li>• Для использования некоторых функций сайта вам может потребоваться создать учетную запись,
                            предоставив действующую информацию (например, электронную почту и пароль).
                        </li>
                        <li>• Вы несете ответственность за конфиденциальность данных своей учетной записи и пароля.
                            Любая активность с использованием вашей учетной записи считается осуществленной вами.
                        </li>
                        <li>• Мы не несем ответственности за убытки, возникшие в результате несанкционированного
                            использования вашей учетной записи.
                        </li>
                    </ul>

                    <li>4. Политика конфиденциальности</li>
                    <p>Использование нашего сайта регулируется также нашей Политикой конфиденциальности, которая
                        подробно описывает, как мы собираем, используем и защищаем вашу личную информацию. Ознакомьтесь
                        с Политикой конфиденциальности на {" "}
                        <a href="https://physicshub-test.vercel.app/privacy-policy" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                        </a>. </p>

                    <li>5. Интеллектуальная собственность</li>
                    <ul className="flex flex-col gap-4">
                        <li>• Весь контент, размещенный на сайте, включая тексты, изображения, логотипы, графику,
                            является собственностью Stitching Olympiads и защищен законами об авторском праве.
                        </li>
                        <li>• Вы не имеете права копировать, изменять, распространять или использовать контент сайта без
                            нашего явного письменного разрешения.
                        </li>
                    </ul>

                    <li>6. Ограничение ответственности</li>
                    <ul className="flex flex-col gap-4">
                        <li>• Мы не гарантируем, что сайт будет работать без перебоев или ошибок, а также не несем
                            ответственности за любые убытки, связанные с использованием или невозможностью использования
                            нашего сайта.
                        </li>
                        <li>• Сайт предоставляется “как есть”, без каких-либо явных или подразумеваемых гарантий.</li>
                    </ul>

                    <li>7. Изменения в Условиях</li>
                    <p>Мы оставляем за собой право вносить изменения в эти Условия использования в любое время. В случае
                        внесения изменений мы уведомим вас об этом на сайте. Продолжение использования сайта после
                        изменений считается согласием с новыми условиями.</p>

                    <li>8. Прекращение использования</li>
                    <p>Мы можем в любой момент приостановить или прекратить ваш доступ к сайту без уведомления, если вы
                        нарушаете эти Условия использования или закон.</p>

                    <li>9. Применимое законодательство</li>
                    <p>Настоящие Условия регулируются и толкуются в соответствии с законодательством Кыргызстана. 
                        Любые споры, возникающие в связи с использованием сайта, подлежат разрешению в судах
                        Кыргызстана.</p>

                    <li>10. Контакты</li>
                    <p>Если у вас есть вопросы по поводу этих Условий использования, пожалуйста, свяжитесь с нами по
                        адресу: {" "}
                        <a href="https://mail.google.com/mail/u/0/?pli=1#inbox?compose=CllgCJlKFQgmqcBnRHDRQrcGDHDGpXBTGghFmlBVqxrWGNWlPjZnFSHlXbQndtndnBgGzqBzwxB" target="_blank" rel="noopener noreferrer">
                        nursultanraiapov@gmail.com
                        </a>. </p>
                    
                </ul>
            </div>
        </section>

    );
};

export default TermsOfPolicy;
