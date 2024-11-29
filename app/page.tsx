"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import "../styles/globals.css";
import Challenge from "./components/Challenge";
import Navbar from "./components/Navbar";

const Home = () => {
  const { user } = useAuth();
  const { push } = useRouter();

  return (
    <div style={{ textAlign: "center", marginTop: "70px" }}>
      {user && (
        <p>
          You are logged in as <strong>{user.username}</strong>
        </p>
      )}
      <Challenge />
    </div>
  );
};

export default Home;
