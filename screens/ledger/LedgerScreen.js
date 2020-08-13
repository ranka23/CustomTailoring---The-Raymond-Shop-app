import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Header from "../../components/UI/Header";
import LedgerItem from "../../components/LedgerItem";

import * as customerActions from "../../store/actions/customer";
import * as authActions from "../../store/actions/auth";
import Colors from "../../constants/Colors";

const LedgerScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const customers = useSelector((state) => state.customer.customers);
  const dispatch = useDispatch();

  const loadCustomers = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(customerActions.getCustomersAndInvoicesFromDatabase());
      
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true)
    loadCustomers().then(() => {
      setIsLoading(false)
    })
  }, [dispatch, loadCustomers])

  useEffect(() => {
    const reloadScreen = navigation.addListener("focus", () => {
      loadCustomers();
    });
    return reloadScreen;
  }, [navigation]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadCustomers}
          color={Colors.primary}
        />
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
    <FlatList
      onRefresh={loadCustomers}
      refreshing={isRefreshing}
      data={customers}
      ListHeaderComponent={() => <Header title="Customer Ledger" />}
      ListFooterComponent={() => <View style={{ paddingBottom: 5 }} />}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <LedgerItem
          customerName={itemData.item.name}
          customerNickname={itemData.item.nickname}
          orderStatus={itemData.item.orderStatus}
          deliveryDate={itemData.item.deliveryDate}
          customerImageUri={itemData.item.imageUri}
          // updateStatus={}
          viewDetails={() =>
            navigation.navigate("CustomerProfile", {
              id: itemData.item.id,
              name: itemData.item.name,
              nickname: itemData.item.nickname,
              location: itemData.item.location,
              phoneNumber: itemData.item.phone,
              emailAddress: itemData.item.email,
              deliveryDate: itemData.item.deliveryDate,
              imageUri: itemData.item.imageUri,
              invoices: itemData.item.invoices,
              totalInvoices: itemData.item.totalInvoices,
            })
          }
        />
      )}
    />
  );
};

export default LedgerScreen;

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
