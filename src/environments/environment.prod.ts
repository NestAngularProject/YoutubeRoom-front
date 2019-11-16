export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '3000',
    endpoints: {
      allUser: '/api/users',
      oneUser: '/api/users/:username'
    }
  }
};
