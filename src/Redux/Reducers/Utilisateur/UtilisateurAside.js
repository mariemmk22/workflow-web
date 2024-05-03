import {
    CLOSE_ASIDE_UTILISATEUR,
    RESET_ASIDE_UTILISATEUR,
    SHOW_ASIDE_ADD_MODE_UTILISATEUR,
    SHOW_ASIDE_DELETE_MODE_UTILISATEUR,
    SHOW_ASIDE_EDIT_MODE_UTILISATEUR,
    GET_COMPTEUR_UTILISATEUR,
    SHOW_ASIDE_CONSULT_MODE_UTILISATEUR,
    SHOW_MODAL_CONFIRMATION_UTILISATEUR,
    CLOSE_MODAL_CONFIRMATION_UTILISATEUR,
    GET_ALL_UTILISATEUR,
    GET_ALL_GROUPE,
    GET_ALL_MODULES
} from "../../Constants/Utilisateur/UtilisateurAside";

const initialState = {
    allUtilisateurs: [],
    isOpen: false,
    modeAside: '',
    compteurUtilisateur: '',
    allTypeUtilisateur: '',
    allGroupes: [],
    selectedUtilisateur: null,
    allModules: []

};

const UtilisateurAsideReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ASIDE_ADD_MODE_UTILISATEUR:
            return {
                ...state,
                modeAside: 'ADD',
                isOpen: true,
                selectedUtilisateur: null,
                successCallback: action.payload
            };
        case SHOW_ASIDE_DELETE_MODE_UTILISATEUR:
            return {
                ...state,
                modeAside: 'DELETE',
                isOpen: true,
                selectedUtilisateur: action.payload.selectedUtilisateur,
                successCallback: action.payload.successCallback
            };
        case SHOW_ASIDE_EDIT_MODE_UTILISATEUR:
            return {
                ...state,
                modeAside: 'EDIT',
                isOpen: true,
                selectedUtilisateur: action.payload.selectedUtilisateur,
                successCallback: action.payload.successCallback
            };
        case CLOSE_ASIDE_UTILISATEUR:
            return {
                ...state,
                isOpen: false,
                selectedUtilisateur: null,
            };
        case RESET_ASIDE_UTILISATEUR:
            return {
                ...state,
                form: {
                    codeSaisie: 'test'
                },
                selectedUtilisateur: null,
            };
        case GET_COMPTEUR_UTILISATEUR:
            return {
                ...state,
                compteurUtilisateur: action.payload
            };
        case SHOW_ASIDE_CONSULT_MODE_UTILISATEUR:
            return {
                ...state,
                modeAside: 'CONSULT',
                isOpen: true,
                selectedUtilisateur: action.payload
            };
        case SHOW_MODAL_CONFIRMATION_UTILISATEUR:
            return {
                ...state,
                isConfirmationOpen: true,
                messageToShow: action.messageToShow,
                actionBtnModalConfirmation: action.actionBtnModalConfirmation
            };
        case CLOSE_MODAL_CONFIRMATION_UTILISATEUR:
            return {
                ...state,
                isConfirmationOpen: false,
            };

        case GET_ALL_UTILISATEUR:
            return {
                ...state,
                allUtilisateurs: action.payload
            };
        case GET_ALL_GROUPE:
            return {
                ...state,
                allGroupes: action.payload
            };
        case GET_ALL_MODULES:
            return {
                ...state,
                allModules: action.payload
            };
        default:
            return state;
    }
};

export default UtilisateurAsideReducer;