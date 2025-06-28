import {
  HiArrowPathRoundedSquare,
  HiOutlineCreditCard,
  HiShoppingBag,
} from "react-icons/hi2";

const features = [
  {
    icon: <HiShoppingBag className="text-4xl text-green-600" />,
    title: "FREE INTERNATIONAL SHIPPING",
    desc: "On all orders over $100.00",
  },
  {
    icon: <HiArrowPathRoundedSquare className="text-4xl text-blue-600" />,
    title: "45 DAYS RETURN",
    desc: "Money back guarantee",
  },
  {
    icon: <HiOutlineCreditCard className="text-4xl text-yellow-600" />,
    title: "SECURE CHECKOUT",
    desc: "100% secure checkout process",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white px-4 py-20">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 shadow-inner">
              {feature.icon}
            </div>
            <h4 className="mb-2 text-lg font-bold tracking-tight text-gray-800">
              {feature.title}
            </h4>
            <p className="text-base text-gray-500">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
