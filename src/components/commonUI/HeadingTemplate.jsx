/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/commonUI/mainMenuTemplate.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 3:42:36 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import { Plus } from "lucide-react";
import { Button } from "../ui/button";

// import React from 'react'

export default function HeadingTemplate({headingTab, buttonText, handleButtonCallBack, buttonLoading, isButtonAllow}) {
    
    return (
      <div className="flex justify-between flex-wrap items-center mb-10">
        <h1 className="text-2xl font-bold mb-4">{headingTab}</h1>
        
        {isButtonAllow?<Button onClick={handleButtonCallBack} disabled={buttonLoading}><Plus/>{buttonText}</Button>:<></>}
      </div>
    )
  }
  