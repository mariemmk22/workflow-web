import React, { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import store from '../../Redux/Store/Store';
import RessourcesGrp from "../../Helper/RessourcesGrp";
import Ressources from "../../Helper/Ressources";

import {
    handleOpenAddMode,
    handleOpenEditMode,
    handleOpenDeleteMode,
    handleOpenConsultMode
} from "../../Redux/Actions/Utilisateur/UtilisateurAside";
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
import { getUtilisateurByCode } from "../../Redux/Actions/Utilisateur/Utilisateur";

loadMessages(arMessages);
loadMessages(enMessages);
loadMessages(frMessages);

let selectionChangedRaised;
const UtilisateurGrid = () => {

    const dispatch = useDispatch();
    const UtilisateursReducer = useSelector(state => state.UtilisateursReducer);
    const messages = useSelector(state => state.intl.messages);
    const dataGrid = useRef(null);


    const onSelectionChanged = ({ selectedRowsData }) => {
        selectionChangedRaised = true;
        HelperGrid.handleSelectionChanged(selectedRowsData, UtilisateursReducer);
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
            add: {
                visible: true,
                action: onClickBtnAdd
            },
            edit: {
                visible: true,
                action: onClickBtnEdit
            },
            consult: {
                visible: true,
                action: onClickBtnConsult
            },
            delete: {
                visible: true,
                action: onClickBtnDelete
            },
            consult_access: {
                visible: true,
                action: onClickBtnConsultAccess
            },
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
        HelperGrid.handleToolbarPreparing(e, dataGrid, buttons, filtres, UtilisateursReducer)
    }
    const onClickBtnAdd = () => {
        dispatch(handleOpenAddMode(refreshDataGrid))
    }
    const onClickBtnEdit = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getUtilisateurByCode(selectedRowKeys))
                .then((data) => {
                    dispatch(handleOpenEditMode(data, refreshDataGrid))
                })
        }
    }
    const onClickBtnConsult = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getUtilisateurByCode(selectedRowKeys))
                .then((data) =>
                    dispatch(handleOpenConsultMode(data, refreshDataGrid))
                )
        }
    }
    const onClickBtnConsultAccess = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getUtilisateurByCode(selectedRowKeys))
                .then((data) =>
                    dispatch(handleOpenConsultMode(data, refreshDataGrid))
                )
        }
    }
    const onClickBtnDelete = () => {
        if (dataGrid.current !== null) {
            let dataGridInstance = dataGrid.current.instance;
            let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
            dispatch(getUtilisateurByCode(selectedRowKeys))
                .then((data) => {
                    dispatch(handleOpenDeleteMode(data, refreshDataGrid))
                }
                )
        }
    }
    const onClickBtnEditionList = () => {
        /*  dispatch(handleOpenModal())
         let du = UtilisateursReducer.dateDebut;
         let au = UtilisateursReducer.dateFin;
         let url = `${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Demande}/edition/listeUtilisateurs?du=${du}&au=${au}`;
         impression(url); */
    }
    const onClickBtnEdition = () => {
        /*    if (dataGrid.current !== null) {
               let dataGridInstance = dataGrid.current.instance;
               let selectedRowKeys = dataGridInstance.getSelectedRowKeys()[0];
               dispatch(handleOpenModal())
               let url = `${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Demande}/edition/${selectedRowKeys}`;
               impression(url);
           } */
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
        keyExpr='username'
        customStore={HelperGrid.constructCustomStore(`${Ressources.CoreUrlB}/${Ressources.Securite.api}/${Ressources.Securite.Utilisateur}/filtre`, 'username')}
        onToolbarPreparing={onToolbarPreparing}
        onSelectionChanged={onSelectionChanged}
        onRowClick={onRowClick}
        fileName={messages.budgets}
        columns={[
            {
                dataField: 'username',
                caption: "Utilisateur"
            },
            {
                dataField: 'designation',
                caption: "Désignation"
            },
            {
                dataField: 'groups',
                caption: 'Appartient aux groupes',
                cellRender: rowData => {
                    if (rowData && rowData.data && rowData.data.groupUsers) {
                        const groupes = rowData.data.groupUsers.map(group => group.groupe).join(', ');
                        return <span>{groupes}</span>;
                    } else {
                        return null;
                    }
                }
            },

            {
                dataField: 'userCreation',
                caption: "Utilisateur de création"
            },
            {
                dataField: 'dateCreation',
                caption: "Date de creation"
            },
            ,
            {
                dataField: 'active',
                caption: "Active"
            },
    
        ]}
        templates={[]}
    />
    )
}

export default UtilisateurGrid