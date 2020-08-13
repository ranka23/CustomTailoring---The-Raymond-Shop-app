import Ledger from "../../models/Ledger";
import moment from "moment";

export const CREATE_CUSTOMER_IN_DATABASE = "CREATE_CUSTOMER_IN_DATABASE";
export const ADD_MEASUREMENTS_IN_DATABASE = "ADD_MEASUREMENTS_IN_DATABASE";
export const ADD_CUSTOMER_INVOICE_IN_DATABASE =
  "ADD_CUSTOMER_INVOICE_IN_DATABASE";
export const GET_CUSTOMERS_AND_INVOICES_FROM_DATABASE =
  "GET_CUSTOMERS_FROM_DATABASE";
export const UPDATE_CUSTOMER_IN_DATABASE = "UPDATE_CUSTOMER_IN_DATABASE";
export const DELETE_INDIVIDUAL_INVOICE = "DELETE_INDIVIDUAL_INVOICE";

export const getCustomersAndInvoicesFromDatabase = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const customerResponse = await fetch(
      `https://the-raymond-shop.firebaseio.com/customers.json?auth=${token}`
    );
    const customerData = await customerResponse.json();

    const loadedCustomers = [];

    for (const key in customerData) {
      loadedCustomers.push(
        new Ledger(
          key,
          customerData[key].name,
          customerData[key].nickname,
          customerData[key].imageUrl,
          customerData[key].location,
          customerData[key].phone,
          customerData[key].email,
          customerData[key].orderStatus,
          moment
            .duration(
              moment(customerData[key].deliveryDate).diff(
                moment(),
                "millisecond"
              )
            )
            .days(),
          customerData[key].totalInvoices,
          customerData[key].isActive,
          customerData[key].invoices
        )
      );
    }

    dispatch({
      type: GET_CUSTOMERS_AND_INVOICES_FROM_DATABASE,
      customers: loadedCustomers,
    });
  };
};

export const createCustomerInDatabase = (
  name,
  nickname,
  location,
  phone,
  email,
  imageUrl,
  totalInvoices,
  orderStatus,
  deliveryDate,
  isActive
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://the-raymond-shop.firebaseio.com/customers.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          nickname,
          location,
          phone,
          email,
          imageUrl,
          totalInvoices,
          orderStatus,
          deliveryDate,
          isActive,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Couldn't save customer in database.");
    }
    const resData = await response.json();
    dispatch({ type: CREATE_CUSTOMER_IN_DATABASE, customerId: resData.name });
  };
};

export const addCustomerMeasurementToDatabase = (customerId, measurement) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://the-raymond-shop.firebaseio.com/customers/${customerId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          measurement,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Couldn't save customer in database.");
    }
    dispatch({ type: ADD_MEASUREMENTS_IN_DATABASE });
  };
};

export const addCustomerInvoiceInDatabase = (
  customerId,
  invoiceNumber,
  creationDate,
  items,
  tailoringAmount,
  discountPercent,
  taxPercent,
  totalAmount,
  paymentMode,
  deliveryDate,
  orderStatus,
  isActive,
  totalInvoices
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const customerUpdateResponse = await fetch(
      `https://the-raymond-shop.firebaseio.com/customers/${customerId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalInvoices,
          isActive,
          orderStatus,
          deliveryDate,
        }),
      }
    );

    if (!customerUpdateResponse.ok) {
      throw new Error("Couldn't save customer's invoice in database.");
    }

    const response = await fetch(
      `https://the-raymond-shop.firebaseio.com/customers/${customerId}/invoices.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoiceNumber,
          creationDate,
          items,
          tailoringAmount,
          discountPercent,
          taxPercent,
          totalAmount,
          paymentMode,
          deliveryDate,
          orderStatus,
          isActive,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Couldn't save customer's invoice in database.");
    }
    const resData = await response.json();

    dispatch({
      type: ADD_CUSTOMER_INVOICE_IN_DATABASE,
      invoiceData: {
        invoiceId: resData.name,
        invoiceNumber,
        creationDate,
        items,
        tailoringAmount,
        discountPercent,
        taxPercent,
        totalAmount,
        paymentMode,
        deliveryDate,
        orderStatus,
        isActive,
      },
    });
  };
};

export const updateCustomerInDatabase = (
  id,
  name,
  nickname,
  location,
  phone,
  email,
  imageUrl
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://the-raymond-shop.firebaseio.com/customers/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          nickname,
          location,
          phone,
          email,
          imageUrl,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(response);
    }
    const resData = await response.json();
    dispatch({ type: UPDATE_CUSTOMER_IN_DATABASE });
  };
};

export const deleteIndividualInvoice = (
  customerId,
  invoiceId,
  totalInvoices
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const updateTotalInvoices = await fetch(
      `https://the-raymond-shop.firebaseio.com/customers/${customerId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalInvoices,
        }),
      }
    );

    if (!updateTotalInvoices.ok) {
      throw new Error("Couldn't update total Invoices in database.");
    }

    const response = await fetch(
      `https://the-raymond-shop.firebaseio.com/customers/${customerId}/invoices/${invoiceId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Couldn't delete customer's invoice in database.");
    }
    dispatch({ type: DELETE_INDIVIDUAL_INVOICE });
  };
};
