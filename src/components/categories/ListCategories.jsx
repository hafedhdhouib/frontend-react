import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ViewCategories from "./ViewCategories";
const Listcategories = () => {
  const [categories, setCategories] = useState([]);
  const getcategories = async () => {
    await axios
      .get("https://backend-laravel-umber.vercel.app/api/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getcategories();
  }, []);
  return (
    <div>
      <Button variant="contained" style={{ backgroundColor: "black" }}>
        <Link
          to="/categories/add"
          style={{
            color: "white",

            textDecoration: "none",
          }}
        >
          <i className="fa-solid fa-plus-square"></i> Nouveau
        </Link>
      </Button>
      <h2>Liste des catégories </h2>
      <ViewCategories categories={categories} setCategories={setCategories} />
    </div>
  );
};
export default Listcategories;
