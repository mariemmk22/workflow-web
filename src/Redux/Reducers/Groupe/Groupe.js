import {
    GET_ALL_GROUPE,
    GET_GROUPE_BY_CODE,
    ADD_NEW_GROUPE,
    DELETE_GROUPE,
    EDIT_GROUPE,
    GET_MODULE,
    GET_MENU,
    GET_FORM,
    GET_GROUP,
} from '../../Constants/Groupe/Groupe';

const initialState = {
    allGroupe: [],
    module: [],
    menu: [],
    form: [],
    group: [],
    selectedGroupe: null,
    btnAddInstance: null,
    btnConsultInstance: null,
    btnEditInstance: null,
    btnDeleteInstance: null,
    btnEditionInstance: null,
};

const GroupesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_GROUPE:
            return {
                ...state,
                allGroupe: action.payload
            };
        case GET_GROUPE_BY_CODE:
            return {
                ...state,
                selectedGroupe: action.payload
            };
        case ADD_NEW_GROUPE:
            return {
                ...state,
                allGroupe: [...state.allGroupe, action.payload],

            };
        case EDIT_GROUPE:
            return {
                ...state,
                allGroupe: [...state.allGroupe, action.payload]
            };
        case DELETE_GROUPE:
            return {
                ...state,
                allGroupe: [...state.allGroupe, action.payload]
            };
        case GET_MODULE:
            return {
                ...state,
                module: action.payload
            };
        case GET_MENU://menu
            return {
                ...state,
                menu: action.payload
            };
        case GET_FORM: //form
            return {
                ...state,
                form: action.payload
            };
        case GET_GROUP: //GROUP
            return {
                ...state,
                group: action.payload
            };
        default:
            return state;
    }
}
export default GroupesReducer;

