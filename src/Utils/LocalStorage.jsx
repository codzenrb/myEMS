const employees = [
  {
    id: 1,
    firstName: "Ravi",
    email: "employee1@example.com",
    password: "123",
    tasks: [
    ],
    task_count: { active: 0, new: 0, completed: 0, failed: 0, total: 0}
  },
  {
    id: 2,
    firstName: "rishi",
    email: "employee2@example.com",
    password: "123",
    tasks: [
    ],
    task_count: { active: 0, new: 0, completed: 0, failed: 0, total: 0}
  },

];


const admin = [
  {
    id: 1,
    firstName: "Vikram",
    email: "admin@example.com",
    password: "123"
  }
]

  
export const setLocalStorage = () => {
  localStorage.setItem("employees", JSON.stringify(employees))
  localStorage.setItem("admin", JSON.stringify(admin))
}
export function getLocalStorage() {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");
  const admin = JSON.parse(localStorage.getItem("admin") || "[]");
  return { employees, admin };
}

