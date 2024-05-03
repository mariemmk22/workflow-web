import {
    GET_DEMANDE_BY_CODE,
    GET_MODULE,
    GET_LISTE_MENU,
    GET_ALL_FORM,
    ADD_NEW_DEMANDE,
    GET_ALL_DEMANDE,
    EDIT_DEMANDE,
    DELETE_DEMANDE,

} from '../../Constants/Demande/Demande';

const initialState = {
    allDemande: [],
    alldemande: [],
    module: [],
    listMenus: [],
    forms: [],
    demande: [],
    selectedDemande: null,
    btnAddInstance: null,
    btnConsultInstance: null,
    btnEditInstance: null,
    btnDeleteInstance: null,
    btnEditionInstance: null,
    dateDebut: null,
    dateFin: null
};

const DemandesReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DEMANDE_BY_CODE:
            return {
                ...state,
                alldemande: [...state.alldemande, action.payload]
            };

        case EDIT_DEMANDE:
            return {
                ...state,
                allDemande: [...state.allDemande, action.payload]
            };
        case DELETE_DEMANDE:
            return {
                ...state,
                alldemande: [...state.alldemande, action.payload]
            };
        case GET_MODULE:
            return {
                ...state,
                module: action.payload
            };
        case GET_LISTE_MENU:
            return {
                ...state,
                listMenus: action.payload
            };
        case GET_ALL_FORM:
            return {
                ...state,
                forms: action.payload
            };
   
        case GET_ALL_DEMANDE:
            return {
                ...state,
                alldemande: action.payload
            };

        case ADD_NEW_DEMANDE:
            return {
                ...state,

                alldemande: [...state.alldemande, action.payload]
            };
        default:
            return state;
    }

}
export default DemandesReducer;
