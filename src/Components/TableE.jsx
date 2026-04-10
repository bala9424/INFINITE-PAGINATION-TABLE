import React, { useState, useEffect } from "react";
import useApi from "../hooks/useapi";

export default function TableExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [spost, setSpost] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const limit = 10;

  const { loading, post } = useApi({
    LIMIT: limit,
    pageNum: currentPage,
  });

  const totalPage = Math.ceil(100 / limit);

  // Sync API data
  useEffect(() => {
    setSpost(post);
  }, [post]);

  // 🔍 Search
  function handleSearch(query) {
    setSearchVal(query);

    if (!query) {
      setSpost(post);
      return;
    }

    const filtered = post.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );

    setSpost(filtered);
  }

  // 🔥 Sort (ASC / DESC toggle)
  function sortTable(key) {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    const sorted = [...spost].sort((a, b) => {
      if (typeof a[key] === "string") {
        return newOrder === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        return newOrder === "asc"
          ? a[key] - b[key]
          : b[key] - a[key];
      }
    });

    setSpost(sorted);
  }

  return (
    <div>
      {/* 🔍 Search */}
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchVal}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* 📊 Table */}
      <table border="1" cellPadding="8">
        
        <thead>
          <tr>
            <th   onClick={() => sortTable("id")}>Index ⬍</th>
            <th onClick={() => sortTable("title")}>Title ⬍</th>
            {/* <th onClick={() => sortTable("body")}>Body ⬍</th> */}
          </tr>
        </thead>

        <tbody>
          {spost.map((p, i) => (
            <tr key={p.id}>
              <td rowspan={i== 1 ? 1 : 1}>{i + 1 + (currentPage - 1) * limit}</td>
              <td>{p.title}</td>
              <td>{p.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔢 Pagination */}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: "5px",
              background: currentPage === i + 1 ? "blue" : "white",
              color: currentPage === i + 1 ? "white" : "black",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}