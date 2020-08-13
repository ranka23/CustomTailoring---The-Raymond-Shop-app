import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import * as customerActions from "../../store/actions/customer";
import { useDispatch } from "react-redux";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import * as firebase from "firebase";
import "firebase/storage";

import CustomerProfileHeader from "../../components/CustomerProfileHeader";
import InvoiceItem from "../../components/InvoiceItem";
import CustomerInvoices from "../../models/CustomerInvoices";

import Card from "../../components/UI/Card";
import { AntDesign, Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

import moment from "moment";

const CustomerProfileScreen = (props) => {
  const dispatch = useDispatch();

  const customerId = props.route.params.id;

  const { invoices } = props.route.params;
  const { totalInvoices } = props.route.params;

  const [customerName, setCustomerName] = useState(props.route.params.name);
  const [customerNickname, setCustomerNickname] = useState(
    props.route.params.nickname
  );
  const [customerImage, setCustomerImage] = useState(
    props.route.params.imageUri
  );
  const [customerLocation, setCustomerLocation] = useState(
    props.route.params.location
  );
  const [customerPhone, setCustomerPhone] = useState(
    props.route.params.phoneNumber
  );
  const [customerEmail, setCustomerEmail] = useState(
    props.route.params.emailAddress
  );

  const [leftButtonText, setLeftButtonText] = useState("MEASUREMENT");
  const [rightButtonText, setRightButtonText] = useState("UPDATE");
  const invoiceData = [];

  const [triggerModal, setTriggerModal] = useState(false);

  for (const key in invoices) {
    invoiceData.push(
      new CustomerInvoices(
        key,
        invoices[key].invoiceNumber,
        invoices[key].creationDate,
        invoices[key].items,
        invoices[key].tailoringAmount,
        invoices[key].discountPercent,
        invoices[key].taxPercent,
        invoices[key].totalAmount,
        invoices[key].paymentMode,
        invoices[key].deliveryDate,
        invoices[key].orderStatus,
        invoices[key].isActive
      )
    );
  }

  const [finalInvoices, setFinalInvoices] = useState(invoiceData);

  const removeInvoice = (invoiceId) => {
    setFinalInvoices((currentInvoices) => {
      return currentInvoices.filter(
        (invoice) => invoice.invoiceId !== invoiceId
      );
    });
  };

  const leftButtonHandler = () => {
    if (rightButtonText === "UPDATE") {
      props.navigation.navigate("CustomerMeasurement", {
        name: props.route.params.name,
        imageUri: props.route.params.imageUri,
      });
    }

    if (rightButtonText === "PROFILE") {
      props.navigation.navigate("CreateCustomerInvoice", {
        customerId,
        totalInvoices,
      });
    }
  };

  const rightButtonHandler = () => {
    if (rightButtonText === "PROFILE") {
      setTriggerModal(true);
    }

    setLeftButtonText("INVOICE");
    setRightButtonText("PROFILE");
  };

  const takeImageHandler = async () => {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    const manipResult = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 300, height: 300 } }],
      { compress: 0.7, format: "jpeg" }
    );

    setCustomerImage(manipResult.uri);
  };

  const profileUpdateHandler = async () => {
    try {
      const response = await fetch(customerImage);
      const blob = await response.blob();

      const metadata = {
        name: customerName,
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

      const updateCustomer = customerActions.updateCustomerInDatabase(
        customerId,
        customerName,
        customerNickname,
        customerLocation,
        customerPhone,
        customerEmail,
        downloadTask
      );

      dispatch(updateCustomer);
      setTimeout(() => {
        setCustomerImage(downloadTask);
        setTriggerModal(false);
      }, 1000);
    } catch (err) {
      Alert.alert("Couldn't update Customer Details. Please try again later");
    }
  };

  return (
    <View>
      <Modal visible={triggerModal} transparent={true}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.modalView}>
            <View>
              <Card style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: customerImage,
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Feather name="user" size={24} color={Colors.darkerGrey} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Customer name"
                    required
                    initialValue={customerName}
                    value={customerName}
                    onChangeText={(text) => setCustomerName(text)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Feather name="users" size={24} color={Colors.darkerGrey} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Byname"
                    initialValue={customerNickname}
                    value={customerNickname}
                    onChangeText={(text) => setCustomerNickname(text)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Feather name="map-pin" size={24} color={Colors.darkerGrey} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Location"
                    initialValue={customerLocation}
                    value={customerLocation}
                    onChangeText={(text) => setCustomerLocation(text)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Feather name="phone" size={24} color={Colors.darkerGrey} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Phone Number"
                    initialValue={customerPhone}
                    value={customerPhone}
                    onChangeText={(text) => setCustomerPhone(text)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Feather name="mail" size={24} color={Colors.darkerGrey} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Email address"
                    initialValue={customerEmail}
                    value={customerEmail}
                    onChangeText={(text) => setCustomerEmail(text)}
                  />
                </View>
                <TouchableOpacity onPress={takeImageHandler}>
                  <View style={styles.inputContainer}>
                    <AntDesign
                      name="picture"
                      size={24}
                      color={Colors.darkerGrey}
                    />
                    <Text style={styles.imageText}>Customer Image</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.button}>
                  <Button
                    title="Update"
                    onPress={profileUpdateHandler}
                    color={Colors.primary}
                  />
                </View>
              </Card>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setTriggerModal(false)}
            >
              <AntDesign name="closecircleo" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <FlatList
        data={finalInvoices}
        keyExtractor={(item) => item.invoiceId}
        ListEmptyComponent={() => (
          <View style={styles.noInvoicesContainer}>
            <Text style={styles.noInvoicesText}>No Invoices found</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <CustomerProfileHeader
            hasInvoice={true}
            customerName={customerName}
            navigation={props.navigation}
            imageUri={customerImage}
            nickname={customerNickname}
            location={customerLocation}
            phoneNumber={customerPhone}
            emailAddress={customerEmail}
            onButtonLeftClicked={leftButtonHandler}
            onButtonRightClicked={rightButtonHandler}
            buttonLeftTitle={leftButtonText}
            buttonRightTitle={rightButtonText}
            hasInvoice={totalInvoices === 0 ? true : false}
          />
        )}
        renderItem={(itemData) => (
          <InvoiceItem
            invoiceNumber={itemData.item.invoiceNumber}
            invoiceDate={moment(itemData.item.creationDate).format(
              "Do MMMM YYYY"
            )}
            tailoringCharges={itemData.item.tailoringAmount}
            taxes={itemData.item.taxPercent}
            paymentMode={itemData.item.paymentMode}
            totalInvoiceAmount={itemData.item.totalInvoiceAmount}
            deliveryDate={
              moment
                .duration(
                  moment(itemData.item.deliveryDate).diff(
                    moment(),
                    "millisecond"
                  )
                )
                .days() + 1
            }
            tailoringStatus={itemData.item.orderStatus}
            isActive={itemData.item.isActive}
            discountPercent={itemData.item.discountPercent}
            totalInvoiceAmount={itemData.item.totalAmount}
            items={itemData.item.items}
            invoiceId={itemData.item.invoiceId}
            customerId={customerId}
            totalInvoices={totalInvoices}
            deleteInvoice={setFinalInvoices}
          />
        )}
      />
    </View>
  );
};

export default CustomerProfileScreen;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    padding: 20,
    margin: 20,
  },

  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  textInput: {
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    padding: 1,
    marginBottom: 10,
    width: "80%",
  },
  button: {
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 5,
  },
  imageText: {
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    padding: 1,
    marginBottom: 10,
    width: "80%",
    color: Colors.grey,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginTop: -70,
    marginBottom: 10,
    alignSelf: "center",
  },
  image: {
    borderRadius: 50,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.lightGrey,
  },

  modalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  noInvoicesContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  noInvoicesText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.primary,
  }
});
