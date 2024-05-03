import React, { useEffect, useRef } from "react";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import notify from "devextreme/ui/notify";
import Form, { GroupItem, Label } from "devextreme-react/form";
import {
  Text_Template,
  select_Template_new,
  HeaderAside
} from "../../Helper/editorTemplates";
import "react-datepicker/dist/react-datepicker.css";
import "status-indicator/styles.css";
import {
  handleClose,
  handleOpenModalConfirmation,
  handleCloseModalConfirmation,
  getGroup,
  getCompteurDemande
} from "../../Redux/Actions/Demande/DemandeAside";
import {
  getModule,
  addNewDemande,
  editeDemande,
  deleteDemande,
  getAllForm,
  getAllMenu
} from "../../Redux/Actions/Demande/Demande";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  modeAsideEnum,
} from "../../Helper/Enumeration";
import ListData from "./ListData";

const DemandeAside = () => {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.DemandeAsideReducer.group);

  const messages = useSelector((state) => state.intl.messages);
  const intl = useSelector((state) => state.intl);

  const isOpen = useSelector((state) => state.DemandeAsideReducer.isOpen);
  const modeAside = useSelector((state) => state.DemandeAsideReducer.modeAside);
  const module = useSelector((state) => state.DemandesReducer.module);
  const forms = useSelector((state) => state.DemandesReducer.forms);
  const listMenus = useSelector((state) => state.DemandesReducer.listMenus);
  const compteurDemande = useSelector((state) => state.DemandeAsideReducer.compteurDemande);
  const treeList = useRef(null);
  useEffect(() => {
    dispatch(getModule());
  }, []);
  useEffect(() => {
    dispatch(getAllForm());
  }, []);
  useEffect(() => {
    dispatch(getAllMenu());
  }, []);
  useEffect(() => {
    dispatch(getCompteurDemande());
  }, []);

  const btnAddInstance = useSelector(
    (state) => state.DemandesReducer.btnAddInstance
  );
  const btnEditionInstance = useSelector(
    (state) => state.DemandesReducer.btnEditionInstance
  );

  const selectedDemande = useSelector(
    (state) => state.DemandeAsideReducer.selectedDemande
  );
  const dataGridList = useRef(null);

  let objInitialisation = {
    codeDemande: selectedDemande ? selectedDemande.codeDemande : compteurDemande,
    userGrp: selectedDemande ? selectedDemande.userGrp : "",
    demandeModuleCollection: selectedDemande ? selectedDemande.demandeModuleCollection : [],
    demandeFormCollection: selectedDemande ? selectedDemande.demandeFormCollection : [],
    demandeMenuCollection: selectedDemande ? selectedDemande.demandeMenuCollection : [],
  };
  let dxForm = useRef(null);
  let formObj = useRef(objInitialisation);
  if (modeAside === "ADD") {
    formObj.current.codeDemande = compteurDemande;
  }
  if (
    selectedDemande &&
    (modeAside === "CONSULT" ||
      modeAside === "EDIT" ||
      modeAside === "VALIDATE" ||
      modeAside === "DELETE")
  ) {
    formObj.current = _.cloneDeep(selectedDemande);
  }
  useEffect(() => {
    if (group === null) dispatch(getGroup(), { dispatch });
  });

  const validateForm = (e) => {
    let demande = _.cloneDeep(formObj.current);
    let validationForm = e.validationGroup.validate().isValid;
    let data = {};
    if (modeAside === "ADD") {
      if (validationForm) {
        data = {
          codeDemande: demande.codeDemande,
          userGrp: demande.userGrp,
          demandeFormCollection: treeList.current.state.selectedData.filter((f) => f.type == "form"),
          demandeMenuCollection:treeList.current.state.selectedData.filter((f) => f.type == "menu"),
          demandeModuleCollection: treeList.current.state.selectedData.filter((f) => f.type == "module")
        };
        console.log(data);
        dxForm.current.instance
          .getEditor("submitAside")
          .option("disabled", true);

        dispatch(addNewDemande(data))
          .then(() => {
            confirmCloseAside(e);
            notify("Success", "success", 1000);
          })
          .catch(function () {
            dxForm.current.instance
              .getEditor("submitAside")
              .option("disabled", false);
          });
        dispatch(addNewDemande(data))
          .then(() => {
            confirmCloseAside(e);
            notify("Success", 'success', 1000);
          }).catch(function () {
            dxForm.current.instance.getEditor('submitAside').option("disabled", false);
          });
      }
    } else if (modeAside === "EDIT") {
      if (validationForm) {
        selectedDemande.CodeDemande = demande.codeDemande;
        selectedDemande.userGrp = demande.userGrp;

        dispatch(editeDemande(selectedDemande))
          .then(() => {
            confirmCloseAside(e);
            notify("Success", "success", 1000);
          })
          .catch((err) => {
            notify(err, "error", 500);
          });
      }
    } else if (modeAside === "DELETE") {
      dispatch(deleteDemande(selectedDemande))
        .then(() => {
          confirmCloseAside(e);
          notify("Sucess", "success", 1000);
        })
        .catch((err) => {
          notify("err", "error", 500);
        });
    }
  };

  const onInitializedFormGlobal = (e) => {
    dxForm.current = e.component;
  };
  const validateButtonOption = () => {
    return {
      icon: "fa fa-check",
      onClick: (e) => {
        intl.loadGrid = true;
        validateForm(e);
      },
      useSubmitBehavior: true,
    };
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
      icon: "fas fa-times",
      onClick: (e) => {
        if (
          modeAside === "ADD" ||
          modeAside === "EDIT" ||
          modeAside === "CONSULT"
        ) {
          showModalAlert(e, "closeAside");
        } else {
          confirmCloseAside(e);
        }

        intl.loadGrid = true;
      },
    };
  };
  const showModalAlert = (e, actionToDoOnClick) => {
    let messageToShow =
      actionToDoOnClick === "delete"
        ? messages.WantToDeleteAnyway
        : `${messages.confirmDialogTextPartOne} ${messages.confirmDialogTextPartTwo}`;
    const handleBtnConfirmerModalConfirmation = () => {
      dispatch(handleCloseModalConfirmation());
      if (actionToDoOnClick === "delete") {
        dispatch(deleteDemande(selectedDemande.code))
          .then(() => {
            confirmCloseAside(e);
            notify("Success", "success", 1000);
          })
          .catch((err) => {
            notify(err, "error", 500);
          });
      } else {
        confirmCloseAside(e);
      }
    };
    const handleBtnCancelModalConfirmation = () => {
      dispatch(handleCloseModalConfirmation());
    };
    dispatch(
      handleOpenModalConfirmation(
        messageToShow,
        handleBtnCancelModalConfirmation,
        handleBtnConfirmerModalConfirmation
      )
    );
  };

  const confirmCloseAside = (e) => {
    clearForm(e);
    dispatch(handleClose());
    // btnAddInstance.option("disabled", false);
    // btnEditionInstance.option("disabled", false);
  };

  const RenderList = () => {
    console.log("RenterList");

    let obj2 = {
      module: module,
      forms: forms,
      listMenus: listMenus,
      disabled: false,
    }
    return (
      <div className="">
        {<ListData
          ref={treeList}
          {...obj2} />}
      </div>
    );
  };

  const RenderCodeDemande = () => {
    console.log("RenderCodeDemande");
    let obj = {
      title: messages.codeDemande,
      dataField: "codeDemande",
      colspan: 1,
      modeAside: modeAside,
      disabled: true
    };
    return <GroupItem>{Text_Template(obj)}</GroupItem>;
  };
  const RenderGroupe = () => {
    console.log("RenderGroupe");

    let obj = {
      title: 'Groupe',
      dataSource: group,
      displayValue: "grp",
      colspan: 1,
      dataField: "userGrp",
      modeAside: modeAside,
      disabled: modeAside === "CONSULT" || modeAside === "DELETE",
      handleChangeSelect: handlechangegroup,
      colspan: 1,
      messages: messages,
      messageRequiredRule: messages.userGrp + messages.required,
    };

    return (
      <GroupItem>
        {select_Template_new(obj)}
      </GroupItem>
    );
  };

  const handlechangegroup = (e) => {
    formObj.current.userGrp = e.value.grp;
  };


  return (
    <div>
      {isOpen && modeAside !== "" && (
        <aside className={"openned"} style={{ overflow: "auto" }}>
          <div
            className="aside-dialog"
            style={{
              width: "60%",
              display: "table",
            }}
          >
            <Form
              ref={dxForm}
              key={"formCreateDemande"}
              formData={formObj.current}
              onInitialized={onInitializedFormGlobal}
              colCount={1}
              style={{
                width: "85%",
                display: "table-row",
              }}
            >
              {HeaderAside({
                modeAside: modeAside,
                btnValider: validateButtonOption(),
                btnReset: resetButtonOption(),
                messages: messages,
              })}
              (
              <GroupItem>
                <GroupItem colCount={2}>
                  {RenderCodeDemande()}
                  {RenderGroupe()}
                </GroupItem>
                <GroupItem colCount={2}>
                  {RenderList()}
                </GroupItem>
              </GroupItem>
              )
            </Form>
          </div>
        </aside>
      )}
    </div>
  );
};
export default DemandeAside;
