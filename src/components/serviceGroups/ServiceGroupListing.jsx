/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/userManagement/ServiceGroupListing.jsx
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
import { Edit, Trash2 } from 'lucide-react';
import useApi from '@/hooks/use-api';
const colapsed = [
    { value: "false", label: "Always Expanded" },
    { value: "true", label: "Always Collapsed" },
];
export const ServiceGroupListing = ({fetchAgain, callEdit}) => {
     const apiCall = useApi({
            url: 'service-group/list',
            method: "GET"
        });
        useEffect(() => {
            apiCall.refetch();
        }, [fetchAgain])
    const columns = [
        {
            header: "Name",
            accessor: "serviceGroupName",
        },
        {
            header: "Visibility",
            accessor: "visibility",
        },
        {
            header: "collapsed",
            cell: (row) => <span className="font-medium">{row.collapsed ? 'Always Collapsed': 'Always Expanded'}</span>,
        },
        {
            header: "Actions",
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                        onClick={() => handleEdit(row)}
                    >
                        <Edit/>
                    </button>
                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDelete(row)}
                    >
                        <Trash2/>
                    </button>
                </div>
            ),
        },
    ];

    

    const handleEdit = (row) => {
        console.log("Edit:", row);
        console.log({
            name: row.serviceGroupName || "",
            serviceGroupID: row.serviceGroupID || "",
            visibility: row.visibility || "",
            colapsed: row.collapsed
        })

        callEdit({
            name: row.serviceGroupName || "",
            serviceGroupID: row.serviceGroupID || "",
            visibility: row.visibility || "",
            colapsed: row.collapsed
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
