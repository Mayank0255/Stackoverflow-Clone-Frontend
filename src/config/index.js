const config = {
  BASE_URL: process.env.REACT_APP_API_URL,
};

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config.BASE_URL = 'https://stackoverflow-clone-backend.herokuapp.com';
}

export default config;