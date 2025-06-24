import CartDrawer from "components/Layout/CartDrawer";
import { useState } from "react";
import {
  HiBars3BottomRight,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <div>
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>
        <div className="hidden space-x-6 md:flex">
          <Link
            to="/collections/all?gender=Men"
            className="text-sm font-medium text-gray-700 uppercase hover:text-black"
          >
            Men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className="text-sm font-medium text-gray-700 uppercase hover:text-black"
          >
            Women
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            className="text-sm font-medium text-gray-700 uppercase hover:text-black"
          >
            Top Wear
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            className="text-sm font-medium text-gray-700 uppercase hover:text-black"
          >
            Bottom Wear
          </Link>
        </div>
        {/* Right - Icons */}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block rounded bg-black px-2 text-sm text-white"
            >
              Admin
            </Link>
          )}
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="size-6 text-gray-700" />
          </Link>
          <button
            className="relative hover:text-black"
            onClick={toggleCartDrawer}
          >
            <HiOutlineShoppingBag className="size-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="bg-rabbit-red absolute -top-1 rounded-full px-2 py-0.5 text-xs text-white">
                {cartItemCount}
              </span>
            )}
          </button>
          {/* Search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button className="md:hidden" onClick={toggleNavDrawer}>
            <HiBars3BottomRight className="size-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile navigation */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-3/4 transform bg-white shadow-lg transition-transform duration-300 sm:w-1/2 md:w-1/3 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="mb-4 text-xl font-semibold">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all?gender=Men"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Top Wear
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
