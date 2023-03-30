import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import Wagers from "./screens/Wagers";
import NewWager from "./screens/NewWager";
import { RouteProp } from "@react-navigation/native";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Wagers">
      <Stack.Screen
        name="Wagers"
        component={Wagers}
        options={{ title: "Wagers" }}
      />
      <Stack.Screen
        name="NewWager"
        component={NewWager}
        options={{ title: "New Wager" }}
      />
    </Stack.Navigator>
  );
};

export type RootStackParamList = {
  Wagers: undefined;
  NewWager: undefined;
};

export type WagersScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Wagers"
>;
export type WagersScreenRouteProp = RouteProp<RootStackParamList, "Wagers">;

export type NewWagerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "NewWager"
>;
export type NewWagerScreenRouteProp = RouteProp<RootStackParamList, "NewWager">;

export default AppNavigator;
