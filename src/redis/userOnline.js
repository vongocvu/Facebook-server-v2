const edisClient = require('./connect')
const ONLINE_USERS_KEY = 'online_users';

const ControlUserOnline = {
  addOnlineUser: (userId) => {
    return edisClient.sadd(ONLINE_USERS_KEY, userId);
  },
  removeOnlineUser: (userId) => {
    return edisClient.srem(ONLINE_USERS_KEY, userId);
  },
  getOnlineUsers: () => {
    return edisClient.smembers(ONLINE_USERS_KEY);
  }

}

module.exports = ControlUserOnline