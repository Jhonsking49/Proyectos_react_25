import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "./router";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Toaster position="top-right" duration={2000} />
        <RouterProvider router={router} />
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;