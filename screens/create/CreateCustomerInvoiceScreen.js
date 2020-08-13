import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Picker,
  Platform,
} from "react-native";

import * as firebase from "firebase";
import "firebase/storage";

import * as customerActions from "../../store/actions/customer";
import { useDispatch } from "react-redux";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as ImageManipulator from "expo-image-manipulator";

import CreateInvoiceAddItemsModal from "../../components/CreateInvoiceAddItemsModal";

import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

import * as Animatable from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";

const CreateCustomerInvoiceScreen = (props) => {
  const dispatch = useDispatch();

  const { customerId } = props.route.params;
  const { totalInvoices } = props.route.params;

  const initialImage =
    "https://i2.wp.com/news.microsoft.com/apac/wp-content/themes/microsoft-news-center-2016/assets/img/default-avatar.png?ssl=1";

  const iconSize = 20;

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [creationDate, setCreationDate] = useState(Date.now());
  let [items, setItems] = useState([]);
  const [tailoringAmount, setTailoringAmount] = useState("");
  const [taxPercent, setTaxAmount] = useState("");
  const [discountPercent, setDiscountAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState("U.P.I");
  const [deliveryDate, setDeliveryDate] = useState(Date.now());

  // Individual Item State
  const [id, setId] = useState(0);
  const [itemName, setItemName] = useState();
  const [itemNote, setItemNote] = useState();
  const [itemQuantity, setItemQuantity] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [itemType, setItemType] = useState("shirt");

  const [showCreationDatePicker, setShowCreationDatePicker] = useState(false);
  const [triggerModal, setTriggerModal] = useState(false);
  const [triggerViewModal, setTriggerViewModal] = useState(false);
  const [isImage, setIsImage] = useState(false);

  const [imageUri, setImageUri] = useState(initialImage);

  const momentCreationDate = moment(creationDate);
  const momentCreationDateString = momentCreationDate.format("Do MMMM YYYY");

  const [isLoading, setIsLoading] = useState(false);

  const onCreationDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || creationDate;
    setShowCreationDatePicker(Platform.OS === "ios");
    setCreationDate(currentDate);
  };

  const creationDateHandler = () => {
    setShowCreationDatePicker((prevState) => !prevState);
  };

  const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);

  const momentDeliveryDate = moment(deliveryDate);
  const momentDeliveryDateString = momentDeliveryDate.format("Do MMMM YYYY");

  const onDeliveryDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || deliveryDate;
    setShowDeliveryDatePicker(Platform.OS === "ios");
    setDeliveryDate(currentDate);
  };

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Camera permissions not given!",
        "Please grant camera permissions to use the app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    const manipResult = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 600, height: 600 } }],
      { compress: 0.8, format: "jpeg" }
    );

    setImageUri(manipResult.uri);
    setIsImage(true);
  };

  const DeliveryDateHandler = () => {
    setShowDeliveryDatePicker((prevState) => !prevState);
  };

  const triggerModalState = () => {
    setTriggerModal((prevState) => !prevState);
  };

  const triggerViewModalState = () => {
    setTriggerViewModal((prevState) => !prevState);
  };

  const handleNameInputChange = (text) => {
    setItemName(text);
  };

  const handleNoteInputChange = (text) => {
    setItemNote(text);
  };

  const handleQuantityInputChange = (text) => {
    setItemQuantity(text);
  };

  const handlePriceInputChange = (text) => {
    setItemPrice(text);
  };

  const addItemInputs = () => {
    setId((prevState) => prevState + 1);
    const itemInput = {
      id,
      itemType,
      itemName,
      itemNote,
      itemQuantity,
      itemPrice,
      imageUri,
    };

    setItems((currentItems) => [...currentItems, itemInput]);

    setItemName();
    setItemNote();
    setItemPrice();
    setItemQuantity();
    setTriggerModal(false);
    setIsImage(false);
  };

  const removeItemFromItems = (itemId) => {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id !== itemId);
    });
  };

  const [individualItem, setIndividualItem] = useState();

  const openItemDetails = (itemId) => {
    setIndividualItem(items[itemId]);
    setTriggerViewModal(true);
  };

  const handleItemType = (value) => {
    setItemType(value);
  };

  const calculateTotalAmount = () => {
    setTotalAmount(0);

    if (!items.length <= 0) {
      items.forEach((item) => {
        const itemTotal = item.itemPrice * item.itemQuantity;
        setTotalAmount((prevAmount) => prevAmount + itemTotal);
      });
    }

    if (!tailoringAmount <= 0) {
      setTotalAmount((prevAmount) => prevAmount + parseInt(tailoringAmount));
    }

    if (!discountPercent <= 0) {
      setTotalAmount(
        (prevAmount) =>
          prevAmount - (prevAmount * parseInt(discountPercent)) / 100
      );
    }

    if (!taxPercent <= 0) {
      setTotalAmount(
        (prevAmount) => prevAmount + (prevAmount * parseInt(taxPercent)) / 100
      );
    }
  };

  const invoiceSubmitHandler = async () => {
    setIsLoading(true);

    try {
      setTimeout(() => {
        items.forEach(async (item, index, arr) => {
          const response = await fetch(item.imageUri);
          const blob = await response.blob();

          const imageName = Date.now().toString();
          const storageRef = firebase.storage().ref();

          await storageRef.child("item-cloth-images/" + imageName).put(blob);

          const downloadTask = await storageRef
            .child("item-cloth-images/" + imageName)
            .getDownloadURL();

          arr[index].imageUri = downloadTask;
        });
      }, 500);

      setTimeout(() => {
        const createInvoice = customerActions.addCustomerInvoiceInDatabase(
          customerId,
          invoiceNumber,
          creationDate,
          items,
          tailoringAmount,
          discountPercent,
          taxPercent,
          totalAmount,
          paymentMode,
          deliveryDate,
          "stage 1",
          true,
          (parseInt(totalInvoices) + 1).toString()
        );

        setIsLoading(false);
        dispatch(createInvoice);
        props.navigation.navigate("Home");
      }, 500);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showCreationDatePicker && (
        <DateTimePicker
          mode="date"
          value={creationDate}
          display="default"
          onChange={onCreationDateChange}
        />
      )}
      {showDeliveryDatePicker && (
        <DateTimePicker
          mode="date"
          value={creationDate}
          display="default"
          onChange={onDeliveryDateChange}
        />
      )}
      {triggerViewModal && (
        <CreateInvoiceAddItemsModal
          triggerModal={triggerViewModal}
          setTriggerModal={triggerViewModalState}
          isImage={true}
          isViewOnly={true}
          imageUri={individualItem.imageUri}
          itemName={individualItem.itemName}
          itemNote={individualItem.itemNote}
          itemQuantity={individualItem.itemQuantity}
          itemPrice={individualItem.itemPrice}
          itemType={individualItem.itemType}
          isEditable={false}
          canSetPicker={false}
        />
      )}
      <CreateInvoiceAddItemsModal
        triggerModal={triggerModal}
        setTriggerModal={triggerModalState}
        isViewOnly={false}
        isImage={isImage}
        imageUri={imageUri}
        itemName={itemName}
        itemNote={itemNote}
        itemQuantity={itemQuantity}
        itemPrice={itemPrice}
        itemType={itemType}
        onNameChange={handleNameInputChange}
        onNoteChange={handleNoteInputChange}
        onQuantityChange={handleQuantityInputChange}
        onPriceChange={handlePriceInputChange}
        onAddItemClicked={addItemInputs}
        takeImageHandler={takeImageHandler}
        isEditable={true}
        canSetPicker={true}
        setItemType={handleItemType}
      />
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <KeyboardAvoidingView behavior="default" style={styles.container}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            style={{ width: "100%", flex: 1 }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <View style={styles.header}>
                <Animatable.Image
                  animation="bounceIn"
                  duration={1500}
                  source={require("../../assets/complete-logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            </TouchableWithoutFeedback>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <ScrollView>
                <View style={styles.dateNumContainer}>
                  <View style={styles.invoiceNumberContainer}>
                    <AntDesign
                      name="codesquareo"
                      size={iconSize}
                      color={Colors.darkerGrey}
                    />
                    <TextInput
                      style={styles.invoiceNumberInput}
                      placeholder="Invoice Number"
                      value={invoiceNumber}
                      onChangeText={(text) => setInvoiceNumber(text)}
                      initialValue=""
                      required
                      autoCapitalize="characters"
                    />
                  </View>
                  <TouchableOpacity onPress={creationDateHandler}>
                    <View style={styles.createDateContainer}>
                      <AntDesign
                        name="clockcircleo"
                        size={iconSize}
                        color={Colors.darkerGrey}
                      />
                      <Text style={styles.dateText}>
                        {momentCreationDateString}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => setTriggerModal(true)}>
                    <View style={styles.addItemsContainer}>
                      <AntDesign
                        name="pluscircleo"
                        size={iconSize}
                        color={Colors.primary}
                      />
                      <Text style={styles.addItemsText}>ADD ITEM</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {!items.length <= 0 && (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginTop: 5,
                      marginBottom: 10,
                      borderBottomWidth: 1,
                      borderColor: Colors.lightGrey,
                    }}
                  >
                    Particulars
                  </Text>
                )}
                {items.map((item) => {
                  return (
                    <View key={item.id} style={styles.individualItemContainer}>
                      <TouchableOpacity
                        onPress={removeItemFromItems.bind(this, item.id)}
                      >
                        <AntDesign
                          name="closecircleo"
                          size={18}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                      <TouchableWithoutFeedback
                        onLongPress={openItemDetails.bind(this, item.id)}
                      >
                        <View style={styles.individualItems}>
                          <Text style={styles.individualItemName}>
                            {item.itemName}
                          </Text>
                          <Text style={styles.individualItemQuantity}>
                            {item.itemQuantity}
                          </Text>
                          <Text style={styles.individualItemPrice}>
                            {item.itemPrice}
                          </Text>
                          <Text style={styles.individualItemTotal}>
                            {(item.itemPrice * item.itemQuantity).toFixed(2)}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  );
                })}

                <View style={styles.tailoringAndTaxesContainer}>
                  <AntDesign
                    name="skin"
                    size={iconSize}
                    color={Colors.darkerGrey}
                  />
                  <Text style={styles.tailoringText}>
                    Tailoring Charges (misc)
                  </Text>
                  <TextInput
                    style={styles.tailoringAndTaxesChargesInput}
                    placeholder="Amount"
                    value={tailoringAmount.toString()}
                    onChangeText={(text) => setTailoringAmount(text)}
                    keyboardType="decimal-pad"
                    initialValue=""
                  />
                </View>
                <View style={styles.tailoringAndTaxesContainer}>
                  <Feather
                    name="percent"
                    size={iconSize}
                    color={Colors.darkerGrey}
                  />
                  <Text style={styles.tailoringText}>Discount</Text>
                  <TextInput
                    style={styles.tailoringAndTaxesChargesInput}
                    placeholder="Percent %"
                    value={discountPercent.toString()}
                    onChangeText={(text) => setDiscountAmount(text)}
                    keyboardType="decimal-pad"
                    initialValue=""
                  />
                </View>
                <View style={styles.tailoringAndTaxesContainer}>
                  <AntDesign
                    name="calculator"
                    size={iconSize}
                    color={Colors.darkerGrey}
                  />
                  <Text style={styles.tailoringText}>GST</Text>
                  <TextInput
                    style={styles.tailoringAndTaxesChargesInput}
                    placeholder="Percent %"
                    value={taxPercent.toString()}
                    onChangeText={(text) => setTaxAmount(text)}
                    onBlur={calculateTotalAmount}
                    keyboardType="decimal-pad"
                    initialValue=""
                  />
                </View>
                <TouchableOpacity onPress={calculateTotalAmount}>
                  <View style={styles.totalAmountContainer}>
                    <FontAwesome
                      name="rupee"
                      size={24}
                      color={Colors.darkerGrey}
                    />
                    <Text style={styles.totalAmountLabel}>Total Amount</Text>
                    <Text style={styles.totalAmount}>
                      {totalAmount.toFixed(2)}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.dateNumContainer}>
                  <View style={styles.paymentModeContainer}>
                    <Picker
                      selectedValue={paymentMode}
                      style={styles.paymentModePicker}
                      onValueChange={(itemValue, itemIndex) =>
                        setPaymentMode(itemValue)
                      }
                    >
                      <Picker.Item label="📱  U.P.I" value="U.P.I" />
                      <Picker.Item
                        label="💳  Credit Card"
                        value="Credit Card"
                      />
                      <Picker.Item label="📇  Debit Card" value="Debit Card" />
                      <Picker.Item
                        label="🏦  Bank Transfer"
                        value="Bank Transfer"
                      />
                      <Picker.Item label="💵  Cash" value="Cash" />
                      <Picker.Item label="⏳  Credit" value="Credit" />
                    </Picker>
                  </View>
                  <TouchableOpacity onPress={DeliveryDateHandler}>
                    <View style={styles.createDateContainer}>
                      <AntDesign
                        name="calendar"
                        size={iconSize}
                        color={Colors.darkerGrey}
                      />
                      <Text style={styles.dateText}>
                        {momentDeliveryDateString}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.signInContainer}
                    activeOpacity={0.6}
                    onPress={invoiceSubmitHandler}
                  >
                    <LinearGradient
                      colors={[Colors.primary, Colors.primaryDark]}
                      style={styles.signIn}
                    >
                      <Text style={(styles.textSign, { color: Colors.white })}>
                        CREATE INVOICE
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("Home")}
                  >
                    <Text style={styles.maybeLaterText}>MAYBE LATER</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Animatable.View>
          </LinearGradient>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

const { height } = Dimensions.get("screen");
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    height: height_logo,
    marginTop: 50,
  },

  footer: {
    flex: 3,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },

  button: {
    alignItems: "center",
    marginTop: 10,
  },

  signInContainer: {
    marginVertical: 10,
    width: "100%",
  },

  signIn: {
    width: "100%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  textSign: {
    fontSize: 18,
  },

  dateNumContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 10,
  },

  createDateContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  invoiceNumberContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 10,
  },

  invoiceNumberInput: {
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    padding: 1,
  },

  dateText: {
    marginLeft: 5,
  },

  addItemsContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 5,
  },

  tailoringAndTaxesContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  tailoringAndTaxesChargesInput: {
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    padding: 1,
    width: "20%",
    marginLeft: "auto",
    textAlign: "right",
  },

  addItemsText: {
    color: Colors.primary,
    fontWeight: "bold",
    paddingHorizontal: 10,
    fontSize: 13,
  },

  tailoringText: {
    marginLeft: 10,
    borderColor: Colors.lightGrey,
    padding: 1,
    marginBottom: 5,
    color: Colors.darkGrey,
    fontWeight: "bold",
  },

  closeButton: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 20,
  },

  totalAmountContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: Colors.lightGrey,
    paddingVertical: 5,
    paddingLeft: 5,
  },

  totalAmountLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
    color: Colors.darkerGrey,
  },

  totalAmount: {
    marginLeft: "auto",
    fontSize: 16,
    fontWeight: "bold",
  },

  individualItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  individualItems: {
    flexDirection: "row",
    flex: 1,
  },

  individualItemName: {
    marginLeft: 5,
    flex: 2,
    fontWeight: "bold",
    color: Colors.darkerGrey,
  },
  individualItemQuantity: {
    flex: 0.5,
    textAlign: "right",
  },
  individualItemPrice: {
    flex: 1,
    textAlign: "right",
  },
  individualItemTotal: {
    flex: 1,
    textAlign: "right",
  },

  individualItemText: {
    flex: 1.4,
    textAlign: "right",
  },

  paymentModeContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  paymentModePicker: {
    height: 23,
    width: 180,
    marginLeft: -5,
  },

  maybeLaterText: {
    marginTop: 5,
    color: Colors.primary,
    fontWeight: "bold",
  },
});

export default CreateCustomerInvoiceScreen;
