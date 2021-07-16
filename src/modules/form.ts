const LOGIN = 'form/LOGIN' as const;
const REGISTER = 'form/REGISTER' as const;
const SEARCH = 'form/SEARCH' as const;

export const login = () => ({ type: LOGIN });
export const register = () => ({ type: REGISTER });
export const search = () => ({ type: SEARCH });

type FormAction = ReturnType<typeof login> | ReturnType<typeof register> | ReturnType<typeof search>;

type FormState = {
  state: number;
};
const initialState: FormState = {
  state: 0,
};

function form(state: FormState = initialState, action: FormAction) {
  switch (action.type) {
    case LOGIN:
      return { state: 0 };
    case REGISTER:
      return { state: 1 };
    case SEARCH:
      return { state: 2 };
    default:
      return state;
  }
}

export default form;
