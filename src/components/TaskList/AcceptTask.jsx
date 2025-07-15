import React from 'react'

const AcceptTask = ({data}) => {
  return (
    <div>
          
   <div  className="task h-full w-100 rounded-xl bg-emerald-700 flex-shrink-0 p-6">
          <div className='flex justify-between items-center text-sm'>
            <h1 className={`difficultylvl ${data.tasks[index].urgency}  px-3 py-1 rounded`}>{data.tasks[index].urgency}</h1>
            <h1 className='date'>{data.tasks[index].date}</h1>
          </div>
          <h2 className="title text-3xl font-semibold mt-8">
           {data.tasks[index].title}
          </h2>
          <p className="description mt-4">
            {data.tasks[index].description}
          </p>
          <button className=''>Mark As Complete</button>
          <button>Failed</button>

        </div>


    </div>
  )
}

export default AcceptTask