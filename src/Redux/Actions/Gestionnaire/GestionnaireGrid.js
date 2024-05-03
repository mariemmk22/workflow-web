 import axios from 'axios';
 import { GET_GESTIONNAIRE_BY_CODE ,GET_DEMANDE_BY_CODE}from "../../Constants/Gestionnaire/Gestionnaire";
 import Ressources from '../../../Helper/Ressources';
 export const getgestionnairebycode = (codeDemande) => {
           return dispatch => {
                  return new Promise((resolve, reject) => {
                    //  axios.get("http://localhost:9011/gestion-acces/api/demandes/{codeDemande}",codeDemande )
                     axios.get(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Demande}/${codeDemande}`)
                          .then(res => {
                              dispatch({
                                  type: GET_GESTIONNAIRE_BY_CODE,
                                 payload: res.data
                             });
                              resolve(true);
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