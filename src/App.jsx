import "./App.css";

import { Routes, Route, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import PostRQ from "./components/PostRQ";
import Home from "./components/Home";
import PostsTraditional from "./components/PostsTraditional";
import PostDetailRQ from "./components/PostDetailRQ";
import PaginatedQueries from "./components/PaginatedQueries";
import InfiniteQueries from "./components/InfiniteQueries"; // Corrected component import
import Simple from "./Motion/Simple";
import Login from "./firebase/auth/Login";
import SignUp from "./firebase/auth/SignUp";
import { useContext } from "react";
import { AuthContext } from "./firebase/providers/AuthProvider";
import PrivateRoute from "./firebase/PrivateRoute";

function App() {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  function handleSignout() {
    signOutUser()
      .then(() => {
        console.log("User signout successfully");
        navigate("/login"); // Redirect to login after signout
      })
      .catch((error) => {
        console.log("error signout", error.message);
      });
  }

  // Removed console.log(name); as 'name' is not defined in this scope
  // If 'name' was intended to come from AuthContext, access it as:
  // const { user, signOutUser, name } = useContext(AuthContext);
  // console.log(name); // Now this would work if 'name' is in AuthContext

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* Conditional rendering for authenticated user links */}
          {user ? (
            <>
              <li>
                <Link to="/posts">Traditional Posts</Link>
              </li>
              <li>
                <Link to="/rq-posts">RQ Posts</Link>
              </li>
              <li>
                <Link to="/paginated">Paginated Queries</Link>
              </li>
              <li>
                <Link to="/infinite">Infinite Queries</Link>
              </li>
              <li>
                <Link to="/motion-simple">Motion Simple</Link>
              </li>
              <li>
                <button onClick={handleSignout}>Sign Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostsTraditional />} />
        <Route path="/rq-posts" element={<PostRQ />} />
        <Route path="/rq-posts/:id" element={<PostDetailRQ />} />
        <Route path="/paginated" element={<PaginatedQueries />} />
        <Route path="/infinite" element={<InfiniteQueries />} />
        <Route
          path="/motion-simple"
          element={
            <PrivateRoute>
              <Simple />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
