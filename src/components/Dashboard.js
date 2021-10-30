import { useEffect, useState } from 'react'
import Header from './Header'
import Tasks from './Tasks'
import AddTask from './AddTask'
import { Container, Button } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
function Dashboard() {
    const { logout, currentUser } = useAuth()
    const [showAddTask, setShowAddTask] = useState(false)
    const history = useHistory()
    const [tasks, setTasks] = useState([])
    
    const loadTasks = async () => {
        const requestMethodsGet = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'uid': currentUser['uid'] })
        }
        fetch(`${process.env.REACT_APP_SERVER}/getTasks`, requestMethodsGet).then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response;
        }).then(data => {
            setTasks([...data]);
        })
    }
    useEffect(() => {
        let mounted=true;
        if(mounted){
            loadTasks();
        }
        return () => {mounted=false}
    },[]);
    //Add Task
    const addTask = async (task) => {
        const data = { 'uid': currentUser['uid'], ...task };
        const requestMethods = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        await fetch(`${process.env.REACT_APP_SERVER}/addTask`, requestMethods);
        loadTasks();
    }

    //Delete Task
    const deleteTask = async (id) => {
        const data = { 'uid': currentUser['uid'], 'id': id };
        const requestMethods = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        await fetch(`${process.env.REACT_APP_SERVER}/deleteTask`, requestMethods);
        loadTasks();
    }

    //Toggle Reminder
    const toggleReminder = async (id, reminder) => {
        const data = { 'uid': currentUser['uid'], 'id': id, 'reminder': !reminder };
        const requestMethods = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        await fetch(`${process.env.REACT_APP_SERVER}/updateTask`, requestMethods);
        loadTasks();
    }
    const [err, setErr] = useState('')

    async function handleLogout() {
        setErr('');
        try {
            await logout();
            history.push('/login')
        } catch {
            setErr('Failed to logout');
        }
    }

    return (
        <>
            <Container style={{ marginTop: '15vh' }}>
                <div className="w-100 container12">
                    <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
                    {showAddTask && <AddTask onAdd={addTask} />
                    }
                    {tasks.length > 0 ?
                        (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />)
                        : (<p>No Tasks To Show</p>)
                    }
                    <div className="d-flex justify-content-end w-100 pt-2">
                        <Button variant="success" onClick={handleLogout}>Logout</Button>
                        {err}
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Dashboard;
