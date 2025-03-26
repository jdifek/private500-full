"use client";

import $api from "@/app/http";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
interface User {
  id: string;
  name: string | null;
  secondName: string | null;
  sex: string;
  phoneNumber: string | null;
  email: string;
  avatar: string | null;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await $api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <ProtectedRoute requireAdmin>
      <div>
        <h1>Users (Admin Only)</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.email} - {user.name || "No name"} ({user.role})
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProtectedRoute>
  );
}
