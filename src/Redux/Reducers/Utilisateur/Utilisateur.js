import {
    GET_ALL_UTILISATEUR,
    GET_UTILISATEUR_BY_USER_NAME,
    ADD_NEW_UTILISATEUR,
    DELETE_UTILISATEUR,
    EDIT_UTILISATEUR,
    GET_MODULE,
    GET_MENU,
    GET_FORM,
    GET_UTILISATEUR,
    EDIT_GROUP_USER,
    GET_GROUP_USER
} from '../../Constants/Utilisateur/Utilisateur';

const initialState = {
    allUtilisateur: [],
    allgroupUser: [],
    module: [],
    menu: [],
    form: [],
    utilisateur: [],
    selectedUtilisateur: null,
    btnAddInstance: null,
    btnConsultInstance: null,
    btnEditInstance: null,
    btnDeleteInstance: null,
    btnEditionInstance: null,
};

const UtilisateursReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_UTILISATEUR:
            return {
                ...state,
                allUtilisateur: action.payload
            };
        case GET_UTILISATEUR_BY_USER_NAME:
            return {
                ...state,
                selectedUtilisateur: action.payload
            };
        case ADD_NEW_UTILISATEUR:
            return {
                ...state,
                allUtilisateur: [...state.allUtilisateur, action.payload],

            };
        case EDIT_UTILISATEUR:
            return {
                ...state,
                allUtilisateur: [...state.allUtilisateur, action.payload]
            };
        case EDIT_GROUP_USER:
            return {
                ...state,
                allgroupUser: [...state.allgroupUser, action.payload]
            };
        case DELETE_UTILISATEUR:
            return {
                ...state,
                allUtilisateur: [...state.allUtilisateur, action.payload]
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
        case GET_UTILISATEUR: //GROUP
            return {
                ...state,
                utilisateur: action.payload
            };
        case GET_GROUP_USER: //GROUP
            return {
                ...state,
                allgroupUser: action.payload
            };
        default:
            return state;
    }
}
export default UtilisateursReducer;
