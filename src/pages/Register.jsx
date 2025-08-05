import Header from "./header"
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"
import { useState } from "react"

export default function Register() {
    const [issue, setIssue] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
                ,
                body: JSON.stringify({
                    name: name,
                    email: email,
                    Password: Password
                })
            });
            if (!name.trim()) return setIssue("❌ Name is required");
            if (!email.includes("@")) return setIssue("❌ Enter a valid email");
            if (!Password.trim()) return setIssue("❌ password is required");

            const data = await res.json();
            if (!res.ok) {
                // If there's a backend error (like 400 or 500), show error message
                setIssue(`❌ Error or user already exist`);
            } else {
                // If response is OK (status 200-299), show success message
                setIssue(`✅ ${data.message || "you're registered please wait a second.."}`);
                setLoading(true);
                setTimeout(() => {
                    navigate(`/home/${data.user._id}`);
                }, 3000);
            }
        } catch (err) {
            // If there's a network error (server is off or unreachable)
            setIssue("❌ Network error or server not running");
            console.error(err); // Log the error in the browser console for debugging
        }
    }
    return (
        <>
            <Header />
            <div className="register">

                <h3>Acount Sameso</h3>
                <form className="Form" onSubmit={handleSubmit}>
                    <h4>magamca</h4>
                    <input
                        type="text"
                        placeholder="magaca"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <h4>Email</h4>
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <h4>password</h4>
                    <input
                        type="Password"
                        placeholder="Password"
                        value={Password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" >Samee Acount</button>
                    {issue && <p style={{ color: issue.startsWith("✅") ? "green" : "red" }}>{issue}</p>}
                    {loading && <div className="spinner"></div>}

                </form>
                <h3>acount hore hadii ad ledahy 👇</h3>
                <button onClick={() => navigate("/login")}>Login</button>
            </div>

        </>
    )
}
