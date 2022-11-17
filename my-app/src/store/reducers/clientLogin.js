const INITIAL_STATE = {
   login: false,
  };  

  export default function clientLogin(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'CLIENT_LOGIN':
        return {
          ...state,
          login: action.value,
        };   
        
      default:
        return state || [];
    }
  }