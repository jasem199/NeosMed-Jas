import { useState } from 'react';
import './RefillSheet.css';

export default function RefillSheet({ isOpen, onClose, medicine, onConfirm }) {
  const [amount, setAmount] = useState('');

  if (!isOpen || !medicine) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && !isNaN(amount) && parseInt(amount, 10) > 0) {
      onConfirm(medicine.id, parseInt(amount, 10));
      setAmount('');
      onClose();
    }
  };

  const handleQuickAdd = (val) => {
    setAmount(prev => (parseInt(prev || 0, 10) + val).toString());
  };

  return (
    <>
      <div className="refillSheet-overlay" onClick={onClose}></div>
      <div className="refillSheet-container">
        <div className="refillSheet-header">
          <div className="refillSheet-dragHandle"></div>
          <h2 className="refillSheet-title">Refill Medicine</h2>
          <button className="refillSheet-closeBtn" onClick={onClose} aria-label="Close">
            <i className="ri-close-line"></i>
          </button>
        </div>
        
        <div className="refillSheet-content">
          <div className="refillSheet-medInfo">
            <h3 className="refillSheet-medName">{medicine.name}</h3>
            <p className="refillSheet-medCurrent">
              Current Stock: <strong>{medicine.stock} {medicine.unit}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="refillSheet-form">
            <label className="refillSheet-label" htmlFor="refillAmount">
              Amount to add
            </label>
            <div className="refillSheet-inputWrapper">
              <input
                id="refillAmount"
                type="number"
                inputMode="numeric"
                className="refillSheet-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                autoFocus
              />
              <span className="refillSheet-unit">{medicine.unit}</span>
            </div>

            <div className="refillSheet-quickAdd">
              <button type="button" className="refillSheet-quickBtn" onClick={() => handleQuickAdd(10)}>+10</button>
              <button type="button" className="refillSheet-quickBtn" onClick={() => handleQuickAdd(20)}>+20</button>
              <button type="button" className="refillSheet-quickBtn" onClick={() => handleQuickAdd(30)}>+30</button>
              <button type="button" className="refillSheet-quickBtn" onClick={() => handleQuickAdd(50)}>+50</button>
            </div>

            <button 
              type="submit" 
              className="refillSheet-submitBtn"
              disabled={!amount || isNaN(amount) || parseInt(amount, 10) <= 0}
            >
              Confirm Refill
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
