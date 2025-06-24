import Topbar from "components/Layout/Topbar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <Topbar />
      <Navbar />
      {/* Cart Drawer */}
    </header>
  );
};

export default Header;
