import React, { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";

import CustomerProfileHeader from "../../components/CustomerProfileHeader";

import * as firebase from "firebase";
import "firebase/storage";

import * as customerActions from "../../store/actions/customer";
import { useDispatch } from "react-redux";

import Card from "../../components/UI/Card";

import Colors from "../../constants/Colors";

const CreateCustomerConfirmScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { name } = props.route.params;
  const { nickname } = props.route.params;
  const { location } = props.route.params;
  const { phone } = props.route.params;
  const { email } = props.route.params;
  let { image } = props.route.params;
  const totalInvoices = 0

  const customerHandler = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const metadata = {
        name: name,
        contentType: "image/jpeg",
      };

      const imageName = Date.now().toString();
      const storageRef = firebase.storage().ref();

      await storageRef
        .child("customer-profile-images/" + imageName)
        .put(blob, metadata);

      const downloadTask = await storageRef
        .child("customer-profile-images/" + imageName)
        .getDownloadURL();

      const createCustomer = customerActions.createCustomerInDatabase(
        name,
        nickname,
        location,
        phone,
        email,
        downloadTask,
        totalInvoices,
        null,
        null,
        false,
      );

      dispatch(createCustomer);
      setTimeout(() => {
        props.navigation.navigate("CreateCustomerSuccess", {
          name: name,
          totalInvoices: totalInvoices,
        });
      }, 1000);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <>
          <View style={styles.profileContainer}>
            <CustomerProfileHeader
              hasInvoice={false}
              buttonLeftTitle="SAVE"
              buttonRightTitle="CHANGE"
              isImageInDevice={true}
              onButtonLeftClicked={customerHandler}
              customerName={name}
              nickname={nickname}
              location={location}
              phoneNumber={phone}
              emailAddress={email}
              imageUri={image}
            />
          </View>
          <Card style={styles.disclaimerContainer}>
            <Text style={styles.disclaimerText}>
              Please click <Text style={styles.highlight}>SAVE</Text> if the
              details are correct.
            </Text>
          </Card>
          <Card style={styles.disclaimerContainer}>
            <Text style={styles.disclaimerText}>
              Please click <Text style={styles.highlight}>CHANGE</Text> if you
              want to make changes.
            </Text>
          </Card>
        </>
      )}
    </View>
  );
};

export default CreateCustomerConfirmScreen;

const styles = StyleSheet.create({
  disclaimerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 20,
    paddingVertical: 5,
  },
  disclaimerText: {
    marginVertical: 10,
    textAlign: "center",
  },
  highlight: {
    fontWeight: "bold",
    color: Colors.primary,
  },
  profileContainer: {
    marginBottom: 20,
  },
});
