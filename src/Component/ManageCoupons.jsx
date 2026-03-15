import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Ticket, Trash2 } from "lucide-react";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get("https://servercode-murex.vercel.app/api/coupons");
      setCoupons(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newCoupon = {
      code: form.code.value,
      discount: parseInt(form.discount.value),
      description: form.description.value,
      status: 'active',
      createdAt: new Date()
    };

    try {
      const res = await axios.post("https://servercode-murex.vercel.app/api/coupons", newCoupon);
      if (res.data.insertedId) {
        fetchCoupons();
        form.reset();
        document.getElementById("add_coupon_modal").close();
      }
    } catch (err) {
      alert("Failed to add coupon");
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <div>
            <h2 className="text-3xl font-black text-indigo-900 flex items-center gap-3">
              <Ticket size={32} className="text-indigo-600" /> Manage Coupons
            </h2>
            <p className="text-indigo-600 mt-1 font-medium">Create and monitor discount offers</p>
          </div>
          <button
            className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
            onClick={() => document.getElementById("add_coupon_modal").showModal()}
          >
            <Plus size={20} /> Add Coupon
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-xl shadow-gray-50">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="py-5">Coupon Info</th>
                <th>Discount</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-20"><span className="loading loading-spinner loading-lg text-indigo-600"></span></td></tr>
              ) : coupons.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-20 text-gray-400 font-medium">No coupons found in database.</td></tr>
              ) : (
                coupons.map((c) => (
                  <tr key={c._id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="py-4">
                      <span className="font-mono font-bold text-lg bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg border border-indigo-200 uppercase">
                        {c.code}
                      </span>
                    </td>
                    <td className="font-black text-xl text-green-600">{c.discount}% OFF</td>
                    <td className="max-w-xs text-sm text-gray-500">{c.description}</td>
                    <td>
                      <div className="badge badge-success gap-2 py-3 px-4 font-bold text-white uppercase text-[10px]">
                        {c.status}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <dialog id="add_coupon_modal" className="modal">
        <div className="modal-box bg-white max-w-md rounded-3xl p-8">
          <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5">✕</button></form>
          <h3 className="font-black text-2xl text-gray-800 mb-6">New Promotion</h3>

          <form onSubmit={handleAddCoupon} className="space-y-5">
            <div className="form-control">
              <label className="label font-bold text-gray-600 text-sm">COUPON CODE</label>
              <input name="code" type="text" placeholder="e.g. WINTER50" className="input input-bordered w-full bg-gray-50 font-mono focus:ring-2 ring-indigo-500 border-none rounded-xl" required />
            </div>

            <div className="form-control">
              <label className="label font-bold text-gray-600 text-sm">DISCOUNT PERCENTAGE (%)</label>
              <input name="discount" type="number" placeholder="20" className="input input-bordered w-full bg-gray-50 focus:ring-2 ring-indigo-500 border-none rounded-xl" required />
            </div>

            <div className="form-control">
              <label className="label font-bold text-gray-600 text-sm">COUPON DESCRIPTION</label>
              <textarea name="description" placeholder="Details about this offer..." className="textarea textarea-bordered w-full bg-gray-50 h-24 focus:ring-2 ring-indigo-500 border-none rounded-xl shadow-inner" required></textarea>
            </div>

            <button type="submit" className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full border-none rounded-xl h-14 shadow-lg shadow-indigo-100 mt-4">
              Create Coupon Now
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageCoupons;