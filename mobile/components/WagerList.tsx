import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Wager } from "../types";

const WagerList = ({ wagers }: { wagers: Wager[] }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>
        {item.who}: {item.race}
      </Text>
      <Text>When: {new Date(item.when * 1000).toLocaleString()}</Text>
      <Text>
        Side: {item.toss ? (item.toss.side ? "For" : "Against") : "N/A"}
      </Text>
      <Text>Max: {item.toss ? item.toss.max : "N/A"}</Text>
      <Text>
        Odds: {item.heat ? `${item.heat.favor} : ${item.heat.against}` : "N/A"}
      </Text>
      <Text>
        Result: {item.game ? (item.game.won ? "Won" : "Lost") : "Not Decided"}
      </Text>
      <Text>Foul: {item.game ? (item.game.foul ? "Yes" : "No") : "N/A"}</Text>
      <Text>
        Payment:{" "}
        {item.game && item.game.tab
          ? `${new Date(item.game.tab.when * 1000).toLocaleString()} | ${
              item.game.tab.rail
            }`
          : "N/A"}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={wagers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WagerList;
