import { users } from "../../config/users";

const initialState = {
  user: {},
  isLoggedIn: false,
  errorMessage: ""
};

export default (state = initialState, action) => {
  console.log("inside auth reducer");
  const { type } = action;
  switch (type) {
    case "LOGIN":
      const user = users.find(u => u.email.toLowerCase() === action.payload.email.toLowerCase() && u.password === action.payload.password);
      return {
        ...state,
        user: user ? user : {},
        isLoggedIn: user ? true : false,
        errorMessage: user ? "" : "Invalid username or password"
      }
    case "LOGOUT": 
      return{
        ...state,
        user: {},
        isLoggedIn: false
      }
    default:
      return { ...state };
  }
};
