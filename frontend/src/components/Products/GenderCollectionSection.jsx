import { Button } from "components/components/ui/button";
import { Card, CardContent } from "components/components/ui/card";
import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";

const GenderCollectionSection = () => {
  return (
    <section className="px-4 py-16 lg:px-0">
      <div className="container mx-auto flex flex-col gap-8 md:flex-row">
        {/* Womens Collection */}
        <Card className="group relative min-h-[350px] flex-1 overflow-hidden border-0 p-0 shadow-lg">
          <img
            src={womensCollectionImage}
            alt="Women's Collection"
            className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <CardContent className="relative z-20 flex h-full flex-col justify-end p-8">
            <h2 className="mb-3 text-3xl font-bold text-white drop-shadow-lg">
              Women's Collection
            </h2>
            <Button asChild size="lg" className="mt-2 w-fit">
              <Link to="/collections/all?gender=Women">Shop Now</Link>
            </Button>
          </CardContent>
        </Card>
        {/* Mens Collection */}
        <Card className="group relative min-h-[350px] flex-1 overflow-hidden border-0 p-0 shadow-lg">
          <img
            src={mensCollectionImage}
            alt="Men's Collection"
            className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <CardContent className="relative z-20 flex h-full flex-col justify-end p-8">
            <h2 className="mb-3 text-3xl font-bold text-white drop-shadow-lg">
              Men's Collection
            </h2>
            <Button asChild size="lg" className="mt-2 w-fit">
              <Link to="/collections/all?gender=Men">Shop Now</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
