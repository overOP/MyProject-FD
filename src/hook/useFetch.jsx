import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook to fetch data from a given URL.
 *
 * @param {string} url - The endpoint URL to fetch data from.
 * @returns {[any[], boolean, any]} - Returns [data, loading, error].
 */
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let isMounted = true; // to prevent state update if component unmounted

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(url);
        if (isMounted) {
          setData(response.data?.data || response.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          console.error("Error fetching data:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to avoid setting state after unmount
    return () => {
      isMounted = false;
    };
  }, [url]);

  return [data, loading, error];
};

export default useFetch;
