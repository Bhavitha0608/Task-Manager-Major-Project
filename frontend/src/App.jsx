import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Medium', dueDate: '' })
  const [auth, setAuth] = useState({ email: '', password: '', name: '' })
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(true)
  const [backendStatus, setBackendStatus] = useState('Checking...')

  // Check backend connection
  useEffect(() => {
    fetch('http://localhost:5000/health')
      .then(res => res.json())
      .then(data => setBackendStatus('✅ Connected to backend: ' + data.message))
      .catch(() => setBackendStatus('❌ Backend not running'))
  }, [])

  // Register
  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auth)
      })
      const data = await res.json()
      if (res.ok) {
        alert('Registration successful! Please login.')
        setShowLogin(true)
      } else {
        alert(data.message || 'Registration failed')
      }
    } catch (error) {
      alert('Error: ' + error.message)
    }
  }

  // Login
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: auth.email, password: auth.password })
      })
      const data = await res.json()
      if (res.ok) {
        setToken(data.token)
        setUser(data)
        alert('Welcome ' + data.name + '!')
        fetchTasks(data.token)
      } else {
        alert(data.message || 'Login failed')
      }
    } catch (error) {
      alert('Error: ' + error.message)
    }
  }

  // Fetch tasks
  const fetchTasks = async (authToken) => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        headers: { 'Authorization': 'Bearer ' + authToken }
      })
      const data = await res.json()
      setTasks(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setLoading(false)
    }
  }

  // Create task
  const handleCreateTask = async (e) => {
    e.preventDefault()
    if (!newTask.title || !newTask.dueDate) {
      alert('Please add title and due date')
      return
    }
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(newTask)
      })
      const data = await res.json()
      if (res.ok) {
        setTasks([...tasks, data])
        setNewTask({ title: '', description: '', priority: 'Medium', dueDate: '' })
        alert('Task created!')
      }
    } catch (error) {
      alert('Error: ' + error.message)
    }
  }

  // Toggle task status
  const toggleTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}/toggle`, {
        method: 'PATCH',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      const data = await res.json()
      if (res.ok) {
        setTasks(tasks.map(t => t._id === id ? data : t))
      }
    } catch (error) {
      alert('Error: ' + error.message)
    }
  }

  // Delete task
  const deleteTask = async (id) => {
    if (!confirm('Delete this task?')) return
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      if (res.ok) {
        setTasks(tasks.filter(t => t._id !== id))
      }
    } catch (error) {
      alert('Error: ' + error.message)
    }
  }

  // Logout
  const handleLogout = () => {
    setToken(null)
    setUser(null)
    setTasks([])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Task Manager</h1>
        <p style={{ fontSize: '0.9rem' }}>{backendStatus}</p>

        {!token ? (
          <div className="auth-container">
            <div className="auth-toggle">
              <button onClick={() => setShowLogin(true)} className={showLogin ? 'active' : ''}>Login</button>
              <button onClick={() => setShowLogin(false)} className={!showLogin ? 'active' : ''}>Register</button>
            </div>

            {showLogin ? (
              <form onSubmit={handleLogin} className="auth-form">
                <input type="email" placeholder="Email" value={auth.email} onChange={(e) => setAuth({...auth, email: e.target.value})} required />
                <input type="password" placeholder="Password" value={auth.password} onChange={(e) => setAuth({...auth, password: e.target.value})} required />
                <button type="submit">Login</button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="auth-form">
                <input type="text" placeholder="Name" value={auth.name} onChange={(e) => setAuth({...auth, name: e.target.value})} required />
                <input type="email" placeholder="Email" value={auth.email} onChange={(e) => setAuth({...auth, email: e.target.value})} required />
                <input type="password" placeholder="Password (min 6 chars)" value={auth.password} onChange={(e) => setAuth({...auth, password: e.target.value})} required />
                <button type="submit">Register</button>
              </form>
            )}
          </div>
        ) : (
          <div>
            <p>Welcome, <strong>{user?.name}</strong>!</p>
            <button onClick={handleLogout} className="logout-btn">Logout</button>

            <div className="task-section">
              <h2>Create New Task</h2>
              <form onSubmit={handleCreateTask} className="task-form">
                <input type="text" placeholder="Title *" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} required />
                <input type="text" placeholder="Description" value={newTask.description} onChange={(e) => setNewTask({...newTask, description: e.target.value})} />
                <select value={newTask.priority} onChange={(e) => setNewTask({...newTask, priority: e.target.value})}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})} required />
                <button type="submit">Add Task</button>
              </form>
            </div>

            <div className="task-section">
              <h2>Your Tasks ({tasks.length})</h2>
              {loading ? <p>Loading...</p> : tasks.length === 0 ? <p>No tasks yet. Create one!</p> : (
                <div className="task-list">
                  {tasks.map(task => (
                    <div key={task._id} className={`task-item priority-${task.priority.toLowerCase()}`}>
                      <div className="task-content">
                        <h3 style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
                          {task.title}
                        </h3>
                        {task.description && <p>{task.description}</p>}
                        <div className="task-meta">
                          <span>Priority: {task.priority}</span>
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          <span>Status: {task.status}</span>
                        </div>
                      </div>
                      <div className="task-actions">
                        <button onClick={() => toggleTask(task._id)}>Toggle</button>
                        <button onClick={() => deleteTask(task._id)} className="delete-btn">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

export default App
