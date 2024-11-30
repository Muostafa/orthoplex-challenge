"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFavorites([]);
    if (token) {
      fetchFavorites();
    }
  }, [token]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/favoritePhotos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }

      const data = await response.json();
      setFavorites(data.favoritePhotos);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (photoId) => {
    try {
      const response = await fetch("/api/user/addFavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ photoId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add favorite");
      }

      const result = await response.json();
      setFavorites((prev) => [...prev, Number(photoId)]);
      console.log(favorites);
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };

  const removeFavorite = async (photoId) => {
    try {
      const response = await fetch("/api/user/removeFavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ photoId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove favorite");
      }

      // Update the local favorites list after successful removal
      setFavorites((prev) =>
        prev.filter((id) => Number(id) !== Number(photoId))
      );
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        fetchFavorites,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
