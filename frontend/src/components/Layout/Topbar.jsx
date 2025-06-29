import { Button } from "components/components/ui/button";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";

const Topbar = () => {
  return (
    <div className="bg-primary text-primary-foreground border-border w-full border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 text-xs md:text-sm">
        {/* Social Icons */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#"
            aria-label="Meta"
            className="hover:text-primary-foreground/70 focus:ring-ring rounded transition-colors focus:ring-2 focus:outline-none"
          >
            <TbBrandMeta className="size-5" />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-primary-foreground/70 focus:ring-ring rounded transition-colors focus:ring-2 focus:outline-none"
          >
            <IoLogoInstagram className="size-5" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-primary-foreground/70 focus:ring-ring rounded transition-colors focus:ring-2 focus:outline-none"
          >
            <RiTwitterXLine className="size-4" />
          </a>
        </div>
        {/* Announcement */}
        <div className="flex-grow text-center font-medium tracking-tight">
          <span>We ship worldwide — Fast &amp; reliable shipping!</span>
        </div>
        {/* Phone CTA */}
        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="px-3 py-1 text-xs"
          >
            <a href="tel:+1234567890" className="font-semibold">
              +1 (234) 567-890
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
