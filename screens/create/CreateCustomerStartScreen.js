import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import Gradient from "../../components/UI/Gradient";
import Colors from "../../constants/Colors";

const CreateCustomerStartScreen = (props) => {
  const [increment, setIncrement] = useState(0);

  let displayText;

  if (increment === 0) {
    displayText = (
      <Text style={styles.welcomeText}>
        Hi there. <Text style={styles.emojiText}>👋</Text>
      </Text>
    );
  } else if (increment === 1) {
    displayText = (
      <View>
        <Text style={styles.welcomeText}>
          Welcome to <Text style={styles.emojiText}>🙏</Text>
        </Text>
        <Text style={styles.welcomeText}>the Raymond Shop, Rajajinagar </Text>
      </View>
    );
  } else if (increment === 2) {
    displayText = (
      <Text style={styles.welcomeText}>
        We are happy to be at your service.
      </Text>
    );
  } else {
    displayText = (
      <Text style={styles.welcomeText}>
        Please, help us serve you better by answering a few simple questions.
      </Text>
    );
  }
  return (
    <Gradient>
      <TouchableWithoutFeedback
        onPress={() => setIncrement((prevState) => prevState + 1)}
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
      {increment >= 3 ? (
        <TouchableOpacity style={styles.sureButton} activeOpacity={0.8} onPress={() => props.navigation.navigate('CreateCustomerInput')}>
          <Text style={styles.buttonText}>SURE</Text>
          <Text style={styles.buttonEmojiText}>😊</Text>
        </TouchableOpacity>
      ) : null}
    </Gradient>
  );
};

export default CreateCustomerStartScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  imageContainer: {
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
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 16,
    marginHorizontal: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.white,
  },
  emojiText: {
    fontSize: 24,
  },
  sureButton: {
    backgroundColor: Colors.white,
    margin: 20,
    padding: 1,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginLeft: 50,
  },
  buttonEmojiText: {
    fontSize: 24,
    textAlign: "right",
    marginLeft: 20,
  },
});
