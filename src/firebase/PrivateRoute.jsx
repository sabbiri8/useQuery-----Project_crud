import React, { useContext } from "react";
import { AuthContext } from "./providers/AuthProvider";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
