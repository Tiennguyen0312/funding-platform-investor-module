import React, { useState } from "react";
import { useAuth } from "../customHooks/AuthContext";
import useFetchData from "../customHooks/useFetchData";
import DepositWithdraw from "./DepositWithdraw";
import PaymentForm from "./PaymentForm";
import MyInvestments from "./MyInvestments";
export default function BalancePage() {
  const { user } = useAuth();
  const { data, loading, error } = useFetchData(
    "https://v6.exchangerate-api.com/v6/1a6c7ca980732d34ecc3f6ea/latest/USD"
  );
  
  
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("VND");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  
  const convertCurrency = () => {
    if (!data || !data.conversion_rates) return;
    const fromRate = data.conversion_rates[fromCurrency];
    const toRate = data.conversion_rates[toCurrency];
    if (fromRate && toRate) {
      const result = (amount * toRate) / fromRate;
      setConvertedAmount(result.toFixed(2));
    }
  };
  
  const filteredData = ["USD", "VND", "GBP", "EUR","SGD","JPY"].map(currency => ({
    currency,
    value: data?.conversion_rates[currency] || "N/A"
  }));
  
  
  const [showForm, setShowForm] = useState({ visible: false, action: null });
  
  if (loading) return <p>Loading market data...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div className="balance-page-container">
      <div className="top-box custom-card">
        <div className="top-section">
          <div className="top-left">
            <h3>User Info</h3>
            {user ? (
              <>
                <p>User Name: <strong>{user.username}</strong></p>
                <p>Your Balance: <strong>{user.walletBalance}</strong></p>
              </>
            ) : (
              <p>Loading user...</p>
            )}
          </div>
          
          <div className="top-center">
            <h3>Currency Converter</h3>
            
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" className="input-field" />
            <div className="converter">
              <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="styled-input">
                {filteredData.map(item => (
                  <option key={item.currency} value={item.currency}>{item.currency}</option>
                ))}
              </select>
              <span className="arrow">➔</span>
              <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="styled-input">
                {filteredData.map(item => (
                  <option key={item.currency} value={item.currency}>{item.currency}</option>
                ))}
              </select>
            </div>
            <button onClick={convertCurrency} className="rainbow-button convert-but">Convert</button>
            {convertedAmount !== null && (
              <div className="result">
                {amount} {fromCurrency} = {convertedAmount} {toCurrency}
              </div>
            )}
            
          </div>
          <div className="top-right">
            <h3>Wallet Actions</h3>
            <DepositWithdraw />
          </div>
        </div>
      </div>
    
      <div className="bottom-row">
        <div className="left-column custom-card">
          <h3>Currency Market Trends</h3>
          <p>Last Update Time: {data.time_last_update_utc}</p>
          <p>Next Update Time: {data.time_next_update_utc}</p>
          <ul className="currency-list">
            {filteredData.map(item => (
              <li key={item.currency}>{item.currency}: {item.value}</li>
            ))}
          </ul>
        </div>
        <div className="right-column custom-card">
          <h3>Projects You Have Paid For</h3>
          {user && user.userType === "investor" ? (<MyInvestments />) : (<p>(Project list will be added later.)</p>)}
        </div>
      </div>
      {showForm.visible && (
        <div className="modal">
          <PaymentForm actionType={showForm.action} onClose={() => setShowForm({ visible: false, action: null })} />
        </div>
      )}
    </div>
  );
}