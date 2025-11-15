"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  {
    question: "How do I start a game?",
    answer:
      "Simply create a game by providing the title, category, difficulty, environment, and total number of players. Once created, you can start playing immediately.",
  },
  {
    question: "Can I play with friends?",
    answer:
      "Yes! You can adjust the total number of players when creating the game. Share the game with your friends and play together.",
  },
  {
    question: "Does the game save my progress?",
    answer:
      "Yes, all games you create are saved, allowing you to revisit or continue them later.",
  },
  {
    question: "Can I edit a game after creating it?",
    answer:
      "Yes, you can update game details like title, difficulty, category, or environment at any time before the game starts.",
  },
  {
    question: "Is there a limit to how many games I can create?",
    answer:
      "No, you can create as many games as you want. All your created games are stored in your dashboard for easy access.",
  },
];

const FAQ = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 mt-16 mb-16">
      <div className="flex flex-col md:flex-row items-start gap-x-12 gap-y-8">
        {/* Title */}
        <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight leading-snug">
          Frequently Asked <br /> Questions
        </h2>

        {/* Accordion */}
        <Accordion
          type="single"
          defaultValue="question-0"
          className="flex-1 max-w-xl"
        >
          {faq.map(({ question, answer }, index) => (
            <AccordionItem key={index} value={`question-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
