import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

// Updated featureList with 3 points
const featureList: FeaturesProps[] = [
  {
    icon: "Layers",
    title: "Bulk Generation",
    description:
      "Easily generate multiple banners at once, saving time and resources while maintaining quality.",
  },
  {
    icon: "FileText",
    title: "Multiple Formats",
    description:
      "Export your banners in various formats to suit different platforms and promotional needs.",
  },
  {
    icon: "Brain",
    title: "AI-Driven Creativity",
    description:
      "Leverage GAN technology to create unique and engaging banners tailored to your promotional text and product images.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        What Makes KreativeAI Different
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        With KreativeAI, you have the tools to create engaging banners that not only attract attention but also convert views into action.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
