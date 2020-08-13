class Ledger {
  constructor(
    id,
    name,
    nickname,
    imageUri,
    location,
    phone,
    email,
    orderStatus,
    deliveryDate,
    totalInvoices,
    isActive,
    invoices
  ) {
    this.id = id;
    this.name = name;
    this.nickname = nickname;
    this.imageUri = imageUri;
    this.location = location;
    this.phone = phone;
    this.email = email;
    this.orderStatus = orderStatus;
    this.deliveryDate = deliveryDate;
    this.totalInvoices = totalInvoices;
    this.isActive = isActive;
    this.invoices = invoices;
  }
}

export default Ledger;
