import { useEffect, useState, useRef } from 'react';

const useFetch = (apiPath, queryTerm = "", currentPage = 1) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cache = useRef({});
  const apiKey = "c58c0cd7ccadd426a1bdcd63500303ad";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const url = apiPath.startsWith('search/') && queryTerm
        ? `https://api.themoviedb.org/3/${apiPath}?api_key=${apiKey}&query=${queryTerm}&page=${currentPage}`
        : `https://api.themoviedb.org/3/${apiPath}?api_key=${apiKey}&page=${currentPage}`;

      const cacheKey = `${url}`;
      if (cache.current[cacheKey]) {
        const cached = cache.current[cacheKey];
        setData(cached.results || []);
        setTotalPages(cached.total_pages || 1);
        setLoading(false);
        return;
      }try {
        const res = await fetch(url);
        const json = await res.json();
        if (!json.results) {
          setData([]);
          setTotalPages(1);
          return;
        }
        cache.current[cacheKey] = json;
        setData(json.results);
        setTotalPages(json.total_pages || 1);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch data.");
        setData([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiPath, queryTerm, currentPage]);

  return { data, totalPages, loading, error };
};

export default useFetch;
