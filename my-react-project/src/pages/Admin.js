import React, { useEffect, useState } from 'react';
import api from '../api';

const Admin = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    api.get('/profiles').then((response) => {
      setProfiles(response.data);
    });
  }, []);

  const deleteProfile = (id) => {
    api.delete(`/profiles/${id}`).then(() => {
      setProfiles(profiles.filter((profile) => profile.id !== id));
    });
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            {profile.name} <button onClick={() => deleteProfile(profile.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;