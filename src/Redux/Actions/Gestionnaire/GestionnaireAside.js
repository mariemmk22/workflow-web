import {
    CLOSE_ASIDE_GESTIONNAIRE,
    RESET_ASIDE_GESTIONNAIRE,
    SHOW_ASIDE_ADD_MODE_GESTIONNAIRE,
    SHOW_ASIDE_EDIT_MODE_GESTIONNAIRE,
    SHOW_ASIDE_DELETE_MODE_GESTIONNAIRE,
    SHOW_ASIDE_CONSULT_MODE_GESTIONNAIRE,
    SHOW_MODAL_CONFIRMATION_GESTIONNAIRE,
    CLOSE_MODAL_CONFIRMATION_GESTIONNAIRE,
    //DATA_TREE_LIST,
     GET_GROUP
} from "../../Constants/Gestionnaire/GestionnaireAside";
import axios from "axios";
import Ressources from '../../../Helper/Ressources';

export const handleOpenAddMode = (successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_ADD_MODE_GESTIONNAIRE,
            payload: successCallback
        });
    }
}

export const handleOpenConsultMode = (selectedGestionnaire) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_CONSULT_MODE_GESTIONNAIRE,
            payload: selectedGestionnaire
        });
    }
}

export const handleOpenDeleteMode = (selectedGestionnaire, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_DELETE_MODE_GESTIONNAIRE,
            payload: {selectedGestionnaire: selectedGestionnaire, successCallback: successCallback}
        });
    }
}

export const handleOpenEditMode = (selectedGestionnaire, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_EDIT_MODE_GESTIONNAIRE,
            payload: {selectedGestionnaire: selectedGestionnaire, successCallback: successCallback}
        });
    }
}

export const handleClose = () => {
    return dispatch => {
        dispatch({
            type: CLOSE_ASIDE_GESTIONNAIRE
        });
    }
}

export const clearForm = () => {
    return dispatch => {
        dispatch({
            type: RESET_ASIDE_GESTIONNAIRE
        });
    }
}



export const handleOpenModalConfirmation = (messageToShow, handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation) => {
    return dispatch => {
        dispatch({
            type: SHOW_MODAL_CONFIRMATION_GESTIONNAIRE,
            messageToShow: messageToShow,
            actionBtnModalConfirmation: {handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation}
        });
    }
}

export const handleCloseModalConfirmation = (successCallback) => {
    return dispatch => {
        dispatch({
            type: CLOSE_MODAL_CONFIRMATION_GESTIONNAIRE,
            payload: successCallback
        });
    }
}


// export const handleUpdateDataTreeList = (data) => {
//     return dispatch => {
//         dispatch({
//             type: DATA_TREE_LIST,
//             payload: data
//         });
//     }
// }

 export const getGroup = () => {
     return dispatch => {
         axios.get("http://localhost:9011/gestion-acces/api/groupes").then (res =>{
             dispatch({
                 type:GET_GROUP,
                 payload:res.data            })
         })
     }
 }