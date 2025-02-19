import React from "react";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Страница товара</h1>
      <p>ID товара: {id}</p>
    </div>
  );
}

export default ProductPage;
