import axios from 'axios';
import Ressources from '../../../Helper/Ressources';
import {GET_ALL_BUDGET} from "../../Constants/ComponentTable/SelectBudget";

export const getAllBudgets = () => {
    return dispatch => {
        axios.get(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Demande}`).then(res => {
            dispatch({
                type: GET_ALL_BUDGET,
                payload: res.data
            })
        })
    }
};