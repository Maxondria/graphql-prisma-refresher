export default {
  email: {
    fragment: "fragment userID on User { id }", //cater for when 'id' isn't among the selection fields
    resolve(user, _args, { userId }, _info) {
      if (userId && userId === user.id) return user.email;
      return null;
    }
  }
};
