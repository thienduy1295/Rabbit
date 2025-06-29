import { registerUser } from "@redux/slices/authSlice";
import { mergeCart } from "@redux/slices/cartSlice";
import Loader from "components/Common/Loader";
import { Button } from "components/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/components/ui/card";
import { Input } from "components/components/ui/input";
import { Label } from "components/components/ui/label";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import register from "../assets/register.webp";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector(state => state.auth);
  const { cart } = useSelector(state => state.cart);

  // Get redirect parameter and check if it's checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [cart, dispatch, guestId, isCheckoutRedirect, navigate, user]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="dark:bg-card flex w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-lg">
        {/* Left: Register Form */}
        <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
          <Card className="mx-auto w-full max-w-md border-none bg-transparent shadow-none">
            <CardHeader className="mb-2">
              <CardTitle className="text-primary text-center text-3xl font-bold">
                Create your account
              </CardTitle>
              <CardDescription className="mt-2 text-center text-base">
                Join us and start your journey with Buytopia!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-2 w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? <Loader /> : "Sign Up"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="mt-2 flex flex-col items-center gap-2">
              <p className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <Link
                  to={`/login?redirect=${encodeURIComponent(redirect)}`}
                  className="text-primary hover:text-primary/80 underline"
                >
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
        {/* Right: Image */}
        <div className="bg-muted hidden items-center justify-center md:flex md:w-1/2">
          <img
            src={register}
            alt="Register to Account"
            className="h-full w-full rounded-r-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
