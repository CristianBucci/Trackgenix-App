import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createProject, updateProject } from 'redux/projects/thunks';
import { useSelector, useDispatch } from 'react-redux';
import {
  confirmModalOpen,
  messageModalOpen,
  confirmModalClose,
  messageModalClose
} from 'redux/projects/actions';
import { getEmployees } from 'redux/employees/thunks';

import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Select from 'Components/Shared/Select/index';
import Buttons from 'Components/Shared/Button/index';
import styles from './form.module.css';

const AddProject = (props) => {
  const dispatch = useDispatch();
  const { modalContent, showModalMessage, showConfirmModal, isLoading } = useSelector(
    (state) => state.projects
  );
  const [formText, setFormText] = useState('Add Project');
  const { list: employees } = useSelector((state) => state.employees);
  const [employeesProject, setEmployeesProject] = useState([]);
  const params = useParams();
  const id = params.id && params.id;
  const roles = [{ role: 'DEV' }, { role: 'QA' }, { role: 'PM' }, { role: 'TL' }];
  const [projectInput, setProjectInput] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    clientName: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const content = `Are you sure you want to ${
      id ? 'edit the Project with id ' + id : 'create a new Project'
    }?`;
    dispatch(confirmModalOpen(content));
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const redirect = () => {
    props.history.push('/projects');
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const onConfirm = () => {
    id
      ? dispatch(updateProject(id, projectInput, employeesProject))
      : dispatch(createProject(projectInput, employeesProject));
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
        dispatch(messageModalOpen({ title: 'ERROR', content: `Could not GET Project. ${error}` }));
      }
    } else {
      return null;
    }
  }, []);

  const fixDate = (date) => {
    let dateFormated = date.substr(0, 10);
    return dateFormated;
  };

  return (
    <>
      <ModalConfirm
        show={showConfirmModal}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <ModalMessage
        show={showModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={modalFunction}
      />
      <div>
        {!isLoading ? (
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
              <Input
                label={'Start Date'}
                required
                name="start date"
                type="date"
                value={projectInput.startDate}
                onChange={(e) => {
                  setProjectInput({ ...projectInput, startDate: e.target.value });
                }}
              />
              <Input
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
        ) : (
          <div className={styles.spinnerContainer}>
            <img src="/assets/images/spinner.gif" alt="spinner" />
          </div>
        )}
      </div>
    </>
  );
};

export default AddProject;
