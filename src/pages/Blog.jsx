import { Link } from "react-router-dom";

function Blog() {

  return (
    <div className="container">
      <ul>
        <li>
          <Link to="/blog/1">Post 1</Link>
        </li>
        <li>
          <Link to="/blog/2">Post 2</Link>
        </li>
      </ul>
    </div>
  );

}

export default Blog;