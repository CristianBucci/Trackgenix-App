import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './FormModal/index';
import styles from './form.module.css';
import Select from '../../Shared/Select/index';

const AddProject = (props) => {
  const [projectInput, setProjectInput] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    clientName: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [serverError, setServerError] = useState('');
  const [formMode, setFormMode] = useState(true);
  const [formText, setFormText] = useState('Add Project');

  const params = useParams();
  const id = params.id ? params.id : '';

  const [employees, setEmployees] = useState();
  const [employeesProject, setEmployeesProject] = useState([]);

  const roles = [{ role: 'DEV' }, { role: 'QA' }, { role: 'PM' }, { role: 'TL' }];

  useEffect(async () => {
    if (id) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
          method: 'GET'
        });
        const json = await response.json();
        setFormMode(false);
        setFormText('Update Project');
        setProjectInput({
          name: json.data.name,
          description: json.data.description,
          startDate: fixDate(json.data.startDate),
          endDate: fixDate(json.data.endDate),
          clientName: json.data.clientName
        });
        setEmployeesProject(json.data.employees);
      } catch (error) {
        alert('Could not GET Projects.', error);
      }
    } else {
      return null;
    }
  }, []);

  useEffect(async () => {
    try {
      const employees = await fetch(`${process.env.REACT_APP_API_URL}/employees/`);
      const jsonEmployees = await employees.json();
      setEmployees(jsonEmployees.data);
    } catch (error) {
      alert('Error.', error);
    }
  }, []);

  const fixDate = (date) => {
    let dateFormated = date.substr(0, 10);
    return dateFormated;
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = async (event) => {
    if (formMode) {
      event.preventDefault();
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: projectInput.name,
            description: projectInput.description,
            startDate: projectInput.startDate,
            endDate: projectInput.endDate,
            clientName: projectInput.clientName,
            employees: employeesProject
          })
        });
        if (response.status === 201) {
          alert('Project Added.');
          props.history.push('/projects');
        } else {
          setShowModal(true);
          setServerError('Project could not be Added.');
        }
      } catch (error) {
        setShowModal(true);
        setServerError('Project could not be Updated.');
      }
    } else {
      event.preventDefault();
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: projectInput.name,
            description: projectInput.description,
            startDate: projectInput.startDate,
            endDate: projectInput.endDate,
            clientName: projectInput.clientName,
            employees: employeesProject
          })
        });
        if (response.status === 200) {
          alert('Project Updated.');
          props.history.push('/projects');
        } else {
          setShowModal(true);
          setServerError('Project could not be Updated.');
        }
      } catch (error) {
        setShowModal(true);
        setServerError('Project could not be Updated.');
      }
    }
  };

  return (
    <div>
      <Modal show={showModal} title={serverError} closeModal={closeModal} />
      <form onSubmit={onSubmit}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>{formText}</div>
          <div className={styles.cardField}>
            <label>Project Name</label>
            <input
              type="text"
              name="name"
              required
              value={projectInput.name}
              onChange={(e) => {
                setProjectInput({ ...projectInput, name: e.target.value });
              }}
            />
          </div>
          <div className={styles.cardField}>
            <label>Description</label>
            <input
              type="text"
              name="description"
              required
              value={projectInput.description}
              onChange={(e) => {
                setProjectInput({ ...projectInput, description: e.target.value });
              }}
            />
          </div>
          <div className={styles.cardField}>
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              required
              value={projectInput.startDate}
              onChange={(e) => {
                setProjectInput({ ...projectInput, startDate: e.target.value });
              }}
            />
          </div>
          <div className={styles.cardField}>
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              required
              value={projectInput.endDate}
              onChange={(e) => {
                setProjectInput({ ...projectInput, endDate: e.target.value });
              }}
            />
          </div>
          <div className={styles.cardField}>
            <label>Client Name</label>
            <input
              type="text"
              name="clientName"
              required
              value={projectInput.clientName}
              onChange={(e) => {
                setProjectInput({ ...projectInput, clientName: e.target.value });
              }}
            />
          </div>
          <div className={styles.card}>
            {employeesProject?.map((option, index) => {
              return (
                <div key={option}>
                  <label>Employee</label>
                  <Select
                    value={option.employeeId}
                    options={employees}
                    keyMap={'_id'}
                    title={'Employee'}
                    fieldToShow={'name'}
                    second={'lastName'}
                    isDisabled={false}
                    onChange={(value) =>
                      setEmployeesProject([
                        ...employeesProject.slice(0, index),
                        {
                          ...option,
                          employeeId: value
                        },
                        ...employeesProject.slice(index + 1)
                      ])
                    }
                  ></Select>
                  <label>Rate</label>
                  <input
                    type="text"
                    name="rate"
                    required
                    value={option.rate}
                    onChange={(e) =>
                      setEmployeesProject([
                        ...employeesProject.slice(0, index),
                        {
                          ...option,
                          rate: e.target.value
                        },
                        ...employeesProject.slice(index + 1)
                      ])
                    }
                  />
                  <label>Role</label>
                  <Select
                    value={option.role}
                    options={roles}
                    keyMap={'role'}
                    title={'Role'}
                    fieldToShow={'role'}
                    isDisabled={false}
                    onChange={(value) =>
                      setEmployeesProject([
                        ...employeesProject.slice(0, index),
                        {
                          ...option,
                          role: value
                        },
                        ...employeesProject.slice(index + 1)
                      ])
                    }
                  ></Select>
                  <button
                    type="button"
                    onClick={() => {
                      setEmployeesProject([
                        ...employeesProject.slice(0, index),
                        ...employeesProject.slice(
                          index + 1 ? index + 1 : index,
                          employeesProject.length
                        )
                      ]);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
            <div className={styles.addEmployeeButton}>
              <button
                onClick={() =>
                  setEmployeesProject([
                    ...employeesProject,
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
        </div>
        <div className={styles.cardButton}>
          <div>
            <button className={styles.cancel} onClick={() => props.history.push('/projects')}>
              Cancel
            </button>
          </div>
          <div>
            <button className={styles.confirm} type="submit">
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
