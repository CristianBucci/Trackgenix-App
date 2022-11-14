import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../../redux/employees/thunks';
import ModalConfirm from '../../Shared/Modal/ModalConfirm';
import ModalMessage from '../../Shared/Modal/ModalMessage';
import Input from '../../Shared/Inputs';
import Datepicker from '../../Shared/Datepicker';
import Select from '../../Shared/Select/index';
import Buttons from '../../Shared/Button/index';
import styles from './form.module.css';
import createProject from '../../../redux/projects/thunks';

const AddProject = (props) => {
  const dispatch = useDispatch();
  const employeesList = useSelector((state) => state.employees.list);
  const [projectInput, setProjectInput] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    clientName: ''
  });
  const [formText, setFormText] = useState('Add Project');
  const [employeesProject, setEmployeesProject] = useState([]);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [modalContent, setModalContent] = useState({ title: 'title', content: 'content' });
  const params = useParams();
  const id = params.id && params.id;
  const roles = [{ role: 'DEV' }, { role: 'QA' }, { role: 'PM' }, { role: 'TL' }];

  const onSubmit = (e) => {
    e.preventDefault();
    setModalContent({
      title: 'Confirm',
      content: `Are you sure you want to ${
        id ? 'edit the project with id ' + id : 'create a new project'
      }?`
    });
    setShowModalConfirm(true);
  };

  const modalFunction = () => {
    id ? updateProject() : createProject();
  };

  const redirect = () => {
    props.history.push('/projects');
  };

  useEffect(async () => {
    if (id) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
          method: 'GET'
        });
        const json = await response.json();
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
        setModalContent({ title: 'ERROR!', content: `Could not GET projects! ${error.message}` });
        setShowModalMessage(true);
      }
    } else {
      return null;
    }
  }, []);

  const fixDate = (date) => {
    let dateFormated = date.substr(0, 10);
    return dateFormated;
  };

  const project = JSON.stringify({
    name: projectInput.name,
    description: projectInput.description,
    startDate: projectInput.startDate,
    endDate: projectInput.endDate,
    clientName: projectInput.clientName,
    employees: employeesProject
  });

  useEffect(() => {
    dispatch(createProject(project));
    dispatch(getEmployees());
  }, []);

  const updateProject = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
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
        response = await response.json();
        setModalContent({
          title: 'SUCCESS!',
          content: response.message
        });
        setShowModalMessage(true);
      } else {
        response = await response.json();
        setModalContent({
          title: 'ERROR!',
          content: `Could not update Admin! ${response.message}`
        });
        setShowModalMessage(true);
      }
    } catch (error) {
      setModalContent({ title: 'ERROR!', content: `Could not update Admin! ${error.message}` });
      setShowModalMessage(true);
    }
  };

  return (
    <>
      <ModalConfirm
        show={showModalConfirm}
        closeModal={setShowModalConfirm}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={modalFunction}
        modalId={id}
      />
      <ModalMessage
        show={showModalMessage}
        closeModal={setShowModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={redirect}
      />
      <div>
        <form onSubmit={onSubmit}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>{formText}</div>
            <Input
              label={'Project Name'}
              name="name"
              required
              type="text"
              value={projectInput.name}
              onChange={(e) => {
                setProjectInput({ ...projectInput, name: e.target.value });
              }}
              placeholder={'Project Name'}
            />
            <Input
              label={'Description'}
              name="description"
              required
              type="text"
              value={projectInput.description}
              onChange={(e) => {
                setProjectInput({ ...projectInput, description: e.target.value });
              }}
              placeholder={'Description'}
            />
            <Datepicker
              label={'Start Date'}
              required
              name="start date"
              type="date"
              value={projectInput.startDate}
              onChange={(e) => {
                setProjectInput({ ...projectInput, startDate: e.target.value });
              }}
            />
            <Datepicker
              label={'End Date'}
              required
              name="end date"
              type="date"
              value={projectInput.endDate}
              onChange={(e) => {
                setProjectInput({ ...projectInput, endDate: e.target.value });
              }}
            />
            <Input
              label={'Client Name'}
              name="clientName"
              required
              type="text"
              value={projectInput.clientName}
              onChange={(e) => {
                setProjectInput({ ...projectInput, clientName: e.target.value });
              }}
              placeholder={'Client Name'}
            />
            <div className={styles.card}>
              {employeesProject?.map((option, index) => {
                return (
                  <div key={option}>
                    <label>Employee</label>
                    <Select
                      value={option.employeeId}
                      options={employeesList}
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
                    <Input
                      label={'Rate'}
                      name="rate"
                      required
                      type="number"
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
                      placeholder={'Rate'}
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
          <div>
            <Buttons type="submit" variant="primary" name="Confirm" />
            <Buttons
              variant="secondary"
              name="Cancel"
              onClick={() => props.history.push('/projects')}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProject;
