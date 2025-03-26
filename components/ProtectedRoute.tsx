"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated, isAdmin } from "../lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const router = useRouter();
  const pathname = usePathname(); // Получаем текущий путь
  const locale = pathname.split("/")[1] || "ru"; // Извлекаем локаль (по умолчанию "ru")

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push(`/${locale}/auth/login`);
    } else if (requireAdmin && !isAdmin()) {
      router.push(`/${locale}/`); // Перенаправляем на главную с учётом локализации
    }
  }, [router, requireAdmin, locale]);

  if (!isAuthenticated() || (requireAdmin && !isAdmin())) return null;

  return <>{children}</>;
};
