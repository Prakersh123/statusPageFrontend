/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/homeDashboard/SIngleServiceStatus.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Sunday, February 2nd 2025, 10:11:58 am
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import React from 'react'
import { ServiceStatusButtons } from '../commonUI/ServiceStatusButtons'
import CustomCollapsible from '../commonUI/CustomCollapsible'

export const SingleServiceStatus = ({data}) => {
  return (
    <div className='mb-4'>
              <CustomCollapsible title={data.serviceGroup.label} defaultOpen={true}>
                {
                  data.services.map((item)=>{
                    return <>
                      <h1 className='my-4'>{item.label}</h1>
                      <ServiceStatusButtons selectHandle={()=>{}} defaultValue={item.stage.value}/>                      
                    </>
                  })
                }
              
              </CustomCollapsible>

    </div>
  )
}
