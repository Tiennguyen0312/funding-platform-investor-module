import React, { useState } from "react";
import { useAuth } from "../customHooks/AuthContext";

export default function InvestmentForm({ project, onClose, onInvestmentSuccess }) {
  const [investAmount, setInvestAmount] = useState("");
  const { user, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(investAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid investment amount");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/investments/project/${project.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          amount: amount
        }),
      });
      if (!response.ok) {
        throw new Error("Investment failed");
      }
      const updatedResponse = await response.json();
      console.log("Investment response:", updatedResponse);
      if (updatedResponse && updatedResponse.userBalance !== undefined) {
        setUser({ ...user, walletBalance: updatedResponse.userBalance });
      }
      onInvestmentSuccess(updatedResponse);
      onClose();
    } catch (error) {
      console.error("Error during investment:", error);
      alert("Investment failed: " + error.message);
    }
  };

  return (
    <div className="modal">
      <form className="investment-form" onSubmit={handleSubmit}>
        <h3>Invest in {project.name}</h3>
        <label>Investment Amount:</label>
        <input
          type="number"
          value={investAmount}
          onChange={(e) => setInvestAmount(e.target.value)}
          required
        />
        <div className="form-actions">
          <button type="submit" className="rainbow-button">Invest</button>
          <button type="button" className="rainbow-button" onClick={onClose} >Cancel</button>
        </div>
      </form>
    </div>
  );
}