import React from 'react'

const Header = ({data}) => {

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    window.location.href = '/Login'
  }

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0'>
        <h1 className='text-lg sm:text-xl'>Hello,<br/><span className='text-xl sm:text-2xl md:text-3xl font-bold'>{data.firstName}</span></h1>
        <button 
          className='bg-emerald-600 h-10 px-5 rounded hover:bg-emerald-700 transition-colors'
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </>
  )
}

export default Header