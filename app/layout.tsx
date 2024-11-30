import { AuthProvider } from "../context/AuthContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import Navbar from "./components/Navbar";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <AuthProvider>
          <FavoritesProvider>
            <Navbar />
            {children}
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
