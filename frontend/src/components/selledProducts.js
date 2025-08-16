import React, { useState } from "react";
import { Trash, Check, Search, File, PrinterIcon, Pencil } from "lucide-react";
import { FiFilter } from "react-icons/fi";

export default function SelledProducts() {
  const [date, setDate] = useState("2025-08-04");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const produits = [
    {
      id: 1,
      client: "Client A",
      produit: "Gants",
      img: "",
      qte: 1,
      pu: 500,
      pt: 500,
      benefice: 150,
    },
    {
      id: 2,
      client: "Client B",
      produit: "Adaptateur",
      img: "",
      qte: 1,
      pu: 1000,
      pt: 1000,
      benefice: 300,
    },
    {
      id: 3,
      client: "Client C",
      produit: "Boite de dérivation",
      img: "",
      qte: 1,
      pu: 1500,
      pt: 1500,
      benefice: 450,
    },
    {
      id: 4,
      client: "Client D",
      produit: "Siphon de sol poussoir MIC 75",
      img: "",
      qte: 1,
      pu: 2500,
      pt: 2500,
      benefice: 750,
    },
    {
      id: 5,
      client: "Client E",
      produit: "Cuvette de WC luxe",
      img: "",
      qte: 2,
      pu: 4000,
      pt: 8000,
      benefice: 2400,
    },
  ];

  // Calcul du bénéfice cumulé
  let beneficeCumule = 0;
  const produitsWithCumul = produits.map((p) => {
    beneficeCumule += p.benefice;
    return { ...p, beneficeCumule };
  });

  // Filtrage des produits
  const filteredProduits = produitsWithCumul.filter(
    (p) =>
      p.produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleDelete = (id) => {
    // Ici vous ajouterez la logique pour supprimer le produit
    console.log("Supprimer le produit avec l'id:", id);
  };

  const totalVentes = filteredProduits.reduce((sum, p) => sum + p.pt, 0);
  const totalBenefices = filteredProduits.reduce(
    (sum, p) => sum + p.benefice,
    0
  );

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/warehouse.jpg')" }}
      ></div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Produits vendus le {new Date(date).toLocaleDateString("fr-FR")}
            </h1>
            <p className="text-gray-600">
              {filteredProduits.length} produits vendus
            </p>
          </div>

          {/* Contrôles */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher produit ou client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <FiFilter className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Search />
                <span className="hidden sm:inline">Filtrer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3">
            <button
              className="p-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              title="Imprimer"
            >
              <PrinterIcon className="text-blue-600" size={20} />
              <span className="hidden md:inline">Imprimer</span>
            </button>
            <button
              className="p-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              title="Exporter"
            >
              <File className="text-green-600" size={18} />
              <span className="hidden md:inline">Exporter</span>
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">
              Total ventes:{" "}
              <span className="font-bold">
                {totalVentes.toLocaleString()} FCFA
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Bénéfice total:{" "}
              <span className="font-bold text-green-600">
                {totalBenefices.toLocaleString()} FCFA
              </span>
            </p>
          </div>
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Qté
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  Prix Unitaire
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  Prix Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  Bénéfice
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  Bénéfice Cumulé
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProduits.map((p) => (
                <tr
                  key={p.id}
                  className={`hover:bg-gray-50 ${
                    selectedRows.includes(p.id) ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {p.client || (
                      <span className="text-gray-400">Non spécifié</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {p.produit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded mx-auto">
                      {p.img ? (
                        <img
                          src={p.img}
                          alt={p.produit}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400">🖼</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {p.qte}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                    {p.pu.toLocaleString()} FCFA
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    {p.pt.toLocaleString()} FCFA
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">
                    +{p.benefice.toLocaleString()} FCFA
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 font-medium">
                    {p.beneficeCumule.toLocaleString()} FCFA
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => toggleRowSelection(p.id)}
                        className={`p-1 rounded ${
                          selectedRows.includes(p.id)
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                        }`}
                        title="Sélectionner"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => console.log("Modifier", p.id)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Modifier"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Supprimer"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pied de tableau */}
        {filteredProduits.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun produit trouvé pour cette date
          </div>
        )}
      </div>
    </div>
  );
}
