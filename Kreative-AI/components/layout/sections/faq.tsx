import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  question: string;
  answer: string;
  value: string;
}

const List: Props[] = [
  {
    question: "What is KreativeAI?",
    answer:
      "KreativeAI is a platform that utilizes GAN technology to generate high-quality banners based on your promotional text and product images.",
    value: "item-1",
  },
  {
    question: "How does the banner generation work?",
    answer:
      "You provide promotional text and product images, and our AI-driven system automatically generates visually appealing banners tailored to your needs.",
    value: "item-2",
  },
  {
    question: "What formats can I export the generated banners in?",
    answer:
      "You can export your banners in various formats, including JPEG, PNG, and SVG, making them suitable for different platforms.",
    value: "item-3",
  },
  {
    question: "Is there a limit to the number of banners I can generate?",
    answer:
      "No, you can generate multiple banners at once, allowing you to save time while maintaining high quality.",
    value: "item-4",
  },
  {
    question: "Can I customize the designs of the banners?",
    answer:
      "Yes, you can customize aspects like color schemes, layouts, and text to ensure the banners align with your brand's identity.",
    value: "item-5",
  },
  {
    question: "Is there any cost associated with using KreativeAI?",
    answer:
      "Currently, KreativeAI is free to use, providing you with a cost-effective solution for creating engaging banners.",
    value: "item-6",
  },
  {
    question: "What kind of support is available?",
    answer:
      "We offer documentation and community support to assist you in making the most out of the platform.",
    value: "item-7",
  },
];

export const Section = () => {
  return (
    <section id="" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          S
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Common Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {List.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
