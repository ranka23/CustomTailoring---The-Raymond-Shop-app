import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

import { useSelector } from "react-redux";


import Gradient from "../../components/UI/Gradient";
import Colors from "../../constants/Colors";

const CreateCustomerSuccessScreen = (props) => {
  const [isThankyou, setIsThankyou] = useState(false);
  const { name } = props.route.params;
  const { totalInvoices } = props.route.params

  const customerId = useSelector((state) => state.customer.customerId);

  let displayText;

  if (!isThankyou) {
    displayText = (
      <>
        <Text style={styles.thankyouText}>That's all Mr. {name}.</Text>
        <Text style={styles.thankyouText}>
          We will keep you updated on your order status via S.M.S
        </Text>
      </>
    );
  } else {
    displayText = (
      <>
        <View style={styles.thankyouContainer}>
          <Text style={styles.thankyou}>Thank you for choosing </Text>
          <Text style={styles.emojiText}>🙏</Text>
        </View>
        <Text style={styles.thankyouText}>the Raymond Shop, Rajaji Nagar.</Text>
        <Text style={styles.thankyouText}>
          It's a pleasure to serve your clothing and tailoring requirements.
        </Text>
        <Text style={styles.footNote}>
          Please handover the device to the tailor to book your measurement and
          order.
        </Text>
      </>
    );
  }

  const longPressHandler = () => {
    if (isThankyou) {
      props.navigation.navigate("TakeMeasurement", {
        customerId,
        name,
        totalInvoices
      });
    }
  };

  return (
    <Gradient>
      <TouchableWithoutFeedback
        onLongPress={longPressHandler}
        onPress={() => setIsThankyou(true)}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.logoImage}
              source={require("../../assets/complete-logo.png")}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainer}>{displayText}</View>
        </View>
      </TouchableWithoutFeedback>
    </Gradient>
  );
};

export default CreateCustomerSuccessScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  imageContainer: {
    flex: 1.5,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "50%",
    marginTop: 20,
  },
  logoImage: {
    height: height_logo,
  },
  textContainer: {
    flex: 2,
    alignItems: "center",
    marginHorizontal: 20,
  },
  thankyouText: {
    fontSize: 16,
    marginHorizontal: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.white,
  },
  thankyou: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.white,
  },
  thankyouContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  emojiText: {
    fontSize: 24,
  },
  footNote: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.white,
    marginHorizontal: 30,
    position: "absolute",
    bottom: 0,
    marginBottom: 10,
  },
});
