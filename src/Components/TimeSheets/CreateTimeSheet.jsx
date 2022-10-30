import React, { useState } from 'react';

const CreateTimeSheet = () => {
  const [timeSheetInput, setTimeSheetInput] = useState({
    description: 'Create Test',
    date: '2022-06-24T03:00:00.000Z',
    hours: 3,
    task: '634c902a62ef82c16e12453d',
    employee: '634d4ae6cc51b61f8d9c862e',
    project: '635015885581eb421df093f0'
  });

  const onChange = (e) => {
    setTimeSheetInput({ ...timeSheetInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createItem(timeSheetInput);
    setTimeSheetInput({
      description: '',
      date: '',
      hours: '',
      task: '',
      employee: '',
      project: ''
    });
  };

  //create
  const createItem = async (timeSheetInput) => {
    await fetch(`${process.env.REACT_APP_API_URL}timesheets/${timeSheetInput.description}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: timeSheetInput.description,
        date: timeSheetInput.date,
        hours: timeSheetInput.hours,
        task: timeSheetInput.task,
        employee: timeSheetInput.employee,
        project: timeSheetInput.project
      })
    });
    location.reload();
  };
  return (
    <div>
      <h2>Create new TimeSheet</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={timeSheetInput.description}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Date</label>
          <input type="text" name="date" value={timeSheetInput.date} onChange={onChange} />
        </div>
        <div>
          <label>Hours</label>
          <input type="number" name="hours" value={timeSheetInput.hours} onChange={onChange} />
        </div>
        <div>
          <label>Task</label>
          <input type="text" name="task" value={timeSheetInput.task} onChange={onChange} />
        </div>
        <div>
          <label>Employee</label>
          <input type="text" name="employee" value={timeSheetInput.employee} onChange={onChange} />
        </div>
        <div>
          <label>Project</label>
          <input type="text" name="project" value={timeSheetInput.project} onChange={onChange} />
        </div>
        <div>
          <input type="submit" value="submit" />
        </div>
      </form>
    </div>
  );
};

export default CreateTimeSheet;
