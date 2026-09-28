import { useState } from "react";
import { useAuth } from "../customHooks/AuthContext";

export default function Account() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useAuth();

  const [loginMessage, setLoginMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();
      setUser(data);
      setLoginMessage("You have logged in!");
    } catch (err) {
      setLoginMessage(err.message);
      console.error(err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUsername("");
    setPassword("");
    setLoginMessage("You have logged out.");
  };

  return (
    <div className="acc-container">
      <h2>Investor Login</h2>
      {loginMessage && <p>{loginMessage}</p>}

      {user ? (
        <div>
          <p>Hello {user.username}, type: {user.userType}</p>
          <p>Your balance: {user.walletBalance}</p>
          <button onClick={handleLogout} className="acc-button">Logout</button>
        </div>
      ) : (
        <div>
          <label>Username:</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} className="acc-button">Login</button>
        </div>
      )}
      {user && user.userType === "admin" && (
        <div>
          <p>Welcome Admin {user.username}</p>
          <p>You can now respond to messages from investors.</p>
        </div>
      )}
    </div>
  );
}