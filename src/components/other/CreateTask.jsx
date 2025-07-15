import React, { useEffect, useState } from 'react'
import { getLocalStorage } from '../../Utils/LocalStorage'
import "./AdminDashboard.css"

const CreateTask = () => {
  const [employees, setEmployees] = useState([])
  const [assignedTo, setAssignedTo] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")
  const [urgency, setUrgency] = useState("medium") // Add this new state

  useEffect(() => {
    const { employees } = getLocalStorage()
    setEmployees(employees)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate that the selected date is not before the current date
    const today = new Date().toISOString().split('T')[0];
    if (dueDate < today) {
      alert('Due date cannot be before the current date');
      return;
    }
    
    const { employees } = getLocalStorage();
    
    const updatedEmployees = employees.map(emp => {
      if (emp.email === assignedTo) {
        const newTask = {
          active: true,
          new: true,
          completed: false,
          failed: false,
          title,
          description,
          date: dueDate,
          category,
          urgency,
        };

        const newTaskCount = { ...emp.task_count };
        newTaskCount.active = (newTaskCount.active || 0) + 1;
        newTaskCount.new = (newTaskCount.new || 0) + 1;

        return {
          ...emp,
          // Add new task at the beginning using array spread
          tasks: [newTask, ...(emp.tasks || [])],
          task_count: newTaskCount
        };
      }
      return emp;
    });

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    
    // Instead of immediate reload, show a confirmation dialog
    if (window.confirm('Task assigned successfully! Click OK to reload the page')) {
        setAssignedTo("");
        setTitle("");
        setDescription("");
        setDueDate("");
        setCategory("");
        window.location.reload();
    }
  }

  return (
    <div className="createtask w-full flex justify-center items-center mt-10 px-4">
      <div className='w-full max-w-3xl h-content bg-zinc-900 p-4 sm:p-6 md:p-10 rounded-2xl'>
        <h1 className='text-xl sm:text-2xl font-semibold'>Create Task</h1>
        <form className='flex flex-col mt-4 sm:mt-6 gap-4 sm:gap-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label>Task Title</label>
            <input
              placeholder='e.g. Make a UI design'
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2"
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label>Description</label>
            <textarea
              cols="15"
              rows="4"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2"
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label>Due Date</label>
            <div 
              className="relative cursor-pointer" 
              onClick={() => document.getElementById('dueDateInput').showPicker()}
            >
              <input
                id="dueDateInput"
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]} // Set minimum date to today
                className="bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2 w-full cursor-pointer"
                required
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label>Assign To</label>
            <select
              value={assignedTo}
              onChange={e => setAssignedTo(e.target.value)}
              className="bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2"
              required
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.email}>
                  {emp.firstName}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <label>Category</label>
            <input
              placeholder='Design,Development,etc'
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2"
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label>Urgency Level</label>
            <select
              value={urgency}
              onChange={e => setUrgency(e.target.value)}
              className="bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <input 
            className='mt-2 bg-emerald-600 text-white rounded px-4 py-2 cursor-pointer' 
            type="submit" 
            value="Assign Task" 
          />
        </form>
      </div>
    </div>
  )
}

export default CreateTask