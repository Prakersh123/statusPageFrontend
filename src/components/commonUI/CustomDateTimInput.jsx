/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/commonUI/CustomDateTimInput.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Sunday, February 2nd 2025, 11:14:33 am
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Label } from '@shadcn/ui';

const DateTimeInput = ({ label, value, onChange, onSubmit, buttonText }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="datetime">{label}</Label>
        <DatePicker
          id="datetime"
          selected={value}
          onChange={onChange}
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="MMMM d, yyyy h:mm aa"
          timeIntervals={15}
          className="shadcn-input" // ShadCN styled input
          placeholderText="Select date and time"
        />
      </div>

      <div>
        <Button onClick={onSubmit} className="w-full">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default DateTimeInput;
