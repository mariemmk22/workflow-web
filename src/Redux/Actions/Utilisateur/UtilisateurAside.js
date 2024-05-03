import {
    CLOSE_ASIDE_UTILISATEUR,
    RESET_ASIDE_UTILISATEUR,
    SHOW_ASIDE_ADD_MODE_UTILISATEUR,
    SHOW_ASIDE_EDIT_MODE_UTILISATEUR,
    SHOW_ASIDE_DELETE_MODE_UTILISATEUR,
    SHOW_ASIDE_CONSULT_MODE_UTILISATEUR,
    SHOW_MODAL_CONFIRMATION_UTILISATEUR,
    CLOSE_MODAL_CONFIRMATION_UTILISATEUR,
    GET_ALL_UTILISATEUR,
    GET_ALL_MODULES,
    GET_ALL_GROUPE
} from "../../Constants/Utilisateur/UtilisateurAside";
import axios from "axios";
import Ressources from '../../../Helper/Ressources';
// import { GET_ALL_GROUPE } from "../../Constants/Groupe/GroupeAside";

export const handleOpenAddMode = (successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_ADD_MODE_UTILISATEUR,
            payload: successCallback
        });
    }
}

export const handleOpenConsultMode = (selectedUtilisateur) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_CONSULT_MODE_UTILISATEUR,
            payload: selectedUtilisateur
        });
    }
}

export const handleOpenDeleteMode = (selectedUtilisateur, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_DELETE_MODE_UTILISATEUR,
            payload: { selectedUtilisateur: selectedUtilisateur, successCallback: successCallback }
        });
    }
}

export const handleOpenEditMode = (selectedUtilisateur, successCallback) => {
    return dispatch => {
        dispatch({
            type: SHOW_ASIDE_EDIT_MODE_UTILISATEUR,
            payload: { selectedUtilisateur: selectedUtilisateur, successCallback: successCallback }
        });
    }
}

export const handleClose = () => {
    return dispatch => {
        dispatch({
            type: CLOSE_ASIDE_UTILISATEUR
        });
    }
}

export const clearForm = () => {
    return dispatch => {
        dispatch({
            type: RESET_ASIDE_UTILISATEUR
        });
    }
}

export const handleOpenModalConfirmation = (messageToShow, handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation) => {
    return dispatch => {
        dispatch({
            type: SHOW_MODAL_CONFIRMATION_UTILISATEUR,
            messageToShow: messageToShow,
            actionBtnModalConfirmation: { handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation }
        });
    }
}

export const handleCloseModalConfirmation = (successCallback) => {
    return dispatch => {
        dispatch({
            type: CLOSE_MODAL_CONFIRMATION_UTILISATEUR,
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
export const getGroupe = () => {
    return dispatch => {
        axios.get("http://localhost:9011/gestion_acces/api/groupes/filtre").then(res => {
            dispatch({
                type: GET_ALL_GROUPE,
                payload: res.data
            })
        })
    }
}
export const getModules = () => {
    return dispatch => {
        axios.get("http://localhost:9011/gestion_acces/api/modules/filtre").then(res => {
            dispatch({
                type: GET_ALL_MODULES,
                payload: res.data
            })
        })
    }
}