import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from './Authsection/AuthContetx';

const PaymentHistory = () => {
  const [history, setHistory] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/api/payment-history/${user.email}`)
        .then(res => setHistory(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-black mb-6 text-slate-800 uppercase italic">Your Payment History</h2>
      <div className="overflow-x-auto shadow-xl rounded-2xl border border-slate-100">
        <table className="table w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th>Month</th>
              <th>Room</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="font-bold">{item.month}</td>
                <td>{item.room}</td>
                <td className="font-mono text-xs text-indigo-600 uppercase">{item.transactionId}</td>
                <td className="font-black">${item.payableAmount}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {history.length === 0 && (
          <div className="text-center py-10 text-slate-400">No payment records yet.</div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;