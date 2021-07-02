import React, { useState, useEffect } from 'react';
import axios from 'axios'
import UserTable from '../../../components/Table/User';

const User = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/user');
      setData(result.data.data.list);
    };
    fetchData();
  }, []);

  return (
    <UserTable
      rows={data}
    />
  );
}

export default User;
