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
import { CheckCircle, Search, Eye, ThumbsUp, CircleAlert } from 'lucide-react';
const statusOptions = [
  { 
    label: "Reported", 
    key: "reported", 
    color: "bg-blue-500 hover:bg-blue-600", 
    icon: <CircleAlert className="w-4 h-4" /> // Represents a reported issue with a blue alert
  },
  { 
    label: "Investigating", 
    key: "investigating", 
    color: "bg-yellow-500 hover:bg-yellow-600", 
    icon: <Search className="w-4 h-4" /> // A magnifying glass for investigation
  },
  { 
    label: "Identified", 
    key: "identified", 
    color: "bg-orange-500 hover:bg-orange-600", 
    icon: <CheckCircle className="w-4 h-4" /> // A check mark indicating the issue has been identified
  },
  { 
    label: "Watching", 
    key: "watching", 
    color: "bg-red-500 hover:bg-red-600", 
    icon: <Eye className="w-4 h-4" /> // An eye icon to symbolize monitoring
  },
  { 
    label: "Fixed", 
    key: "fixed", // Changed key to "fixed" for clarity
    color: "bg-green-500 hover:bg-green-600", 
    icon: <ThumbsUp className="w-4 h-4" /> // A thumbs-up to indicate the issue has been resolved
  },
];


export const IncidentStatusButtons = ({selectHandle, defaultValue=''}) => {
  const [selectedStatus, setSelectedStatus] = useState(defaultValue);

  const handleStatusChange = (key) => {
    setSelectedStatus(key);
    selectHandle(key);
    console.log("Selected Status:", key);
  };

  return (
    <div className="flex gap-2 flex-row flex-wrap ">
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
