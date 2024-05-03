 import React, { useEffect, useRef } from 'react';
 import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
 import _ from 'lodash';
 import notify from "devextreme/ui/notify";
 import Form, {
     GroupItem,
     Label
 } from 'devextreme-react/form';

//  import Helper from 'csysframework-react/dist/Utils/Helper';
//  import { notifyOptions } from 'csysframework-react/dist/Utils/Config';
 import {
        TreeList_Template,
    Text_Template,
     select_Template_new,
     HeaderAside,
     Date_Template

 } from "../../Helper/editorTemplates";
import "react-datepicker/dist/react-datepicker.css";
import 'status-indicator/styles.css';
import {
    handleClose,
    handleOpenModalConfirmation,
      handleCloseModalConfirmation,
     getGroup
 } from "../../Redux/Actions/Gestionnaire/GestionnaireAside";
 import {
    addNewDemande,
     addNewBudget,
    editeBudget,
 deleteBudget,
 getgestionnairebycode
 } from "../../Redux/Actions/Gestionnaire/GestionnaireGrid";
 import 'react-confirm-alert/src/react-confirm-alert.css';
 import { modeAsideEnum, constants, classNameObj, dataField } from "../../Helper/Enumeration";
//  import Group from"./Group";
  import ListData from '../Demande/ListData';
//  import List from './List';
 // import ListGroup from './ListGroup';
 import DataSource from 'devextreme/data/data_source';
import HelperGrid from '../../Helper/HelperGrid';
import GestionnaireAsideReducer from '../../Redux/Reducers/Gestionnaire/GestionnaireAside';

//  import { getGroup } from "../../Redux/Actions/Budget/Budget";
 const GestionnaireAside = () => {
     const dispatch = useDispatch();
     const gestionnaireAsideReducer = useSelector(state => state.gestionnaireAsideReducer);
 const group = useSelector((state)=>state.gestionnaireAsideReducer.group)   ;
     const messages = useSelector(state => state.intl.messages);
     const intl = useSelector(state => state.intl);
     const isOpen = useSelector(state => state.gestionnaireAsideReducer.isOpen);
     const modeAside = useSelector(state => state.gestionnaireAsideReducer.modeAside);

     const btnAddInstance = useSelector(state => state.gestionnairesReducer.btnAddInstance);
    const btnEditionInstance = useSelector(state => state.gestionnairesReducer.btnEditionInstance);

    const compteurBudget = useSelector(state => state.gestionnaireAsideReducer.compteurBudget);
     const selectedGestionnaire = useSelector(state => state.gestionnaireAsideReducer.selectedGestionnaire);
    // const Module = useSelector(state => state.BudgetAsideReducer.Module);
     let objInitialisation = {

         codeDemande: selectedGestionnaire ? selectedGestionnaire.codeDemande: compteurBudget,
        userGrp: selectedGestionnaire ? selectedGestionnaire.userGrp : 'clot',
        
 NumModule: selectedGestionnaire ? selectedGestionnaire.NumModule : '',
         dateValidation: selectedGestionnaire ? selectedGestionnaire.dateValidation : '16/05/2022',
        dateCreation: selectedGestionnaire ? selectedGestionnaire.dateCreation : '16/05/2022',
        userCreate: selectedGestionnaire ?selectedGestionnaire.userCreate : 'henychakroun',
        userName: selectedGestionnaire ? selectedGestionnaire.userName : 'Dr.Heny',
        userValidation:selectedGestionnaire ? selectedGestionnaire.userValidation : 'henychak',
        etat: selectedGestionnaire ? selectedGestionnaire.etat : 'NonValide',
        demandeModuleCollection:selectedGestionnaire ? selectedGestionnaire.demandeModuleCollection : '',
        demandeFormCollection:selectedGestionnaire ? selectedGestionnaire.demandeFormCollection : '',
        demandeMenuCollection:selectedGestionnaire ? selectedGestionnaire.demandeMenuCollection: '',
    };
    let dxForm = useRef(null);
    let formObj = useRef(objInitialisation);
    if (modeAside === 'ADD') {
        formObj.current.codeDemande = compteurBudget;
    }
    if (selectedGestionnaire && (modeAside === 'CONSULT' || modeAside === 'EDIT' || modeAside === 'VALIDATE')) {
        formObj.current = _.cloneDeep(selectedGestionnaire);
    }
    const dataGrid = useRef(null);
    useEffect(() => {
 
            //   if (Module && Module.length === 0)
            //  dispatch(getModule())
              if(group===null)  
             dispatch(getGroup())
             
     }) 

   

    const validateForm = (e) => {
        let demande = _.cloneDeep(formObj.current);
        let validationForm = e.validationGroup.validate().isValid;
        let data = {};
        if (modeAside === 'ADD') {
            if (validationForm) {
                data = {
                    codeDemande: demande.codeDemande,
                    userGrp: demande.userGrp,
                    userName: demande.userName,
                    dateCreation: demande.dateCreation,
                    dateValidation:demande.dateValidation,
                    userCreation: demande.userCreate,
                    etat: demande.etat,
                    demandeForm:demande.demandeFormCollection,
                    demandeMenu:demande.demandeMenuCollection,
                    demandeModule:demande.demandeModuleCollection,



                };
                console.log(data);
                dxForm.current.instance.getEditor('submitAside').option("disabled", true);

                    dispatch(addNewDemande(data))
                    .then(() => {
                        confirmCloseAside(e);
                        notify("Success", 'success', 1000);
                    }).catch(function () {
                        dxForm.current.instance.getEditor('submitAside').option("disabled", false);
                    });
                 dispatch(addNewBudget(data))
                     .then(() => {
                         confirmCloseAside(e);
                         notify("Success", 'success', 1000);
                     }).catch(function () {
                         dxForm.current.instance.getEditor('submitAside').option("disabled", false);
                     });
            }
        // } else if (modeAside === 'EDIT') {
        //     if (validationForm) {
        //         selectedGestionnaire.CodeClient = budget.CodeClient.trim();
        //         selectedGestionnaire.designation = budget.designation.trim();
        //         selectedGestionnaire.designationSec = budget.designationSec.trim();
        //         selectedGestionnaire.mail = budget.mail.trim();
        //         selectedGestionnaire.login = budget.login.trim();
        //         selectedGestionnaire.MotDePasse = budget.MotDePasse.trim();

        //         dispatch(editeBudget(selectedGestionnaire))
        //             .then(() => {
        //                 confirmCloseAside(e);
        //                 notify("Success", 'success', 1000);
        //             }).catch(err => {
        //                 notify(err, 'error', 500);
        //             });
        //     }
         }
            else if (modeAside === 'CONSULT') {
                if (validationForm) {
                    selectedGestionnaire.codeDemande = demande.codeDemande.trim();
                    selectedGestionnaire.userGrp = demande.userGrp.trim();
                    selectedGestionnaire.userName = demande.userName.trim();
                    selectedGestionnaire.dateCreation = demande.dateCreation.trim();
                    selectedGestionnaire.dateCreation = demande.dateCreation.trim();
                    selectedGestionnaire.userCreation = demande.userCreation.trim();
                    selectedGestionnaire.etat = demande.etat;
                    selectedGestionnaire.demandeForm = demande.demandeFormCollection;
                    selectedGestionnaire.demandeMenu = demande.demandeMenuCollection;
                    selectedGestionnaire.demandeModule = demande.demandeModuleCollection;
                    
    
                    dispatch(getgestionnairebycode(selectedGestionnaire))
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
        if (modeAside === modeAsideEnum.editMode) {
            e.validationGroup.reset();
      }
        cleanObject();
    };

    const cleanObject = () => {
        formObj.current = _.cloneDeep(objInitialisation);
    };

   const resetButtonOption = () => {
        return {
           icon: "fas fa-times",//constants.iconReset
           onClick: (e) => {
               if (modeAside === 'ADD'||modeAside === 'EDIT'||modeAside === 'CONSULT' ) {
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
                dispatch(deleteBudget(selectedGestionnaire.code))
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
        btnAddInstance.option('disabled', false);
        btnEditionInstance.option('disabled', false);
    };
     const RenderList =() =>{
        
       console.log("RenterList");
        // let obj ={
        //     title:messages.NumModule,
        //      DataSource:Module,
        //      displayValue:"NumModule",
        //     dataField:"NumModule",
        //     handlechangeselect:handleChangeModule,
        //     messagesRequiredRule:messages.Num+messages.required,
        //     modeAside:modeAside,
        //      messages:messages
        //  }

        
         let obj = {
             title: messages.list,
             dataField: "List",
            modeAside: modeAside,
            disabled: false
         }
         return (
             <div className='' >
                 {/*TreeList_Template(obj)*/} 
             {<ListData/>}
            {/* {<List/>}  */}
             </div>
        )
     }
     const handleChangeModule =(e) =>{
        formObj.current.module=e.value.NumModule;
     }
   const RenderCodeDemande = () => {
        console.log("RenderCodeDemande")
        let obj = {
            title: messages.codeDemande,
            dataField: "codeDemande",
            modeAside: modeAside,
            disabled: false
        }
        return (
            <GroupItem >
                {Text_Template(obj)}
            </GroupItem>
        )
    }
    const RenderGroupe = () => {
        console.log("RenderGroupe")
        
        let obj = {
            
            title: messages.userGrp,
            dataField: "groupe",
            modeAside: modeAside,
            disabled: false,
            

        }
        return (
            
            <GroupItem >
                {/* <Group/> */}
                {/* {<ListGroup/> } */}
                {Text_Template(obj)}
            </GroupItem>
        )
        }
        
        

    // const RenderDateCreation = () => {
    //     console.log("RenderDateCreation")
    //     let obj = {
    //         title: messages.DateCreation,
    //         dataField: "Date",
    //         modeAside: modeAside,
    //         maxLength: 200,
    //         isRequired: true,
    //         messageRequired: `${messages.designation} ${messages.required}`,
    //         disabled: modeAside === 'CONSULT'
    //     }
    //     return (
    //         <GroupItem >
    //             {Text_Template(obj)}
    //         </GroupItem>
    //     )
    // }
    const RenderDesignationSec = () => {
        console.log("RenderDesignationSec")
        let obj = {
            title: messages.designationSec,
            dataField: "designationSec",
            modeAside: modeAside,
            maxLength: 200,
            isRequired: true,
            messageRequired: `${messages.designationSec} ${messages.required}`,
            disabled: modeAside === 'CONSULT'
        }
        return (
            <GroupItem >
                {Text_Template(obj)}
            </GroupItem>
        )
    }
    const RenderUserCreation = () => {
        console.log("RenderUserCreation")
        let obj = {
            title: messages.UserCreation,
            dataField: "UserCreation",
            modeAside: modeAside,
            maxLength: 200,
            isRequired: true,
            messageRequired: `${messages.login} ${messages.required}`,
            disabled: modeAside === 'CONSULT'
        }
        return (
            <GroupItem >
                {Text_Template(obj)}
            </GroupItem>
        )
    }
    const RenderEtat = () => {
        console.log("RenderEtat")
        let obj = {
            title: messages.Etat,
            dataField: "Etat",
            modeAside: modeAside,
            maxLength: 200,
            isRequired: true,
            messageRequired: `${messages.MotDePasse} ${messages.required}`,
            disabled:  modeAside === 'CONSULT'
        }
        
        return (
            <GroupItem >
                {Text_Template(obj)}
            </GroupItem>
        )
    }

 const Rendergroup =()=>{
     console.log("rendergroup")
    let objselect ={
         title:messages.userGrp,
         DataSource:group,
         displayvalue:"description",
         dataField:"userGrp",
         colspan :1,
         disabled:modeAside==="EDIT"||modeAside==="DELETE"||modeAside==='CONSULT',
         handleChangeSelect:handleChangegroup,
         messageRequiredRule:messages.userGrp+messages.required,
         modeAside:modeAside,
         messages:messages,  
     }
     return(
 <GroupItem>
     {select_Template_new(objselect)}
 </GroupItem>
     )
 }
 const handleChangegroup=(e) =>{
 formObj.current.userGrp=e.value.description;
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
                            key={'formCreateBudget'}
                            formData={formObj.current}
                            onInitialized={onInitializedFormGlobal}
                            colCount={1}
                            style={{
                                width: "85%",
                                display: "table-row"
                            }}
                        >
                            
                            {HeaderAside({
                                dataGrid:dataGrid,
                                modeAside: "CONSULT",
                                btnValider: validateButtonOption(),
                                btnReset: resetButtonOption(),
                                
                                messages: messages
                            })}
                            
                          <GroupItem>
                               <GroupItem>
                               
                               
                                    {RenderCodeDemande()}
                                    { RenderGroupe() }
                                    {/* {Rendergroup()} */}
                                </GroupItem>
                                   <GroupItem colCount={2}>
                                       {RenderList() }
                                   { /*RenderUserName()*/}
                                    
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
export default GestionnaireAside