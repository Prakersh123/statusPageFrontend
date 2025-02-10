/*
 *Filename: /home/codestax/statusPage/vite-project/src/store/index.js          *
 *Path: /home/codestax/statusPage/vite-project                                 *
 *Created Date: Sunday, February 9th 2025, 9:49:53 am                          *
 *Author: Prakersharya                                                         *
 *                                                                             *
 *Copyright (c) 2025 Trinom Digital Pvt Ltd                                    *
 */

 import { configureStore } from '@reduxjs/toolkit'
import  serviceSlice  from './reducers/serviceReducer'
import  incidentSlice  from './reducers/incidentReducer'


 export default configureStore({
   reducer: {
    service: serviceSlice,
    incident: incidentSlice
   },
 })