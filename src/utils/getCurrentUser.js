/* eslint-disable consistent-return */
import axios from 'axios';

async function getCurrentUser() {
  try {
    const res = await axios.get('/current');
    return res.data;
  } catch (error) {
    return undefined;
  }
}

export default getCurrentUser;
