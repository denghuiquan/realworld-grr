export const InitialState = {
  // email: '',
  // username: '',
  // bio: null,
  // image: 'https://api.realworld.io/images/smiley-cyrus.jpeg',
  // token: null,
  // success: 0
}

export default (state = InitialState, action) => {
  switch (action.type) {
    case 'resetFields':
      return { ...InitialState }
    case 'registerFailed':
    case 'loginFailed':
    case 'updateFailed':
      return { success: false, errors: action.payload }
    case 'loadUserFailed':
      return { success: false, message: action.payload }
    case 'loginSuccess':
    case 'loadUserSuccess':
    case 'registerSuccess':
    case 'updateSuccess':
      return { success: true, user: action.payload }

    default:
      return state
  }
}
