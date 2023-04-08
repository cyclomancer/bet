import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Offer } from "./Offer"; // Import the Offer type
import {
  OfferDetailScreenNavigationProp,
  OfferDetailScreenRouteProp,
} from "../AppNavigator";

type OfferDetailProps = {
  navigation: WagerDetailScreenNavigationProp;
  route: WagerDetailScreenRouteProp;
};

const OfferDetail: React.FC<OfferDetailProps> = ({ navigation, route }) => {
  const { offer } = route.params;
  const [betAmount, setBetAmount] = useState(0);

  const handleAccept = () => {
    //onAccept(offer, betAmount);
  };

  const handleDecline = () => {
    //onDecline(offer);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offer Details</Text>
      <Text style={styles.label}>Race: {offer.race}</Text>
      {/* Add more details about the offer as necessary */}

      <Text style={styles.label}>Enter Bet Amount:</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        onChangeText={(text) => setBetAmount(Number(text))}
      />

      <TouchableOpacity style={styles.button} onPress={handleAccept}>
        <Text style={styles.buttonText}>Accept Offer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDecline}>
        <Text style={styles.buttonText}>Decline Offer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6f42c1",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default OfferDetail;
