import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  
  if (!accessToken) {
    // Якщо токена немає, перенаправляємо на сторінку логіна
    return <Navigate to="/login" replace />;
  }

  // Якщо користувач авторизований, відображаємо дочірні елементи
  return children;
};

export default ProtectedRoute;