import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Items from "../models/Items";
import ItemView from "./ItemView";

const InvoiceIndividualItem = (props) => {
  const { items } = props;

  const itemsArray = [];

  for (const key in items) {
    itemsArray.push(
      new Items(
        key,
        items[key].itemName,
        items[key].itemNote,
        items[key].itemImage,
        items[key].itemQuantity,
        items[key].itemPrice,
        items[key].itemTotal
      )
    );
  }

  return (
    <FlatList
      data={itemsArray}
      listKey={(item, index) => index.toString()}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ItemView
          itemName={itemData.item.itemName}
          itemQuantity={itemData.item.itemQuantity}
          itemPrice={(itemData.item.itemPrice)}
          totalAmount={(itemData.item.itemPrice * itemData.item.itemQuantity).toFixed(2)}
        />
      )}
    />
  );
};

export default InvoiceIndividualItem;
