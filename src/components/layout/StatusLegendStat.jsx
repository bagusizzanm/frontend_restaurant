import React from "react";
import statusConfig from "../../../utils/statusConfig";

export const Legend = () => {
  return (
    <div className="flex items-center gap-4 flex-wrap mb-4">
      {Object.entries(statusConfig).map(([status, { label, color }]) => (
        <div key={status} className="flex items-center gap-2">
          <div className={`size-4 rounded ${color}`}></div>
          <p className="text-sm">{label}</p>
        </div>
      ))}
    </div>
  );
};

export const QuickStats = ({ tables }) => {
  const stats = tables.reduce((acc, table) => {
    acc[table.status] = (acc[table.status] || 0) + 1;
    return acc;
  }, {});

  const mergedStats = Object.keys(statusConfig).reduce((acc, key) => {
    acc[key] = stats[key] || 0;
    return acc;
  }, {});

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100 space-y-4">
      <h1 className="text-md font-medium mb-2">Quick Stats</h1>
      {Object.entries(mergedStats).map(([status, count]) => (
        <div
          key={status}
          className="flex justify-between p-2 border-b last:border-b-0"
        >
          <span className="flex items-center gap-2 capitalize">
            <div
              className={`size-3 rounded ${
                statusConfig[status]?.color || "bg-gray-300"
              }`}
            ></div>
            {statusConfig[status]?.label || status}
          </span>
          <span className="font-semibold">{count}</span>
        </div>
      ))}
    </div>
  );
};
