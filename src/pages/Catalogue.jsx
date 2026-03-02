import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Catalogue() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      navigate("/login");
    } catch (error) {
      console.error("Erreur logout", error);
    }
  };

  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/catalogue`, {
          credentials: "include",
        });

        if (res.status === 401) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setProducts(data.data.catalogue);
      } catch (error) {
        console.error("Erreur catalogue", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogue();
  }, [navigate]);

  if (loading) {
    return <h2 style={{ padding: 40 }}>Chargement...</h2>;
  }

  return (
    <div style={{ padding: 40 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <h1>Catalogue B2B</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#000",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Se déconnecter
        </button>
      </div>

      {products.length === 0 && <p>Aucun produit</p>}

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 15,
            borderRadius: 8,
          }}
        >
          <h3>{product.name}</h3>

          <p>
            Prix : {product.priceB2B ?? product.priceBase} {product.currency}
          </p>

          <p>Stock : {product.stock}</p>
          <p>MOQ : {product.moq}</p>
        </div>
      ))}
    </div>
  );
}

export default Catalogue;