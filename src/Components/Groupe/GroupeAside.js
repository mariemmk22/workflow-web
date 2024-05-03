import React, { useEffect, useRef } from 'react';
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import _ from 'lodash';
import notify from "devextreme/ui/notify";
import Form, {
    GroupItem,
    Label,
    SimpleItem
} from 'devextreme-react/form';
import RadioGroup from 'devextreme-react/radio-group';
import { NumberBox } from 'devextreme-react/number-box';
import Ressources from "../../Helper/Ressources";
import TableGrid from '../ComponentHelper/TableGrid';
import { CheckBox } from 'devextreme-react/check-box';
import ReactDOM from 'react-dom';
import {
    TreeList_Template,
    Text_Template,
    select_Template_new,
    HeaderAside,
    Date_Template,
    checkBox_Template

} from "../../Helper/editorTemplates";
import "react-datepicker/dist/react-datepicker.css";
import 'status-indicator/styles.css';
import {
    handleClose,
    handleOpenModalConfirmation,
    handleCloseModalConfirmation,
    getUtilisateur,
    addGroupesUtilisateur
} from "../../Redux/Actions/Groupe/GroupeAside";
import {
    addNewGroupe,
    editeGroupe,
    deleteGroupe,
} from "../../Redux/Actions/Groupe/Groupe";
import 'react-confirm-alert/src/react-confirm-alert.css';
import Helper from '../../Helper/Helper';
import HelperGrid from '../../Helper/HelperGrid';
import { modeAsideEnum, constants, classNameObj, dataField } from "../../Helper/Enumeration";
import axios from 'axios';
//import DynamicItemsGrid from "../ComponentHelper/DynamicItemsGrid";
//import { getModule } from '../../Redux/Actions/Utilisateur/Utilisateur';
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    FilterRow,
    SearchPanel,
    Selection
} from 'devextreme-react/data-grid';


const GroupeAside = () => {

    const dispatch = useDispatch();

    const messages = useSelector(state => state.intl.messages);
    const intl = useSelector(state => state.intl);

    const isOpen = useSelector(state => state.GroupeAsideReducer.isOpen);
    const modeAside = useSelector(state => state.GroupeAsideReducer.modeAside);

    const btnAddInstance = useSelector(state => state.GroupesReducer.btnAddInstance);
    const btnEditionInstance = useSelector(state => state.GroupesReducer.btnEditionInstance);

    const selectedGroupe = useSelector(state => state.GroupeAsideReducer.selectedGroupe);
    const allUtilisateurs = useSelector(state => state.GroupeAsideReducer.allUtilisateurs);

 
    //const allGroupesUtilisateur = useSelector(state => state.GroupeAsideReducer.allGroupesUtilisateur);


    const dataGridGroupe = useRef(null);

    const onSelectionChanged = ({ selectedRowKeys, selectedRowsData }) => {
        groupesSelected = selectedRowsData;
    };
    let objInitialisation = {

        groupe: selectedGroupe ? selectedGroupe.groupe : '',
        designation: selectedGroupe ? selectedGroupe.designation : '',
        active: selectedGroupe ? selectedGroupe.active : true,
        groupUsers: selectedGroupe ? selectedGroupe.groupUsers : [],
      
       
    };
    let groupesSelected = selectedGroupe ? selectedGroupe.groupUsers : [];

    let dxForm = useRef(null);
    let formObj = useRef(objInitialisation);
    if (selectedGroupe && (modeAside === 'CONSULT' || modeAside === 'EDIT' || modeAside === 'VALIDATE' || modeAside === 'DELETE')) {
        formObj.current = _.cloneDeep(selectedGroupe);
    }



    // useEffect(() => {
    //     if (allGroupesUtilisateur && allGroupesUtilisateur.length === 0)
    //     dispatch(getAllGroupesUtilisateur());
    // });

    useEffect(() => {

        if (allUtilisateurs && allUtilisateurs.length === 0)
            dispatch(getUtilisateur())
    })
  
    const validateForm = (e) => {
        let group = _.cloneDeep(formObj.current);
        let validationForm = e.validationGroup.validate().isValid;
        
        if (modeAside === 'ADD') {
            if (validationForm) {
                let data = {
                    groupe: group.groupe,
                    designation: group.designation,
                    active: group.active,
                    groupUsers: groupesSelected
                };
    
                let selectedUsernames = dataGridGroupe.current.instance.getSelectedRowKeys();
             

                let users = selectedUsernames.map(username => ({
                    groupe: group.groupe,
                    username,

                }));
    
                dxForm.current.instance.getEditor('submitAside').option("disabled", true);
    
                axios.post("http://localhost:9011/gestion_acces/api/groupes", data)
                    .then(response => {
                        // Poster chaque utilisateur avec le groupe
                        Promise.all(users.map(user => axios.post("http://localhost:9011/gestion_acces/api/groupusers", user)))
                            .then(() => {
                                confirmCloseAside(e);
                                notify("Success", 'success', 1000);
                            })
                            .catch(error => {
                                console.error("Error posting users with group:", error);
                                dxForm.current.instance.getEditor('submitAside').option("disabled", false);
                            });
                    })
                    .catch(error => {
                        console.error("Error posting group:", error);
                        dxForm.current.instance.getEditor('submitAside').option("disabled", false);
                    });
            }
            
        
        } else if (modeAside === 'EDIT') {
            if (validationForm) {
                let data = {
                    groupe: group.groupe,
                    designation: group.designation,
                    active: group.active,
                    groupUsers: groupesSelected,
                }
                let selectedUsernames = dataGridGroupe.current.instance.getSelectedRowKeys();
             

                let users = selectedUsernames.map(username => ({
                    groupe: group.groupe,
                    username,

                }));
                dispatch(editeGroupe(data))
                .then(response => {
                    Promise.all(users.map(user => axios.post("http://localhost:9011/gestion_acces/api/groupusers", user)))
                        .then(() => {
                            confirmCloseAside(e);
                            notify("Success", 'success', 1000);
                        })
                        .catch(error => {
                            console.error("Error posting users with group:", error);
                            dxForm.current.instance.getEditor('submitAside').option("disabled", false);
                        });
                })
                .catch(error => {
                    console.error("Error posting group:", error);
                    dxForm.current.instance.getEditor('submitAside').option("disabled", false);
                });
            }
        } else if (modeAside === 'DELETE') {

            dispatch(deleteGroupe(selectedGroupe))
                .then(() => {
                    confirmCloseAside(e);
                    notify("Success", 'success', 1000);
                }).catch(err => {
                    notify(err, 'error', 500);
                });
        } else if (modeAside === 'CONSULT') {
            if (validationForm) {
                selectedGroupe.groupe = group.groupe.trim();
                selectedGroupe.designation = group.designation.trim();
                selectedGroupe.active = group.active;
                selectedGroupe.groupUsers = groupesSelected;
                dispatch(getGroupeByCode(selectedGroupe))
                    .then(() => {
                        confirmCloseAside(e);
                        notify("Success", 'success', 1000);
                    }).catch(err => {
                        notify(err, 'error', 500);
                    });
            }
        }
    };

    const onInitializedFormGlobal = (e) => {
        dxForm.current = e.component;
    }
    const validateButtonOption = () => {
        return {
            icon: 'fa fa-check',
            onClick: (e) => {
                intl.loadGrid = true;
                validateForm(e);
            },
            useSubmitBehavior: true
        }
    };
    const clearForm = (e) => {
        /*    if (modeAside === modeAsideEnum.editMode) {
                e.validationGroup.reset();
          }*/
        cleanObject();
    };

    const cleanObject = () => {
        formObj.current = _.cloneDeep(objInitialisation);
    };

    const resetButtonOption = () => {
        return {
            icon: "fas fa-times",//constants.iconReset
            onClick: (e) => {
                if (modeAside === 'ADD' || modeAside === 'EDIT' || modeAside === 'CONSULT') {
                    showModalAlert(e, 'closeAside');
                } else {
                    confirmCloseAside(e);
                }

                intl.loadGrid = true;
            }
        }
    };
    const showModalAlert = (e, actionToDoOnClick) => {
        let messageToShow = actionToDoOnClick === 'delete' ?
            messages.WantToDeleteAnyway
            : `${messages.confirmDialogTextPartOne} ${messages.confirmDialogTextPartTwo}`;
        const handleBtnConfirmerModalConfirmation = () => {
            dispatch(handleCloseModalConfirmation());
            if (actionToDoOnClick === 'delete') {
                dispatch(deleteGroupe(selectedGroupe.groupe))
                    .then(() => {
                        confirmCloseAside(e);
                        notify("Success", 'success', 1000);

                    }).catch(err => {
                        notify(err, 'error', 500);
                    });
            } else {
                confirmCloseAside(e);
            }
        }
        const handleBtnCancelModalConfirmation = () => {
            dispatch(handleCloseModalConfirmation());
        }
        dispatch(handleOpenModalConfirmation(messageToShow, handleBtnCancelModalConfirmation, handleBtnConfirmerModalConfirmation));
    };

    const confirmCloseAside = (e) => {
        clearForm(e);
        dispatch(handleClose());
        // btnAddInstance.option('disabled', false);
        // btnEditionInstance.option('disabled', false);
    };

    const RenderCodeMod = () => {
        console.log("RenderCode")
        let obj = {
            title: messages.groupe,
            dataField: "groupe",
            modeAside: modeAside,
            disabled: modeAside === 'EDIT' || modeAside === 'CONSULT' || modeAside === 'DELETE'
        }
        return (
            <GroupItem >
                {Text_Template(obj)}
            </GroupItem>
        )
    }
    const Renderdesignation = () => {
        console.log("Renderdesignation")
        let obj = {
            title: "description",
            dataField: "designation",
            modeAside: modeAside,
            disabled: false,
            disabled: modeAside === 'EDIT' || modeAside === 'CONSULT' || modeAside === 'DELETE'

        }
        return (
            <GroupItem >
                {Text_Template(obj)}
            </GroupItem>
        )
    }
    const RenderActive = () => {
        console.log("RenderActive")
        let obj = {
            title: "Active",
            dataField: "active",
            modeAside: modeAside,
            disabled: false
        }
        return (
            <GroupItem >
                {checkBox_Template(obj)}
            </GroupItem>
        )
    }

    

    return (
        <div>
            {isOpen && modeAside !== '' && (
                <aside className={"openned"} style={{ overflow: "auto" }}>
                    <div
                        className="aside-dialog"
                        style={{
                            width: "90%",
                            display: "table",
                        }}
                    >
                        <Form
                            ref={dxForm}
                            key={'formCreateGroupe'}
                            formData={formObj.current}
                            onInitialized={onInitializedFormGlobal}
                            colCount={1}
                            style={{
                                width: "85%",
                                display: "table-row"
                            }}
                        >
                            {HeaderAside({
                                modeAside: modeAside,
                                btnValider: validateButtonOption(),
                                btnReset: resetButtonOption(),
                                messages: messages
                            })}
                            (
                            <GroupItem>
                                <GroupItem colCount={3}>
                                    {RenderCodeMod()}
                                    {Renderdesignation()}
                                    {RenderActive()}
                               
                                </GroupItem>
                                <GroupItem colCount={1}>
                                    <GroupItem name="listeSousSociete" caption="les utilisateurs" >
                                        <DataGrid

                                            ref={dataGridGroupe}
                                            onSelectionChanged={onSelectionChanged}
                                            dataSource={allUtilisateurs}
                                            allowColumnReordering={true}
                                            rowAlternationEnabled={true}
                                            showBorders={true}
                                            keyExpr="username"
                                            defaultSelectedRowKeys={formObj.current.groupUsers.map(x => { return x.username })}
                                        >
                                            <Paging defaultPageSize={8} />
                                            <FilterRow visible={true} />
                                            <GroupPanel visible={true} />

                                            <SearchPanel visible={true} highlightCaseSensitive={true} />

                                            <Column
                                                dataField="username"
                                                caption="Utilisateur"
                                            />
                                            <Column
                                                dataField="designation"
                                                caption="Désignation" />
                                                
                                                <Column
                                                            dataField="groupUser"
                                                            caption="Appartient aussi aux groupes"
                                                            cellRender={rowData => {
                                                                if (rowData && rowData.data && rowData.data.groupUsers) {
                                                                    const groupes = rowData.data.groupUsers.map(group => group.groupe).join(', ');
                                                                    return <span>{groupes}</span>;
                                                                } else {
                                                                    return null; 
                                                                }
                                                            }}
                                                        />




                                            <Selection
                                                mode="multiple"

                                            />

                                        </DataGrid>
                                    </GroupItem>

                                </GroupItem>
                            </GroupItem>
                            )

                        </Form>
                    </div>
                </aside>
            )}

        </div>
    );
}
export default GroupeAside