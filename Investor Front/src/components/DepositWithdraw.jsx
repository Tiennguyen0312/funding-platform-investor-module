import { useState } from "react";
import PaymentForm from "./PaymentForm";

export default function DepositWithdraw() {
  const [showForm, setShowForm] = useState({ visible: false, action: null });

  return (
    <div className="wallet-actions-box">
      <button className="rainbow-button" onClick={() => setShowForm({ visible: true, action: "deposit" })}>
        Deposit
      </button>
      <button className="rainbow-button" onClick={() => setShowForm({ visible: true, action: "withdraw" })}>
        Withdraw
      </button>

      {showForm.visible && (
        <div className="modal">
          <PaymentForm
            actionType={showForm.action}
            onClose={() => setShowForm({ visible: false, action: null })}
          />
        </div>
      )}
    </div>
  );
}