import React from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'


const AdminDashboard = ({data}) => {
    return (
        <div className='p-4 sm:p-6 md:p-10 h-content'>
            <Header data={{firstName:"Mr. Admin"}} />
            <CreateTask/>
            <AllTask data={data}/>
        </div>
        
    )
}

export default AdminDashboard