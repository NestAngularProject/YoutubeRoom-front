export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '3000',
    endpoints: {
      allUsers: '/users',
      oneUser: '/users/:username',
      pwdUser: '/users/:username/:password',
      allVideos: '/videos',
      oneVideo: '/videos/:id',
      allRooms: '/rooms',
      oneRoom:  '/rooms/:name',
      pwdRoom:  '/rooms/:name/:password'
    }
  }
};
