// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const fetchPosts = () => {
//   return axios.get("http://localhost:4000/posts");
// };

// const addPost = (post) => {
//   return axios.post("http://localhost:4000/posts", post);
// };
// export default function PostRQ() {
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");

//   const queryClient = useQueryClient();
//   const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
//     queryKey: ["posts"],
//     queryFn: fetchPosts,
//     // staleTime: 10000,
//     // refetchInterval: 1000,
//     // refetchIntervalInBackground:true,
//     // enabled: false,
//   });

//   const { mutate } = useMutation({
//     mutationFn: addPost,
//     // onSuccess: (newData) => {
//     //   queryClient.setQueryData(["posts"], (oldQueryData) => {
//     //     return {
//     //       ...oldQueryData,
//     //       data: [...oldQueryData.data, newData.data],
//     //     };
//     //   });
//     //   //   queryClient.invalidateQueries("posts");
//     // },

//     onMutate: async (newPost) => {
//       await queryClient.cancelQueries(["posts"]);
//       const prevPostData = queryClient.getQueryData(["posts"]);

//       queryClient.setQueryData(["posts"], (oldQueryData) => {
//         return {
//           ...oldQueryData,
//           data: [
//             ...(oldQueryData?.data || []),
//             {
//               ...newPost,
//               id: "temp-" + Date.now(), // temp id better than index
//             },
//           ],
//         };
//       });

//       return { prevPostData };
//     },
//     onError: (_error, _post, context) => {
//       if (context?.prevPostData) {
//         queryClient.setQueryData(["posts"], context.prevPostData);
//       }
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries(["posts"]);
//     },
//   });
//   //   const {mutate:updatePostMutation}=useMutation({
//   //     mutationFn: addPost
//   //   })
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const post = { title, body };
//     mutate(post);
//     setTitle("");
//     setBody("");
//   };

//   if (isLoading) {
//     return <div>Page is loading</div>;
//   }
//   if (isError) {
//     return <div>{error.message}</div>;
//   }

//   console.log(data, isFetching);

//   return (
//     <div className="post-list">
//       <form onSubmit={handleSubmit}>
//         <input
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Enter post title"
//           value={title}
//         />
//         <input
//           onChange={(e) => setBody(e.target.value)}
//           placeholder="Enter post body"
//           value={body}
//         />
//         <button type="submit">Post</button>
//       </form>
//       <button onClick={refetch}>List</button>
//       {data?.data.map((post) => (
//         <Link to={`/rq-posts/${post.id}`}>
//           <div className="post-item" key={post.id}>
//             <h3 className="post-title">{post.title}</h3>
//             {/* <p className="post-body">{post.body}</p> */}
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCrudQuery } from "../hooks/useCrudQuery"; // Assuming useCrudQuery is in ./hooks/useCrudQuery.js

// API functions
const fetchPosts = () => {
  return axios.get("http://localhost:4000/posts");
};

const addPost = (post) => {
  return axios.post("http://localhost:4000/posts", post);
};

const updatePost = (post) => {
  return axios.put(`http://localhost:4000/posts/${post.id}`, post);
};

const deletePost = (id) => {
  return axios.delete(`http://localhost:4000/posts/${id}`);
};

export default function PostRQ() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editPostId, setEditPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [showAddPostForm, setShowAddPostForm] = useState(true); // State to toggle form visibility

  const {
    query: { data, isLoading, isError, error, refetch },
    createMutation,
    updateMutation,
    deleteMutation,
  } = useCrudQuery({
    queryKey: ["posts"],
    fetchFn: fetchPosts,
    createFn: addPost,
    updateFn: updatePost,
    deleteFn: deletePost,
    getOptimisticData: (oldQueryData, newPost) => {
      return {
        ...oldQueryData,
        data: [
          ...(oldQueryData?.data || []),
          {
            ...newPost,
            id: "temp-" + Date.now(),
          },
        ],
      };
    },
    getOptimisticUpdateData: (oldQueryData, updatedPost) => {
      return {
        ...oldQueryData,
        data: oldQueryData?.data.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        ),
      };
    },
    getOptimisticDeleteData: (oldQueryData, deletedPostId) => {
      return {
        ...oldQueryData,
        data: oldQueryData?.data.filter((post) => post.id !== deletedPostId),
      };
    },
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, body };
    createMutation.mutate(newPost);
    setTitle("");
    setBody("");
    setShowAddPostForm(false); // Hide form after submission
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedPost = { id: editPostId, title: editTitle, body: editBody };
    updateMutation.mutate(updatedPost);
    setEditPostId(null);
    setEditTitle("");
    setEditBody("");
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleEditClick = (post) => {
    setEditPostId(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);
  };

  if (isLoading) {
    return (
      <div style={{ color: "#e0e0e0", textAlign: "center", padding: "50px" }}>
        Page is loading...
      </div>
    );
  }
  if (isError) {
    return (
      <div style={{ color: "#ff6b6b", textAlign: "center", padding: "50px" }}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div
      className="post-list-container"
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #333",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#1a1a1a", // Dark background
        color: "#e0e0e0", // Light text color
      }}
    >
      {/* Toggle Add Post Form Button */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setShowAddPostForm(!showAddPostForm)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6a0dad", // Purple color for visibility
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {showAddPostForm ? "Hide Add Post Form" : "Show Add Post Form"}
        </button>
      </div>

      {/* Create Post Form */}
      {showAddPostForm && (
        <>
          <h2
            style={{
              textAlign: "center",
              color: "#e0e0e0",
              marginBottom: "20px",
              borderBottom: "2px solid #444", // Darker border
              paddingBottom: "10px",
            }}
          >
            Create New Post
          </h2>
          <form
            onSubmit={handleAddSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "30px",
            }}
          >
            <input
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              value={title}
              required
              style={{
                padding: "10px",
                border: "1px solid #555", // Darker border for input
                borderRadius: "4px",
                fontSize: "16px",
                backgroundColor: "#2a2a2a", // Darker background for input
                color: "#e0e0e0", // Light text color
              }}
            />
            <textarea
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter post body"
              value={body}
              required
              rows="4"
              style={{
                padding: "10px",
                border: "1px solid #555",
                borderRadius: "4px",
                fontSize: "16px",
                resize: "vertical",
                backgroundColor: "#2a2a2a",
                color: "#e0e0e0",
              }}
            ></textarea>
            <button
              type="submit"
              disabled={createMutation.isPending}
              style={{
                padding: "10px 15px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              {createMutation.isPending ? "Adding..." : "Add Post"}
            </button>
          </form>
        </>
      )}

      <hr style={{ borderTop: "1px solid #444", margin: "40px 0" }} />

      {/* Edit Post Form (shown when a post is being edited) */}
      {editPostId && (
        <>
          <h2
            style={{
              textAlign: "center",
              color: "#e0e0e0",
              marginBottom: "20px",
              borderBottom: "2px solid #444",
              paddingBottom: "10px",
            }}
          >
            Edit Post
          </h2>
          <form
            onSubmit={handleUpdateSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "30px",
            }}
          >
            <input
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Edit title"
              value={editTitle}
              required
              style={{
                padding: "10px",
                border: "1px solid #555",
                borderRadius: "4px",
                fontSize: "16px",
                backgroundColor: "#2a2a2a",
                color: "#e0e0e0",
              }}
            />
            <textarea
              onChange={(e) => setEditBody(e.target.value)}
              placeholder="Edit body"
              value={editBody}
              required
              rows="4"
              style={{
                padding: "10px",
                border: "1px solid #555",
                borderRadius: "4px",
                fontSize: "16px",
                resize: "vertical",
                backgroundColor: "#2a2a2a",
                color: "#e0e0e0",
              }}
            ></textarea>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="submit"
                disabled={updateMutation.isPending}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                {updateMutation.isPending ? "Updating..." : "Update Post"}
              </button>
              <button
                type="button"
                onClick={() => setEditPostId(null)}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
          <hr style={{ borderTop: "1px solid #444", margin: "40px 0" }} />
        </>
      )}

      {/* List Posts */}
      <h2
        style={{
          textAlign: "center",
          color: "#e0e0e0",
          marginBottom: "20px",
          borderBottom: "2px solid #444",
          paddingBottom: "10px",
        }}
      >
        All Posts
      </h2>
      <button
        onClick={refetch}
        style={{
          display: "block",
          margin: "0 auto 30px auto",
          padding: "10px 20px",
          backgroundColor: "#17a2b8",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        Refresh Posts
      </button>
      {data?.data.length === 0 && (
        <p style={{ textAlign: "center", color: "#b0b0b0" }}>
          No posts available.
        </p>
      )}
      <div className="posts-grid" style={{ display: "grid", gap: "20px" }}>
        {data?.data.map((post) => (
          <div
            className="post-item"
            key={post.id}
            style={{
              backgroundColor: "#2a2a2a", // Darker background for post items
              border: "1px solid #3a3a3a", // Slightly lighter border
              borderRadius: "8px",
              padding: "15px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)", // More prominent shadow
            }}
          >
            <Link
              to={`/rq-posts/${post.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3
                className="post-title"
                style={{
                  margin: "0 0 10px 0",
                  color: "#90caf9", // Lighter blue for titles
                  fontSize: "20px",
                }}
              >
                {post.title}
              </h3>
            </Link>
            <p
              className="post-body"
              style={{
                color: "#c0c0c0", // Lighter grey for body text
                lineHeight: "1.6",
                marginBottom: "15px",
              }}
            >
              {post.body}
            </p>{" "}
            <div
              className="post-actions"
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => handleEditClick(post)}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#ffd740", // Amber for edit
                  color: "#333", // Dark text for contrast
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                disabled={deleteMutation.isPending}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#ff8a80", // Light red for delete
                  color: "#333", // Dark text for contrast
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
