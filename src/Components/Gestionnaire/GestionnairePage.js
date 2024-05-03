import React, {Component} from 'react';
import GestionnaireGrid from './gestionnaireGrid';
import GestionnaireAside from './gestionnaireAside';
import Impression from "../ComponentTable/Impression";
import ModalConfirmation from '../ComponentHelper/ModalConfirmation';

/**
 * gestionnairePage
 */
export class GestionnairePage extends Component {
    render() {
        return (
            <div>
                <GestionnaireGrid/>
                 <GestionnaireAside/>  
                <ModalConfirmation reducer = "gestionnaireAsideReducer"/>
                <Impression/> 
                
            </div>
        );
    }
}

export default GestionnairePage;