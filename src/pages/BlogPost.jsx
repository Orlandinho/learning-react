import { useParams } from "react-router-dom";

function BlogPost() {

  const params = useParams()
  return (
    <div className="container">
      This is post number { params.id}
    </div>
  );

}

export default BlogPost;