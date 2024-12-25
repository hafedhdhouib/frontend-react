import React, { useEffect, useState } from "react";
import axios from "axios";
import "./categorie.css";
import { useParams, useNavigate } from "react-router-dom";
const EditCategories = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categorie, setCategorie] = useState({});
  const loadcategorie = async () => {
    axios
      .get(`https://backend-laravel-tau.vercel.app/api/api/categories/${id}`)
      .then((response) => {
        setCategorie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    loadcategorie();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    //faire le put dans la BD
    axios
      .put(
        `https://backend-laravel-tau.vercel.app/api/api/categories/${id}`,
        categorie
      )
      .then((res) => {
        console.log(res);
        navigate("/categories");
      })
      .catch((error) => {
        console.log(error);
        alert("Erreur ! Modification non effectuée");
      });
  };

  return (
    <div className="form-container">
      <form className="categorie-form">
        <h2>Modifier Catégorie</h2>

        <div className="form-group">
          <label htmlFor="Nom">Nom catégorie</label>
          <input
            type="text"
            id="reference"
            value={categorie.nomcategorie}
            onChange={(e) =>
              setCategorie({ ...categorie, nomcategorie: e.target.value })
            }
            className="form-input"
            placeholder="Entrez nom catégorie"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            required
            id="imagecategorie"
            value={categorie.imagecategorie}
            onChange={(e) =>
              setCategorie({ ...categorie, imagecategorie: e.target.value })
            }
            className="form-input"
            placeholder="Image"
          />
          {categorie.imagecategorie ? (
            <img src={categorie.imagecategorie} alt="image" width="70" />
          ) : null}
        </div>
        <button
          type="button"
          className="form-submit-button"
          onClick={(e) => handleSubmit(e)}
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default EditCategories;
