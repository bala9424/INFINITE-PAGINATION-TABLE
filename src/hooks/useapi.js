import { useState, useEffect } from "react";

export default function useApi({ LIMIT, pageNum }) {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=${LIMIT}`
        );

        const data = await res.json();

        setPost((prev) => [...data]);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNum, LIMIT]);

  return { post, loading };
}