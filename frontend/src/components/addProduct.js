import React, { useState } from "react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    idProduit: "",
    categorie: "",
    codeProduit: "",
    nomProduit: "",
    unite: "",
    quantite: "",
    prixAchat: "",
    prixVente: "",
    entreprise: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Produit ajouté :", formData);
    alert("Produit ajouté avec succès !");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Ajouter un produit
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="idProduit"
            placeholder="ID Produit"
            value={formData.idProduit}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="categorie"
            placeholder="Catégorie"
            value={formData.categorie}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="codeProduit"
            placeholder="Code Produit"
            value={formData.codeProduit}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="nomProduit"
            placeholder="Nom du produit"
            value={formData.nomProduit}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="unite"
            placeholder="Unité"
            value={formData.unite}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="quantite"
            placeholder="Quantité"
            value={formData.quantite}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="prixAchat"
            placeholder="Prix d'achat"
            value={formData.prixAchat}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="prixVente"
            placeholder="Prix de vente"
            value={formData.prixVente}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="entreprise"
            placeholder="Entreprise de fabrication"
            value={formData.entreprise}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            placeholder="Description du produit"
            value={formData.description}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
            rows="4"
          ></textarea>

          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition"
          >
            Ajouter le produit
          </button>
        </form>
      </div>
    </div>
  );
}
