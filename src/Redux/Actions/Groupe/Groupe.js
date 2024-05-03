import axios from 'axios';
import Ressources from '../../../Helper/Ressources';
import { GET_ALL_GROUPE, ADD_NEW_GROUPE, DELETE_GROUPE, EDIT_GROUPE, GET_GROUPE_BY_CODE, GET_MODULE, GET_MENU, GET_FORM, GET_GROUP } from "../../Constants/Groupe/Groupe";

export const getAllGroupes = (dataGrid) => {
    return dispatch => {
        dataGrid.instance.beginCustomLoading();
        axios.get(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Groupes}/filtre`).then(res => {
            dispatch({
                type: GET_ALL_GROUPE,
                payload: res.data
            });
            dataGrid.instance.endCustomLoading();
        })
    }
};
export const getModule = () => {
    return dispatch => {
        /*axios.get(`${Ressources.CoreUrlB}/${Ressources.securite.api}/${Ressources.Securite.Modules}`)*/
        axios.get("http://localhost:9011/gestion_acces/api/modules").then(res => {
            dispatch({
                type: GET_MODULE,
                payload: res.data
            })
        })
    }
}
export const getMenu = () => {
    return dispatch => {
        axios.get("http://localhost:9011/gestion_acces/api/menus").then(res => {
            dispatch({
                type: GET_MENU,
                payload: res.data
            })
        })
    }
}
export const getForm = () => {
    return dispatch => {
        axios.get("http://localhost:9011/gestion_acces/api/buttons").then(res => {
            dispatch({
                type: GET_FORM,
                payload: res.data
            })
        })
    }
}
export const getGroup = () => {
    return dispatch => {
        axios.get(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Groupes}/filtre`).then(res => {
            dispatch({
                type: GET_GROUP,
                payload: res.data
            })
        })
    }
}


export const getGroupUser = () => {
    return dispatch => {
        axios.get(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.GroupUser}/all`).then(res => {
            dispatch({
                type: GET_GROUP,
                payload: res.data
            })
        })
    }
}





export const getGroupeByCode = (code) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Groupes}?groupe=${code}`)
                .then(res => {
                    dispatch({
                        type: GET_GROUPE_BY_CODE,
                        payload: res.data
                    });
                    resolve(res.data);
                });
        });
    }
};

//ajouterDemande
//supprimerDemande
//getdemandebycode

export const addNewGroupe = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.AddGroupes}`, data)
                .then(res => {
                    dispatch({
                        type: ADD_NEW_GROUPE,
                        payload: res.data
                    });

                    resolve(res.data);
                }).catch(function (error) {
                    reject(error);
                });
        });
    }
};


export const addGroupesUtilisateur = (user) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.GroupUser}`, user)
                .then(res => {
                    dispatch({
                        type: ADD_GROUPEUSER,
                        payload: res.data
                    });

                    resolve(res.data);
                }).catch(function (error) {
                    reject(error);
                });
        });
    }
};



export const editeGroupe = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.put(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Groupes}`, data)
                .then(res => {
                    dispatch({
                        type: EDIT_GROUPE,
                        payload: data
                    });
                    resolve(true);
                }).catch(function (error) {
                    reject(error);
                });
        });
    }
};

export const deleteGroupe = (groupe) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.delete(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Groupes}?groupe=${groupe.groupe}`)
                .then(res => {
                    dispatch({
                        type: DELETE_GROUPE,
                        payload: groupe
                    });
                    resolve(true);
                }).catch(function (error) {
                    reject(error);
                });
        });
    }
};

