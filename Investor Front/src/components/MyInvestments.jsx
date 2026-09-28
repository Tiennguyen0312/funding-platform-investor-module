import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../customHooks/AuthContext";

export default function MyInvestments() {
  const { user } = useAuth();
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8080/api/investments/user/${user.id}`)
        .then((response) => setInvestments(response.data))
        .catch((err) => console.error("Error fetching investments", err));
    }
  }, [user]);

  return (
    <div className="my-investments">
      {investments.length === 0 ? (
        <p>You haven't invested in any projects yet.</p>
      ) : (
        <ul>
          {investments.map((inv) => (
            <li key={inv.projectId} className="investment-item">
              <strong>{inv.projectName}</strong> – Invested: ${inv.investedAmount} – Progress: {inv.progress}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}