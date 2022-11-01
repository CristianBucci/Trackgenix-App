import { useState } from 'react';

const adminsUpdate = ({ updateAdmin, toEdit }) => {
  const [name, saveName] = useState(toEdit.name);
  const [lastName, saveLastName] = useState(toEdit.lastName);
  const [email, saveEmail] = useState(toEdit.email);
  const [password, savePassword] = useState(toEdit.password);

  return (
    <div>
      <from>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => saveName(e.target.value)} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => saveLastName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => saveEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => savePassword(e.target.value)} />
        </div>
        <input
          type="submit"
          value="Confirm"
          onClick={() => {
            const newData = {
              name: name,
              lastName: lastName,
              email: email,
              password: password
            };
            updateAdmin(toEdit._id, newData);
          }}
        />
      </from>
    </div>
  );
};

export default adminsUpdate;
