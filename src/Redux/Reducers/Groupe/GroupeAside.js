import {
    CLOSE_ASIDE_GROUPE,
    RESET_ASIDE_GROUPE,
    SHOW_ASIDE_ADD_MODE_GROUPE,
    SHOW_ASIDE_DELETE_MODE_GROUPE,
    SHOW_ASIDE_EDIT_MODE_GROUPE,
    GET_COMPTEUR_GROUPE,
    SHOW_ASIDE_CONSULT_MODE_GROUPE,
    SHOW_MODAL_CONFIRMATION_GROUPE,
    CLOSE_MODAL_CONFIRMATION_GROUPE,
    GET_ALL_GROUPE,
    GET_ALL_UTILISATEUR,
    GET_ALL_GROUPEUSER,
    ADD_GROUPEUSER
} from "../../Constants/Groupe/GroupeAside";


const initialState = {
    allGroupes: [],
    isOpen: false,
    modeAside: '',
    compteurGroupe: '',
    allTypeGroupe: '',
    allUtilisateurs: [],
    selectedGroupe: null,
    allGroupesUtilisateur: [],
    groupUser: [],

};



const GroupeAsideReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ASIDE_ADD_MODE_GROUPE:
            return {
                ...state,
                modeAside: 'ADD',
                isOpen: true,
                selectedGroupe: null,
                successCallback: action.payload
            };
        case SHOW_ASIDE_DELETE_MODE_GROUPE:
            return {
                ...state,
                modeAside: 'DELETE',
                isOpen: true,
                selectedGroupe: action.payload.selectedGroupe,
                successCallback: action.payload.successCallback
            };
        case SHOW_ASIDE_EDIT_MODE_GROUPE:
            return {
                ...state,
                modeAside: 'EDIT',
                isOpen: true,
                selectedGroupe: action.payload.selectedGroupe,
                successCallback: action.payload.successCallback
            };
        case CLOSE_ASIDE_GROUPE:
            return {
                ...state,
                isOpen: false,
                selectedGroupe: null,
            };
        case RESET_ASIDE_GROUPE:
            return {
                ...state,
                form: {
                    codeSaisie: 'test'
                },
                selectedGroupe: null,
            };
        case GET_COMPTEUR_GROUPE:
            return {
                ...state,
                compteurGroupe: action.payload
            };
        case SHOW_ASIDE_CONSULT_MODE_GROUPE:
            return {
                ...state,
                modeAside: 'CONSULT',
                isOpen: true,
                selectedGroupe: action.payload
            };
        case SHOW_MODAL_CONFIRMATION_GROUPE:
            return {
                ...state,
                isConfirmationOpen: true,
                messageToShow: action.messageToShow,
                actionBtnModalConfirmation: action.actionBtnModalConfirmation
            };
        case CLOSE_MODAL_CONFIRMATION_GROUPE:
            return {
                ...state,
                isConfirmationOpen: false,
            };

        case GET_ALL_GROUPE:
            return {
                ...state,
                allGroupes: action.payload
            };
        case GET_ALL_UTILISATEUR:
            return {
                ...state,
                allUtilisateurs: action.payload
            };
        case GET_ALL_GROUPEUSER:
            return {
                ...state,
                allGroupesUtilisateur: action.payload
            };
        case ADD_GROUPEUSER:
            return {
                ...state,
                groupUser: [...state.groupUser, action.payload],

            };
        default:
            return state;
    }
};

export default GroupeAsideReducer;