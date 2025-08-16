import { Upload, User, Package, Calendar, Plus } from "lucide-react";
import { useState } from "react";

export default function SellProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    totalPrice: "",
    customer: "",
    image: null,
    date: new Date().toISOString().split("T")[0], // Date du jour par défaut
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous ajouterez la logique pour traiter la vente
    console.log("Données du formulaire:", formData);
    alert("Vente enregistrée avec succès!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <Plus className="mr-2" size={24} />
        Vendre un nouveau produit
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Champ Nom du produit */}
        <div className="space-y-2">
          <label
            htmlFor="productName"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
          >
            <Package className="mr-2" size={16} />
            Nom du produit
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Ex: Smartphone X Pro"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Champ Quantité */}
        <div className="space-y-2">
          <label
            htmlFor="quantity"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Quantité
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Ex: 2"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Champ Prix total */}
        <div className="space-y-2">
          <label
            htmlFor="totalPrice"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
          >
            Prix total (FCFA)
          </label>
          <input
            type="number"
            id="totalPrice"
            name="totalPrice"
            min="0"
            step="0.01"
            value={formData.totalPrice}
            onChange={handleChange}
            placeholder="Ex: 150000"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Champ Client */}
        <div className="space-y-2">
          <label
            htmlFor="customer"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
          >
            <User className="mr-2" size={16} />
            Client (ID ou Nom)
          </label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            placeholder="Ex: CLI-1234 ou Jean Dupont"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Champ Image */}
        <div className="space-y-2">
          <label
            htmlFor="image"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
          >
            <Upload className="mr-2" size={16} />
            Image du produit
          </label>
          <div className="flex items-center">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:border-gray-600 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {formData.image ? (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formData.image.name}
                  </span>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Cliquez pour uploader
                      </span>{" "}
                      ou glissez-déposez
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG (MAX. 5MB)
                    </p>
                  </>
                )}
              </div>
              <input
                id="image"
                name="image"
                type="file"
                className="hidden"
                onChange={handleChange}
                accept="image/png, image/jpeg"
              />
            </label>
          </div>
        </div>

        {/* Champ Date */}
        <div className="space-y-2">
          <label
            htmlFor="date"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
          >
            <Calendar className="mr-2" size={16} />
            Date de vente
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Bouton de soumission */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
          >
            Enregistrer la vente
          </button>
        </div>
      </form>
    </div>
  );
}
