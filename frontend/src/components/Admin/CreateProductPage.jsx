import { createProduct } from "@redux/slices/adminProductSlice";
import axios from "axios";
import { useState } from "react";
import {
  HiOutlineCloudUpload,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector(state => state.adminProducts);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "Top Wear",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "Men",
    images: [],
  });
  const [localImages, setLocalImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setLocalImages(prev => [...prev, URL.createObjectURL(file)]);
      setNewImages(prev => [...prev, file]);
    }
  };

  const handleDeleteLocalImage = index => {
    setLocalImages(prev => prev.filter((_, i) => i !== index));
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setUploading(true);

    try {
      let uploadedImages = [];
      for (const file of newImages) {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        uploadedImages.push({
          url: data.url,
          public_id: data.public_id,
          altText: "",
        });
      }

      const newProductData = {
        ...productData,
        images: [...productData.images, ...uploadedImages],
      };

      const result = await dispatch(createProduct(newProductData));

      if (createProduct.fulfilled.match(result)) {
        toast.success("Product created successfully!", {
          duration: 3000,
        });
        navigate("/admin/products");
      } else if (createProduct.rejected.match(result)) {
        toast.error("Failed to create product. Please try again.", {
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error(
        `An error occurred while uploading images or creating product. ${error.message}`,
        {
          duration: 4000,
        },
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Product
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Fill in the details below to add a new product to your catalog.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={productData.description}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            {/* Collections, Brand, Material */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Collections
                </label>
                <input
                  type="text"
                  name="collections"
                  value={productData.collections}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Material
                </label>
                <input
                  type="text"
                  name="material"
                  value={productData.material}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>
            </div>

            {/* Price, Count in Stock, SKU */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Count in Stock
                </label>
                <input
                  type="number"
                  name="countInStock"
                  value={productData.countInStock}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={productData.sku}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
            </div>

            {/* Sizes, Colors */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Sizes (comma separated)
                </label>
                <input
                  type="text"
                  name="sizes"
                  value={productData.sizes.join(", ")}
                  onChange={e =>
                    setProductData({
                      ...productData,
                      sizes: e.target.value.split(",").map(size => size.trim()),
                    })
                  }
                  className="w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Colors (comma separated)
                </label>
                <input
                  type="text"
                  name="colors"
                  value={productData.colors.join(", ")}
                  onChange={e =>
                    setProductData({
                      ...productData,
                      colors: e.target.value
                        .split(",")
                        .map(color => color.trim()),
                    })
                  }
                  className="w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
            </div>

            {/* Gender, Category */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={productData.gender}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  required
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                  required
                >
                  <option value="Top Wear">Top Wear</option>
                  <option value="Bottom Wear">Bottom Wear</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Upload Images
              </label>
              <div className="flex flex-wrap gap-4">
                <label
                  htmlFor="product-image-upload"
                  className="flex h-32 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-400 bg-blue-50 transition hover:bg-blue-100"
                >
                  <HiOutlineCloudUpload className="mb-2 text-3xl text-blue-500" />
                  <span className="font-medium text-blue-700">
                    Choose Image
                  </span>
                  <input
                    id="product-image-upload"
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
                {/* Local previews for new images */}
                {localImages.map((src, index) => (
                  <div key={"local-" + index} className="group relative">
                    <img
                      src={src}
                      alt="Preview"
                      className="size-20 rounded-md border-2 border-dashed border-blue-400 object-cover shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteLocalImage(index)}
                      className="absolute top-1 right-1 rounded-full bg-white/80 p-1 text-red-500 opacity-0 transition group-hover:opacity-100"
                      title="Delete"
                    >
                      <HiOutlineTrash size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
              disabled={uploading || loading}
            >
              {uploading || loading ? (
                <ClipLoader size={22} color="#fff" />
              ) : (
                <>
                  <HiOutlinePlus className="mr-2 h-5 w-5" />
                  Add Product
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
