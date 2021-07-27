

const API_Endpoint = process.env.NODE_ENV === 'production'
  ? 'https://sunshine-store.herokuapp.com'
  : 'http://localhost:5500';

export default API_Endpoint;