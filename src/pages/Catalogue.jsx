import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Catalogue() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/catalogue", {
          credentials: "include"
        })

        if (res.status === 401) {
          navigate("/login")
          return
        }

        const data = await res.json()
        setProducts(data.data.catalogue)
      } catch (error) {
        console.error("Erreur catalogue", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCatalogue()
  }, [navigate])

  if (loading) {
    return <h2 style={{ padding: 40 }}>Chargement...</h2>
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Catalogue B2B</h1>

      {products.length === 0 && <p>Aucun produit</p>}

      {products.map(product => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 15,
            borderRadius: 8
          }}
        >
          <h3>{product.name}</h3>

          <p>
            Prix :{" "}
            {product.priceB2B ?? product.priceBase}{" "}
            {product.currency}
          </p>

          <p>Stock : {product.stock}</p>
          <p>MOQ : {product.moq}</p>
        </div>
      ))}
    </div>
  )
}

export default Catalogue