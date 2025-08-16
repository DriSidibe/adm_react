import { ShoppingCart, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <>
      {/* Mobile Card View (shown on small screens) */}
      <div className="xl:hidden sm:hidden flex flex-col gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 dark:border-gray-700 dark:hover:bg-gray-800">
        <Link to={`/products/${item.id}`} className="w-full flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
            loading="lazy"
          />
        </Link>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            <Link to={`/products/${item.id}`} className="group">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {item.name}
              </h3>
            </Link>
            <div className="text-justify">
              {item.prix_achat && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Prix d'achat: {item.prix_achat} FCFA
                </p>
              )}
              <p className="text-sm text-blue-600 dark:text-gray-400">
                Prix de vente: {item.prix_vente} FCFA
              </p>
              {item.etagere && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Etagere: {item.etagere}
                </p>
              )}
              {item.casier && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Casier: {item.casier}
                </p>
              )}
            </div>
          </div>
          {item.quantite && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Quantité: {item.quantite}
            </p>
          )}
          <Actions />
        </div>
      </div>

      {/* Tablette Card View (shown on small screens) */}
      <div className="hidden xl:hidden sm:hidden md:block space-y-6">
        <div
          key={item.id}
          className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          {/* Image Section (Left) */}
          <div className="w-full sm:w-1/4 flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 sm:h-full object-cover rounded-lg"
            />
          </div>

          {/* Details Section (Right) */}
          <div className="flex-1 flex flex-col">
            {/* Title and Price */}
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <div className="text-justify">
                {item.prix_achat && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Prix d'achat: {item.prix_achat} FCFA
                  </p>
                )}
                <p className="text-sm text-blue-600 dark:text-gray-400">
                  Prix de vente: {item.prix_vente} FCFA
                </p>
                {item.etagere && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Etagere: {item.etagere}
                  </p>
                )}
                {item.casier && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Casier: {item.casier}
                  </p>
                )}
              </div>
            </div>
            {/* Actions */}
            <Actions />
          </div>
        </div>
      </div>

      {/* Table Row View (shown on large screens) */}
      <tr className="hidden xl:table-row border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          {item.id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          {item.etagere}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          {item.casier}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          {item.unite}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-16 w-16">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded object-cover"
              />
            </div>
            <div className="ml-4">
              <Link
                to={`/products/${item.id}`}
                className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600"
              >
                {item.name}
              </Link>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          {item.prix_achat} FCFA
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600 dark:text-gray-400">
          {item.prix_vente} FCFA
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          {item.quantite}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <Actions />
        </td>
      </tr>
    </>
  );
};

const Actions = () => {
  return (
    <div className="mt-4 flex space-x-2 justify-end">
      <button className="p-2 text-green-600 hover:text-green-900 dark:hover:text-green-400">
        <ShoppingCart className="w-5 h-5" />
      </button>
      <button className="p-2 text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">
        <Pencil className="w-5 h-5" />
      </button>
      <button className="p-2 text-red-600 hover:text-red-900 dark:hover:text-red-400">
        <Trash className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Card;
