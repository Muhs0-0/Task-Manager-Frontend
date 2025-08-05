import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { DeleteTask, UpdateTask } from '../operation.js'
import Header from './header.jsx'
import '../App.css'

export default function HomePage() {
    const [Tasks, setTasks] = useState([])
    const [inputvalue, setinputvalue] = useState('')
    const [error, seterror] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedText, setEditedText] = useState('');
    const navigate = useNavigate();
    const [isUserValid, setIsUserValid] = useState(true);

    const { userId } = useParams(); // 👈 Get userId from URL

    const FetchTasks = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/tasks?user=${userId}`);
            if (!res.ok) {
                throw new Error("Server error");
            }
            const data = await res.json()
            setTasks(data)
            seterror(false)
        } catch (err) {
            console.error("coun't fetch Tasks:", err.message);
            seterror(true)
        }
    }
    // check if user was deleted
    const validateUser = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/users/${userId}`);
            if (!res.ok) {
                alert("User no longer exists + task. Create a new account.");
                setIsUserValid(false);
                navigate("/");
            } else {
                setIsUserValid(true); // ✅ this was missing
            }
        } catch (err) {
            console.error("Validation error:", err.message);
            setIsUserValid(false);
            navigate("/");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isUserValid) return; // ✅ prevent task creation
        if (inputvalue.trim() === "") {
            alert("Task can't be empty");
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Api/AddTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // ✅ correct
                },
                body: JSON.stringify({
                    task: inputvalue,
                    userId
                }),
            })
            const newTask = await res.json()
            setTasks([...Tasks, newTask])
            setinputvalue('')
        } catch (err) {
            console.error("Error submitting")

        }
    }
    const handleDelete = (id) => DeleteTask(id, setTasks, Tasks);

    const handleUpdate = async (id) => {
        if (editedText.trim() === '') return;
        await UpdateTask(id, editedText, setTasks, Tasks);
        setEditingTaskId(null);     // close the input
        setEditedText('');          // clear input
    };

    useEffect(() => {
        validateUser();
        FetchTasks()
    }, [])


    return (
        <>
            <Header />
            {/* <h1>hello {nameOfUser}</h1> */}

            <div className='cover'>
                <h2>Kuqor qorshahada 👇</h2>

                <form className='form' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='Inta kuqor'
                        onChange={e => setinputvalue(e.target.value)}
                        value={inputvalue}
                    />
                    <button type='submit'>Kudar</button>
                </form>
                {/* TASK LIST */}

            </div>
            <h1>Qorshoyinkaga🎯</h1>
            <p>inta Qorshoyin Add ledahy: {Tasks.length}</p>
            <div>
                {error ? (
                    <p style={{ textAlign: "center", color: "red" }}>
                        ⚠️ Server not available. Please reload the page. if that doesn't fix the ussue try again later
                    </p>
                ) : Tasks.length === 0 ? (
                    <p style={{ textAlign: "center", color: "gray" }}>Qorshoyin malihid 😴</p>
                ) : (

                    Tasks.map((task) => (
                        <div className='each-task' key={task._id}>
                            {/* // check if a specific task's edit was tapped 👇 */}
                            {editingTaskId === task._id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        placeholder="Edit task"
                                    />
                                    <button className='edit-btn' onClick={() => handleUpdate(task._id)}>Save</button>
                                    <button className='dlt-btn' onClick={() => setEditingTaskId(null)}>Cancel</button>
                                </>
                            )
                                :
                                (
                                    <>
                                        <h3>{task.task}</h3>
                                        <div className='button-group'>
                                            <button className='edit-btn' onClick={() => {
                                                setEditingTaskId(task._id);
                                                setEditedText(task.task);
                                            }}>Hagaji</button>
                                            <button className='dlt-btn' onClick={() => handleDelete(task._id)}>Tirtir</button>
                                        </div>
                                    </>
                                )}

                        </div>
                    ))
                )}
            </div>

        </>
    )
}

