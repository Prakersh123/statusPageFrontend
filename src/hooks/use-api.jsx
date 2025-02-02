/*
 * Filename: /home/codestax/statusPage/vite-project/src/hooks/use-api.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 9:51:20 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosHelper";

export default function useApi(requestConfig) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance({
        url: requestConfig.url,
        method: requestConfig.method
      });
      console.log(response);
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Re-fetch when the URL changes

  return { data, loading, error, refetch: fetchData };
}