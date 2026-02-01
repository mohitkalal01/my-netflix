import { useEffect, useState } from 'react';

export default function useFetch(apiFunc) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await apiFunc();
        if (mounted) setData(res);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [apiFunc]);

  return { data, loading, error };
}
