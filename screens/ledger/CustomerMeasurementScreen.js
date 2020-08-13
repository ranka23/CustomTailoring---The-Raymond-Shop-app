import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Picker,
} from "react-native";

import Header from "../../components/UI/Header";
import Card from "../../components/UI/Card";

import Colors from "../../constants/Colors";

const CustomerMeasurementScreen = (props) => {
  const { name } = props.route.params;
  const { imageUri } = props.route.params;

  const [unitType, setUnitType] = useState("cm");

  return (
    <View>
      <Header navigation={props.navigation} title={name} />
      <Card style={styles.cardContainer}>
        <View style={styles.customerImageContainer}>
          <Image source={{ uri: imageUri }} style={styles.customerImage} />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={unitType}
              style={styles.unitPicker}
              onValueChange={(itemValue) => setUnitType(itemValue)}
            >
              <Picker.Item label="cm" value="cm" />
              <Picker.Item label="mm" value="mm" />
              <Picker.Item label="mtr" value="mtr" />
              <Picker.Item label="in" value="in" />
            </Picker>
          </View>
        </View>
        <View style={styles.measurementTextContainer}>
          <Text style={styles.keyText}>Torso</Text>
          <Text style={styles.valueText}>22.4</Text>
        </View>
        <View style={styles.measurementTextContainer}>
          <Text style={styles.keyText}>Neck</Text>
          <Text style={styles.valueText}>12.4</Text>
        </View>
        <View style={styles.measurementTextContainer}>
          <Text style={styles.keyText}>Back</Text>
          <Text style={styles.valueText}>42.4</Text>
        </View>
        <View style={styles.measurementTextContainer}>
          <Text style={styles.keyText}>Girth</Text>
          <Text style={styles.valueText}>31.4</Text>
        </View>
        <View style={styles.updateButtonContainer}>
          <Button
            title="Update Measurement"
            color={Colors.primary}
            style={styles.updateButton}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.deleteText}>DELETE MEASUREMENT</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default CustomerMeasurementScreen;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    marginTop: 60,
    marginHorizontal: 20,
  },
  customerImageContainer: {
    marginTop: -50,
    width: 100,
    height: 100,
    flexDirection: "row",
    marginBottom: 20,
  },
  customerImage: {
    borderRadius: 50,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.lightGrey,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    width: 110,
    height: 32,
    marginLeft: 15,
    marginTop: 70,
    paddingLeft: 5,
  },
  unitPicker: {
    width: 100,
    padding: 0,
    margin: 0,
    height: 29,
    paddingRight: 0,
    backgroundColor: "white",
  },
  measurementTextContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  keyText: {
    marginHorizontal: 10,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  valueText: {
    marginHorizontal: 10,
    flex: 1,
    textAlign: "left",
  },
  deleteText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "bold",
    padding: 10,
    marginVertical: 5,
    marginBottom: 10,
  },
  updateButtonContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 7,
  },
  updateButton: {
    borderRadius: 7,
    paddingHorizontal: 30,
  },
});
