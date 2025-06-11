// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useCart } from "../store/cartStore";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addToCart = useCart((state) => state.addToCart);

  // Use the same API you use in Home
  const apiToUse = "dummyjson"; 

  const fetchProductDetail = () => {
    let apiUrl = "";
    if (apiToUse === "fakestore") {
      apiUrl = `https://fakestoreapi.com/products/${id}`;
    } else if (apiToUse === "dummyjson") {
      apiUrl = `https://dummyjson.com/products/${id}`;
    } else if (apiToUse === "escuela") {
      apiUrl = `https://api.escuelajs.co/api/v1/products/${id}`;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch product detail.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product) return null;

  // Extract fields
  let image = product.image || product.thumbnail || (product.images ? product.images[0] : "");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={image} alt={product.title} className="w-full md:w-1/2 object-contain rounded-lg" />
        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>

          <button
            onClick={() => addToCart({
              id: product.id,
              name: product.title,
              price: product.price,
              img: image,
            })}
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
