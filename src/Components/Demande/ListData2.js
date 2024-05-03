import React, { useEffect, useState } from "react";
import ArrayStore from "devextreme/data/array_store";
import List from "devextreme-react/list";
import { TreeList, Selection, Column } from "devextreme-react/tree-list";
import { handleUpdateDataTreeList } from "../../Redux/Actions/Demande/DemandeAside";
import "./List.css";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";


function ListData(obj2) {

  const dispatch = useDispatch();
  console.log(obj2);
  const dataTreeList = useSelector((state) => state.BudgetAsideReducer.dataTreeList);



  const listAttrs = { class: "list" };
  const handletreeListSelectionChange = (e) => {
    const selectedData = e.component.getSelectedRowsData();

    let selectedRowKeys = e.selectedRowKeys;
    // obj2.current.boutton = e.selectedRowKeys;

  }
  const handleListSelectionChange = (e) => {
    const current = e.addedItems[0];
    let codeModule = e.addedItems[0].numModule;

    console.log(codeModule);

    console.log(e.addedItems[0]);
    let listMenus = obj2.listMenus.filter((m) => {
      return m.module === codeModule;
    });
    let form = obj2.forms.filter((m) => {
      return m.module === codeModule;
    });
    construnctDataTreeList(current, listMenus, form);

  };



  const construnctDataTreeList = (module, listMenus, form) => {
    //etape 1

    let newDataTreeList = [];
    module.Head_ID = null;
    module.ID = module.numModule;
    module.
    newDataTreeList.push(module);
    let items = listMenus.filter((item, index) => {
      return item.codMnp.length === 2;
    }).map((m) => {
      m.ID = m.module + m.codMnp;
      m.Head_ID = module.numModule;
      return m;
    });
    newDataTreeList.push(...items);
    for (let menuPrincipale of items) {
      let itemsMenuPrincipale = form.filter((f) => f.codeMenu == menuPrincipale.codMnp).map((m) => {
        m.ID = m.form + m.control;
        m.Head_ID = menuPrincipale.ID;
        return m;
      });
      newDataTreeList.push(...itemsMenuPrincipale);
    }
    for (let menuPrincipale of items) {
      let itemsMenuPrincipale = listMenus.filter((item, index) => {
        return item.codMnp.length === 4 && item.codMnp.indexOf(menuPrincipale.codMnp) === 0 && item.codMnp !== menuPrincipale.codMnp;
      }).map((m) => {
        m.ID = m.module + m.codMnp;
        m.Head_ID = menuPrincipale.ID;
        return m;
      });
      for (let sousMenuPrinciple of itemsMenuPrincipale) {
        let itemsSousMenuPrinciple = form.filter((f) => f.codeMenu == sousMenuPrinciple.codMnp).map((m) => {
          m.ID = m.form + m.control;
          m.Head_ID = sousMenuPrinciple.ID;
          return m;
        });
        newDataTreeList.push(...itemsSousMenuPrinciple);
      }
      for (let sousMenuPrinciple of itemsMenuPrincipale) {
        let itemsSousMenuPrinciple = listMenus.filter((item, index) => {
          return item.codMnp.length === 6 && item.codMnp.indexOf(sousMenuPrinciple.codMnp) === 0 && item.codMnp !== sousMenuPrinciple.codMnp;
        }).map((m) => {
          m.ID = m.module + m.codMnp;
          m.Head_ID = sousMenuPrinciple.ID;
          return m;
        });
        for (let sousSousMenuPrinciple of itemsSousMenuPrinciple) {
          let itemsSousSousMenuPrinciple = form.filter((f) => f.codeMenu == sousSousMenuPrinciple.codMnp).map((m) => {
            m.ID = m.form + m.control;
            m.Head_ID = sousSousMenuPrinciple.ID;
            return m;
          });

          newDataTreeList.push(...itemsSousSousMenuPrinciple);
        }
        newDataTreeList.push(...itemsSousMenuPrinciple);
      }
      newDataTreeList.push(...itemsMenuPrincipale);
    }
    dispatch(handleUpdateDataTreeList(newDataTreeList));
  }


  return (
    <div>
      <div className="left">
        <List
          selectionMode="single"
          dataSource={obj2.module}
          searchEnabled={true}
          onSelectionChanged={(e) => handleListSelectionChange(e)}
          itemRender={renderListItem}
          elementAttr={listAttrs}
        />
      </div>

      <div className="right">
        <TreeList
          id="module"
          dataSource={dataTreeList}
          showRowLines={true}
          showBorders={true}
          columnAutoWidth={true}
          autoExpandAll={true}
          onSelectionChanged={(e) => handletreeListSelectionChange(e)}
          keyExpr="ID"
          parentIdExpr="Head_ID"
        >
          <Selection recursive={true} mode="multiple" />
          <Column dataField="designation" />
        </TreeList>
      </div>
    </div>
  );
}
function renderListItem(item) {
  return (
    <div>
      <div className="hotel">
        <div className="name">{item.desModule}</div>
        <div className="address">{`${item.chemin}`}</div>
      </div>
    </div>
  );
}
export default ListData;