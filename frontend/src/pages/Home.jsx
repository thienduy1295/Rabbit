import { fetchProductsByFilters } from "@redux/slices/productsSlide";
import axios from "axios";
import Loader from "components/Common/Loader";
import Hero from "components/Layout/Hero";
import FeaturedCollection from "components/Products/FeaturedCollection";
import FeaturesSection from "components/Products/FeaturesSection";
import GenderCollectionSection from "components/Products/GenderCollectionSection";
import NewArrivals from "components/Products/NewArrivals";
import ProductDetails from "components/Products/ProductDetails";
import ProductGrid from "components/Products/ProductGrid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState([]);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      }),
    );

    // Fetch best seller products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`,
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Sellers */}
      <h2 className="mb-4 text-center text-3xl font-bold">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <Loader />
      )}

      <div className="container mx-auto">
        <h2 className="mb-4 text-center text-3xl font-bold">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
