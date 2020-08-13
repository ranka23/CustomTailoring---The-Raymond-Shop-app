import React, { useState } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";

import UpdateStatus from "./UpdateStatus";

import { Ionicons } from "@expo/vector-icons";

import Card from "./UI/Card";
import Colors from "../constants/Colors";

const LedgerItem = (props) => {
  const [updateClicked, setUpdateClicked] = useState(false);

  let imageUri = props.customerImageUri;

  if (props.customerImageUri === "") {
    // TODO: change below url to an imageUrL gotten from the firebase database.
    imageUri =
      "https://i2.wp.com/news.microsoft.com/apac/wp-content/themes/microsoft-news-center-2016/assets/img/default-avatar.png?ssl=1";
  }

  return (
    <TouchableOpacity onPress={() => setUpdateClicked(false)} activeOpacity={1}>
      <Card style={styles.cardContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.leftContentContainer}>
            <Text style={styles.nameText}>{props.customerName}</Text>
            <Text style={styles.nicknameText}>{props.customerNickname}</Text>
            <View style={styles.orderStatusContainer}>
              <Ionicons
                name="ios-hourglass"
                size={23}
                color={Colors.darkerGrey}
              />
              <Text style={styles.orderStatusText}>{props.orderStatus}</Text>
            </View>
            <View style={styles.deliveryContainer}>
              <Ionicons
                name="md-calendar"
                size={23}
                color={Colors.darkerGrey}
              />
              <Text style={styles.deliveryText}>{props.deliveryDate} days</Text>
            </View>
          </View>
          <View style={styles.rightContentContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: imageUri,
                }}
              />
            </View>
            <View style={styles.orderOneIconContainer}></View>
            <View style={styles.orderTwoContainer}></View>
            <View style={styles.orderThreeContainer}></View>
          </View>
        </View>
        <View>
          {!updateClicked ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setUpdateClicked(true)}
              >
                <Text style={styles.statusButtonText}>UPDATE STATUS</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6}>
                <Text
                  style={styles.detailsButtonText}
                  onPress={props.viewDetails}
                >
                  VIEW DETAILS
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <UpdateStatus />
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default LedgerItem;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 3,
  },
  contentContainer: {
    flexDirection: "row",
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  leftContentContainer: {
    paddingHorizontal: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.darkerGrey,
    marginBottom: 2,
    marginTop: 5,
  },
  nicknameText: {
    color: Colors.darkGrey,
    fontWeight: "bold",
  },
  orderStatusContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 5,
    marginTop: 10,
  },
  orderStatusText: {
    paddingHorizontal: 10,
    color: Colors.darkGrey,
    fontWeight: "bold",
  },

  deliveryContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  deliveryText: {
    paddingHorizontal: 10,
    color: Colors.darkGrey,
    fontWeight: "bold",
  },
  rightContentContainer: {},
  imageContainer: {
    width: 30,
    height: 30,
  },
  image: {
    borderRadius: 15,
    width: "100%",
    height: "100%",
  },
  orderOneIconContainer: {},
  orderTwoContainer: {},
  orderThreeContainer: {},
  buttonContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: Colors.lightGrey,
  },
  statusButtonText: {
    paddingHorizontal: 30,
    paddingTop: 10,
    color: Colors.darkGrey,
    fontSize: 13,
    fontWeight: "bold",
  },
  detailsButtonText: {
    paddingHorizontal: 30,
    paddingTop: 10,
    color: Colors.grey,
    fontSize: 13,
    fontWeight: "bold",
  },
});
