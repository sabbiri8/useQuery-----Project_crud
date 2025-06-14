import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostRQ from "./components/PostRQ";
import Home from "./components/Home";
import PostsTraditional from "./components/PostsTraditional";
import PostDetailRQ from "./components/PostDetailRQ";
import PaginatedQueries from "./components/PaginatedQueries";
import PostInfinRq from "./components/InfiniteQueries";
import InfiniteQueries from "./components/InfiniteQueries";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li>
              <Link to="/rq-posts">RQ Posts</Link>
            </li>
            <li>
              <Link to="/paginated-todos">RQ Todos</Link>
            </li>
            <li>
              <Link to="/post-infi">InfinityRQ</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/posts" element={<PostsTraditional />} />
          <Route exact path="/rq-posts" element={<PostRQ />} />
          <Route exact path="/rq-posts/:postId" element={<PostDetailRQ />} />
          <Route exact path="/paginated-todos" element={<PaginatedQueries />} />
          <Route exact path="/post-infi" element={<InfiniteQueries />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
