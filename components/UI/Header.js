import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const Header = (props) => {
  return (
    <View>
      <StatusBar backgroundColor={Colors.primary} />
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          {props.navigation ? (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              activeOpacity={0.5}
              onPress={() => props.navigation.goBack()}
            >
              <AntDesign name="leftcircleo" size={24} color={Colors.primary} />
            </TouchableOpacity>
          ) : null}
          <View style={styles.titleTextContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {props.title}
            </Text>
          </View>
        </View>
        <View style={styles.headerImageContainer}>
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={require("../../assets/ct-design-logo.png")}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const { height } = Dimensions.get("window");
const height_logo = height * 0.12;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 3,
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 30,
    marginRight: 10,
  },
  titleTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  headerImageContainer: {
    backgroundColor: Colors.primary,
    paddingTop: 20,
    paddingRight: 10,
    paddingLeft: 14,
    paddingBottom: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginHorizontal: 15,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  headerImage: {
    alignSelf: "center",
    height: height_logo,
    width: 80,
  },
});

export default Header;
