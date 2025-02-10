/*
 * Filename: /home/codestax/statusPage/vite-project/src/components/commonUI/CustomTable.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 6:32:41 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { useState } from "react";

export default function CustomTable({ columns, data }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data based on search query
  const filteredData = data.filter((row) =>
    columns.some((column) => {
      const value = column.accessor ? row[column.accessor] : column.cell(row);
      return value?.toString().toLowerCase().includes(searchQuery.toLowerCase());
    })
  );
  return (
    
    <div className="rounded-md border">
      {/* Search Input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
        {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {column.accessor ? row[column.accessor] : column.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results found
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </div>
  );
}