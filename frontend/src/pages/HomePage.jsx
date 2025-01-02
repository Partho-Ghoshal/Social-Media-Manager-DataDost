import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function HomePage() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <button onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <button onClick={loginWithRedirect}>Login</button>
      )}
    </div>
  );
}

export default HomePage;
