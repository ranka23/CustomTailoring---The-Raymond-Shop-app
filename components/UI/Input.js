import React, { useReducer, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import Colors from "../../constants/Colors";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

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
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
          value={inputState.value}
          required={props.required}
          keyboardType={props.keyboardType}
          initialValue={props.initialValue}
          maxLength={props.maxLength}
          minLength={props.minLength}
        />
        {props.children}
        {!inputState.isValid && inputState.touched && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{props.errorText}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Input;

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
