import React from "react";
import {
  TrendingUp,
  Package,
  DollarSign,
  BarChart2,
  ShoppingCart,
  Percent,
} from "lucide-react";

const data = {
  stock: 387,
  quantity: 470,
  purchaseValue: "104 461 FCFA",
  saleValue: "121 027 FCFA",
  sales: {
    today: "0 FCFA",
    week: "0 FCFA",
    month: "496,200 FCFA",
    year: "837,900 FCFA",
    total: "837,900 FCFA",
    count: 328,
  },
  profit: {
    today: "0 FCFA",
    week: "0 FCFA",
    month: "900 FCFA",
    year: "6,600 FCFA",
    total: "6,600 FCFA",
    margin: "12.5%",
  },
};

const Card = ({ title, value, color, icon, trend }) => (
  <div
    className={`${color} p-4 rounded-lg shadow-lg text-white relative overflow-hidden`}
  >
    <div className="absolute top-0 right-0 opacity-10"></div>
    <div className="relative z-10">
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold mb-2">{value}</p>
      {trend && (
        <div className="flex items-center text-xs">
          <TrendingUp size={14} className="mr-1" />
          <span>{trend}</span>
        </div>
      )}
    </div>
  </div>
);

const SectionHeader = ({ title, icon }) => (
  <div className="flex items-center mb-4">
    <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
  </div>
);

export default function Statistics() {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Tableau de Bord</h2>
          <div className="text-sm text-gray-500">
            Mis à jour il y a 5 minutes
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            title="Produits en stock"
            value={data.stock}
            color="bg-blue-600"
            icon={<Package className="text-gray-700 mr-2" size={24} />}
            trend="+5% ce mois"
          />
          <Card
            title="Quantité totale"
            value={data.quantity}
            color="bg-green-600"
            icon={<ShoppingCart className="text-gray-700 mr-2" size={24} />}
            trend="+8% cette année"
          />
          <Card
            title="Valeur achat totale"
            value={data.purchaseValue}
            color="bg-yellow-600"
            icon={<DollarSign className="text-gray-700 mr-2" size={24} />}
          />
          <Card
            title="Valeur vente potentielle"
            value={data.saleValue}
            color="bg-red-600"
            icon={<BarChart2 className="text-gray-700 mr-2" size={24} />}
          />
        </div>

        {/* Sales Section */}
        <div className="mb-8">
          <SectionHeader
            title="Chiffre d'affaires"
            icon={<DollarSign className="text-gray-700 mr-2" size={24} />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <Card
              title="Aujourd'hui"
              value={data.sales.today}
              color="bg-green-500"
            />
            <Card
              title="Cette semaine"
              value={data.sales.week}
              color="bg-cyan-500"
            />
            <Card
              title="Ce mois-ci"
              value={data.sales.month}
              color="bg-yellow-500"
            />
            <Card
              title="Cette année"
              value={data.sales.year}
              color="bg-blue-500"
            />
            <Card title="Total" value={data.sales.total} color="bg-gray-800" />
            <Card
              title="Nombre de ventes"
              value={data.sales.count}
              color="bg-gray-600"
            />
          </div>
        </div>

        {/* Profit Section */}
        <div>
          <SectionHeader title="Bénéfice" icon={Percent} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <Card
              title="Aujourd'hui"
              value={data.profit.today}
              color="bg-green-500"
            />
            <Card
              title="Cette semaine"
              value={data.profit.week}
              color="bg-cyan-500"
            />
            <Card
              title="Ce mois-ci"
              value={data.profit.month}
              color="bg-yellow-500"
            />
            <Card
              title="Cette année"
              value={data.profit.year}
              color="bg-blue-500"
            />
            <Card title="Total" value={data.profit.total} color="bg-gray-800" />
            <Card
              title="Marge bénéficiaire"
              value={data.profit.margin}
              color="bg-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
