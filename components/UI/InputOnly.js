import React, { useReducer, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import Colors from "../../constants/Colors";

const InputOnly = (props) => {
  
  return (
    <View>
      <Text style={{ ...styles.title, ...props.style }}>{props.title}</Text>
      <View style={styles.action}>
        {props.id === "email" || props.id === "name" ? (
          <FontAwesome
            name={props.iconName}
            color={props.iconColor}
            size={props.iconSize}
          />
        ) : (
          <Feather
            name={props.iconName}
            color={Colors.black}
            size={props.iconSize}
          />
        )}
        <TextInput
          secureTextEntry={props.togglePasswordVisibility}
          style={styles.textInput}
          autoCapitalize={props.autoCapitalize}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          value={props.value}
          required={props.required}
          keyboardType={props.keyboardType}
          initialValue={props.initialValue}
          maxLength={props.maxLength}
          minLength={props.minLength}
        />
        {props.children}
      </View>
    </View>
  );
};

export default InputOnly;

const styles = StyleSheet.create({
  title: {
    color: Colors.darkGrey,
    fontSize: 18,
    marginTop: 12,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: Colors.black,
    fontSize: 14,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
});
