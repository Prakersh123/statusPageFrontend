/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/userManagement/IncidentListing.jsx
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
import { CircleCheckBig, DeleteIcon, Edit, ShieldX, Trash2, CircleAlert, Search, CheckCircle, ThumbsUp, Eye } from 'lucide-react';
import useApi from '@/hooks/use-api';
import { Switch } from '../ui/switch';
import useView from '@/hooks/use-view';
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

  const getButton = (value, list) => {
    return list.find((x) => (x.key == value))
};
export const IncidentListing = ({fetchAgain, callEdit}) => {
            const {editAllowed} = useView();
    
    const apiCall = useApi({
        url: '/incident/list',
        method: 'GET'
    });
    useEffect(() => {
        // setIsDataFetching(true);
        // fetchTableData();
        apiCall.refetch();
    }, [fetchAgain])

    // const fetchTableData = async () => {
    //     await axiosInstance.get('/service');
    //     setIsDataFetching(false);
    // }
    const columns = [
        {
            header: "Name",
            accessor: "name",
        },
        {
            header: "Stage",
            cell: (row) => <span className={`${getButton(row.currentStage.value, statusOptions).color} p-2 rounded`}>{getButton(row.currentStage.value, statusOptions).label}</span>,

        },
        {
            header: "Group",
            cell: (row) => <span className="font-medium">{row.serviceGroup.label}</span>,
        },
        {
            header: "Actions",
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                        onClick={() => handleEdit(row)}
                        disabled={!editAllowed}
                    >
                        <Edit/>
                    </button>

                </div>
            ),
        },
    ];

    const handleEdit = (row) => {
        console.log("Edit:", row, {   
            name: row.name || "",
            serviceGroup: row.service.value || "",
            stage: row.currentStage.value || "",
            description: row.description || "",
            comment: row.updates[row.updates.length-1].comment || "",
            dateTimeValue: row.updates[row.updates.length-1].performedAt || "",
            incidentID: row.incidentID
        });

        callEdit({   
            name: row.name || "",
            serviceGroup: row.service.value || "",
            stage: row.currentStage.value || "",
            description: row.description || "",
            comment: row.updates[row.updates.length-1].comment || "",
            dateTimeValue: Date(row.updates[row.updates.length-1].performedAt) || "",
            incidentID: row.incidentID

        })
    };

    const handleDelete = (row) => {
        console.log("Delete:", row);
    };

    if (apiCall.loading) {
        return (<TableSkeleton />)
    }
    return (
        
        <div>
            <CustomTable columns={columns} data={apiCall.data.listItems} />
        </div>
    );
}
