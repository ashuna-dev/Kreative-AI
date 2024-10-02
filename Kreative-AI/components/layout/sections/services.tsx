import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

enum ProService {
  YES = 1,
  NO = 0,
}

interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}

const serviceList: ServiceProps[] = [
  {
    title: "AI-Powered Design",
    description:
      "Generate stunning banners effortlessly with our AI-driven design technology, tailored to your brand's needs.",
    pro: 1,
  },
  {
    title: "Customizable Templates",
    description:
      "Choose from a variety of professionally designed templates that you can easily customize to fit your campaign.",
    pro: 0,
  },
  {
    title: "Real-Time Preview",
    description:
      "Instantly see how your banner looks as you edit, allowing for quick adjustments and enhancements.",
    pro: 1,
  },
  {
    title: "Integration with Marketing Tools",
    description: 
      "Seamlessly integrate with your favorite marketing platforms to enhance your campaigns and track performance.",
    pro: 0,
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Services
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Transform Your Marketing Strategy
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Our innovative banner generation solutions empower your brand to stand out in a crowded market.
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60 dark:bg-card h-full relative"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Badge
              data-pro={ProService.YES === pro}
              variant="secondary"
              className="absolute -top-2 -right-3 data-[pro=false]:hidden"
            >
              PRO
            </Badge>
          </Card>
        ))}
      </div>
    </section>
  );
};
