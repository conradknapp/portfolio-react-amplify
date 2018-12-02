export default function reducer(state, action) {
  switch (action.type) {
    case "GET_USER_INFO":
      return {
        ...state,
        user: action.payload
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}
