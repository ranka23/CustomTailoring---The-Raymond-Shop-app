import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import Card from "./UI/Card";
import Header from "./UI/Header";
import Colors from "../constants/Colors";

const CustomerProfileHeader = (props) => {
  let imageUri = props.imageUri;
  if (imageUri === "") {
    // TODO: change below url to an imageUrL gotten from the firebase database.
    imageUri =
      "https://i2.wp.com/news.microsoft.com/apac/wp-content/themes/microsoft-news-center-2016/assets/img/default-avatar.png?ssl=1";
  }

  return (
    <View>
      <Header title={props.customerName} navigation={props.navigation} />
      <View style={styles.container}>
        <Card style={styles.cardContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: imageUri,
                  }}
                />
            </View>
            <Text style={styles.nameText}>{props.nickname}</Text>
            <Text style={styles.text}>{props.location}</Text>
            <Text style={styles.text}>{props.phoneNumber}</Text>
            <Text style={styles.text}>{props.emailAddress}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonLeftContainer}>
              <TouchableOpacity onPress={props.onButtonLeftClicked}>
                <Text style={styles.measurementText}>
                  {props.buttonLeftTitle}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRightContainer}>
              <TouchableOpacity onPress={props.onButtonRightClicked}>
                <Text style={styles.updateText}>{props.buttonRightTitle}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
        {props.hasInvoice ? (
          <Text style={styles.invoiceTitle}>INVOICE</Text>
        ) : null}
      </View>
    </View>
  );
};

export default CustomerProfileHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: "75%",
    padding: 20,
    marginTop: 50,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginTop: -70,
    marginBottom: 10,
  },
  image: {
    borderRadius: 50,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.lightGrey,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: 10,
  },
  buttonLeftContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingVertical: 1,
    color: Colors.darkerGrey,
  },
  nameText: {
    paddingVertical: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.darkerGrey,
  },
  updateText: {
    fontWeight: "bold",
    color: Colors.grey,
    fontSize: 13,
  },
  measurementText: {
    fontSize: 13,
    fontWeight: "bold",
    color: Colors.darkGrey,
  },
  invoiceTitle: {
    fontSize: 14,
    marginTop: 20,
    marginLeft: 40,
    paddingHorizontal: 30,
    paddingVertical: 7,
    alignSelf: "flex-start",
    backgroundColor: Colors.green,
    color: Colors.white,
    fontWeight: "bold",
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
    marginBottom: -3,
  },
});
