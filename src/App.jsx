import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editarticle from "./components/articles/EditArticle";
import Insertarticle from "./components/articles/InsertArticle";
import Listarticles from "./components/articles/ListArticle";
import Editcategories from "./components/categories/EditCategories";
import Insertcategories from "./components/categories/InsertCategories";
import Listcategories from "./components/categories/ListCategories";
import Editscategories from "./components/scategories/EditScategories";
import Insertscategories from "./components/scategories/InsertScategories";
import Listscategories from "./components/scategories/ListScategories";
import Viewarticle from "./components/articles/ViewArticle";
import Viewcategories from "./components/categories/ViewCategories";
import Viewscategories from "./components/scategories/ViewScategories";
import Menu from "./components/Menu";
import Listarticlescard from "./components/client/Listarticlescard";
import { CartProvider } from "use-shopping-cart";
import Cart from "./components/client/shopping/Card";
const App = () => {
  return (
    <div>
      <CartProvider>
        <Router>
          <Menu />
          <Routes>
            <Route path="/articles" element={<Listarticles />} />
            <Route path="/articles/add" element={<Insertarticle />} />
            <Route path="/article/edit/:id" element={<Editarticle />} />
            <Route path="/article/view/:id" element={<Viewarticle />} />
            <Route path="/categories" element={<Listcategories />} />
            <Route path="/categories/add" element={<Insertcategories />} />
            <Route path="/categories/edit/:id" element={<Editcategories />} />
            <Route path="/categories/view/:id" element={<Viewcategories />} />
            <Route path="/scategories" element={<Listscategories />} />
            <Route path="/scategories/add" element={<Insertscategories />} />
            <Route path="/scategories/edit/:id" element={<Editscategories />} />
            <Route path="/scategories/view/:id" element={<Viewscategories />} />
            <Route path="/articlescard" element={<Listarticlescard />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
};
export default App;
