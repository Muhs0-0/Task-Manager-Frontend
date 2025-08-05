export async function DeleteTask(id, setTasks, Tasks) {
  try {
    const res = await fetch(`http://localhost:5000/Api/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const updatedTasks = Tasks.filter(task => task._id !== id);
      setTasks(updatedTasks);
    } else {
      const data = await res.json();
      console.error("Delete failed:", data.message);
    }
  } catch (err) {
    console.error("Error deleting task:", err.message);
  }
}

export async function UpdateTask(id, editedTask, setTasks, Tasks) {
  try {
    const res = await fetch(`http://localhost:5000/Api/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: editedTask }),
    });

    if (res.ok) {
      const updatedTask = await res.json();

      const updatedTasks = Tasks.map((task) =>
        task._id === id ? updatedTask : task
      );

      setTasks(updatedTasks);
    } else {
      const data = await res.json();
      console.error("Update failed:", data.message);
    }
  } catch (err) {
    console.error("Error updating task:", err.message);
  }
}


