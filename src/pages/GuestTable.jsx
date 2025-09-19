import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { Legend } from "@/components/layout/StatusLegendStat.jsx";
import statusConfig from "../../utils/statusConfig";

const GuestTable = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const getTables = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.TABLES.GET);
      setTables(response.data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching tables:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTables();
    const interval = setInterval(() => {
      getTables();
    }, 10000);

    // cleanup interval saat component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Guest View - Table Availability
      </h2>

      {/* Legend */}
      <Legend />

      {/* Grid meja */}
      <div className="bg-white p-6 rounded-lg border border-gray-100 mt-6">
        <h3 className="text-md font-medium mb-4">Tables</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {loading ? (
            <p className="col-span-6 text-center">Loading...</p>
          ) : (
            tables.map((table) => (
              <div
                key={table.id}
                className={`h-16 flex items-center justify-center rounded-md text-white font-semibold transition 
                ${statusConfig[table.status]?.color || "bg-gray-300"}`}
              >
                {table.number}
              </div>
            ))
          )}
        </div>
        {lastUpdated && (
          <p className="text-xs text-gray-500 mt-4 text-right">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default GuestTable;
