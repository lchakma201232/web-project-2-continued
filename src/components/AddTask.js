import { useState } from 'react'
import DatePicker from 'react-datepicker'
function AddTask({ onAdd }) {
    const [task, setText] = useState('')
    const [date, setDay] = useState(new Date())
    const [reminder, setReminder] = useState(false)
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const onSubmit = (e) => {
        e.preventDefault()
        const taskDate =`${date.getDate()} ${days[date.getDay()]} ${date.getFullYear()}`;
        if (!task) {
            alert('Please add a task');
            return;
        }
        onAdd({ task, date: taskDate, reminder })
        setText('')
        setDay(new Date())
        setReminder(false)
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={task} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Day</label>
                <DatePicker selected={date} onChange={date => setDay(date)}/>
                {/* <input type='text' placeholder='Add Day & Time' value={date} onChange={(e) => setDay(e.target.value)} /> */}
            </div>
            <div className='form-control form-control-check' style={{ display: 'flex' }}>
                <label>Set Reminder</label>
                <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>

            <input className="btn btn-success w-100" type='submit' value='Save Task' />
        </form>
    )
}

export default AddTask
