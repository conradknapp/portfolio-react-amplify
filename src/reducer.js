export default function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return {
        ...state
      };
    default:
      return state;
  }
}
