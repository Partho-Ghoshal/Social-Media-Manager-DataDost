import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";
import SIdebar from "../components/Sidebar";
import PostTable from "../components/PostTable";
import Dashboard from "./Dashboard";
function HomePage() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="App w-full">
      {isAuthenticated ? (
        // <div>
        //   <h1>Welcome, {user.name}!</h1>
        //   <button onClick={logout}>
        //     Logout
        //   </button>
        // </div>
        <Dashboard/>
      ) : (
        <button onClick={loginWithRedirect}>Login</button>
      )}
    </div>
  );
}

export default HomePage;
