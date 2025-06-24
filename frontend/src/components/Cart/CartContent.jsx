import {
  removeCartItem,
  updateCartItemQuantity,
} from "@redux/slices/cartSlice";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  // Handle adding or subtracting to cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    console.log("productId: ", productId);
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        }),
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeCartItem({ productId, guestId, userId, size, color }));
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between border-b py-4"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="mr-4 h-24 w-20 rounded object-cover"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>
              <div className="mt-2 flex items-center">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color,
                    )
                  }
                  className="rounded border px-2 py-1 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color,
                    )
                  }
                  className="rounded border px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>$ {product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color,
                )
              }
            >
              <RiDeleteBin3Line className="mt-2 h-6 w-6 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
