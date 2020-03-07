/* eslint-disable consistent-return */
import API from '../API';

async function getCurrentUser() {
  try {
    const res = await API.get('/auth/user');
    console.log(res.data);
    return res.data;
  } catch (error) {
    return undefined;
  }
}

export default getCurrentUser;
