import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from "../constants/Colors";

const ItemView = (props) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{props.itemName}</Text>
      <Text style={styles.quantityText}>{props.itemQuantity}</Text>
      <Text style={styles.priceText}>{props.itemPrice}</Text>
      <Text style={styles.totalItemPriceText}>{props.totalAmount}</Text>
    </View>
  );
}

export default ItemView

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  itemText: {
    color: Colors.darkerGrey,
    flex: 2,
    fontWeight: "bold",
  },
  quantityText: {
    color: Colors.darkerGrey,
    flex: 1,
    fontWeight: "bold",
    color: Colors.darkGrey,
    textAlign: 'right'
  },
  priceText: {
    flex: 1.5,
    fontWeight: "bold",
    color: Colors.darkGrey,
    textAlign: 'right'
  },
  totalItemPriceText: {
    flex: 1.5,
    fontWeight: "bold",
    textAlign: "right",
    paddingRight: 20,
  },
});