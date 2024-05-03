import React, { useEffect, useState } from "react";
import ArrayStore from "devextreme/data/array_store";
import List from "devextreme-react/list";
import { TreeList, Selection, Column } from "devextreme-react/tree-list";
import { handleUpdateDataTreeList } from "../../Redux/Actions/Demande/DemandeAside";
import "./List.css";
import _ from 'lodash';
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
class ListData extends React.Component {
  constructor(props) {
    super(props);
    let newDataTreeList = [];
    props.module.forEach((mod) => {
      mod.Head_ID = null;
      mod.ID = mod.idModule;
      mod.module = mod.idModule;
      mod.type = "module";
      newDataTreeList.push(mod);
      let items = props.listMenus.filter((item, index) => {
        return item.codMnp.length === 2 && item.module === mod.idModule;
      }).map((m) => {
        m.ID = m.module + m.codMnp;
        m.type = "menu";
        m.Head_ID = mod.idModule;
        return m;
      });
      newDataTreeList.push(...items);
      for (let menuPrincipale of items) {
        let itemsMenuPrincipale = props.forms.filter((f) => f.codeMenu == menuPrincipale.codMnp && f.module === mod.idModule).map((m) => {
          m.ID = m.form + m.control;
          m.type = "form";
          m.Head_ID = menuPrincipale.ID;
          return m;
        });
        newDataTreeList.push(...itemsMenuPrincipale);
      }
      for (let menuPrincipale of items) {
        let itemsMenuPrincipale = props.listMenus.filter((item, index) => {
          return item.codMnp.length === 4 && item.codMnp.indexOf(menuPrincipale.codMnp) === 0 && item.codMnp !== menuPrincipale.codMnp && item.module === mod.idModule;
        }).map((m) => {
          m.ID = m.module + m.codMnp;
          m.type = "menu";
          m.Head_ID = menuPrincipale.ID;
          return m;
        });
        for (let sousMenuPrinciple of itemsMenuPrincipale) {
          let itemsSousMenuPrinciple = props.forms.filter((f) => f.codeMenu == sousMenuPrinciple.codMnp && f.module === mod.idModule).map((m) => {
            m.ID = m.form + m.control;
            m.type = "form";
            m.Head_ID = sousMenuPrinciple.ID;
            return m;
          });
          newDataTreeList.push(...itemsSousMenuPrinciple);
        }
        for (let sousMenuPrinciple of itemsMenuPrincipale) {
          let itemsSousMenuPrinciple = props.listMenus.filter((item, index) => {
            return item.codMnp.length === 6 && item.codMnp.indexOf(sousMenuPrinciple.codMnp) === 0 && item.codMnp !== sousMenuPrinciple.codMnp && item.module === mod.idModule;
          }).map((m) => {
            m.ID = m.module + m.codMnp;
            m.type = "menu";
            m.Head_ID = sousMenuPrinciple.ID;
            return m;
          });
          for (let sousSousMenuPrinciple of itemsSousMenuPrinciple) {
            let itemsSousSousMenuPrinciple = props.forms.filter((f) => f.codeMenu == sousSousMenuPrinciple.codMnp && f.module === mod.idModule).map((m) => {
              m.ID = m.form + m.control;
              m.type = "form";
              m.Head_ID = sousSousMenuPrinciple.ID;
              return m;
            });

            newDataTreeList.push(...itemsSousSousMenuPrinciple);
          }
          newDataTreeList.push(...itemsSousMenuPrinciple);
        }
        newDataTreeList.push(...itemsMenuPrincipale);
      }

    });
    this.state = {
      module: props.module,
      forms: props.forms,
      listMenus: props.listMenus,
      disabled: props.disabled,
      data: newDataTreeList,
      expandedKeys: [],
      selectedData: [],
      currentModule: props.module[0],
      dataSource: newDataTreeList.filter((m) => {
        return m.module === props.module[0].idModule;
      })
    };

    this.handleListSelectionChange = this.handleListSelectionChange.bind(this);
    this.handletreeListSelectionChange = this.handletreeListSelectionChange.bind(this);
  }



  handleListSelectionChange = (e) => {
    this.state.currentModule = e.addedItems[0];
    let codeModule = this.state.currentModule.idModule;
    this.setState({
      dataSource:
        this.state.data.filter((m) => {
          return m.module === codeModule;
        })
    })
  };

  handletreeListSelectionChange = (e) => {
    let selectedData = e.component.getSelectedRowsData("all");

    selectedData.push(...this.state.selectedData.filter((m) => {
      return m.module !== this.state.currentModule.module;
    }));
    this.setState({
      selectedData: selectedData
    });
  };



  render() {

    return (
      <div>
        <div className="left">
          <List
            selectionMode="single"
            dataSource={this.state.module}
            searchEnabled={true}
            onSelectionChanged={(e) => this.handleListSelectionChange(e)}
            itemRender={renderListItem}
            elementAttr={{ class: "list" }}
          />
        </div>

        <div className="right">
          <TreeList
            id="module"
            dataSource={this.state.dataSource}
            showRowLines={true}
            showBorders={true}
            columnAutoWidth={true}
            autoExpandAll={true}
            defaultExpandedRowKeys={this.state.expandedKeys}
            defaultSelectedRowKeys={this.state.selectedData.map((m) => {
              return m.ID;
            })}
            onSelectionChanged={(e) => this.handletreeListSelectionChange(e)}
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
}
function renderListItem(item) {
  return (
    <div>
      <div className="hotel">
        <div className="name">{item.desModule}</div>
      </div>
    </div>
  );
}
export default ListData;