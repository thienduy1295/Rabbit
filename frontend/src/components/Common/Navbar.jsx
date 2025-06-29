import { Button } from "components/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "components/components/ui/sheet";
import CartDrawer from "components/Layout/CartDrawer";
import { useState } from "react";
import {
  HiBars3BottomRight,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cart } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <nav className="sm:-40 sticky top-0 z-40 w-full bg-white/80 shadow-sm backdrop-blur-md transition lg:z-60">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div>
            <Link
              to="/"
              className="text-primary text-2xl font-bold tracking-tight"
            >
              Buytopia
            </Link>
          </div>
          {/* Desktop Nav */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              to="/collections/all?gender=Men"
              className="text-muted-foreground hover:text-primary text-sm font-medium uppercase transition-colors"
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              className="text-muted-foreground hover:text-primary text-sm font-medium uppercase transition-colors"
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              className="text-muted-foreground hover:text-primary text-sm font-medium uppercase transition-colors"
            >
              Top Wear
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              className="text-muted-foreground hover:text-primary text-sm font-medium uppercase transition-colors"
            >
              Bottom Wear
            </Link>
          </div>
          {/* Right - Icons */}
          <div className="flex items-center gap-4">
            {user && user.role === "admin" && (
              <Button asChild size="sm" className="font-semibold">
                <Link to="/admin">Admin</Link>
              </Button>
            )}
            <Link to="/profile" className="group relative">
              <HiOutlineUser className="text-muted-foreground group-hover:text-primary size-7 transition" />
            </Link>
            <Button
              variant="ghost"
              className="relative p-2"
              onClick={toggleCartDrawer}
              aria-label="Open cart"
            >
              <HiOutlineShoppingBag className="text-muted-foreground group-hover:text-primary size-7 transition" />
              {cartItemCount > 0 && (
                <span className="bg-primary absolute -top-2 -right-2 animate-bounce rounded-full px-2 py-0.5 text-xs text-white shadow-lg">
                  {cartItemCount}
                </span>
              )}
            </Button>
            {/* Search */}
            <div className="overflow-hidden rounded-full bg-white px-2 py-1 shadow">
              <SearchBar />
            </div>
            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <HiBars3BottomRight className="text-muted-foreground hover:text-primary size-7 transition" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b p-4">
                    <SheetTitle className="text-xl font-semibold">
                      Menu
                    </SheetTitle>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Close menu"
                      >
                        <span className="sr-only">Close</span>
                        {/* The Sheet component already includes a close icon, so this is for accessibility */}
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col gap-4 p-4">
                    <SheetClose asChild>
                      <Link
                        to="/collections/all?gender=Men"
                        className="text-muted-foreground hover:text-primary block transition-colors"
                      >
                        Men
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        to="/collections/all?gender=Women"
                        className="text-muted-foreground hover:text-primary block transition-colors"
                      >
                        Women
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        to="/collections/all?category=Top Wear"
                        className="text-muted-foreground hover:text-primary block transition-colors"
                      >
                        Top Wear
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        to="/collections/all?category=Bottom Wear"
                        className="text-muted-foreground hover:text-primary block transition-colors"
                      >
                        Bottom Wear
                      </Link>
                    </SheetClose>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
    </>
  );
};

export default Navbar;
