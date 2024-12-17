import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get(`/profiles/${id}`).then((response) => {
      setProfile(response.data);
    });
  }, [id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.description}</p>
      <img src={profile.photoUrl} alt="Profile" />
    </div>
  );
};

export default Profile;