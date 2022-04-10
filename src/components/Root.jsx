import NavBar from "./NavBar";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import Page404 from "../pages/Page404";

function Root() {

  const routes = [
    {path: "/", Component: App },
    {path: "/about", Component: About },
    {path: "/contact", Component: Contact },
    {path: "/blog", Component: Blog },
    {path: "/blog/:id", Component: BlogPost },
    {path: "*", Component: Page404 },
  ]

  return (
    <BrowserRouter>
      <div className="todo-app-container">
        <NavBar />

        <div className="container">
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </div>
      </div>
    </BrowserRouter>

    /*<BrowserRouter>
      <div className="todo-app-container">

        <NavBar />

        <div className="content">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>*/
  );

}

export default Root;