import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    api.get('/profiles').then((response) => {
      setProfiles(response.data);
    });
  }, []);

  return (
    <div>
      <h1>User Profiles</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            <Link to={`/profile/${profile.id}`}>{profile.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;