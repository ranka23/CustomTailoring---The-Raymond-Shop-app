import CustomerInvoices from "../models/CustomerInvoices";

const CUSTOMERINVOICES = [
  new CustomerInvoices(
    "c1",
    "AZ101232",
    "23/07/2020",
    1400,
    1224,
    10000.00,
    "U.P.I",
    "30/7/2020",
    "Ready",
    true
  ),
  new CustomerInvoices(
    "c1",
    "AZ101233",
    "23/07/2020",
    1400,
    1224,
    9424.00,
    "U.P.I",
    "30/7/2020",
    "Delivered",
    false
  ),
  new CustomerInvoices(
    "c1",
    "AZ101234",
    "23/07/2020",
    1400,
    1224,
    9424.00,
    "U.P.I",
    "30/7/2020",
    "Delivered",
    false
  ),
];

export default CUSTOMERINVOICES;
