/*
 *Filename: /home/codestax/statusPage/vite-project/src/store/reducers/incidentReducer.js *
 *Path: /home/codestax/statusPage/vite-project                                 *
 *Created Date: Sunday, February 9th 2025, 9:52:47 am                          *
 *Author: Prakersharya                                                         *
 *                                                                             *
 *Copyright (c) 2025 Trinom Digital Pvt Ltd                                    *
 */

import { createSlice } from '@reduxjs/toolkit'
import { fetchIncidents } from './incidentActions';

export const incidentSlice = createSlice({
  name: 'incident',
  initialState: {
    dataList: [],
    dataLoading: false
},
  reducers: {
    updateIncident: (state, action) => {
        let element = state.dataList.findIndex((item) => (item.id == action.payload.incidentData.id));
        console.log(action.payload);
        alert('2');
        console.log(element);
        if (element != -1) {
            state.dataList[element] = action.payload.incidentData;
        } else {
            console.log('hii');
            alert('hiiiii');
            state.dataList.push(action.payload.incidentData);
        }
    },
    addFullList: (state, action) => {
      state.dataList = action.payload.listItems;
    },
    updateLoader: (state, action) => {
      state.dataLoading = action.payload.value;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncidents.pending, (state) => {
        state.dataLoading = true; // Set loading state
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        console.log(action);
        state.dataList = action.payload; // Store API response
        state.dataLoading = false;
      })
      .addCase(fetchIncidents.rejected, (state) => {
        state.dataLoading = false; // Reset loading state on error
      });
  },
})

// Action creators are generated for each case reducer function
export const { updateIncident, addFullList, updateLoader } = incidentSlice.actions

export default incidentSlice.reducer