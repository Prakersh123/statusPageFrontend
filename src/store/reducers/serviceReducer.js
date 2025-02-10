/*
 *Filename: /home/codestax/statusPage/vite-project/src/store/reducers/serviceReducer.js *
 *Path: /home/codestax/statusPage/vite-project                                 *
 *Created Date: Sunday, February 9th 2025, 9:52:47 am                          *
 *Author: Prakersharya                                                         *
 *                                                                             *
 *Copyright (c) 2025 Trinom Digital Pvt Ltd                                    *
 */

import { createSlice } from '@reduxjs/toolkit'
import { fetchServices } from './serviceActions';

export const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    serviceList: [],
    dataLoading: false
},
  reducers: {
    updateServiceStage: (state, action) => {
        let element = state.serviceList.findIndex((item) => (item.serviceID == action.payload.serviceID));
        if (element != -1) {
            state.serviceList[element].stage = action.payload.stage;
        } else {
            alert('New Item addedd');
        }
    },
    addFullList: (state, action) => {
      state.serviceList = action.payload.listItems;
    },
    updateLoader: (state, action) => {
      state.dataLoading = action.payload.value;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.dataLoading = true; // Set loading state
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        console.log(action);
        state.serviceList = action.payload; // Store API response
        state.dataLoading = false;
      })
      .addCase(fetchServices.rejected, (state) => {
        state.dataLoading = false; // Reset loading state on error
      });
  },
})

// Action creators are generated for each case reducer function
export const { updateServiceStage, addFullList, updateLoader } = serviceSlice.actions

export default serviceSlice.reducer