import React, {Component} from 'react';
import DemandeGrid from './DemandeGrid';
import DemandeAside from './DemandeAside';
import Impression from "../ComponentTable/Impression";
import ModalConfirmation from '../ComponentHelper/ModalConfirmation';

/**
 * DemandePage
 */
export class DemandePage extends Component {
    render() {
        return (
            <div>
                <DemandeGrid/>
                <DemandeAside/> 
             
                <ModalConfirmation reducer = "DemandeAsideReducer"/>
                <Impression/>
                
            </div>
        );
    }
}

export default DemandePage;