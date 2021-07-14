

const API_Endpoint = process.env.NODE_ENV === 'production'
  ? 'http://myapidomain.com'
  : 'http://localhost:5500';

export default API_Endpoint;