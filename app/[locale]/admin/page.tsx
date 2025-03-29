"use client";

import $api from "@/app/http";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useEffect, useState, FormEvent } from "react";
import {
  User,
  Products,
  Review,
  Role,
  TypeProduct,
  Status,
} from "@prisma/client";

export default function AdminDashboard() {
  // State for different sections
  const [activeTab, setActiveTab] = useState<"users" | "products" | "reviews">(
    "users"
  );

  // Users management
  const [users, setUsers] = useState<User[]>([]);

  // Products management
  const [products, setProducts] = useState<Products[]>([]);
  const [newProduct, setNewProduct] = useState({
    type: TypeProduct.SERVICE,
    name: "",
    image: "",
    description: "",
  });

  // Reviews management
  const [reviews, setReviews] = useState<Review[]>([]);

  // Loading states
  const [loading, setLoading] = useState({
    users: true,
    products: true,
    reviews: true,
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersResponse = await $api.get("/users");
        setUsers(usersResponse.data);
        setLoading((prev) => ({ ...prev, users: false }));

        // Fetch products
        const productsResponse = await $api.get("/products");
        setProducts(productsResponse.data);
        setLoading((prev) => ({ ...prev, products: false }));

        // Fetch reviews
        const reviewsResponse = await $api.get("/reviews");
        setReviews(reviewsResponse.data);
        setLoading((prev) => ({ ...prev, reviews: false }));
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading({ users: false, products: false, reviews: false });
      }
    };
    fetchData();
  }, []);

  // User management handlers
  const handleUpdateUser = async (userId: string, updates: Partial<User>) => {
    try {
      const response = await $api.patch(`/users/${userId}`, updates);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, ...updates } : user
        )
      );
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await $api.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  // Product management handlers
  const handleCreateProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await $api.post("/products", newProduct);
      setProducts([...products, response.data]);
      // Reset form
      setNewProduct({
        name: "",
        type: TypeProduct.SERVICE,
        image: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  // Review management handlers
  const handleDeleteReview = async (reviewId: string) => {
    try {
      await $api.delete(`/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex mb-6 border-b">
          {["users", "products", "reviews"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : ""
              }`}
              onClick={() =>
                setActiveTab(tab as "users" | "products" | "reviews")
              }
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl mb-4">Users Management</h2>
            {loading.users ? (
              <p>Loading users...</p>
            ) : (
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Role</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="border p-2">{user.email}</td>
                      <td className="border p-2">{user.name || "N/A"}</td>
                      <td className="border p-2">
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleUpdateUser(user.id, {
                              role: e.target.value as Role,
                            })
                          }
                        >
                          {Object.values(Role).map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="border p-2">
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <h2 className="text-2xl mb-4">Products Management</h2>
            <form onSubmit={handleCreateProduct} className="mb-6 border p-4">
              <h3 className="text-xl mb-4">Create New Product</h3>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full border p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Type</label>
                <select
                  value={newProduct.type}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, type: e.target.value as TypeProduct }))}
                  className="w-full border p-2"
                >
                  {Object.values(TypeProduct).map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Image URL</label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, image: e.target.value }))}
                  className="w-full border p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full border p-2"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Product</button>
            </form>

            {loading.products ? (
              <p>Loading products...</p>
            ) : (
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Type</th>
                    <th className="border p-2">Description</th>
                    <th className="border p-2">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="border p-2">{product.name}</td>
                      <td className="border p-2">{product.type}</td>
                      <td className="border p-2">{product.description}</td>
                      <td className="border p-2">
                        {product.image ? <img src={product.image} alt="Product" className="w-16 h-16 object-cover" /> : "No Image"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div>
            <h2 className="text-2xl mb-4">Reviews Management</h2>
            {loading.reviews ? (
              <p>Loading reviews...</p>
            ) : (
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">User</th>
                    <th className="border p-2">Product</th>
                    <th className="border p-2">Description</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review.id}>
                      <td className="border p-2">
                        {users.find((u) => u.id === review.userId)?.email ||
                          "Unknown"}
                      </td>
                      <td className="border p-2">
                        {products.find((p) => p.id === review.productId)
                          ?.name || "Unknown"}
                      </td>
                      <td className="border p-2">{review.description}</td>
                      <td className="border p-2">
                        <select value={review.status} className="w-full">
                          {Object.values(Status).map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="border p-2">
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
