import React, { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import store from '../../Redux/Store/Store';
import Ressources from "../../Helper/Ressources";
   import {
    handleOpenAddMode,
// // //      handleOpenEditMode,
// // //      handleOpenDeleteMode,
  handleOpenConsultMode
    
   } from "../../Redux/Actions/Gestionnaire/GestionnaireAside";
import {
    handleOpenModal
} from "../../Redux/Actions/ComponentTable/ModalImpression";
import notify from "devextreme/ui/notify";
import { notifyOptions } from '../../Helper/Config';
import { loadMessages } from "devextreme/localization";
import arMessages from "../../i18n/datagrid_ar.json";
import enMessages from "devextreme/localization/messages/en";
import frMessages from "devextreme/localization/messages/fr";
import Helper from '../../Helper/Helper';
import HelperGrid from '../../Helper/HelperGrid';
import TableGrid from '../ComponentHelper/TableGrid';
import { getgestionnairebycode ,getDemandebyCode } from '../../Redux/Actions/Gestionnaire/GestionnaireGrid';

loadMessages(arMessages);
loadMessages(enMessages);
loadMessages(frMessages);

let selectionChangedRaised;
const GestionnaireGrid = () => {

    const dispatch = useDispatch();
    const gestionnairesReducer = useSelector(state => state.gestionnairesReducer);
    const messages = useSelector(state => state.intl.messages);
    const dataGrid = useRef(null);

    let budget = '';

    const onSelectionChanged = ({ selectedRowsData }) => {
        selectionChangedRaised = true;
        HelperGrid.handleSelectionChanged(selectedRowsData, gestionnairesReducer);
    };
    const onRowClick = e => {
        if (!selectionChangedRaised) {
            let dataGrid = e.component;
            let keys = dataGrid.getSelectedRowKeys();
            if (dataGrid.getSelectedRowKeys().length > 0)
                dataGrid.deselectRows(keys);
        }
        selectionChangedRaised = false;
    };
    /**
     * 
     * @param {*} e 
     * obj filtres.select : select budget
     */
    const onToolbarPreparing = (e) => {
        let filtres = {
            filterRemove: {
                visible: true
            }
        }
        let buttons = {
            columnChooserButton: {
                visible: true,
            },
            refresh: {
                visible: true,
            },
            // add: {
            //      visible: true,
            //  action: onClickBtnAdd
            // },
        //     add: {
        //         visible: true,
        //     action: onClickBtnAdd
        //    },

            //  edit: {
            //      visible: true,
            //      action: onClickBtnEdit
            //  },
            consult: {
                visible: true,
                action: onClickBtnConsult
            },
            valider:{
                visible: true,
                action: onClickBtnValide
            },
            refuser:{
                visible: true,
                action: onClickBtnRefuser
            },
            
           /* delete: {
                visible: true,
                action: onClickBtnDelete
              },*/
            editionList: {
                visible: true,
                action: onClickBtnEditionList
            },
            edition: {
                visible: true,
                action: onClickBtnEdition
            },
            export_excel: {
                visible: true
            }
        }
        HelperGrid.handleToolbarPreparing(e, dataGrid, buttons, filtres, gestionnairesReducer)
    }
    const onClickBtnValide =() =>{
        if (dataGrid.current !== null) {
          let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
           dispatch(getDemandebyCode(selectedRowKeys))
          .then((data) => dispatch(handleOpenConsultMode(data,refreshDataGrid))
       
           
          )}
   }
    const onClickBtnRefuser = ()=>{
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
              let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
             dispatch(getDemandebyCode(selectedRowKeys))
            .then((data) => dispatch(handleOpenConsultMode(data,refreshDataGrid))
         
             
            )}
        
    }
    const onClickBtnPvalide =()=>{
        /* dispatch(handleOpenAddMode(refreshDataGrid)) */
    }
    const onClickBtnAdd = () => {
        dispatch(handleOpenAddMode(refreshDataGrid))
    }
    const onClickBtnEdit = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            
        }
    }
     const onClickBtnConsult = () => {
         if (dataGrid.current !== null) {
           let dataGridInstance = dataGrid.current.instance;
             let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getDemandebyCode(selectedRowKeys))
           .then((data) => dispatch(handleOpenConsultMode(data,refreshDataGrid))
        
            
           )}
    }
    const onClickBtnEditionList = () => {
         dispatch(handleOpenModal())
        let du = BudgetsReducer.dateDebut;
        let au = BudgetsReducer.dateFin;
        let url = `${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Demande}/edition/listeBudgets?du=${du}&au=${au}`;
        impression(url); 
    }
    const onClickBtnEdition = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(handleOpenModal())
            let url = `${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Demande}/edition/${selectedRowKeys}`;
            impression(url);
        } 
    }
    const refreshDataGrid = () => {
        if (dataGrid.current !== null)
            dataGrid.current.instance.refresh();
    }
    const renderDateFormat = (data) => {
        return Helper.formatDate(data.value);
    };
    async function impression(url) {
        const response = await fetch(url);
        const blob = await response.blob();
        componentImpression(blob);

    }
    const componentImpression = (blob) => {
        let url = URL.createObjectURL(blob);
        document.getElementById('iframe_content').src = url;
    }

    return (
        <TableGrid
            dataGrid={dataGrid}
            keyExpr='codeDemande'
             customStore={HelperGrid.constructCustomStore(`${`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Demande}`}`,
                'codeDemande')}
            onToolbarPreparing={onToolbarPreparing}
            onSelectionChanged={onSelectionChanged}
            onRowClick={onRowClick}
            fileName={messages.budgets}
            columns={[
                {
                    dataField: 'codeDemande',
                    caption: "Code"

                },
                {
                    dataField: 'userGrp',
                    caption: "Groupe"
                },
             {
                    dataField: 'userName',
                    caption: "Utilisateur"},
                ,
                {
                    dataField: 'dateCreation',
                    caption: messages.userCreate
                },
                 {
                    dataField: 'userCreate',
                    caption: "User creation"
                    
                }, {
                    dataField: 'etat',
                    caption: "Etat"
                    
                },
            ]
            }
            templates={
               [] 
            }
        />
    )
}

export default GestionnaireGrid
