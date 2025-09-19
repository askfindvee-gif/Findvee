import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from '@/react-app/hooks/useAuth';
import { LocationProvider } from '@/react-app/hooks/useLocation';
import HomePage from "@/react-app/pages/Home";
import LoginPage from "@/react-app/pages/Login";
import SignUpPage from "@/react-app/pages/SignUp";
import VendorAddPage from "@/react-app/pages/VendorAdd";
import AuthCallbackPage from "@/react-app/pages/AuthCallback";
import BusinessDetailPage from "@/react-app/pages/BusinessDetail";
import SavedPage from "@/react-app/pages/Saved";
import LeadPage from "@/react-app/pages/Lead";
import AdminPage from "@/react-app/pages/Admin";
import HelpPage from "@/react-app/pages/Help";
import AboutPage from "@/react-app/pages/About";
import ContactPage from "@/react-app/pages/Contact";
import CareersPage from "@/react-app/pages/Careers";

export default function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/vendor/add" element={<VendorAddPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/business/:id" element={<BusinessDetailPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/lead" element={<LeadPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
        </Router>
      </LocationProvider>
    </AuthProvider>
  );
}
