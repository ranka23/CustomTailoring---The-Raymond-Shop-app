import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../../constants/Colors";

const Gradient = (props) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        style={{ width: "100%", flex: 1 }}
      >
        {props.children}
      </LinearGradient>
    </View>
  );
};

export default Gradient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});
