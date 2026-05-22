import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransport, deleteTransport, openEditModal, openAddModal } from "../features/TransportSlice";
import EditModal from "../modal/EditModal";
import AddModal from "../modal/AddModal";
import toast from "react-hot-toast";

const Table = () => {
  const dispatch = useDispatch();
  const { transports, isLoading, isError, isEditModalOpen, isAddModalOpen } =
    useSelector((state) => state.transports);

  useEffect(() => {
    dispatch(getTransport());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Haqiqatan o'chirmoqchimisiz?")) {
      dispatch(deleteTransport(id));
      toast.success("Transport o'chirildi!");
    }
  };

  const handleEdit = (transport) => {
    dispatch(openEditModal(transport)); 
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-500 animate-pulse">Yuklanmoqda...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg">Xatolik: {isError}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {isEditModalOpen && <EditModal />}
      {isAddModalOpen && <AddModal />}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🚗 Transport boshqaruvi</h1>
        <button
          onClick={() => dispatch(openAddModal())}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition"
        >
          + Qo'shish
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="w-full bg-white text-sm text-left">
          <thead className="bg-gray-800 text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Rasm</th>
              <th className="px-4 py-3">Nomi</th>
              <th className="px-4 py-3">Turi</th>
              <th className="px-4 py-3">Brend</th>
              <th className="px-4 py-3">Yili</th>
              <th className="px-4 py-3">Narxi</th>
              <th className="px-4 py-3">Tezlik</th>
              <th className="px-4 py-3">Yoqilg'i</th>
              <th className="px-4 py-3">Rang</th>
              <th className="px-4 py-3 text-center">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {transports.map((item, index) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                <td className="px-4 py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-10 object-cover rounded"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/64x40?text=No+img")}
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                <td className="px-4 py-3 text-gray-600">{item.type}</td>
                <td className="px-4 py-3 text-gray-600">{item.brand}</td>
                <td className="px-4 py-3 text-gray-600">{item.year}</td>
                <td className="px-4 py-3 text-gray-800 font-semibold">
                  ${item.price?.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-gray-600">{item.speed}</td>
                <td className="px-4 py-3">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    {item.fuel}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{item.color}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {transports.length === 0 && (
          <div className="text-center py-12 text-gray-400">Ma'lumot yo'q</div>
        )}
      </div>
    </div>
  );
};
export default Table;