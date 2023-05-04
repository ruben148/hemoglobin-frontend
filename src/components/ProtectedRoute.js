import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRoute({ element: Component, allowedRoles, ...rest }) {
  const token = Cookies.get('token');

  return (
    <Route
      {...rest}
      element={
        allowedRoles.includes(token.userType) ? (
          Component
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
