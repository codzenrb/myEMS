import React, { useEffect, useState } from 'react'
import { getLocalStorage } from '../../Utils/LocalStorage'

const TaskList = ({ data }) => {
  const [employee, setEmployee] = useState(null)

  const updateTaskStatus = (taskIndex, status) => {
    const { employees } = getLocalStorage()
    
    const updatedEmployees = employees.map(emp => {
      if (emp.email === data.email) {
        const updatedTasks = [...emp.tasks]
        const task = updatedTasks[taskIndex]

        // Update task status
        task.active = false
        task.new = false
        task.completed = status === 'completed'
        task.failed = status === 'failed'

        // Update task counts
        const newTaskCount = { ...emp.task_count }
        newTaskCount.active = newTaskCount.active - 1
        newTaskCount.new = task.new ? newTaskCount.new - 1 : newTaskCount.new
        
        if (status === 'completed') {
          newTaskCount.completed = newTaskCount.completed + 1
        } else {
          newTaskCount.failed = newTaskCount.failed + 1
        }

        return {
          ...emp,
          tasks: updatedTasks,
          task_count: newTaskCount
        }
      }
      return emp
    })

    localStorage.setItem('employees', JSON.stringify(updatedEmployees))
    const fresh = updatedEmployees.find(emp => emp.email === data.email)
    if (fresh) setEmployee(fresh)
  }

  useEffect(() => {
    const fetchEmployeeData = () => {
      console.log('TaskList: Fetching fresh data...')
      const { employees } = getLocalStorage()
      
      if (!data?.email) {
        console.error('TaskList: No email in data prop')
        return
      }

      const fresh = employees.find(emp => emp.email === data.email)
      if (fresh) {
        console.log('TaskList: Found employee data:', fresh)
        console.log('TaskList: Tasks:', fresh.tasks)
        setEmployee(fresh)
      }
    }

    fetchEmployeeData()
    const intervalId = setInterval(fetchEmployeeData, 5000)
    return () => clearInterval(intervalId)
  }, [data?.email])

  if (!employee) {
    return <div className="text-white text-xl">Loading employee data...</div>
  }

  const tasks = employee.tasks || []
  console.log('TaskList: Rendering tasks:', tasks)

  return (
    <div id='tasklist' className='min-h-[300px] w-full mt-10 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
      {tasks.length === 0 ? (
        <div className="text-white text-xl col-span-full flex justify-center items-center">No tasks assigned yet</div>
      ) : (
        // Tasks will render in order, with newest first since we modified the array in CreateTask
        tasks.map((task, index) => (
          <div key={index} className={`task h-full rounded-xl p-4 sm:p-6 ${
            task.completed ? 'bg-green-800' : 
            task.failed ? 'bg-red-800' : 
            'bg-emerald-700'
          }`}>
            <div className='flex justify-between items-center text-sm'>
              <h1 className={`difficultylvl px-3 py-1 rounded ${
                task.urgency === 'high' 
                  ? 'bg-red-500' 
                  : task.urgency === 'medium'
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}>
                {task.urgency}
              </h1>
              <h1 className='date'>{task.date}</h1>
            </div>
            <h2 className="title text-3xl font-semibold mt-8">
              {task.title}
            </h2>
            <p id='Desbox' className="description mt-4 wrap-break-word max-h-30 overflow-y-auto">
              {task.description}
            </p>
            <div className='mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-0 sm:justify-between'>
              {!task.completed && !task.failed && (
                <div className='flex flex-col xs:flex-row w-full gap-2 sm:gap-4'>
                  <button 
                    onClick={() => updateTaskStatus(index, 'completed')}
                    className='bg-green-500 px-3 sm:px-4 py-2 rounded hover:bg-green-600 text-sm sm:text-base w-full sm:w-auto'
                  >
                    Mark Complete
                  </button>
                  <button 
                    onClick={() => updateTaskStatus(index, 'failed')}
                    className='bg-red-500 px-3 sm:px-4 py-2 rounded hover:bg-red-600 text-sm sm:text-base w-full sm:w-auto'
                  >
                    Failed
                  </button>
                </div>
              )}
              {task.completed && (
                <span className='text-green-400 font-semibold text-center w-full'>✓ Completed</span>
              )}
              {task.failed && (
                <span className='text-red-400 font-semibold text-center w-full'>✗ Failed</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default TaskList