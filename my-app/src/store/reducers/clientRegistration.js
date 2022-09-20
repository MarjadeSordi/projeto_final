const INITIAL_STATE = {
  form: [
    {
      firstName: ''
    },
  ],
};

export const form = INITIAL_STATE.form;

export default function newTaskPersonal(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'NEW_FIRST_NAME_REGISTER':{
            return{
                ...state,
                form: [
                    ...state.form,
                    {
                        firstName: action.firstName
                    }
                ]
            }

           
        } default:
                return state || [];
    }
}