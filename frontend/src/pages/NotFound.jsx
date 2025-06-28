import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <HiOutlineExclamationCircle className="text-rabbit-red mb-4 animate-bounce text-7xl" />
      <h1 className="mb-2 text-6xl font-extrabold text-gray-800">404</h1>
      <h2 className="mb-4 text-2xl font-semibold text-gray-700">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md text-gray-500">
        Sorry, the page you are looking for does not exist or has been moved.
        Let's get you back to shopping!
      </p>
      <Link
        to="/"
        className="bg-rabbit-red inline-block rounded-full px-6 py-3 font-semibold text-white shadow transition hover:bg-red-600"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
