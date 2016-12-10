/**
 * Created by sange on 29/10/2016.
 */
export const Constants = {

  users: {
    admin: {
      username: 'admin',
      password: '123456',
      role: 'ROLE_ADMIN'
    },
    manager: {
      username: 'manager',
      password: '123456',
      role: 'ROLE_MANAGER'
    },
    user: {
      username: 'argrgdgdf',
      password: 'passsdfhsfghfwd',
      role: ''
    }
  },

  headers: {
    xOrder: 'X-Order',
    xPassword: 'X-Password',
    xBase: 'X-Base',
    xOffset: 'X-Offset',
    xFilter: 'X-Filter',
    xCount: 'X-Count-records',
  },

  sort: {
    desc: 'desc',
    asc: 'asc'
  },

  regexp: {
    POSITIVE_NUMBER: '[1-9][0-9]*'
  },

  DATETIME_PLACEHOLDER: '2016-11-10T14:48:00+01:00'
};
