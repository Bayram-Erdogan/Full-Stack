// 2
import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson);
  return request.then(response => response.data);
};

// 2
const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
};

export default {
  getAll,
  create,
  deletePerson 
};

