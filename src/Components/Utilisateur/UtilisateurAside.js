import React, { useEffect, useRef, useState } from 'react';
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import _ from 'lodash';
import notify from "devextreme/ui/notify";
import Form, {
    GroupItem,
    Label,
    SimpleItem

} from 'devextreme-react/form';
import "devextreme/dist/css/dx.light.css";
import { Switch } from "devextreme-react/switch";
import RadioGroup, { Item } from 'devextreme-react/radio-group';
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
    checkBox_Template,
    Password_Template,
    Number_Integer_Template
} from "../../Helper/editorTemplates";
import "react-datepicker/dist/react-datepicker.css";
import 'status-indicator/styles.css';
import {
    handleClose,
    handleOpenModalConfirmation,
    handleCloseModalConfirmation,
    getGroupe,
    getModules,
    getUtilisateur
} from "../../Redux/Actions/Utilisateur/UtilisateurAside";
import {
    addNewUtilisateur,
    editeUtilisateur,
    deleteUtilisateur,
    groupusers, GET_GROUP_USER
} from "../../Redux/Actions/Utilisateur/Utilisateur";
import 'react-confirm-alert/src/react-confirm-alert.css';
import Helper from '../../Helper/Helper';
import HelperGrid from '../../Helper/HelperGrid';
import { modeAsideEnum, constants, classNameObj, dataField } from "../../Helper/Enumeration";
//import DynamicItemsGrid from "../ComponentHelper/DynamicItemsGrid";
//import { getModule } from '../../Redux/Actions/Utilisateur/Utilisateur';
import axios from 'axios';

import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel,
    FilterRow,
    Selection
} from 'devextreme-react/data-grid';
const UtilisateurAside = () => {
    const dispatch = useDispatch();

    const messages = useSelector(state => state.intl.messages);
    const intl = useSelector(state => state.intl);

    const isOpen = useSelector(state => state.UtilisateurAsideReducer.isOpen);
    const modeAside = useSelector(state => state.UtilisateurAsideReducer.modeAside);

    const btnAddInstance = useSelector(state => state.UtilisateursReducer.btnAddInstance);
    const btnEditionInstance = useSelector(state => state.UtilisateursReducer.btnEditionInstance);

    const selectedUtilisateur = useSelector(state => state.UtilisateurAsideReducer.selectedUtilisateur);
    const allGroupes = useSelector(state => state.UtilisateurAsideReducer.allGroupes);
    const allModules = useSelector(state => state.UtilisateurAsideReducer.allModules);
    const allUtilisateurs = useSelector(state => state.GroupeAsideReducer.allUtilisateurs);

    const dataGridUtilisateurGroupes = useRef(null);
    const dataGridUtilisateurModules = useRef(null);
    const [expireCompte, setExpireCompte] = useState(false);
    const [expirePassword, setExpirePassword] = useState(false);


    const onSelectionChangedgrp = ({ selectedRowKeys, selectedRowsData }) => {
        groupesSelected = selectedRowsData;
    };

    const onSelectionChangedmod = ({ selectedRowKeys, selectedRowsData }) => {
        modulessSelected = selectedRowsData;
    };

    let objInitialisation = {
        username: selectedUtilisateur ? selectedUtilisateur.username : '',
        designation: selectedUtilisateur ? selectedUtilisateur.designation : '',
        active: selectedUtilisateur ? selectedUtilisateur.active : true,
        dateExpiration: selectedUtilisateur ? selectedUtilisateur.dateExpiration : '',
        //expirePassword: selectedUtilisateur ? selectedUtilisateur.expirePassword : null,
        nbExpirationPassword: selectedUtilisateur ? selectedUtilisateur.nbExpirationPassword : '',
        nbJourExpiration: selectedUtilisateur ? selectedUtilisateur.nbJourExpiration : '',
        //expireCompte: selectedUtilisateur ? selectedUtilisateur.expireCompte : null,
        groupUsers: selectedUtilisateur ? selectedUtilisateur.groupUsers : [],
        accessModuleUsers: selectedUtilisateur ? selectedUtilisateur.accessModuleUsers : [],

    };


    let groupesSelected = selectedUtilisateur ? selectedUtilisateur.groupUsers : [];
    let modulessSelected = selectedUtilisateur ? selectedUtilisateur.accessModuleUsers : [];

    let dxForm = useRef(null);
    let formObj = useRef(objInitialisation);

    if (selectedUtilisateur && (modeAside === 'CONSULT' || modeAside === 'EDIT' || modeAside === 'VALIDATE' || modeAside === 'DELETE')) {
        formObj.current = _.cloneDeep(selectedUtilisateur);
    }

    useEffect(() => {

        if (allGroupes && allGroupes.length === 0)
            dispatch(getGroupe())
    })
    useEffect(() => {

        if (allModules && allModules.length === 0)
            dispatch(getModules())
    })

    useEffect(() => {

        if (allUtilisateurs && allUtilisateurs.length === 0)
            dispatch(getUtilisateur())
    })




    const validateForm = (e) => {
        let utilisateur = _.cloneDeep(formObj.current);
        let validationForm = e.validationGroup.validate().isValid;
        let data = {};

        if (modeAside === 'ADD') {
            if (validationForm) {
                data = {
                    username: utilisateur.username,
                    designation: utilisateur.designation,
                    active: utilisateur.active,
                    password: utilisateur.password,
                    confirmPassword: utilisateur.confirmPassword,
                    dateExpiration: utilisateur.dateExpiration,
                    expirePassword: expirePassword,
                    nbExpirationPassword: utilisateur.nbExpirationPassword,
                    nbJourExpiration: utilisateur.nbJourExpiration,
                    expireCompte: expireCompte,
                    groupUsers: groupesSelected.map(groupes => ({
                        groupe: groupes.groupe,
                        username: utilisateur.username,

                    })),
                    accessModuleUsers: modulessSelected.map(module => ({
                        idModule: module.idModule,
                        userId: utilisateur.username,
                        idAccessModuleUser: null,
                    }))
                };

                dxForm.current.instance.getEditor('submitAside').option("disabled", true);

                dispatch(addNewUtilisateur(data))
                    .then(response => {

                        confirmCloseAside(e);
                        notify("Success", 'success', 1000);
                    })
                    .catch(error => {
                        console.error("Error posting group:", error);
                        dxForm.current.instance.getEditor('submitAside').option("disabled", false);
                    });
            }


        } else if (modeAside === 'EDIT') {
            if (validationForm) {
                data = {
                    username: utilisateur.username,
                    designation: utilisateur.designation,
                    active: utilisateur.active,
                    password: utilisateur.password,
                    dateExpiration: utilisateur.dateExpiration,
                    expirePassword: expirePassword,
                    nbExpirationPassword: utilisateur.nbExpirationPassword,
                    nbJourExpiration: utilisateur.nbJourExpiration,
                    expireCompte: expireCompte,
                    confirmPassword: utilisateur.confirmPassword, groupUsers: groupesSelected.map(groupes => ({
                        groupe: groupes.groupe,
                        username: utilisateur.username,

                    })),
                    accessModuleUsers: modulessSelected.map(module => ({
                        idModule: module.idModule,
                        userId: utilisateur.username,
                        idAccessModuleUser: null,

                    }))

                };


                dispatch(editeUtilisateur(data))
                    .then(response => {

                        confirmCloseAside(e);
                        notify("Success", 'success', 1000);
                    })

                    .catch(error => {
                        console.error("Error updating group:", error);
                        dxForm.current.instance.getEditor('submitAside').option("disabled", false);
                    });
            }
        } else if (modeAside === 'DELETE') {
            if (validationForm) {
                dispatch(deleteUtilisateur(selectedUtilisateur))
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
                dispatch(deleteUtilisateur(selectedUtilisateur.username))
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
    const RenderMotsDePasse = () => {
        console.log("RenderMotsDePasse")
        let obj = {
            title: "mot de passe",
            dataField: "password",
            modeAside: modeAside,
            disabled: false
        }
        return (
            <GroupItem >
                {Password_Template(obj)}
            </GroupItem>
        )
    }
    const RenderConfirmationMotsDePasse = () => {
        console.log("RenderConfirmationMotsDePasse")
        let obj = {
            title: " Confirmer le mot de passe",
            dataField: "confirmPassword",
            modeAside: modeAside,
            disabled: modeAside === 'EDIT' || modeAside === 'CONSULT' || modeAside === 'DELETE'
        }
        return (
            <GroupItem >
                {Password_Template(obj)}
            </GroupItem>
        )
    }

    const Renderactive = () => {
        console.log("Renderactive")
        let obj = {
            title: "active",
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
    const Renderusername = () => {
        console.log("Renderusername")
        let obj = {
            title: "nom d'utilisateur",
            dataField: "username",
            modeAside: modeAside,
            disabled: modeAside === 'EDIT' || modeAside === 'CONSULT' || modeAside === 'DELETE'
        }
        return (
            <GroupItem >
                {Text_Template(obj)}
            </GroupItem>
        )
    }




    const handleExpireCompteChange = (e) => {
        setExpireCompte(e.value);
    };

    const handleExpirePasswordChange = (e) => {
        setExpirePassword(e.value);
    };
    const RenderexpireCompte = () => {
        return (
            <GroupItem>
                <CheckBox
                    value={expireCompte}
                    onValueChanged={handleExpireCompteChange}
                    text="Expire Compte"
                    modeAside= {modeAside}
                    disabled={modeAside === "DELETE" || modeAside === "CONSULT"}
                />
            </GroupItem>
        );
    };
    const RenderdateExpiration = () => {
        let obj = {
            title: "Date d'Expiration",
            dataField: "dateExpiration",
            modeAside: modeAside,
            disabled: !expireCompte
        };

        return (
            <GroupItem style={{ display: expireCompte ? 'block' : 'none' }}>
                {Date_Template(obj)}
            </GroupItem>
        );
    };

    const RendernbJourExpiration = () => {
        let obj = {
            title: "Nombre de Jours d'expiration de compte",
            dataField: "nbJourExpiration",
            modeAside: modeAside,
            isDisabled: !expireCompte
        };

        return (
            <GroupItem style={{ display: expireCompte ? 'block' : 'none' }}>
                {Number_Integer_Template(obj)}
            </GroupItem>
        );
    };


    const RenderexpirePassword = () => {

        return (
            <GroupItem>
                <CheckBox
                    value={expirePassword}
                    onValueChanged={handleExpirePasswordChange}
                    text="Expire mot de passe"
                    modeAside= {modeAside}
                    disabled={modeAside === "DELETE" || modeAside === "CONSULT"}
                />
            </GroupItem>


        )
    };



    const RendernbExpirationPassword = () => {
        let obj = {
            title: "Nombre de Jours d'expiration de Mot de Passe",
            dataField: "nbExpirationPassword",
            modeAside: modeAside,
            isDisabled: !expirePassword

        };
        return (
            <GroupItem style={{ display: expirePassword ? 'block' : 'none' }}>
                {Number_Integer_Template(obj)}
            </GroupItem>)
    };

    return (
        <div>
            {isOpen && modeAside === 'ADD' && (
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
                            key={'formCreateUtilisateur'}
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

                                <GroupItem colCount={2}>
                                    {Renderusername()}
                                    {Renderdesignation()}

                                </GroupItem>
                                <GroupItem colCount={2}>
                                    {RenderMotsDePasse()}
                                    {RenderConfirmationMotsDePasse()}
                                </GroupItem >
                                <GroupItem colCount={3}>
                                    {RenderexpireCompte()}
                                    {RendernbJourExpiration()}
                                    {RenderdateExpiration()}
                                </GroupItem>
                                <GroupItem colCount={3}>
                                    {RenderexpirePassword()}
                                    {RendernbExpirationPassword()}
                                </GroupItem >

                                <GroupItem colCount={2}>

                                    <GroupItem name="listeSousSociete" caption="les groupes"  >

                                        <DataGrid
                                            ref={dataGridUtilisateurGroupes}
                                            onSelectionChanged={onSelectionChangedgrp}
                                            dataSource={allGroupes}
                                            allowColumnReordering={true}
                                            rowAlternationEnabled={true}
                                            showBorders={true}
                                            keyExpr="groupe"
                                            defaultSelectedRowKeys={formObj.current.groupUsers.map(y => { return y.groupe })}

                                        >
                                            <Paging defaultPageSize={4} />
                                            <GroupPanel visible={true} />
                                            <SearchPanel visible={true} highlightCaseSensitive={true} />
                                            <SearchPanel visible={true} placeholder={messages.search} />
                                            <FilterRow visible={true} />
                                            <Column
                                                dataField="groupe"
                                                caption="Groupe"
                                            />
                                            <Column
                                                dataField="designation"
                                                caption="Désignation" />
                                            <Selection
                                                mode="multiple"
                                            />
                                        </DataGrid>
                                    </GroupItem>
                                    {<GroupItem name="listeSousSociete" caption="les modules">
                                        <DataGrid
                                            ref={dataGridUtilisateurModules}
                                            onSelectionChanged={onSelectionChangedmod}
                                            dataSource={allModules}
                                            allowColumnReordering={true}
                                            rowAlternationEnabled={true}
                                            showBorders={true}
                                            keyExpr="idModule"
                                            defaultSelectedRowKeys={formObj.current.accessModuleUsers.map(y => { return y.idModule })}

                                        >
                                            <Paging defaultPageSize={4} />
                                            <GroupPanel visible={true} />
                                            <SearchPanel visible={true} highlightCaseSensitive={true} />
                                            <FilterRow visible={true} />

                                            <Column
                                                dataField="idModule"
                                                caption=" id " />
                                            <Column
                                                dataField="codeModule"
                                                caption="code module" />
                                            <Column
                                                dataField="designation"
                                                caption="designation" />
                                            <Column
                                                dataField="active"
                                                caption="Active" />
                                            <Column
                                                dataField="versionDatabase"
                                                caption="version du base de donnée" />
                                            <Column
                                                dataField="urlWeb"
                                                caption="URL web" />
                                            <Selection
                                                mode="multiple"
                                            />
                                        </DataGrid>
                                    </GroupItem>}
                                </GroupItem>
                            </GroupItem>
                            )

                        </Form>
                    </div>
                </aside>
            )} {isOpen && modeAside !== 'ADD' && (
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
                            key={'formCreateUtilisateur'}
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
                                    {Renderusername()}
                                    {Renderdesignation()}
                                    {Renderactive()}

                                </GroupItem>
                                <GroupItem colCount={3}>
                                    {RenderexpireCompte()}

                                    {RendernbJourExpiration()}

                                    {RenderdateExpiration()}
                                </GroupItem>
                                <GroupItem colCount={3}>
                                    {RenderexpirePassword()}
                                    {RendernbExpirationPassword()}
                                </GroupItem >


                                <GroupItem colCount={2}>

                                    <GroupItem name="listeSousSociete" caption="les groupes"  >

                                        <DataGrid
                                            ref={dataGridUtilisateurGroupes}
                                            onSelectionChanged={onSelectionChangedgrp}
                                            dataSource={allGroupes}
                                            allowColumnReordering={true}
                                            rowAlternationEnabled={true}
                                            showBorders={true}
                                            keyExpr="groupe"
                                            defaultSelectedRowKeys={formObj.current.groupUsers.map(x => { return x.groupe })}

                                        >
                                            <Paging defaultPageSize={4} />
                                            <GroupPanel visible={true} />
                                            <SearchPanel visible={true} highlightCaseSensitive={true} />
                                            <SearchPanel visible={true} placeholder={messages.search} />
                                            <FilterRow visible={true} />
                                            <Column
                                                dataField="groupe"
                                                caption="Groupe"
                                            />
                                            <Column
                                                dataField="designation"
                                                caption="designation" />
                                            <Selection
                                                mode="multiple"
                                            />
                                        </DataGrid>
                                    </GroupItem>
                                    <GroupItem name="listeSousSociete" caption="les modules">
                                        <DataGrid
                                            ref={dataGridUtilisateurModules}
                                            onSelectionChanged={onSelectionChangedmod}
                                            dataSource={allModules}
                                            allowColumnReordering={true}
                                            rowAlternationEnabled={true}
                                            showBorders={true}
                                            keyExpr="idModule"
                                            //defaultSelectedRowKeys={formObj.current.accessModuleUsers.map(x => { return x.idModule })}
                                            defaultSelectedRowKeys={formObj.current.accessModuleUsers ? formObj.current.accessModuleUsers.map(x => x.idModule) : []}

                                        >
                                            <Paging defaultPageSize={4} />
                                            <GroupPanel visible={true} />
                                            <SearchPanel visible={true} highlightCaseSensitive={true} />
                                            <FilterRow visible={true} />

                                            <Column
                                                dataField="idModule"
                                                caption=" id " />
                                            <Column
                                                dataField="codeModule"
                                                caption="code module" />
                                            <Column
                                                dataField="designation"
                                                caption="designation" />
                                            <Column
                                                dataField="active"
                                                caption="Active" />
                                            <Column
                                                dataField="versionDatabase"
                                                caption="version du base de donnée" />
                                            <Column
                                                dataField="urlWeb"
                                                caption="URL web" />
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
export default UtilisateurAside