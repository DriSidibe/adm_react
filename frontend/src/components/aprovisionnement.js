import { useState } from "react";
import { Printer, Plus, Search, Check, X } from "lucide-react";
import Supplying from "./supplying";
import AddSupplyModal from "./addSupply";
import ToSupply from "./toSupply";
import TabBar from "./tabBar";

export default function Aprovisionnement() {
  const tabs = [
    {
      label: "A approvisionner",
      component: <ToSupply />,
    },
    {
      label: "Entrées",
      component: <Supplying />,
    },
    {
      label: "Ajouter entrée",
      component: <AddSupplyModal />,
    },
  ];

  const [produits, setProduits] = useState([
    {
      id: 1,
      nom: "Produit A",
      quantite: 5,
      categorie: "Boissons",
      seuil: 10,
      quantiteCommande: 0,
    },
    {
      id: 2,
      nom: "Produit B",
      quantite: 3,
      categorie: "Snacks",
      seuil: 5,
      quantiteCommande: 0,
    },
    {
      id: 3,
      nom: "Produit C",
      quantite: 2,
      categorie: "Fruits",
      seuil: 4,
      quantiteCommande: 0,
    },
  ]);

  const [newProduit, setNewProduit] = useState({
    nom: "",
    quantite: "",
    categorie: "",
    seuil: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduit((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setProduits(
        produits.map((p) => (p.id === editingId ? { ...p, ...newProduit } : p))
      );
      setEditingId(null);
    } else {
      setProduits([
        ...produits,
        {
          id: produits.length + 1,
          ...newProduit,
          quantite: parseInt(newProduit.quantite),
          seuil: parseInt(newProduit.seuil),
        },
      ]);
    }
    setNewProduit({ nom: "", quantite: "", categorie: "", seuil: "" });
  };

  const filteredProduits = produits.filter(
    (prod) =>
      prod.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.categorie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const produitsAApprovisionner = filteredProduits.filter(
    (prod) => prod.quantite < prod.seuil
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Liste d'approvisionnement
          </h1>
          <p className="text-gray-600">
            {produitsAApprovisionner.length} produits à réapprovisionner
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Rechercher produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              value={newProduit.nom}
              onChange={handleInputChange}
              placeholder="Nom du produit"
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantité
            </label>
            <input
              type="number"
              name="quantite"
              value={newProduit.quantite}
              onChange={handleInputChange}
              placeholder="Quantité"
              className="border rounded px-3 py-2 w-full"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <select
              name="categorie"
              value={newProduit.categorie}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="">Sélectionner</option>
              <option>Boissons</option>
              <option>Snacks</option>
              <option>Fruits</option>
              <option>Légumes</option>
              <option>Produits laitiers</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded flex items-center justify-center gap-2 ${
                editingId
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {editingId ? (
                <>
                  <Check size={18} />
                  Modifier
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Ajouter
                </>
              )}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setNewProduit({
                    nom: "",
                    quantite: "",
                    categorie: "",
                    seuil: "",
                  });
                }}
                className="ml-2 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Actions */}
      <div className="flex justify-between items-center mb-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          <Printer size={18} />
          <span className="hidden sm:inline">Imprimer la liste</span>
        </button>
      </div>

      {/* Tabar */}
      <div className="flex w-full justify-between items-center mb-4">
        <TabBar tabs={tabs} />
      </div>
    </div>
  );
}
