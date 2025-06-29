import CartContent from "components/Cart/CartContent";
import { Button } from "components/components/ui/button";
import { Card, CardContent } from "components/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "components/components/ui/sheet";
import {
  HiOutlineShieldCheck,
  HiOutlineShoppingBag,
  HiOutlineTruck,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector(state => state.auth);
  const { cart } = useSelector(state => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  const calculateSubtotal = () => {
    if (!cart?.products) return 0;
    return cart.products.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();

  return (
    <Sheet open={drawerOpen} onOpenChange={toggleCartDrawer}>
      <SheetContent side="right" className="z-[100] w-full sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center gap-2">
            <HiOutlineShoppingBag className="h-6 w-6 text-blue-600" />
            <SheetTitle className="text-xl">Shopping Cart</SheetTitle>
          </div>
          {cart?.products?.length > 0 && (
            <p className="text-sm text-gray-600">
              {cart.products.length} item{cart.products.length !== 1 ? "s" : ""}{" "}
              in your cart
            </p>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {cart && cart?.products?.length > 0 ? (
            <div className="py-4">
              <CartContent cart={cart} userId={userId} guestId={guestId} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-4">
                <HiOutlineShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Your cart is empty
              </h3>
              <p className="mb-6 text-sm text-gray-500">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button
                onClick={toggleCartDrawer}
                variant="outline"
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        {cart && cart?.products?.length > 0 && (
          <SheetFooter className="border-t pt-4">
            <div className="w-full space-y-4">
              {/* Order Summary */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Subtotal
                      </span>
                      <span className="text-sm font-semibold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Shipping
                      </span>
                      <span className="text-sm text-green-600">Free</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold">Total</span>
                        <span className="text-lg font-bold text-gray-900">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <HiOutlineTruck className="h-4 w-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-1">
                  <HiOutlineShieldCheck className="h-4 w-4" />
                  <span>Secure Checkout</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                className="w-full bg-blue-600 py-3 text-base font-semibold hover:bg-blue-700"
                size="lg"
              >
                Proceed to Checkout
              </Button>

              {/* Additional Info */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Shipping, taxes, and discount codes calculated at checkout.
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Need help?{" "}
                  <span className="cursor-pointer text-blue-600 hover:underline">
                    Contact us
                  </span>
                </p>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
