export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const isAuthenticated = () => !!localStorage.getItem("accessToken");

export const getRole = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  try {
    const decoded = JSON.parse(atob(token.split(".")[1])); // Декодируем JWT вручную
    return decoded.role;
  } catch (error) {
    return null;
  }
};

export const isAdmin = () => getRole() === "ADMIN";