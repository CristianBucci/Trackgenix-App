import { useState } from 'react';

const adminsUpdate = ({ updateAdmin, toEdit }) => {
  const [name, setName] = useState(toEdit.name);
  const [lastName, setLastName] = useState(toEdit.lastName);
  const [email, setEmail] = useState(toEdit.email);
  const [password, setPassword] = useState(toEdit.password);

  return (
    <div>
      <from>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <input
          type="submit"
          value="Confirm"
          onClick={() => {
            const newData = {
              name,
              lastName,
              email,
              password
            };
            updateAdmin(toEdit._id, newData);
          }}
        />
      </from>
    </div>
  );
};

export default adminsUpdate;
