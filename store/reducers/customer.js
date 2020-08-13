import {
  CREATE_CUSTOMER_IN_DATABASE,
  GET_CUSTOMERS_AND_INVOICES_FROM_DATABASE,
  DELETE_INDIVIDUAL_INVOICE,
} from "../actions/customer";

const initialState = {
  customers: [],
  customerInvoices: [],
  customerId: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CUSTOMER_IN_DATABASE:
      return {
        customerId: action.customerId,
      };
    case GET_CUSTOMERS_AND_INVOICES_FROM_DATABASE:
      return {
        customers: action.customers,
        invoices: action.invoices,
      };
      case DELETE_INDIVIDUAL_INVOICE:
        return {
          state
        }
    default:
      return state;
  }
};
