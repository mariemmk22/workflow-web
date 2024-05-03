
              import {
                GET_ALL_GESTIONNAIRE,
                GET_GESTIONNAIRE_BY_CODE,
               ADD_NEW_GESTIONNAIRE,
                DELETE_GESTIONNAIRE,
                EDIT_GESTIONNAIRE,
               GET_MODULE,
               GET_MENU,
               GET_FORM,
               // GET_GROUP,
               ADD_NEW_DEMANDE,
               GET_ALL_DEMANDE,
               CONSULT_GESTIONNAIRE,
               GET_Demande_BY_CODE
           } from '../../Constants/Gestionnaire/Gestionnaire';
           
           const initialState = {
               allBudget: [],
               alldemande:[],
            //    module:[],
               menu:[],
               form:[],
               //  group :[],
               demande:[],
               selectedBudget: null,
               selectedGestionnaire:null,
               btnAddInstance: null,
               btnConsultInstance: null,
               btnEditInstance: null,
               btnDeleteInstance: null,
               btnEditionInstance: null,
               dateDebut: null,
               dateFin: null 
           };
           
           const GestionnairesReducer = (state = initialState, action) => {
               switch (action.type) {
                   // case GET_ALL_BUDGET:
                   //     return {
                   //         ...state,
                   //         allBudget: action.payload
                   //     };
                   // case GET_BUDGET_BY_CODE:
                   //     return {
                   //         ...state,
                   //         selectedBudget: action.payload
                   //     };
                   // case GET_ALL_DEMANDE:
                   //     return {
                   //         ...state,
                   //         alldemande: action.payload
                   //     };
           
                   // case ADD_NEW_BUDGET:
                   //     return {
                   //         ...state,
                   //         allBudget: [...state.allBudget, action.payload],
           
                   //     };
                   case EDIT_GESTIONNAIRE:
                       return {
                           ...state,
                           allBudget: [...state.allBudget, action.payload]
                       };
                   case DELETE_GESTIONNAIRE:
                       return {
                           ...state,
                           allBudget: [...state.allBudget, action.payload]
                       }; 
                       case GET_MODULE:
                           return {
                               ...state,
                               module: action.payload
                           }; 
                           case GET_MENU://menu
                               return {
                                   ...state,
                                   menu: action.payload
                               }; 
                               case GET_FORM: //form
                                   return {
                                       ...state,
                                       form:  action.payload
                                   }; 
                                   // case GET_GROUP: //GROUP
                                   // return {
                                   //     ...state,
                                   //     group: action.payload
                                   // }; 
                                   case GET_ALL_DEMANDE:
                     return {
                           ...state,
                          alldemande: action.payload
                       };
                                   
                   case ADD_NEW_DEMANDE:
                       return {
                           ...state,
                        
                           alldemande: [...state.alldemande, action.payload]
                       };
                       // case EDIT_DEMANDE:
                       // return {
                       //     ...state,
                       //     alldemande: [...state.alldemande, action.payload]
                       // };
                       case GET_Demande_BY_CODE : //CONSULT_GESTIONNAIRE 
                        return{
                            ...state,
                            selectedGestionnaire:action.payload
                       };
                   default:
                       return state;
               }
             
               
           }
           export default GestionnairesReducer;
                    
         
      
           
           
      