import { useState } from 'react';

const adminsAdd = ({ addAdmin }) => {
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
            addAdmin(newData);
          }}
        />
      </from>
    </div>
  );
};

export default adminsAdd;
