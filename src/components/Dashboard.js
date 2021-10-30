import { useState } from 'react'
import Header from './Header'
import Tasks from './Tasks'
import AddTask from './AddTask'
import {Container,Button} from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
function Dashboard() {
  const [showAddTask,setShowAddTask]=useState(false)
  const history = useHistory()
  const [tasks,setTasks] = useState([
    {
        id: 1,
        text: 'Meeting with the boss',
        day: 'Nov 5th at 2.30AM',
        reminder: true,
    },
    {
        id: 2,
        text: 'Birthday of X',
        day: 'Nov 20th at 11.00AM',
        reminder: true,
    },
    {
    id: 3,
        text: 'Project deadline',
        day: 'Dec 12th at 11.00PM',
        reminder: true,
    }
])
//Add Task
    const addTask = (task) =>{
    const id=Math.floor(Math.random()*10000)+1
    const newTask = {id,...task}
    setTasks([...tasks,newTask])
}

//Delete Task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task)=>task.id!==id))
    }

//Toggle Reminder
    const toggleReminder = (id) => {
        setTasks(tasks.map((task) => task.id===id ? {...task,reminder: !task.reminder}: task))
    }
    const [err, setErr] = useState('')
    const {logout,currentUser} = useAuth()
    async function handleLogout(){
        setErr('');
        try{
            await logout();
            history.push('/login')
        }catch{
            setErr('Failed to logout');
        }
    }

    return (
        <>
        <h2>{currentUser.email}</h2> 
    <Container style={{marginTop: '15vh'}}>
    <div className="w-100 container12">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        {showAddTask && <AddTask onAdd={addTask}/>
        }
        {tasks.length > 0 ? 
        (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>)
        : (<p>No Tasks To Show</p>)
        }
        <Button variant="link" onClick={handleLogout}>Logout</Button>
        {err}
    </div>
    </Container>
    </>
    );
}

export default Dashboard;
