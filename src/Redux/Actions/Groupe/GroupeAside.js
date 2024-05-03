import {
    CLOSE_ASIDE_GROUPE,
    RESET_ASIDE_GROUPE,
    SHOW_ASIDE_ADD_MODE_GROUPE,
    SHOW_ASIDE_EDIT_MODE_GROUPE,
    SHOW_ASIDE_DELETE_MODE_GROUPE,
    SHOW_ASIDE_CONSULT_MODE_GROUPE,
    SHOW_MODAL_CONFIRMATION_GROUPE,
    CLOSE_MODAL_CONFIRMATION_GROUPE,
    GET_ALL_UTILISATEUR,
    GET_ALL_GROUPEUSER,
    ADD_GROUPEUSER

} from "../../Constants/Groupe/GroupeAside";
import axios from "axios";
import Ressources from '../../../Helper/Ressources';

export const handleOpenAddMode = (successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_ADD_MODE_GROUPE,
            payload: successCallback
        });
    }
}

export const handleOpenConsultMode = (selectedGroupe) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_CONSULT_MODE_GROUPE,
            payload: selectedGroupe
        });
    }
}

export const handleOpenDeleteMode = (selectedGroupe, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_DELETE_MODE_GROUPE,
            payload: { selectedGroupe: selectedGroupe, successCallback: successCallback }
        });
    }
}

export const handleOpenEditMode = (selectedGroupe, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_EDIT_MODE_GROUPE,
            payload: { selectedGroupe: selectedGroupe, successCallback: successCallback }
        });
    }
}

export const handleClose = () => {
    return dispatch => {
        dispatch({
            type: CLOSE_ASIDE_GROUPE
        });
    }
}

export const clearForm = () => {
    return dispatch => {
        dispatch({
            type: RESET_ASIDE_GROUPE
        });
    }
}



export const handleOpenModalConfirmation = (messageToShow, handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation) => {
    return dispatch => {
        dispatch({
            type: SHOW_MODAL_CONFIRMATION_GROUPE,
            messageToShow: messageToShow,
            actionBtnModalConfirmation: { handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation }
        });
    }
}

export const handleCloseModalConfirmation = (successCallback) => {
    return dispatch => {
        dispatch({
            type: CLOSE_MODAL_CONFIRMATION_GROUPE,
            payload: successCallback
        });
    }
}
export const getUtilisateur = () => {
    return dispatch => {
        axios.get("http://localhost:9011/gestion_acces/api/utilisateurs/filtre").then(res => {
            dispatch({
                type: GET_ALL_UTILISATEUR,
                payload: res.data
            })
        })
    }
}


export const getAllGroupesUtilisateur = () => {
    return dispatch => {
        axios.get("http://localhost:9011/gestion_acces/api/groupusers/all").then(res => {
            dispatch({
                type: GET_ALL_GROUPEUSER,
                payload: res.data
            });
        })
    };
};








