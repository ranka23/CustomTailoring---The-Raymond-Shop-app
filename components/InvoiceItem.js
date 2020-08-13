import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import * as customerActions from "../store/actions/customer";
import { useDispatch } from "react-redux";

import InvoiceIndividualItem from "../components/InvoiceIndividualItem";

import Card from "./UI/Card";
import Colors from "../constants/Colors";

import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const InvoiceItem = (props) => {
  const dispatch = useDispatch();
  const handleDelete = () => {

    Alert.alert(
      `Delete Invoice ${props.invoiceNumber}`,
      "Are you sure you want to delete this invoice?",
      [
        {
          text: "No",
          style: "default",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            dispatch(
              customerActions.deleteIndividualInvoice(
                props.customerId,
                props.invoiceId,
                (parseInt(props.totalInvoices) - 1).toString()
              )
            )
            setTimeout(() => {
              props.deleteInvoice((currentGoals) => {
                return currentGoals.filter(
                  (i) => i.invoiceId !== props.invoiceId
                );
              });
            }, 500);
          }
            
        },
      ]
    );
    
  };

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={handleDelete}>
      <Card style={styles.card}>
        <View style={styles.invoiceNumberContainer}>
          <Text style={styles.invoiceNumberText}>{props.invoiceNumber}</Text>
          <View style={styles.dateContainer}>
            {props.isActive ? (
              <Entypo name="dot-single" size={32} color={Colors.green} />
            ) : null}
            <Text style={styles.dateText}>{props.invoiceDate}</Text>
          </View>
        </View>
        <View style={styles.itemsContainer}>
          <InvoiceIndividualItem items={props.items} />
          <InvoiceIndividualItem />
        </View>
        <View>
          <View style={styles.tailoringContainer}>
            <Text style={styles.taxesText}>Tailoring Charges</Text>
            <Text style={styles.taxesText}>{props.tailoringCharges}</Text>
          </View>
          <View style={styles.tailoringContainer}>
            <Text style={styles.taxesText}>Discount %</Text>
            <Text style={styles.taxesText}>{props.discountPercent}%</Text>
          </View>
          <View style={styles.taxesContainer}>
            <Text style={styles.taxesText}>GST %</Text>
            <Text style={styles.taxesText}>{props.taxes}%</Text>
          </View>
        </View>
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentModeText}>
            Paid via {props.paymentMode}
          </Text>
          <Text style={styles.totalAmountText}>{props.totalInvoiceAmount}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.statusContainer}>
            <Ionicons
              name="ios-hourglass"
              size={20}
              color={Colors.darkerGrey}
            />
            <Text style={styles.statusText}>{props.tailoringStatus}</Text>
          </View>
          <View style={styles.deliveryContainer}>
            <Ionicons name="md-calendar" size={20} color={Colors.darkerGrey} />
            <Text style={styles.deliveryText}>
              {props.deliveryDate}
              {props.deliveryDate === 1 ? " day" : " days"}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default InvoiceItem;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 20,
    paddingLeft: 20,
    marginHorizontal: 10,
    marginVertical: 3,
  },
  invoiceNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  invoiceNumberText: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.darkerGrey,
  },
  dateContainer: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingRight: 10,
    paddingLeft: 5,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 13,
    padding: 3,
    color: Colors.white,
    fontWeight: "bold",
  },
  itemsContainer: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  paymentContainer: {
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    borderColor: Colors.primary,
    borderTopWidth: 1,
  },
  paymentModeText: {
    fontWeight: "bold",
    color: Colors.darkerGrey,
  },
  totalAmountText: {
    color: Colors.green,
    fontSize: 16,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  deliveryContainer: {
    flexDirection: "row",
    paddingRight: 20,
    paddingTop: 6,
    alignItems: "baseline",
    paddingLeft: 40,
  },
  deliveryText: {
    paddingLeft: 10,
    alignSelf: "baseline",
  },
  statusText: {
    paddingLeft: 10,
  },
  tailoringContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  taxesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingBottom: 5,
  },
  taxesText: {
    fontWeight: "bold",
    color: Colors.darkerGrey,
    paddingTop: 2,
  },
});
