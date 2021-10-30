import { useState } from 'react'
function AddTask({ onAdd }) {
    const [task, setText] = useState('')
    const [date, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    const onSubmit = (e) => {
        e.preventDefault()

        if (!task) {
            alert('Please add a task');
            return;
        }
        onAdd({ task, date, reminder })

        setText('')
        setDay('')
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
                <input type='text' placeholder='Add Day & Time' value={date} onChange={(e) => setDay(e.target.value)} />
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
