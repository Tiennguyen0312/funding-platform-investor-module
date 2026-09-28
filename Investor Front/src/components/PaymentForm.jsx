import { useState } from "react";
import { useAuth } from "../customHooks/AuthContext";

export default function PaymentForm({ actionType, onClose }) {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    email: "",
    amount: "",
    paymentType: "visa",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert("Please accept the terms and conditions.");
      return;
    }
    const url =
      actionType === "deposit"
        ? "http://localhost:8080/wallet/deposit"
        : "http://localhost:8080/wallet/withdraw";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          amount: parseFloat(formData.amount),
          email: formData.email,
          paymentType: formData.paymentType,
        }),
      });
      if (!res.ok) throw new Error("Transaction failed");
      const updatedUser = await res.json();
      setUser(updatedUser);
      alert(
        `${actionType} Successful! New balance: $${updatedUser.walletBalance}`
      );
      onClose();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h3>{actionType === "deposit" ? "Deposit" : "Withdraw"} Funds</h3>

      <label>Email:</label>
      <input
        name="email"
        type="email"
        required
        value={formData.email}
        onChange={handleChange}
      />

      <label>Name on Card:</label>
      <input
        name="nameOnCard"
        required
        value={formData.nameOnCard}
        onChange={handleChange}
        pattern="^[A-Za-z\s]+$" 
        title="Name on card must contain only letters and spaces."
      />

      <label>Card Number:</label>
      <input
        name="cardNumber"
        type="text"
        required
        value={formData.cardNumber}
        onChange={handleChange}
        pattern="^\d{16}$"
        maxLength={16}
        title="Card number must be exactly 16 digits."
      />

      <label>Expiry Month:</label>
      <input
        name="expiryMonth"
        type="text"
        required
        value={formData.expiryMonth}
        onChange={handleChange}
        pattern="^(0[1-9]|1[0-2])$"
        maxLength={2}
        title="Month must be 2 digits between 01 and 12."
        placeholder="MM"
      />

      <label>Expiry Year:</label>
      <input
        name="expiryYear"
        type="text"
        required
        value={formData.expiryYear}
        onChange={handleChange}
        min="2026" 
        title="Year must be 4 digits and greater than 2025."
        placeholder="YYYY"
      />

      <label>CVV:</label>
      <input
        name="cvv"
        type="password"
        required
        value={formData.cvv}
        onChange={handleChange}
        pattern="^\d{3}$"
        maxLength={3}
        title="CVV must be exactly 3 digits."
      />

      <label>Amount:</label>
      <input
        name="amount"
        type="number"
        required
        value={formData.amount}
        onChange={handleChange}
      />

      <label>Payment Method:</label>
      <select name="paymentType"
        value={formData.paymentType}
        onChange={handleChange}
      >
        <option value="visa">Visa</option>
        <option value="mastercard">Mastercard</option>
        <option value="bank">Bank Transfer</option>
      </select>

      <div className="terms-container">
      <p className="acceptTerms">
            I accept the terms and conditions
          </p>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            id="acceptTerms"
          />
         
        </div>

      <div className="form-actions">
        <button type="submit">Confirm</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}