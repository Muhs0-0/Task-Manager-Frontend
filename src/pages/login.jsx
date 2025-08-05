import { useState } from "react"
import "../styles/login.css"
import { useNavigate } from "react-router-dom"
export default function Login() {
    const [email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [issue, setIssue] = useState("")
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email.trim()) return setIssue("❌ Enter an email ");
        if (!Password.trim()) return setIssue("❌ password is required");
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    Password: Password
                })
            });
            const data = await res.json();
            if (!res.ok) {
                // If there's a backend error (like 400 or 500), show error message
                setIssue(`❌ Error: ${data.message}`);
            } else {
                // If response is OK (status 200-299), show success message

                setIssue(`✅ ${data.message || "loging in please wait a second.."}`);
                setLoading(true);
                setTimeout(() => {
                    navigate(`/home/${data.user._id}`);
                }, 3000);
            }

        } catch (err) {
            console.log(`error login in. ${err.message}`)
            setIssue("❌ error login in")
        }
    }
    return (
        <div className="login">
            <form className="form" onSubmit={handleSubmit}>
                <h3>login</h3>
                {/* <h4>Email</h4> */}
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                {/* <h4>password</h4> */}
                <input
                    type="Password"
                    placeholder="Password"
                    value={Password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit" >log in</button>
                {issue && <p style={{ color: issue.startsWith("✅") ? "green" : "red" }}>{issue}</p>}
                {loading && <div className="spinner"></div>}


            </form></div>
    )
}
