import React, { useState } from "react";
import { X, Plus, Check } from "lucide-react";

const AddSupplyModal = ({ isOpen, onClose, onAddSupply }) => {
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    supplier: "",
    date: new Date().toISOString().split("T")[0],
    cost: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSupply({
      ...formData,
      quantity: parseInt(formData.quantity),
      cost: parseFloat(formData.cost),
    });
    onClose();
  };

  return (
    <div className=" inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            <Plus className="inline mr-2" size={20} />
            Nouvel Approvisionnement
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Produit *
            </label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Sélectionner un produit</option>
              <option value="Produit A">Produit A</option>
              <option value="Produit B">Produit B</option>
              <option value="Produit C">Produit C</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantité *
              </label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coût (FCFA) *
              </label>
              <input
                type="number"
                name="cost"
                min="0"
                step="0.01"
                value={formData.cost}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fournisseur *
            </label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="Nom du fournisseur"
              className="w-full border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Informations supplémentaires..."
            ></textarea>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Check size={18} />
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Example usage in parent component:
/*
const [isModalOpen, setIsModalOpen] = useState(false);

const handleAddSupply = (supplyData) => {
  // Add your logic to handle the new supply
  console.log("New supply:", supplyData);
};

return (
  <div>
    <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
    <AddSupplyModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      onAddSupply={handleAddSupply}
    />
  </div>
);
*/

export default AddSupplyModal;
