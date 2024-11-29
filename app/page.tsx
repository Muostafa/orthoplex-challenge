"use client";
import "../styles/globals.css";
import { useAuth } from "../context/AuthContext";
import Challenge from "./components/Challenge";

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "70px" }}>
      {user && (
        <p style={{ wordBreak: "break-word" }}>
          You are logged in as <strong>{user.username}</strong>
        </p>
      )}
      <Challenge />
    </div>
  );
};

export default Home;
