import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import axios from "axios";
import Card from "./Card";

function Listarticlescard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(18);
  const [articles, setArticles] = useState([]);
  const fetchProducts = async (page, limit) => {
    try {
      const res = await axios.get(
        `https://laravel-backend-seven.vercel.app/api/api/articles/art/articlespaginate?pageSize=${limit}&page=${page}`
      );
      setArticles(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts(currentPage, limit);
  }, [currentPage, limit]);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="card-container">
        {articles.map((art, index) => (
          <Card key={index} article={art} />
        ))}
      </div>
      <Pagination
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
}

export default Listarticlescard;
