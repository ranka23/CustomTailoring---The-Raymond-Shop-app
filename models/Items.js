class Items {
  constructor(
    id,
    itemName,
    itemNote,
    itemImage,
    itemQuantity,
    itemPrice,
    itemTotal,
  ) {
    this.id = id;
    this.itemName = itemName
    this.itemNote = itemNote
    this.itemImage = itemImage
    this.itemQuantity = itemQuantity
    this.itemPrice = itemPrice
    this.itemTotal = itemPrice * itemQuantity
  }
}

export default Items