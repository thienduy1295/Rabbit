import {
  deleteProduct,
  fetchAdminProducts,
} from "@redux/slices/adminProductSlice";
import ErrorAlert from "components/Common/ErrorAlert";
import Loader from "components/Common/Loader";
import { useEffect, useState } from "react";
import {
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector(state => state.adminProducts);

  // Local state to track which product is being deleted
  const [deletingProducts, setDeletingProducts] = useState(new Set());
  // Local state to track initial page loading
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsInitialLoading(true);
      await dispatch(fetchAdminProducts());
      setIsInitialLoading(false);
    };
    loadProducts();
  }, [dispatch]);

  const handleDelete = async id => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // Add the product ID to the deleting set
      setDeletingProducts(prev => new Set(prev).add(id));

      try {
        const result = await dispatch(deleteProduct(id));

        if (deleteProduct.fulfilled.match(result)) {
          toast.success("Product deleted successfully!", {
            duration: 3000,
          });
        } else if (deleteProduct.rejected.match(result)) {
          toast.error("Failed to delete product. Please try again.", {
            duration: 4000,
          });
        }
      } catch (error) {
        toast.error(
          `An error occurred while deleting the product: ${error.message}`,
          {
            duration: 4000,
          },
        );
      } finally {
        // Remove the product ID from the deleting set
        setDeletingProducts(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    }
  };

  // Only show loader for initial page load, not for delete operations
  if (isInitialLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Product Management
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage your product catalog, inventory, and pricing
              </p>
            </div>
            <Link
              to="/admin/products/add"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <HiOutlinePlus className="h-5 w-5" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                  <HiOutlineEye className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                  <div className="h-3 w-3 rounded-full bg-green-600"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">In Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.countInStock > 0).length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                  <div className="h-3 w-3 rounded-full bg-yellow-600"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    products.filter(
                      p => p.countInStock <= 5 && p.countInStock > 0,
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                  <div className="h-3 w-3 rounded-full bg-red-600"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Out of Stock
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.countInStock === 0).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Product List
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Stock
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
                {products.length > 0 ? (
                  products.map(product => (
                    <tr
                      key={product._id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0">
                            <img
                              src={product.images[0]?.url}
                              alt={product.name}
                              className="h-12 w-12 rounded-lg border border-gray-200 object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              SKU: {product.sku}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${product.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.countInStock}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.countInStock > 0 ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/admin/products/${product._id}/edit`}
                            className="inline-flex items-center rounded-md border border-transparent bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-200"
                          >
                            <HiOutlinePencil className="mr-1 h-4 w-4" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            disabled={deletingProducts.has(product._id)}
                            className={`inline-flex items-center rounded-md border border-transparent px-3 py-1.5 text-xs font-medium transition-colors ${
                              deletingProducts.has(product._id)
                                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                            }`}
                          >
                            {deletingProducts.has(product._id) ? (
                              <ClipLoader size={12} color="#9CA3AF" />
                            ) : (
                              <>
                                <HiOutlineTrash className="mr-1 h-4 w-4" />
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <div className="mx-auto mb-4 h-12 w-12 text-gray-400">
                          <HiOutlineEye className="h-12 w-12" />
                        </div>
                        <h3 className="mb-2 text-sm font-medium text-gray-900">
                          No products found
                        </h3>
                        <p className="mb-4 text-sm text-gray-500">
                          Get started by creating your first product.
                        </p>
                        <Link
                          to="/admin/products/add"
                          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                          <HiOutlinePlus className="mr-2 h-4 w-4" />
                          Add Product
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
