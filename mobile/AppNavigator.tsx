import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import Wagers from "./screens/Wagers";
import NewWager from "./screens/NewWager";
import { RouteProp } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import WagerDetail from "./screens/WagerDetail";
import { Wager } from "./types";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
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
      <Stack.Screen
        name="WagerDetail"
        component={WagerDetail}
        options={{ title: "Wager Detail" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export type RootStackParamList = {
  Wagers: undefined;
  NewWager: undefined;
  WagerDetail: {
    wager: Wager;
  };
  Login: undefined;
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

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, "Login">;

export type WagerDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "WagerDetail"
>;
export type WagerDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "WagerDetail"
>;

export default AppNavigator;
