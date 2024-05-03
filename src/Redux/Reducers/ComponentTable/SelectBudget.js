import { GET_ALL_BUDGET } from "../../Constants/ComponentTable/SelectBudget"
const BudgetReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_BUDGET:
            return {
                ...state,
                budgets: action.payload
            };
        default:
            return state;
    }
};
export default BudgetReducer;
