import { useState } from 'react';

const adminsAdd = ({ addAdmin }) => {
  const [name, saveName] = useState();
  const [lastName, saveLastName] = useState();
  const [email, saveEmail] = useState();
  const [password, savePassword] = useState();

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
            addAdmin(newData);
          }}
        />
      </from>
    </div>
  );
};

export default adminsAdd;
