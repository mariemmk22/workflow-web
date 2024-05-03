import {
    CLOSE_ASIDE_DEMANDE,
    RESET_ASIDE_DEMANDE,
    SHOW_ASIDE_ADD_MODE_DEMANDE,
    SHOW_ASIDE_DELETE_MODE_DEMANDE,
    SHOW_ASIDE_EDIT_MODE_DEMANDE,
    GET_COMPTEUR_DEMANDE,
    SHOW_ASIDE_CONSULT_MODE_DEMANDE,
    SHOW_MODAL_CONFIRMATION_DEMANDE,
    CLOSE_MODAL_CONFIRMATION_DEMANDE,
    DATA_TREE_LIST,
    GET_GROUP
} from "../../Constants/Demande/DemandeAside";

const initialState = {
    isOpen: false,
    modeAside: '',
    compteurDemande: '',
    selectedDemande:null,
    dataTreeList: [],
    group: null
};

const DemandeAsideReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ASIDE_ADD_MODE_DEMANDE:
            return {
                ...state,
                modeAside: 'ADD',
                isOpen: true,
                selectedDemande: null,
                successCallback: action.payload
            };
        case SHOW_ASIDE_DELETE_MODE_DEMANDE:
            return {
                ...state,
                modeAside: 'DELETE',
                isOpen: true,
                selectedDemande: action.payload.selectedDemande,
                successCallback: action.payload.successCallback
            };
        case SHOW_ASIDE_EDIT_MODE_DEMANDE:
            return {
                ...state,
                modeAside: 'EDIT',
                isOpen: true,
                selectedDemande: action.payload.selectedDemande,
                successCallback: action.payload.successCallback
            };
        case CLOSE_ASIDE_DEMANDE:
            return {
                ...state,
                isOpen: false,
                selectedDemande: null,
            };
        case RESET_ASIDE_DEMANDE:
            return {
                ...state,
                form: {
                    codeSaisie: 'test'
                },
                selectedDemande: null,
            };
      
        case GET_COMPTEUR_DEMANDE:
            return {
                ...state,
                compteurDemande: action.payload
            };
        case SHOW_ASIDE_CONSULT_MODE_DEMANDE:
            return {
                ...state,
                modeAside: 'CONSULT',
                isOpen: true,
                selectedDemande: action.payload
            };
        case SHOW_MODAL_CONFIRMATION_DEMANDE:
            return {
                ...state,
                isConfirmationOpen: true,
                messageToShow: action.messageToShow,
                actionBtnModalConfirmation: action.actionBtnModalConfirmation
            };
        case CLOSE_MODAL_CONFIRMATION_DEMANDE:
            return {
                ...state,
                isConfirmationOpen: false,
            };
        case DATA_TREE_LIST:
            return {
                ...state,
                dataTreeList: action.payload
            };
        case GET_GROUP: //GROUP
            return {
                ...state,
                group: action.payload
            };
        default:
            return state;
    }
};

export default DemandeAsideReducer;