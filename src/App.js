import { Routes, Route, Navigate } from "react-router-dom";
import DonationCentersPage from "./pages/DonationCentersPage";
import LoginPage from "./pages/login/LoginPage";
import DonorEditPage from "./pages/donor/donor_edit/DonorEditPage";
import DoctorEditPage from "./pages/doctor/doctor_edit/DoctorEditPage";
import RegistrationPage from "./pages/login/RegistrationPage";
import DoctorAppointmentsPage from "./pages/doctor/DoctorAppointmentsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Donor from "./pages/donor/Donor";
import Doctor from "./pages/doctor/Doctor";
import Cookies from "js-cookie";
import LogoutPage from "./pages/login/LogoutPage";
import { useEffect, useState } from "react";
import Admin from "./pages/admin/Admin";
import DonorNavigation from "./components/layout/DonorNavigation";
import DoctorNavigation from "./components/layout/DoctorNavigation";
import AdminNavigation from "./components/layout/AdminNavigation";
import DoctorListPage from "./pages/admin/DoctorsListPage";

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    try {
      const token = JSON.parse(Cookies.get("token"));
      setToken(token);
    } catch (error) {
      console.log("Not logged in!");
    }
  }, []);

  return (
    <div>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/register" element={<RegistrationPage />} exact />
          <Route
            exact
            path="/donor/:id"
            element={
              ["DONOR", "ADMIN"].includes(token?.userType) ? (
                <DonorEditPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/doctor/:id"
            element={
              ["DOCTOR", "ADMIN"].includes(token?.userType) ? (
                <DoctorEditPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/donor/home"
            element={
              ["DONOR"].includes(token?.userType) ? (
                <Donor />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/doctor/home"
            element={
              ["DOCTOR"].includes(token?.userType) ? (
                <Doctor />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/admin/home"
            element={
              ["ADMIN"].includes(token?.userType) ? (
                <Admin />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/doctors/all"
            element={
              ["ADMIN"].includes(token?.userType) ? (
                <DoctorListPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/appointments"
            element={
              ["DOCTOR"].includes(token?.userType) ? (
                <DoctorAppointmentsPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/donation-centers"
            element={
              ["DONOR"].includes(token?.userType) ? (
                <DonationCentersPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/logout"
            element={
              ["DONOR", "ADMIN", "DOCTOR"].includes(token?.userType) ? (
                <LogoutPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
