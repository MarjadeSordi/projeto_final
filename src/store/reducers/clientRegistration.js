const INITIAL_STATE = {
  form: [
    {
      firstName: '',
      email: '',
      pass: '',
      endereco:
      {
        uf: '',
        cep: '',
        complemento: '',
        logradouro: '',
        cidade: '',
        bairro: '',
        numero: '',
      }
      ,
      cliente: false,
    }
  ],
  enterPageLogin: false
};

export const form = INITIAL_STATE.form;

export default function clientRegistration(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'NEW_CLIENT_REGISTER': {
      console.error(form)
      console.error(action.cep)
      return {
        ...state,
        form: [
          ...state.form,
          {
            firstName: action.firstName,
            email: action.email,
            pass: action.confirmPassword,
            endereco:
            {
              uf: action.uf,
              cep: action.cep,
              complemento: action.complemento,
              logradouro: action.logradouro,
              cidade: action.city,
              bairro: action.bairro,
              numero: action.number,
            }
            ,
            cliente: action.value,
          }
        ],


      } 
     
    } 
    case 'ENTER_PAGE_LOGIN': {
      console.error(action.enterPageLogin)
        return {
          ...state,
          enterPageLogin: action.enterPageLogin
        }
      }
    default: return state;
}
}