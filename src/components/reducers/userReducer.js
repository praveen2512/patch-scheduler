const initialState = {
    fullname: "Praveen Kumar"
  };
  
  export default (state = initialState, action) => {
    const type = { action };
    switch (type) {
      case "GET_EVENTS":
        return {
          state,
        };
      default:
        return state;
    }
  };