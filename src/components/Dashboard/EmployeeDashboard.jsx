import React, { useEffect, useState } from 'react'
import Header from '../other/Header'
import TaskListNumber from '../other/TaskListNumber'
import TaskList from '../TaskList/TaskList'
import { getLocalStorage } from '../../Utils/LocalStorage'

const EmployeeDashboard = ({ data }) => {
  const [employee, setEmployee] = useState(data)

  useEffect(() => {
    const fetchFreshData = () => {
      const { employees } = getLocalStorage()
      const fresh = employees.find(emp => emp.email === data.email)
      if (fresh) {
        console.log('EmployeeDashboard: Updating with fresh data:', fresh)
        setEmployee(fresh)
      }
    }

    // Fetch immediately and then every 3 seconds
    fetchFreshData()
    const intervalId = setInterval(fetchFreshData, 3000)

    return () => clearInterval(intervalId)
  }, [data.email])

  return (
    <>
      <div className='p-4 sm:p-6 md:p-10 min-h-screen'>
        <Header data={employee} />
        <div className='mt-10 sm:mt-16 md:mt-20'>
          <TaskListNumber data={employee} />
        </div>
        <div>
          <TaskList data={employee} />
        </div>
      </div>
    </>
  )
}

export default EmployeeDashboard