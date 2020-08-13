import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import Gradient from "../../components/UI/Gradient";

import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const CreateScreen = (props) => {
  return (
    <Gradient>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logoImage}
          source={require("../../assets/complete-logo.png")}
          resizeMode="contain"
        />
      </View>
      <View style={styles.createCustomerContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('CreateCustomerStart')}>
          <Text style={styles.center}>
            <AntDesign name="pluscircleo" size={24} color={Colors.white} />
          </Text>
          <Text style={styles.customerText}>New Customer</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.createMockUpContainer}>
        <TouchableOpacity>
          <Text style={styles.center}>
            <AntDesign name="pluscircleo" size={16} color={Colors.white} />
          </Text>
          <Text style={styles.mockUpText}>Create Mockup</Text>
        </TouchableOpacity>
      </View>
    </Gradient>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  backButton: {
    marginTop: 20,
    marginLeft: 20,
  },
  imageContainer: {
    marginTop: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 180,
  },
  logoImage: {
    height: "100%",
  },
  createCustomerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  customerText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  createMockUpContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mockUpText: {
    color: Colors.white,
    fontWeight: "bold",
    marginBottom: 20,
  },
  center: {
    textAlign: "center",
  },
});
