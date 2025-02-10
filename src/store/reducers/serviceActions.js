/*
 *Filename: /home/codestax/statusPage/vite-project/src/store/reducers/serviceActions.js *
 *Path: /home/codestax/statusPage/vite-project                                 *
 *Created Date: Sunday, February 9th 2025, 10:08:06 am                         *
 *Author: Prakersharya                                                         *
 *                                                                             *
 *Copyright (c) 2025 Trinom Digital Pvt Ltd                                    *
 */

import axiosInstance from "@/lib/axiosHelper";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch services from API
export const fetchServices = createAsyncThunk("service/fetchServices", async () => {
    const response = await axiosInstance.get("/service/listv2"); // Replace with actual API
    return response.listItems || [];
});


// export const updateServiceStage = createAsyncThunk("service/updateServiceStage", async (payload) => {
//   const response = await axios.put(`/api/services/${payload.serviceID}`, {
//     stage: payload.stage,
//   });
//   return { serviceID: payload.serviceID, stage: response.data.stage };
// });
