import {
    CLOSE_ASIDE_GESTIONNAIRE,
    RESET_ASIDE_GESTIONNAIRE,
    SHOW_ASIDE_ADD_MODE_GESTIONNAIRE,
    SHOW_ASIDE_DELETE_MODE_GESTIONNAIRE,
    SHOW_ASIDE_EDIT_MODE_GESTIONNAIRE,
    GET_ALL_TYPE_GESTIONNAIRE,
    GET_COMPTEUR_GESTIONNAIRE,
    SHOW_ASIDE_CONSULT_MODE_GESTIONNAIRE,
    SHOW_MODAL_CONFIRMATION_GESTIONNAIRE,
    CLOSE_MODAL_CONFIRMATION_GESTIONNAIRE,
    GET_ALL_NATURE_GESTIONNAIRE,
    DATA_TREE_LIST,
     GET_GROUP
} from "../../Constants/Gestionnaire/GestionnaireAside";

const initialState = {
    isOpen: false,
    modeAside: '',
    compteurBudget: '',
    allTypeBudget: '',
    allNatureBudget :'',
    selectedBudget: null,
    selectedGestionnaire:null,
    dataTreeList: [],
     group:null
};

const GestionnaireAsideReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ASIDE_ADD_MODE_GESTIONNAIRE:
            return {
                ...state,
                modeAside: 'ADD',
                isOpen: true,
                selectedGestionnaire: null,
                successCallback: action.payload
            };
        case SHOW_ASIDE_DELETE_MODE_GESTIONNAIRE:
            return {
                ...state,
                modeAside: 'DELETE',
                isOpen: true,
                selectedGestionnaire: action.payload.selectedGestionnaire,
                successCallback: action.payload.successCallback
            };
        case SHOW_ASIDE_EDIT_MODE_GESTIONNAIRE:
            return {
                ...state,
                modeAside: 'EDIT',
                isOpen: true,
                selectedGestionnaire: action.payload.selectedGestionnaire,
                successCallback: action.payload.successCallback
            };
        case CLOSE_ASIDE_GESTIONNAIRE:
            return {
                ...state,
                isOpen: false,
                selectedGestionnaire: null,
            };
            case CLOSE_ASIDE_GESTIONNAIRE:
                return {
                    ...state,
                    isOpen: false,
                    selectedGestionnaire: null,
                };
        case RESET_ASIDE_GESTIONNAIRE:
            return {
                ...state,
                form: {
                    codeSaisie: 'test'
                },
                selectedGestionnaire: null,
            };
        case GET_ALL_TYPE_GESTIONNAIRE:
            return {
                ...state,
                allTypeBudget: action.payload
            };
        case GET_COMPTEUR_GESTIONNAIRE:
            return {
                ...state,
                compteurBudget: action.payload
            };
            case SHOW_ASIDE_CONSULT_MODE_GESTIONNAIRE:
                return {
                    ...state,
                    modeAside: 'CONSULT',
                    isOpen: true,
                    selectedGestionnaire: action.payload
                };        
                case SHOW_MODAL_CONFIRMATION_GESTIONNAIRE:
                return {
                    ...state,
                    isConfirmationOpen: true,
                    messageToShow: action.messageToShow,
                    actionBtnModalConfirmation: action.actionBtnModalConfirmation
                };
            case CLOSE_MODAL_CONFIRMATION_GESTIONNAIRE:
                return {
                    ...state,
                    isConfirmationOpen: false,
                };
                case GET_ALL_NATURE_GESTIONNAIRE:
                    return {
                        ...state,
                        allNatureBudget: action.payload
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

export default GestionnaireAsideReducer;