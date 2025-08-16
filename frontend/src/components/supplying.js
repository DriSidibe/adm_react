import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

export default function Supplying() {
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

  const handleEdit = (produit) => {
    setNewProduit({
      nom: produit.nom,
      quantite: produit.quantite,
      categorie: produit.categorie,
      seuil: produit.seuil,
    });
    setEditingId(produit.id);
  };

  const handleDelete = (id) => {
    setProduits(produits.filter((p) => p.id !== id));
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
      {/* Tableau */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-center">Qté commandée</th>
              <th className="px-4 py-3 text-left">Nom</th>
              <th className="px-4 py-3 text-center">Stock</th>
              <th className="px-4 py-3 text-center">Image</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {produitsAApprovisionner.length > 0 ? (
              produitsAApprovisionner.map((prod) => (
                <tr key={prod.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-center">
                    {prod.quantiteCommande}
                  </td>
                  <td className="px-4 py-3">{prod.nom}</td>
                  <td className="px-4 py-3 text-center">{prod.quantite}</td>
                  <td className="px-4 py-3 text-center">
                    <img src="" alt="im" className="w-12 h-12 object-cover" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(prod)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Modifier"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  Aucun produit à réapprovisionner
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
