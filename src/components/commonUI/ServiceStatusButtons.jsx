/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/commonUI/ServiceStatusButtons.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Sunday, February 2nd 2025, 3:07:09 am
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, AlertOctagon, XCircle, HelpCircle } from "lucide-react";

const statusOptions = [
  { label: "Operational", key: "operational", color: "bg-green-500 hover:bg-green-600", icon: <CheckCircle className="w-4 h-4" /> },
  { label: "Performance Issue", key: "performanceIssue", color: "bg-yellow-500 hover:bg-yellow-600", icon: <AlertTriangle className="w-4 h-4" /> },
  { label: "Partial Outage", key: "partialOutage", color: "bg-orange-500 hover:bg-orange-600", icon: <AlertOctagon className="w-4 h-4" /> },
  { label: "Major Outage", key: "majorOutage", color: "bg-red-500 hover:bg-red-600", icon: <XCircle className="w-4 h-4" /> },
  { label: "Unknown", key: "unknown", color: "bg-gray-500 hover:bg-gray-600", icon: <HelpCircle className="w-4 h-4" /> },
];

export const ServiceStatusButtons = ({selectHandle, defaultValue=''}) => {
  const [selectedStatus, setSelectedStatus] = useState(defaultValue);

  const handleStatusChange = (key) => {
    setSelectedStatus(key);
    selectHandle(key);
    console.log("Selected Status:", key);
  };

  return (
    <div className="flex gap-2">
      {statusOptions.map((item) => (
        <Button
          key={item.key}
          className={`flex items-center gap-2 ${item.color} ${selectedStatus === item.key ? "border-2 border-white rounded-2xl" : ""}`}
          onClick={() => handleStatusChange(item.key)}
        >
          {item.icon}
          {item.label}
        </Button>
      ))}
    </div>
  );
};
