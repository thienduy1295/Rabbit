import { addToCart } from "@redux/slices/cartSlice";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "@redux/slices/productsSlide";
import ErrorAlert from "components/Common/ErrorAlert";
import Loader from "components/Common/Loader";
import { Button } from "components/components/ui/button";
import { Input } from "components/components/ui/input";
import { Label } from "components/components/ui/label";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    state => state.products,
  );

  const { user, guestId } = useSelector(state => state.auth);
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [productFetchId, dispatch]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = action => {
    if (action === "plus") setQuantity(prev => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before adding to cart.", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: selectedProduct._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      }),
    )
      .then(() => {
        toast.success("Product added to cart!", { duration: 1000 });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="mx-auto max-w-6xl rounded-xl bg-white p-0 md:p-8">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            {/* Left thumbnail */}
            <div className="hidden flex-col space-y-4 md:flex">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`size-20 cursor-pointer rounded-lg border object-cover ${mainImage === image.url ? "border-primary" : "border-gray-300"}`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="flex items-center justify-center md:w-1/2">
              <div className="w-full">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="h-[400px] w-full rounded-xl object-cover shadow-md"
                />
              </div>
            </div>
            {/* Mobile Thumbnails */}
            <div className="overscroll-x-scroll mb-4 flex space-x-4 md:hidden">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`size-20 cursor-pointer rounded-lg border object-cover ${mainImage === image.url ? "border-primary" : "border-gray-300"}`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Right Side */}
            <div className="flex flex-col justify-center md:ml-10 md:w-1/2">
              <h1 className="text-primary mb-2 text-3xl font-bold">
                {selectedProduct.name}
              </h1>
              <p className="mb-1 text-lg text-gray-400 line-through">
                {selectedProduct.originalPrice &&
                  `$${selectedProduct.originalPrice}`}
              </p>
              <p className="text-primary mb-2 text-2xl font-semibold">
                ${selectedProduct.price}
              </p>
              <p className="mb-4 text-gray-600">
                {selectedProduct.description}
              </p>

              <div className="mb-4">
                <Label className="text-base">Color:</Label>
                <div className="mt-2 flex gap-2">
                  {selectedProduct.colors.map(color => (
                    <Button
                      key={color}
                      type="button"
                      variant={selectedColor === color ? "default" : "outline"}
                      className={`size-8 rounded-full border-2 p-0 transition-colors`}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        borderColor:
                          selectedColor === color
                            ? "var(--primary)"
                            : undefined,
                      }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <Label className="text-base">Size:</Label>
                <div className="mt-2 flex gap-2">
                  {selectedProduct.sizes.map(size => (
                    <Button
                      key={size}
                      type="button"
                      variant={selectedSize === size ? "default" : "outline"}
                      className="rounded px-4 py-2"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <Label className="text-base">Quantity:</Label>
                <div className="mt-2 flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange("minus")}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    min={1}
                    value={quantity}
                    readOnly
                    className="w-16 text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange("plus")}
                    aria-label="Increase quantity"
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                disabled={isButtonDisabled}
                onClick={handleAddToCart}
                className="mb-4 w-full text-lg font-semibold"
                size="lg"
              >
                {isButtonDisabled ? "Adding..." : "ADD TO CART"}
              </Button>

              <div className="mt-10 text-gray-700">
                <h3 className="mb-4 text-xl font-bold">Characteristics:</h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="mb-4 text-center text-2xl font-medium">
              You May Also Like
            </h2>
            <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
