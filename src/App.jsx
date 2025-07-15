import React, { useState, useEffect } from 'react'
import Login from './components/Auth/Login'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import { getLocalStorage, setLocalStorage } from './Utils/LocalStorage'

const App = () => {
  // Initialize localStorage if empty
  if (!localStorage.getItem('employees')) {
    setLocalStorage();
  }

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('loggedInUser')
    return stored ? JSON.parse(stored) : null
  })

  // Helper function to get fresh employee data
  const getFreshEmployeeData = (email) => {
    console.log('Getting fresh data for:', email);
    const { employees } = getLocalStorage();
    const freshData = employees.find(emp => emp.email === email);
    console.log('Fresh employee data:', freshData);
    return freshData;
  }

  const handleLogin = (email, password) => {
    console.log('Login attempt for:', email);
    const { employees, admin } = getLocalStorage();

    // Check employee
    const employee = employees.find(
      (emp) => emp.email === email && emp.password === password
    );
    if (employee) {
      const freshEmployeeData = getFreshEmployeeData(email);
      console.log('Setting user with fresh data:', freshEmployeeData);
      
      localStorage.setItem('loggedInUser', JSON.stringify({ 
        ...freshEmployeeData, 
        role: 'employee' 
      }));
      setUser({ ...freshEmployeeData, role: 'employee' });
      return;
    }

    // Check admin
    const adminUser = admin.find(
      (adm) => adm.email === email && adm.password === password
    );
    if (adminUser) {
      localStorage.setItem('loggedInUser', JSON.stringify({ ...adminUser, role: 'admin' }));
      setUser({ ...adminUser, role: 'admin' });
      return;
    }

    alert('Invalid credentials');
  };

  // Add effect to refresh employee data periodically
  useEffect(() => {
    if (user?.role === 'employee') {
      const interval = setInterval(() => {
        const freshData = getFreshEmployeeData(user.email);
        if (freshData) {
          setUser({ ...freshData, role: 'employee' });
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [user?.email]);

  if (!user) {
    return <Login handleLogin={handleLogin} />;
  }

  if (user.role === 'admin') {
    return <AdminDashboard data={user} />;
  }

  // Always get fresh employee data before rendering dashboard
  const freshUserData = getFreshEmployeeData(user.email);
  console.log('Rendering EmployeeDashboard with data:', freshUserData);
  
  return <EmployeeDashboard data={{ ...freshUserData, role: 'employee' }} />;
};

export default App;