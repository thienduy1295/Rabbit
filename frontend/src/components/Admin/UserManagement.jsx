import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "@redux/slices/adminSlice";
import ErrorAlert from "components/Common/ErrorAlert";
import Loader from "components/Common/Loader";
import { Button } from "components/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "components/components/ui/card";
import { Input } from "components/components/ui/input";
import { Label } from "components/components/ui/label";
import { useEffect, useState } from "react";
import {
  HiOutlinePlus,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
  HiOutlineTrash,
  HiOutlineUser,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(state => state.auth);
  const { users, error } = useSelector(state => state.admin);

  // Local state to track which user is being deleted
  const [deletingUsers, setDeletingUsers] = useState(new Set());
  // Local state to track initial page loading
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const loadUsers = async () => {
      if (user && user.role === "admin") {
        setIsInitialLoading(true);
        await dispatch(fetchUsers());
        setIsInitialLoading(false);
      }
    };
    loadUsers();
  }, [dispatch, user]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await dispatch(addUser(formData));
      if (addUser.fulfilled.match(result)) {
        toast.success("User added successfully!", {
          duration: 3000,
        });
        // Reset the form after submission
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "customer",
        });
      } else if (addUser.rejected.match(result)) {
        toast.error("Failed to add user. Please try again.", {
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error(`An error occurred while adding the user: ${error.message}`, {
        duration: 4000,
      });
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const result = await dispatch(updateUser({ id: userId, role: newRole }));
      if (updateUser.fulfilled.match(result)) {
        toast.success("User role updated successfully!", {
          duration: 3000,
        });
      } else if (updateUser.rejected.match(result)) {
        toast.error("Failed to update user role. Please try again.", {
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error(
        `An error occurred while updating the user role: ${error.message}`,
        {
          duration: 4000,
        },
      );
    }
  };

  const handleDeleteUser = async userId => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Add the user ID to the deleting set
      setDeletingUsers(prev => new Set(prev).add(userId));

      try {
        const result = await dispatch(deleteUser(userId));
        if (deleteUser.fulfilled.match(result)) {
          toast.success("User deleted successfully!", {
            duration: 3000,
          });
        } else if (deleteUser.rejected.match(result)) {
          toast.error("Failed to delete user. Please try again.", {
            duration: 4000,
          });
        }
      } catch (error) {
        toast.error(
          `An error occurred while deleting the user: ${error.message}`,
          {
            duration: 4000,
          },
        );
      } finally {
        // Remove the user ID from the deleting set
        setDeletingUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(userId);
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
                User Management
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage user accounts, roles, and permissions
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                    <HiOutlineUserGroup className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.length}
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
                    <HiOutlineShieldCheck className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Admins</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.role === "admin").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                    <HiOutlineUser className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Customers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.role === "customer").length}
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
                    <HiOutlineShieldExclamation className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Active Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New User Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                <HiOutlinePlus className="h-4 w-4" />
                Add User
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Role
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.length > 0 ? (
                    users.map(userItem => (
                      <tr
                        key={userItem._id}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                <HiOutlineUser className="h-5 w-5 text-gray-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {userItem.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {userItem._id.slice(-8)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {userItem.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={userItem.role}
                            onChange={e =>
                              handleRoleChange(userItem._id, e.target.value)
                            }
                            className="inline-flex items-center rounded-full border-0 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteUser(userItem._id)}
                            disabled={deletingUsers.has(userItem._id)}
                            className="inline-flex items-center"
                          >
                            {deletingUsers.has(userItem._id) ? (
                              <ClipLoader size={12} color="#ffffff" />
                            ) : (
                              <>
                                <HiOutlineTrash className="h-4 w-4" />
                                Delete
                              </>
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          <div className="mx-auto mb-4 h-12 w-12 text-gray-400">
                            <HiOutlineUserGroup className="h-12 w-12" />
                          </div>
                          <h3 className="mb-2 text-sm font-medium text-gray-900">
                            No users found
                          </h3>
                          <p className="mb-4 text-sm text-gray-500">
                            Get started by adding your first user.
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

export default UserManagement;
