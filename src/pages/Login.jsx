import { API_BASE_URL } from "../config";
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState("phone")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const requestOtp = async () => {
    setMessage("")
    try {
      const res = await fetch(`${API_BASE_URL}/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone })
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error)
        return
      }

      setStep("otp")
      setMessage("OTP envoyé (voir terminal backend)")
    } catch {
      setMessage("Erreur serveur")
    }
  }

  const verifyOtp = async () => {
    setMessage("")
    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone, otp })
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error)
        return
      }

      navigate("/catalogue")
    } catch {
      setMessage("Erreur serveur")
    }
  }

  const resetToPhone = () => {
    setOtp("")
    setMessage("")
    setStep("phone")
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>WinWin B2B Login</h1>

      {step === "phone" && (
        <>
          <input
            type="text"
            placeholder="Téléphone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <br /><br />
          <button onClick={requestOtp}>
            Envoyer OTP
          </button>
        </>
      )}

      {step === "otp" && (
        <>
          <input
            type="text"
            placeholder="Code OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <br /><br />
          <button onClick={verifyOtp}>
            Vérifier OTP
          </button>
          <br /><br />
          <button onClick={requestOtp}>
            Renvoyer OTP
          </button>
          <br /><br />
          <button onClick={resetToPhone}>
            Changer numéro
          </button>
        </>
      )}

      <p>{message}</p>
    </div>
  )
}

export default Login