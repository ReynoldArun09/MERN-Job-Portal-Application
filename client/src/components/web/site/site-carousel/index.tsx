import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { categories } from "@/constants";

export default function SiteCarousel() {
  return (
    <section>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={category}>
              <Badge variant="outline" className="rounded-full py-1 px-4">
                {category}
              </Badge>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
