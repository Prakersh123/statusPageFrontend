/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/commonUI/CustomCollapsible.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Sunday, February 2nd 2025, 10:06:42 am
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import React, { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

const CustomCollapsible = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full border rounded-lg p-3">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex justify-between items-center text-left bg-gray-900"
        >
          {title}
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 px-2">{children}</CollapsibleContent>
    </Collapsible>
  );
};

export default CustomCollapsible;
6