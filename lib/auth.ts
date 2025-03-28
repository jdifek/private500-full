export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    // Check if we're in the browser
    console.log(!!localStorage.getItem("accessToken"));
    
    return !!localStorage.getItem("accessToken");
  }
  return false; // or handle as needed if not in the browser
};

export const getRole = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  try {
    const decoded = JSON.parse(atob(token.split(".")[1])); // Декодируем JWT вручную
    console.log(decoded.role);
    
    return decoded.role;
  } catch (error) {
    return null;
  }
};

export const isAdmin = () => getRole() === "ADMIN";
