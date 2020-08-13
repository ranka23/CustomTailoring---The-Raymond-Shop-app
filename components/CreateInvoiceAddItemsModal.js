import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Keyboard,
  Picker,
} from "react-native";

import Colors from "../constants/Colors";
import Card from "./UI/Card";
import { AntDesign } from "@expo/vector-icons";

const CreateInvoiceAddItemsModal = (props) => {
  function handleItemType(itemValue) {
    props.setItemType(itemValue);
  }

  return (
    <Modal visible={props.triggerModal} transparent={true}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.modalView}>
          <View>
            <Card style={styles.cardContainer}>
              {props.isImage && (
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: props.imageUri,
                    }}
                  />
                </View>
              )}

              <Picker
                selectedValue={props.itemType}
                enabled={props.canSetPicker}
                style={styles.itemTypePicker}
                onValueChange={(itemValue) => handleItemType(itemValue)}
              >
                <Picker.Item label="👕  Shirt" value="shirt" />
                <Picker.Item label="👖  Pant" value="pant" />
                <Picker.Item label="🧥  Blazer" value="blazer" />
                <Picker.Item label="🥼  Kurta" value="kurta" />
                <Picker.Item label="👘  Sherwani" value="sherwani" />
              </Picker>

              <View style={styles.inputContainer}>
                <AntDesign
                  name="shoppingcart"
                  size={24}
                  color={Colors.darkerGrey}
                />
                <TextInput
                  style={styles.textInput}
                  value={props.itemName}
                  required
                  editable={props.isEditable}
                  initialValue={props.itemName}
                  onChangeText={props.onNameChange}
                  minLength={3}
                  placeholder="Item name"
                  autoCapitalize="words"
                />
              </View>
              <View style={styles.inputContainer}>
                <AntDesign
                  name="filetext1"
                  size={24}
                  color={Colors.darkerGrey}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Note or description (optional)"
                  value={props.itemNote}
                  initialValue={props.itemNote}
                  onChangeText={props.onNoteChange}
                  minLength={3}
                  editable={props.isEditable}
                  autoCapitalize="sentences"
                />
              </View>
              <View style={styles.inputContainer}>
                <AntDesign
                  name="switcher"
                  size={24}
                  color={Colors.darkerGrey}
                />
                <TextInput
                  style={styles.textInput}
                  value={props.itemQuantity}
                  required
                  keyboardType="decimal-pad"
                  initialValue={props.itemQuantity}
                  onChangeText={props.onQuantityChange}
                  placeholder="Quantity"
                  editable={props.isEditable}
                />
              </View>
              <View style={styles.inputContainer}>
                <AntDesign name="tagso" size={24} color={Colors.darkerGrey} />
                <TextInput
                  style={styles.textInput}
                  value={props.itemPrice}
                  required
                  keyboardType="decimal-pad"
                  initialValue={props.itemPrice}
                  onChangeText={props.onPriceChange}
                  placeholder="Price"
                  editable={props.isEditable}
                />
              </View>
              {!props.isViewOnly && (
                <TouchableOpacity onPress={props.takeImageHandler}>
                  <View style={styles.inputContainer}>
                    <AntDesign
                      name="picture"
                      size={24}
                      color={Colors.darkerGrey}
                    />
                    <Text style={styles.imageText}>Cloth Image</Text>
                  </View>
                </TouchableOpacity>
              )}

              {!props.isViewOnly && (
                <View style={styles.button}>
                  <Button
                    title="Add Item"
                    onPress={props.onAddItemClicked}
                    color={Colors.primary}
                  />
                </View>
              )}
            </Card>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={props.setTriggerModal}
          >
            <AntDesign name="closecircleo" size={28} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateInvoiceAddItemsModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: "100%",
    padding: 20,
    margin: 20,
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
  itemTypePicker: {},
});
