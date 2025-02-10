/*
 *Filename: /home/codestax/statusPage/vite-project/src/store/reducers/incidentActions.js *
 *Path: /home/codestax/statusPage/vite-project                                 *
 *Created Date: Sunday, February 9th 2025, 10:08:06 am                         *
 *Author: Prakersharya                                                         *
 *                                                                             *
 *Copyright (c) 2025 Trinom Digital Pvt Ltd                                    *
 */

import axiosInstance from "@/lib/axiosHelper";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch services from API
export const fetchIncidents = createAsyncThunk("incident/fetchIncidents", async () => {
    const response = await axiosInstance.get("/incident/dashboardv2"); // Replace with actual API
    return response.listItems || [];
});