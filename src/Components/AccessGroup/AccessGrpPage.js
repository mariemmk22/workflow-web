// AccessGrpPage.js
import React, { Component } from 'react'
import AccessGrpGrid from './AccessGrpGrid';
import Impression from "../ComponentTable/Impression";
import ModalConfirmation from '../ComponentHelper/ModalConfirmation';
class AccessGrpPage extends Component {
  componentDidMount() {
    console.log('AccessGrpPage rendered successfully');
  }

  render() {
    return (
      <div>
        <AccessGrpGrid/>
        <ModalConfirmation reducer="UtilisateurAsideReducer" />
                <Impression />
      </div>
    );
  }
}

export default AccessGrpPage;
