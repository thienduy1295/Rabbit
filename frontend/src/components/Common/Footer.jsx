import { Button } from "components/components/ui/button";
import { Input } from "components/components/ui/input";
import { FiPhoneCall } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-border text-foreground border-t pt-12 pb-6">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 md:grid-cols-4 lg:px-0">
        {/* Newsletter */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Newsletter</h3>
          <p className="text-muted-foreground mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="text-muted-foreground mb-6 text-sm font-medium">
            Sign up and get 10% off your first order.
          </p>
          <form className="flex w-full gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md"
              required
            />
            <Button type="submit" className="px-6 font-semibold">
              Subscribe
            </Button>
          </form>
        </div>
        {/* Shop links */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Shop</h3>
          <ul className="text-muted-foreground space-y-2">
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>
        {/* Support links */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Support</h3>
          <ul className="text-muted-foreground space-y-2">
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>
        {/* Follow us */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
          <div className="mb-6 flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Meta"
              >
                <TbBrandMeta className="h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <IoLogoInstagram className="h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <RiTwitterXLine className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <p className="text-muted-foreground">Call Us</p>
          <p className="flex items-center gap-2 font-medium">
            <FiPhoneCall className="inline-block" />
            0123-456-789
          </p>
        </div>
      </div>
      {/* Footer bottom */}
      <div className="border-border container mx-auto mt-12 border-t px-4 pt-6 lg:px-0">
        <p className="text-muted-foreground text-center text-sm tracking-tighter">
          © 2025, CompileTab. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
