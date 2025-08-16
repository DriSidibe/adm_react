import CustomSearchField from "./ui/search";
import Button from "./ui/button";
import { Search, PrinterIcon } from "lucide-react";
import { useState, useEffect } from "react";
import CardList from "./ui/cardList";
import { useAuth } from "./context/AuthContext";
import { useApi } from "../utils";

const Products = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const api = useApi();

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }

    // Simulate API fetch
    const fetchData = async () => {
      try {
        // Replace with actual API call
        const mockData = await api.request("http://localhost:5000/products");

        setItems(mockData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [api, user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Tous les produits
      </h1>
      <div className="flex flex-row items-center justify-center gap-4">
        <CustomSearchField
          className="w-full"
          placeholder="Entrez l'ID du produit"
          onSearch={(query) => console.log(query)}
        />
        <CustomSearchField
          className="w-full"
          placeholder="Entrez le nom du produit"
          onSearch={(query) => console.log(query)}
        />
        <Button variant="primary" icon={<Search />}>
          Recherche
        </Button>
      </div>
      <PrinterIcon className="w-6 h-6 text-green-500 mt-4 cursor-pointer" />
      <CardList items={items} isLoading={isLoading} />
    </div>
  );
};

export default Products;
