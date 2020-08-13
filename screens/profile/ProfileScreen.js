import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";

import CustomerProfileHeader from "../../components/CustomerProfileHeader";
import Card from "../../components/UI/Card";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

import * as userActions from "../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";

const ProfileScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  const loadUser = useCallback(async () => {
    setError(null);
    try {
      await dispatch(userActions.getUserFromDatabase());
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadUser().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadUser]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadUser} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <>
          <CustomerProfileHeader
            imageUri={user.imageUrl}
            nickname={user.name}
            location={user.position}
            phoneNumber={user.phone}
            emailAddress={user.email}
          />
          <Card style={styles.cardContainer}>
            <View style={styles.logoutButton}>
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </View>
          </Card>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },

  titleContainer: {
    flexDirection: "row",
  },
  cardContainer: {
    margin: 10,
    padding: 20,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logoutButton: {
    marginVertical: 20,
    borderRadius: 7,
    overflow: "hidden",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
