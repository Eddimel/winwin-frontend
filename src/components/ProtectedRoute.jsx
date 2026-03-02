import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/me`, {
          credentials: "include"
        })

        if (res.ok) {
          setAuthenticated(true)
        } else {
          setAuthenticated(false)
        }
      } catch {
        setAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) return <h2 style={{ padding: 40 }}>Vérification session...</h2>

  if (!authenticated) return <Navigate to="/login" />

  return children
}

export default ProtectedRoute