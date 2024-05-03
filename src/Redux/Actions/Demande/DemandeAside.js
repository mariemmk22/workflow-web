import {
    CLOSE_ASIDE_DEMANDE,
    RESET_ASIDE_DEMANDE,
    SHOW_ASIDE_ADD_MODE_DEMANDE,
    SHOW_ASIDE_EDIT_MODE_DEMANDE,
    SHOW_ASIDE_DELETE_MODE_DEMANDE,
    SHOW_ASIDE_CONSULT_MODE_DEMANDE,
    SHOW_MODAL_CONFIRMATION_DEMANDE,
    CLOSE_MODAL_CONFIRMATION_DEMANDE,
    DATA_TREE_LIST,
     GET_GROUP,
     GET_COMPTEUR_DEMANDE
} from "../../Constants/Demande/DemandeAside";
import axios from "axios";
import Ressources from '../../../Helper/Ressources';

export const handleOpenAddMode = (successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_ADD_MODE_DEMANDE,
            payload: successCallback
        });
    }
}

export const handleOpenConsultMode = (selectedDemande) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_CONSULT_MODE_DEMANDE,
            payload: selectedDemande
        });
    }
}

export const handleOpenDeleteMode = (selectedDemande, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_DELETE_MODE_DEMANDE,
            payload: {selectedDemande: selectedDemande, successCallback: successCallback}
        });
    }
}

export const handleOpenEditMode = (selectedDemande, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_EDIT_MODE_DEMANDE,
            payload: {selectedDemande: selectedDemande, successCallback: successCallback}
        });
    }
}

export const handleClose = () => {
    return dispatch => {
        dispatch({
            type: CLOSE_ASIDE_DEMANDE
        });
    }
}

export const clearForm = () => {
    return dispatch => {
        dispatch({
            type: RESET_ASIDE_DEMANDE
        });
    }
}



export const handleOpenModalConfirmation = (messageToShow, handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation) => {
    return dispatch => {
        dispatch({
            type: SHOW_MODAL_CONFIRMATION_DEMANDE,
            messageToShow: messageToShow,
            actionBtnModalConfirmation: {handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation}
        });
    }
}

export const handleCloseModalConfirmation = (successCallback) => {
    return dispatch => {
        dispatch({
            type: CLOSE_MODAL_CONFIRMATION_DEMANDE,
            payload: successCallback
        });
    }
}


export const handleUpdateDataTreeList = (data) => {
    return dispatch => {
        dispatch({
            type: DATA_TREE_LIST,
            payload: data
        });
    }
}

 export const getGroup = () => {
     return dispatch => {
         axios.get(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.GroupUser}`).then (res =>{
             dispatch({
                 type:GET_GROUP,
                 payload:res.data            })
         })
     }
 }


 export const getCompteurDemande = () => {
    return dispatch => {
        axios.get(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.compteurdemande}?type=Demande`, {
            headers: { 'content-type': 'text/plain;charset=UTF-8' },
            responseType: 'text'
        }).then (res =>{
            dispatch({
                type:GET_COMPTEUR_DEMANDE,
                payload:res.data            })
        })
    }
}