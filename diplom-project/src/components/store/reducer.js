export const actionTypes = {
  SET_DATA: 'SET_DATA',
  SET_SELECTED: 'SET_SELECTED',
  SET_TYPES: 'SET_TYPES',
  SET_EQUIPMENT: 'SET_EQUIPMENT',
  SET_EMPLOYEE: 'SET_EMPLOYEE',
  SET_ID: 'SET_ID',
  VALIDATE: 'VALIDATE',
};

export const initialState = {
  data: '',
  selected: '',
  types: '',
  equipment: {
    computer: '',
    laptop: '',
    screen: '',
    scanner: '',
    camera: '',
    furniture: '',
    ventilation: '',
  },
  id: {
    computer: '',
    laptop: '',
    screen: '',
    scanner: '',
    camera: '',
    furniture: '',
    ventilation: '',
  },
  employee: [],
  employeeSelected: null,
  isValid: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return { ...state, data: action.payload };
    case actionTypes.SET_SELECTED:
      return { ...state, selected: action.payload, types: '' };
    case actionTypes.SET_TYPES:
      return { ...state, types: action.payload };
    case actionTypes.SET_EQUIPMENT:
      return {
        ...state,
        equipment: {
          ...state.equipment,
          [action.payload.type]: action.payload.value,
        },
        id: {
          ...state.id,
          [action.payload.type]: action.payload.key || '',
        },
      };
    case actionTypes.SET_EMPLOYEE:
      return {
        ...state,
        employeeSelected: action.payload,
      };
    case actionTypes.VALIDATE:
      return {
        ...state,
        isValid: !!(
          state.data &&
          state.selected &&
          (state.selected !== 'Оргтехника' || state.types) &&
          state.employeeSelected
        ),
      };
    default:
      return state;
  }
};
