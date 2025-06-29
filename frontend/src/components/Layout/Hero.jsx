import { Button } from "components/components/ui/button";
import { Link } from "react-router-dom";
import heroImg from "../../assets/rabbit-hero.webp";

const Hero = () => {
  return (
    <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden md:min-h-[600px] lg:min-h-[750px]">
      <img
        src={heroImg}
        alt="Rabbit Hero"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
      <div className="relative z-20 flex w-full flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white uppercase drop-shadow-lg md:text-7xl lg:text-8xl">
          Vacation <span className="text-primary">Ready</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base text-white/90 drop-shadow md:text-2xl">
          Explore our vacation-ready outfits with fast and worldwide shipping.
        </p>
        <Button
          asChild
          size="lg"
          className="px-10 py-4 text-lg font-semibold shadow-xl"
        >
          <Link to="/collections/all">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
