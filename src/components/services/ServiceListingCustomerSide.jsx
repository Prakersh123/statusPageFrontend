/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/userManagement/ServiceListingCustomer.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 6:33:59 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import React, { useEffect, useState } from 'react'
import CustomTable from '../commonUI/CustomTable';
import axiosInstance from '@/lib/axiosHelper';
import TableSkeleton from '../commonUI/TableSkeleton';
import { CircleCheckBig, DeleteIcon, Edit, ShieldX, Trash2 } from 'lucide-react';
import useApi from '@/hooks/use-api';
import { Switch } from '../ui/switch';

import { CheckCircle, AlertTriangle, AlertOctagon, XCircle, HelpCircle } from "lucide-react";

const statusOptions = [
  { label: "Operational", key: "operational", color: "bg-green-500 hover:bg-green-600", icon: <CheckCircle className="w-4 h-4" /> },
  { label: "Performance Issue", key: "performanceIssue", color: "bg-yellow-500 hover:bg-yellow-600", icon: <AlertTriangle className="w-4 h-4" /> },
  { label: "Partial Outage", key: "partialOutage", color: "bg-orange-500 hover:bg-orange-600", icon: <AlertOctagon className="w-4 h-4" /> },
  { label: "Major Outage", key: "majorOutage", color: "bg-red-500 hover:bg-red-600", icon: <XCircle className="w-4 h-4" /> },
  { label: "Unknown", key: "unknown", color: "bg-gray-500 hover:bg-gray-600", icon: <HelpCircle className="w-4 h-4" /> },
];
const getButton = (value, list) => {
    return list.find((x) => (x.key == value))
};



export const ServiceListingCustomer = ({data=[]}) => {
    const columns = [
        {
            header: "Name",
            accessor: "name",
        },
        {
            header: "Stage",
            cell: (row) => <span  className={`${getButton(row.stage.value, statusOptions).color} p-2`}>{getButton(row.stage.value, statusOptions).label}</span>,
        },
        {
            header: "Group",
            cell: (row) => <span >{row.group.label}</span>,
        },
        {
            header: "Status",
            cell: (row) => <Switch checked={row.status} />,
        }
    ];


    const handleEdit = (row) => {
        console.log({
            name: row.name || "",
            serviceGroup: row.group.id || "",
            status: row.status || false,
            stage: row.stage.value || '',
            description: row.description || "",
            serviceID: row.serviceID
        });
        callEdit({
            name: row.name || "",
            serviceGroup: row.group.id || "",
            status: row.status || false,
            stage: row.stage.value || '',
            description: row.description || "",
            serviceID: row.serviceID
        });
        // console.log("Edit:", row);
    };

    const handleDelete = (row) => {
        console.log("Delete:", row);
    };

    // if (apiCall.loading) {
    //     return (<TableSkeleton />)
    // }
    return (
        
        <div>
            <CustomTable columns={columns} data={data} />
        </div>
    );
}
