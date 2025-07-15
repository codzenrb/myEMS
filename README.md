# Employee Management System (EMS)

> **Login Credentials:**
> - **Admin:** admin@example.com / Password: 123
> - **Employee:** employee1@example.com or employee2@example.com / Password: 123

## Overview

EMS is a responsive web application designed to streamline task management between administrators and employees. The system allows administrators to create and assign tasks to employees, while employees can view, manage, and update the status of their assigned tasks.

## Features

### Authentication System
- Secure login for both administrators and employees
- Role-based access control (Admin/Employee)
- Persistent login sessions using localStorage

### Admin Dashboard
- Create and assign tasks to employees
- Set task details including title, description, due date, category, and urgency level
- View all assigned tasks across the organization
- Monitor task status (New, Active, Completed, Failed)
- Real-time updates of task status changes

### Employee Dashboard
- View personalized task statistics (Total, New, Completed, Active, Failed)
- Manage assigned tasks
- Mark tasks as completed or failed
- View task details including description, due date, and urgency level
- Real-time updates of newly assigned tasks

### Responsive Design
- Fully responsive interface that works on all device sizes
- Optimized layouts for mobile, tablet, and desktop views
- Consistent user experience across all screen sizes

## Technologies Used

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect)
- **Data Storage**: Browser localStorage
- **Deployment**: Static hosting (can be deployed on Netlify, Vercel, etc.)

## Project Structure

```
src/
├── App.jsx                 # Main application component
├── index.css               # Global styles
├── main.jsx                # Entry point
├── Utils/
│   └── LocalStorage.jsx    # Local storage utility functions
├── components/
│   ├── Auth/
│   │   └── Login.jsx       # Login component
│   ├── Dashboard/
│   │   ├── AdminDashboard.jsx    # Admin interface
│   │   └── EmployeeDashboard.jsx # Employee interface
│   ├── TaskList/
│   │   └── TaskList.jsx    # Task list display and management
│   └── other/
│       ├── AllTask.jsx     # All tasks view for admin
│       ├── CreateTask.jsx  # Task creation form
│       ├── Header.jsx      # Header with user info and logout
│       └── TaskListNumber.jsx # Task statistics display
```

## Setup and Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Build for production
   ```
   npm run build
   ```

## Usage

### Admin Login
- Email: admin@example.com
- Password: 123

### Employee Login
- Email: employee1@example.com or employee2@example.com
- Password: 123

### Creating Tasks (Admin)
1. Log in as an admin
2. Fill out the task creation form with title, description, due date, employee assignment, category, and urgency level
3. Click "Assign Task" to create the task

### Managing Tasks (Employee)
1. Log in as an employee
2. View assigned tasks in the task list
3. Click "Mark Complete" when a task is finished
4. Click "Failed" if unable to complete a task

## Data Persistence

The application uses browser localStorage to persist data, including:
- User authentication state
- Employee information
- Task assignments and status
- Task statistics

The data is refreshed at regular intervals to ensure real-time updates across the application.

## Responsive Design

The application is fully responsive and optimized for all screen sizes:
- Mobile: Single column layouts with appropriate spacing and font sizes
- Tablet: Two-column grids for task lists and statistics
- Desktop: Multi-column layouts for optimal information display

Custom breakpoints ensure a smooth experience on all devices, including extra-small screens.

## Future Enhancements

- Backend integration with a database for persistent storage
- Email notifications for new task assignments
- Advanced filtering and sorting options for tasks
- Task priority adjustment
- File attachment capabilities for tasks
- Performance metrics and reporting

## License

MIT