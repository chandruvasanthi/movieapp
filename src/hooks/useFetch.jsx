import { useEffect, useState } from 'react';

const useFetch = (apiPath, queryTerm = "", currentPage = 1) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const key = "c58c0cd7ccadd426a1bdcd63500303ad";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = apiPath.startsWith('search/') && queryTerm
            ? `https://api.themoviedb.org/3/${apiPath}?api_key=${key}&query=${queryTerm}&page=${currentPage}`
            : `https://api.themoviedb.org/3/${apiPath}?api_key=${key}&page=${currentPage}`;

        const res = await fetch(url);
        const json = await res.json();

        if (!json.results) return;
        setData(json.results);
        setTotalPages(json.total_pages);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchData();
  }, [apiPath, queryTerm, currentPage]);

  return { data, totalPages };
};

export default useFetch;
