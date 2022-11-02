import { useEffect, useState } from 'react';
import styles from '../projects.module.css';

const url = window.location.href;
const id = url.substring(url.lastIndexOf('=') + 1);
const initialValue = {
  clientName: '',
  description: '',
  endDate: '',
  name: '',
  startDate: ''
};
const AddProject = () => {
  const [project, setProject] = useState(initialValue);
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeName] = useState([]);

  useEffect(async () => {
    if (window.location.href.includes('id')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`);
        const data = await response.json();
        setProject({
          clientName: data.data.clientName,
          description: data.data.description,
          startDate: data.data.startDate.substr(0, 10),
          endDate: data.data.endDate.substr(0, 10),
          name: data.data.name
        });
        setEmployees(data.data.employees);
      } catch (error) {
        alert('Could not GET Project.', error);
      }
    } else {
      return null;
    }
  }, []);

  const createProject = async ({ clientName, description, endDate, name, startDate }) => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientName,
        description,
        employees: employees,
        endDate,
        name,
        startDate
      })
    });
  };

  const editProject = async ({ clientName, description, endDate, name, startDate }) => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientName,
        description,
        employees: employees,
        endDate,
        name,
        startDate
      })
    });
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployeeName(data.data);
    } catch (error) {
      alert('Could not create Project', error);
    }
  }, []);

  const employeesNames = employeeData.map((e) => [e.name, ' ', e.lastName, ' id:', e._id]);

  const cleanInputs = () => {
    setProject(initialValue);
    setEmployees([]);
  };

  const onSubmit = (e) => {
    if (!window.location.href.includes('id')) {
      e.preventDefault();
      createProject(project);
      cleanInputs();
    } else {
      e.preventDefault();
      editProject(project);
      cleanInputs();
    }
  };
  return (
    <div className={styles.formContainer}>
      <div>
        <h2>Project Form</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label>Client Name</label>
            <input
              type="text"
              value={project.clientName}
              name="clientName"
              onChange={(e) => setProject({ ...project, clientName: e.target.value })}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
            />
          </div>
          <div>
            <label> Add Employees</label>
            {employees.map((employee, index) => (
              <div key={index} id="employee-form">
                <label>Employee</label>
                <select
                  type="text"
                  name="employeeId"
                  onChange={(e) =>
                    setEmployees([
                      ...employees.slice(0, index),
                      {
                        ...employee,
                        employeeId: e.target.value.slice(-24)
                      },
                      ...employees.slice(index + 1)
                    ])
                  }
                >
                  {employeesNames.map((e, idx) => (
                    <option key={idx}>{e}</option>
                  ))}
                </select>
                <label>rate</label>
                <input
                  type="text"
                  name="rate"
                  onChange={(e) =>
                    setEmployees([
                      ...employees.slice(0, index),
                      {
                        ...employee,
                        rate: e.target.value
                      },
                      ...employees.slice(index + 1)
                    ])
                  }
                />
                <select
                  type="text"
                  name="role"
                  onChange={(e) =>
                    setEmployees([
                      ...employees.slice(0, index),
                      {
                        ...employee,
                        role: e.target.value
                      },
                      ...employees.slice(index + 1)
                    ])
                  }
                >
                  <option></option>
                  <option>DEV</option>
                  <option>QA</option>
                  <option>PM</option>
                  <option>TL</option>
                </select>
                <button
                  type="button"
                  onClick={(e) => {
                    e.target.closest('div').remove();
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
            <div>
              <button
                onClick={() =>
                  setEmployees([
                    ...employees,
                    {
                      employeeId: '',
                      rate: 0,
                      role: ''
                    }
                  ])
                }
                type="button"
              >
                Add Employee
              </button>
            </div>
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={(e) => setProject({ ...project, endDate: e.target.value })}
            />
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
            />
          </div>
          <div>
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={(e) => setProject({ ...project, startDate: e.target.value })}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <a href={'http://localhost:3000/projects'}>
          <button type="text">Cancel</button>
        </a>
      </div>
    </div>
  );
};

export default AddProject;
