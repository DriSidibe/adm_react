import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { Navbar, PagesUrls } from "./components/navbar";
import LoadingSpinner from "./components/ui/spinner";
import { useAuth, AuthProvider } from "./components/context/AuthContext";
import NotFoundPage from "./components/notFound";
import Login from "./components/login";
import { NavbarProvider, useNavbar } from "./components/context/navBarContext";

function App() {
  return (
    <AuthProvider>
      <NavbarProvider>
        <Router>
          <AppContent />
        </Router>
      </NavbarProvider>
    </AuthProvider>
  );
}

const AppContent = () => {
  const { user } = useAuth();
  const { setCanShowNavbar } = useNavbar();

  useEffect(() => {
    if (user) {
      setCanShowNavbar(true);
    } else {
      setCanShowNavbar(false);
    }
  }, [user, setCanShowNavbar]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <NavbarVisibility />
      <main className="flex-grow p-4 md:p-8">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {PagesUrls.map((page) => (
              <Route
                key={page.path}
                path={page.path}
                element={
                  page.name !== "login" ? (
                    <ProtectedRoute>
                      <page.component />
                    </ProtectedRoute>
                  ) : (
                    <page.component />
                  )
                }
              />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

const NavbarVisibility = () => {
  const { canShowNavbar } = useNavbar();
  return canShowNavbar ? <Navbar /> : null;
};

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Login />;
};

export default App;
