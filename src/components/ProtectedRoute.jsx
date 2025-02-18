import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function ProtectedRoute({ children, setIsAuth, requiredRole }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/protected");
        setIsAuth(true);

        // Запрос на получение роли
        const roleResponse = await api.get("/check-role");
        setUserRole(roleResponse.data.role);

        if (requiredRole && roleResponse.data.role !== requiredRole) {
          throw new Error("Недостаточно прав");
        }

        setAuthorized(true);
      } catch (error) {
        setAuthorized(false);
        setIsAuth(false);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, setIsAuth, requiredRole]);

  if (loading) {
    return <div>Проверка авторизации...</div>;
  }

  if (!authorized) {
    return <div>Нет доступа</div>;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
