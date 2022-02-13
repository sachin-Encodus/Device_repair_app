/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";

import { SignUp } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Tabs from "./navigation/tabs";
import SplashScreen from "./screens/SplashScreen";
import OrderDetails from "./screens/OrderDetails";
import OrderSummary from "./screens/OrderSummary";
import Device from "./screens/Device";
import Serivce from "./screens/ServiceType";
import Payment from "./screens/Payment";
import Razorpay from "./screens/Razorpay";
import ProfileScreen from "./screens/ProfileScreen";

import Google from "./screens/Google";
import SignIn from "./screens/SignIn";
import Resetpassword from "./screens/Resetpassword";
import Skeleton from "./screens/Skeleton";
import About from "./screens/About";
import Pricedetails from "./screens/Pricedetails";
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);
const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Splash"}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Skeleton" component={Skeleton} />
        {/* Tabs */}
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Device" component={Device} />
        <Stack.Screen name="Order" component={OrderDetails} />
        <Stack.Screen name="Summary" component={OrderSummary} />
        <Stack.Screen name="Service" component={Serivce} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Razorpay" component={Razorpay} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Reset" component={Resetpassword} />
        <Stack.Screen name="Price" component={Pricedetails} />
        <Stack.Screen name="Google" component={Google} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Home" component={Tabs} />

        {/* <Stack.Screen name="Scan" component={Scan} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
