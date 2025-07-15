import React from 'react'

const TaskListNumber = ({data}) => {
  // Calculate total tasks
  const totalTasks = data.tasks ? data.tasks.length : 0;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'> 
      <div className='bg-[#3A4748] py-4 px-4 sm:px-6 md:px-8 rounded-xl'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>{totalTasks}</h1>
        <h2 className='font-semibold text-base sm:text-lg md:text-xl'>All Tasks</h2>
      </div>
      <div className='bg-[#3A4748] py-4 px-4 sm:px-6 md:px-8 rounded-xl'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>{data.task_count.new}</h1>
        <h2 className='font-semibold text-base sm:text-lg md:text-xl'>New Task</h2>
      </div>
      <div className='bg-[#3A4748] py-4 px-4 sm:px-6 md:px-8 rounded-xl'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>{data.task_count.completed}</h1>
        <h2 className='font-semibold text-base sm:text-lg md:text-xl'>Completed Task</h2>
      </div>
      <div className='bg-[#3A4748] py-4 px-4 sm:px-6 md:px-8 rounded-xl'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>{data.task_count.active}</h1>
        <h2 className='font-semibold text-base sm:text-lg md:text-xl'>Active Task</h2>
      </div>
      <div className='bg-[#3A4748] py-4 px-4 sm:px-6 md:px-8 rounded-xl'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>{data.task_count.failed}</h1>
        <h2 className='font-semibold text-base sm:text-lg md:text-xl'>Failed Task</h2>
      </div>
    </div>
  )
}

export default TaskListNumber