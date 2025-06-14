import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

// Fetch with pagination
const fetchTodos = (pageId) => {
  return axios.get(`http://localhost:4000/todos/?_limit=3&_page=${pageId}`);
};

export default function PaginatedQueries() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["todos", page], // include page in queryKey
    queryFn: () => fetchTodos(page),
    // keepPreviousData: true,
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="post-list">
      {data?.data.map((todo) => (
        <div className="post-item" key={todo.id}>
          <h3 className="post-title">{todo.title}</h3>
        </div>
      ))}

      <div className="pagination-buttons" style={{ marginTop: "1rem" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span style={{ margin: "0 1rem" }}>Page {page}</span>

        <button
          onClick={() => setPage((next) => next + 1)}
          disabled={data?.data.length < 3}
        >
          Next
        </button>
      </div>

      {isFetching && <p style={{ fontSize: "12px" }}>Updating...</p>}
    </div>
  );
}
