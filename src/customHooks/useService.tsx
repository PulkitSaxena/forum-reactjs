import { useState, useEffect } from "react";

/**
 * Custom hook to make api call
 * @param url 
 */
export default function useService(url: string) {
  const [data, setData] = useState([]);

  // Use effect to set async data
  useEffect(() => {
    async function getData() {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    }
    getData();
  }, [url]);

  return data;
}