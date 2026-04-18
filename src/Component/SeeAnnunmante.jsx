import React, { useEffect, useState } from "react";
import axios from "axios";

const SeeAnnunmante = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios.get("https://servercode-murex.vercel.app/api/notices")
      .then(res => setNotices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-4xl font-bold mb-4 text-center">Admin Notices</h2>
      {notices.length === 0 ? (
        <p>No notices yet</p>
      ) : (
        <ul className="space-y-3">
          {notices.map((notice) => (
            <li key={notice._id} className="border p-3 rounded">
              <h3 className="font-semibold">{notice.title}</h3>
              <p>{notice.description}</p>
              <small>{new Date(notice.date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SeeAnnunmante;