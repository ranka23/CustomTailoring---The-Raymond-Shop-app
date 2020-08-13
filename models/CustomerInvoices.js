class CustomerInvoices {
  constructor(
    invoiceId,
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
    isActive
  ) {
    this.invoiceId = invoiceId
    this.creationDate = creationDate;
    this.invoiceNumber = invoiceNumber;
    this.items = items;
    this.tailoringAmount = tailoringAmount;
    this.discountPercent = discountPercent;
    this.taxPercent = taxPercent;
    this.totalAmount = totalAmount;
    this.paymentMode = paymentMode;
    this.deliveryDate = deliveryDate;
    this.orderStatus = orderStatus;
    this.isActive = isActive;
  }
}

export default CustomerInvoices;
