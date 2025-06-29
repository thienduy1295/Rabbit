import {
  fetchAllOrders,
  updateOrderStatus,
} from "@redux/slices/adminOrderSlice";
import ErrorAlert from "components/Common/ErrorAlert";
import Loader from "components/Common/Loader";
import { Button } from "components/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "components/components/ui/card";
import { useEffect, useState } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineXCircle,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(state => state.auth);
  const { orders, error } = useSelector(state => state.adminOrders);

  // Local state to track which order is being updated
  const [updatingOrders, setUpdatingOrders] = useState(new Set());
  // Local state to track initial page loading
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      const loadOrders = async () => {
        setIsInitialLoading(true);
        await dispatch(fetchAllOrders());
        setIsInitialLoading(false);
      };
      loadOrders();
    }
  }, [dispatch, user, navigate]);

  const handleStatusChange = async (orderId, status) => {
    // Add the order ID to the updating set
    setUpdatingOrders(prev => new Set(prev).add(orderId));

    try {
      const result = await dispatch(updateOrderStatus({ id: orderId, status }));
      if (updateOrderStatus.fulfilled.match(result)) {
        toast.success(`Order status updated to ${status} successfully!`, {
          duration: 3000,
        });
      } else if (updateOrderStatus.rejected.match(result)) {
        toast.error("Failed to update order status. Please try again.", {
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error(
        `An error occurred while updating the order: ${error.message}`,
        {
          duration: 4000,
        },
      );
    } finally {
      // Remove the order ID from the updating set
      setUpdatingOrders(prev => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  // Only show loader for initial page load, not for update operations
  if (isInitialLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorAlert message={error} />;
  }

  // Calculate stats
  const totalOrders = orders.length;
  const processingOrders = orders.filter(
    order => order.status === "Processing",
  ).length;
  const shippedOrders = orders.filter(
    order => order.status === "Shipped",
  ).length;
  const deliveredOrders = orders.filter(
    order => order.status === "Delivered",
  ).length;
  const cancelledOrders = orders.filter(
    order => order.status === "Cancelled",
  ).length;
  const totalRevenue = orders
    .filter(order => order.status === "Delivered")
    .reduce((sum, order) => sum + order.totalPrice, 0);

  const getStatusColor = status => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order Management
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Track and manage customer orders, shipping status, and delivery
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                    <HiOutlineShoppingBag className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalOrders}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                    <HiOutlineClock className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Processing
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {processingOrders}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                    <HiOutlineTruck className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Shipped</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {shippedOrders}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                    <HiOutlineCheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Delivered</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {deliveredOrders}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                    <HiOutlineXCircle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Cancelled</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {cancelledOrders}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                    <HiOutlineCurrencyDollar className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Order List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Total Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders.length > 0 ? (
                    orders.map(order => (
                      <tr
                        key={order._id}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            #{order._id.slice(-8)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.user?.name || "Unknown"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.user?.email || "Unknown"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${order.totalPrice.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.orderItems.length} items
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <select
                              value={order.status}
                              onChange={e =>
                                handleStatusChange(order._id, e.target.value)
                              }
                              disabled={updatingOrders.has(order._id)}
                              className={`inline-flex items-center rounded-full border-0 px-2.5 py-0.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 ${getStatusColor(order.status)}`}
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            {updatingOrders.has(order._id) && (
                              <ClipLoader size={12} color="#6B7280" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleStatusChange(order._id, "Shipped")
                              }
                              disabled={
                                updatingOrders.has(order._id) ||
                                order.status === "Shipped"
                              }
                              className="inline-flex items-center"
                            >
                              <HiOutlineTruck className="h-4 w-4" />
                              Ship
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() =>
                                handleStatusChange(order._id, "Delivered")
                              }
                              disabled={
                                updatingOrders.has(order._id) ||
                                order.status === "Delivered"
                              }
                              className="inline-flex items-center"
                            >
                              <HiOutlineCheckCircle className="h-4 w-4" />
                              Deliver
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          <div className="mx-auto mb-4 h-12 w-12 text-gray-400">
                            <HiOutlineShoppingBag className="h-12 w-12" />
                          </div>
                          <h3 className="mb-2 text-sm font-medium text-gray-900">
                            No orders found
                          </h3>
                          <p className="mb-4 text-sm text-gray-500">
                            Orders will appear here once customers place them.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderManagement;
