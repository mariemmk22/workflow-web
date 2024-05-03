import axios from 'axios';
import Ressources from '../../../Helper/Ressources';
import {
    GET_ALL_DEMANDE, ADD_NEW_DEMANDE, DELETE_DEMANDE, GET_MODULE

    , GET_LISTE_MENU, GET_ALL_FORM

    ,  EDIT_DEMANDE, GET_DEMANDE_BY_CODE
} from "../../Constants/Demande/Demande";






export const getModule = () => {
    return dispatch => {
        axios.get(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Modules}`).then(res => {
            dispatch({
                type: GET_MODULE,
                payload: res.data
            })
        })
    }
}


export const getAllMenu = (codeModule) => {
    return dispatch => {
        axios.get(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.menus}`).then(res => {
            dispatch({
                type: GET_LISTE_MENU,
                payload: res.data
            })
        })
    }
}
export const getAllForm = (codeModule) => {
    return dispatch => {
        axios.get(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.forms}`).then(res => {
            dispatch({
                type: GET_ALL_FORM,
                payload: res.data
            })
        })
    }
}




export const addNewDemande = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Demande}`, data)
                .then(res => {
                    dispatch({
                        type: ADD_NEW_DEMANDE,
                        payload: res.data
                    });

                    resolve(res.data);
                }).catch(function (error) {
                    reject(error);
                });
        });
    }
};




export const getAllDemandes = (dataGrid) => {
    return dispatch => {
        dataGrid.instance.beginCustomLoading();
        axios.get(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Demande}`).then(res => {
            dispatch({
                type: GET_ALL_DEMANDE,
                payload: res.data
            });
            dataGrid.instance.endCustomLoading();
        })
    }
};
export const editeDemande = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Demande}/${data.codeDemande}`, data)
                .then(res => {
                    dispatch({
                        type: EDIT_DEMANDE,
                        payload: data
                    });
                    resolve(true);
                }).catch(function (error) {
                    reject(error);
                });
        });
    }
};
export const getDemandebyCode = (codeDemande) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Demande}/${codeDemande}`)
                .then(res => {
                    dispatch({
                        type: GET_DEMANDE_BY_CODE,
                        payload: res.data
                    });
                    resolve(res.data);
                });
        });
    }
};

export const deleteDemande = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.delete(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Demande}/${data.codeDemande}`)
                .then(res => {
                    dispatch({
                        type: DELETE_DEMANDE,
                        payload: data
                    });
                    resolve(true);
                }).catch(function (error) {
                    reject(error);
                });
        });
    }
};

