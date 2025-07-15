import React, { useEffect, useState } from 'react'
import { getLocalStorage } from '../../Utils/LocalStorage'

const AllTask = ({data}) => {
    const [allTasks, setAllTasks] = useState([])

    useEffect(() => {
        // Fetch all employees and their tasks
        const fetchAllTasks = () => {
            const { employees } = getLocalStorage()
            
            // Create a flat array of all tasks with employee information
            const tasksWithEmployeeInfo = []
            
            employees.forEach(employee => {
                if (employee.tasks && employee.tasks.length > 0) {
                    employee.tasks.forEach(task => {
                        tasksWithEmployeeInfo.push({
                            ...task,
                            employeeName: employee.firstName,
                            employeeEmail: employee.email
                        })
                    })
                }
            })
            
            setAllTasks(tasksWithEmployeeInfo)
        }
        
        fetchAllTasks()
        // Refresh data every 5 seconds
        const intervalId = setInterval(fetchAllTasks, 5000)
        return () => clearInterval(intervalId)
    }, [])

    // Helper function to determine status text and color
    const getStatusInfo = (task) => {
        if (task.completed) {
            return { text: 'Completed', bgColor: 'bg-green-500' }
        } else if (task.failed) {
            return { text: 'Failed', bgColor: 'bg-red-500' }
        } else if (task.new) {
            return { text: 'New', bgColor: 'bg-blue-500' }
        } else if (task.active) {
            return { text: 'Active', bgColor: 'bg-emerald-500' }
        }
        return { text: 'Unknown', bgColor: 'bg-gray-500' }
    }

    return (
        <>
            <div id='alltasklist' className='flex flex-col gap-4 mt-10 sm:mt-20 bg-black p-4 sm:p-6 md:p-10 rounded-2xl h-[60vh] overflow-auto mb-10'>
                <h1 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-5'>All Assigned Tasks</h1>
                
                {allTasks.length === 0 ? (
                    <div className='text-center text-gray-400 py-10'>No tasks have been assigned yet</div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                        {allTasks.map((task, index) => {
                            const statusInfo = getStatusInfo(task)
                            
                            return (
                                <div key={index} className='bg-[#1c1c1c] p-4 rounded-xl hover:bg-[#252525] transition-colors'>
                                    <div>
                                        <h2 className='text-lg sm:text-xl md:text-2xl font-semibold'>
                                            <span className='text-emerald-400'>@</span>{task.employeeName}
                                        </h2>
                                        <h3 className='text-sm sm:text-md font-md'>{task.title}</h3>
                                        <div className='flex flex-wrap justify-between items-center mt-3 gap-2'>
                                            <p className={`text-xs sm:text-sm ${statusInfo.bgColor} px-2 py-1 text-center rounded`}>
                                                {statusInfo.text}
                                            </p>
                                            <p className='text-xs sm:text-sm text-gray-400'>{task.date}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    )
}

export default AllTask