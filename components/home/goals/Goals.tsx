'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button"


const Goals = () => {
    return (
        <section className="container flex justify-between flex-col items-center w-full py-[50px] md:py-[100px] lg:flex-row">
            <div className="lg:w-1/2 sm:w-full">

                <h3 className="text-4xl font-bold sm:text-5xl">What are our goals?</h3>
                <ul className="text-2xl pl-1">
                    <li className="text-[15px] leading-5 text-grey my-5 sm:text-[20px] sm:leading-7">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Fugit i
                        ipsum labore minima minus necessitatibus nihil saepe, unde ut
                        veritatis voluptate voluptatibus.
                    </li>
                </ul>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                {/*<Button>Click me</Button>*/}



            </div>
            <div className="lg:w-1/3 p-14">
                <img className="rounded-2xl max-w-full" src="https://globalgovernanceforum.org/wp-content/uploads/2020/10/Albert-Einstein.jpg" alt="einstein"/>
            </div>

        </section>
    );
};

export default Goals;