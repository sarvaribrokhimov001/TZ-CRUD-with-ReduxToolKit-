import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeAddModal, addTransport } from "../features/TransportSlice";
import toast from "react-hot-toast";

const AddModal = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    price: "",
    speed: "",
    type: "",
    brand: "",
    color: "",
    year: "",
    fuel: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.error("Ism va narx majburiy!");
      return;
    }
    dispatch(
      addTransport({
        ...formData,
        price: Number(formData.price),
        year: Number(formData.year),
      })
    );
    toast.success("Transport qo'shildi!");
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-800">➕ Yangi transport qo'shish</h2>
          <button
            onClick={() => dispatch(closeAddModal())}
            className="text-gray-400 hover:text-gray-700 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelClass}>Rasm URL</label>
              <input className={inputClass} type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
            </div>
            <div>
              <label className={labelClass}>Nomi *</label>
              <input className={inputClass} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Tesla Model S" required />
            </div>
            <div>
              <label className={labelClass}>Brend</label>
              <input className={inputClass} type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Tesla" />
            </div>
            <div>
              <label className={labelClass}>Narxi ($) *</label>
              <input className={inputClass} type="number" name="price" value={formData.price} onChange={handleChange} placeholder="95000" required />
            </div>
            <div>
              <label className={labelClass}>Tezlik</label>
              <input className={inputClass} type="text" name="speed" value={formData.speed} onChange={handleChange} placeholder="322 km/h" />
            </div>
            <div>
              <label className={labelClass}>Turi</label>
              <input className={inputClass} type="text" name="type" value={formData.type} onChange={handleChange} placeholder="Electric Car" />
            </div>
            <div>
              <label className={labelClass}>Rang</label>
              <input className={inputClass} type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Red" />
            </div>
            <div>
              <label className={labelClass}>Yili</label>
              <input className={inputClass} type="number" name="year" value={formData.year} onChange={handleChange} placeholder="2024" />
            </div>
            <div>
              <label className={labelClass}>Yoqilg'i</label>
              <input className={inputClass} type="text" name="fuel" value={formData.fuel} onChange={handleChange} placeholder="Electric" />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => dispatch(closeAddModal())}
              className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            >
              Qo'shish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddModal;