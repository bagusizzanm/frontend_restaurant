import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { Legend, QuickStats } from "@/components/layout/StatusLegendStat";
import DetailsTable from "../components/layout/DetailsTable";

const Dashboard = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);
  const [choosedTable, setChoosedTable] = useState(false);

  const getTables = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.TABLES.GET);
      const data = response.data;
      setTables(data);
      return data;
    } catch (error) {
      toast.error("Error fetching tables: ", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTables();
  }, []);

  const statusColor = {
    available: "bg-green-400",
    occupied: "bg-red-400",
    reserved: "bg-yellow-400",
    inactive: "bg-gray-400",
  };

  if (choosedTable) {
    return (
      <div>
        <DashboardLayout activeMenu="dashboard">
          <DetailsTable
            table={choosedTable}
            setChoosedTable={setChoosedTable}
          />
        </DashboardLayout>
      </div>
    );
  }

  return (
    <DashboardLayout activeMenu="dashboard">
      <div className="max-w-full p-8">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold">Table Management</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table Status Legend */}
          <div className="col-span-2 space-y-6 bg-white p-8 rounded-lg border border-gray-100">
            <h1 className="text-md font-medium">Table Status</h1>

            <Legend />

            {/* Grid Meja */}
            <div className="grid grid-cols-6 gap-4 mt-6">
              {loading ? (
                <p className="col-span-6 text-center">Loading...</p>
              ) : (
                tables.map((table) => (
                  <Button
                    type="button"
                    onClick={() => setChoosedTable(table)}
                    key={table.id}
                    className={`h-16 flex items-center justify-center rounded-md text-white font-semibold cursor-pointer transition 
                      ${statusColor[table.status] || "bg-gray-300"}`}
                  >
                    {table.number}
                  </Button>
                ))
              )}
            </div>
          </div>
          <QuickStats tables={tables} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
