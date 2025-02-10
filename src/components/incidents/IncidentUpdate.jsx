/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/homeDashboard/IncidentUpdate.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Sunday, February 2nd 2025, 10:11:58 am
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import React from 'react'
import { ServiceStatusButtons } from '../commonUI/ServiceStatusButtons'
import CustomCollapsible from '../commonUI/CustomCollapsible'
import { CheckCircle, Search, Eye, ThumbsUp, CircleAlert } from 'lucide-react';
import { Button } from '../ui/button';


const EachItem = ({data})=>{
  return <>
    <div className="mb-4">
      <span style={{fontSize: '20px', fontWeight: 'bold'}}>{data.heading}: </span>
      <span>{data.value}</span>
    </div>
  </>
}

const statusOptions = {
  reported: { 
    label: "Reported", 
    key: "reported", 
    color: "bg-blue-500 hover:bg-blue-600", 
    icon: <CircleAlert className="w-4 h-4" /> // Represents a reported issue with a blue alert
  },
  investigating: { 
    label: "Investigating", 
    key: "investigating", 
    color: "bg-yellow-500 hover:bg-yellow-600", 
    icon: <Search className="w-4 h-4" /> // A magnifying glass for investigation
  },
  identified: { 
    label: "Identified", 
    key: "identified", 
    color: "bg-orange-500 hover:bg-orange-600", 
    icon: <CheckCircle className="w-4 h-4" /> // A check mark indicating the issue has been identified
  },
  watching:{ 
    label: "Watching", 
    key: "watching", 
    color: "bg-red-500 hover:bg-red-600", 
    icon: <Eye className="w-4 h-4" /> // An eye icon to symbolize monitoring
  },
  fixed: { 
    label: "Fixed", 
    key: "fixed", // Changed key to "fixed" for clarity
    color: "bg-green-500 hover:bg-green-600", 
    icon: <ThumbsUp className="w-4 h-4" /> // A thumbs-up to indicate the issue has been resolved
  },
};
export const IncidentUpdate = ({data}) => {
    
  return (
    <div className='mb-4'>
              <CustomCollapsible title={data.incidentName} defaultOpen={true}>
               <EachItem data={{'heading':  'Service Group', 'value': data.serviceGroup.label}}/>
               <EachItem data={{'heading':  'Service ', 'value': data.service.label}}/>
               <EachItem data={{'heading':  'Description ', 'value': data.description}} />


                {/* <h1>Service Group</h1>
                <h3>{data.serviceGroup.label}</h3>
                <h1>Service</h1>
                <h3>{data.service.label}</h3>
                <h1>Description</h1>
                <h3>{data.description}</h3> */}

                {
                  data.updateList.map((item)=>{
                    {item}
                    return <>
                      <div className='mb-4'>
                        <div className='flex  justify-start'>
                          <Button className={`${statusOptions[item.stageValue].color} rounded-2xl`}>
                          {statusOptions[item.stageValue].icon}
                          {item.stageLabel}
                          </Button>
                          <div className='flex flex-col items-start'>
                            <span className='mx-2'>{item.dateValue}</span>
                            <span>{item.comment}</span>
                          </div>
                        </div>
                      </div>

                    </>
                  })
                }
              
              </CustomCollapsible>

    </div>
  )
}
