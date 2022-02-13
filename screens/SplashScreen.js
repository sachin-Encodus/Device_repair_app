import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { isAuth, signout } from "../helpers/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
export default function SplashScreen({ navigation }) {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("UserData");
      const data = JSON.parse(value);
      if (value !== null) {
        console.log("===================", data.email);

        navigation.replace("Home", {
          screen: "Home",
          params: {
            name: data.name,
            email: data.email,
          },
        });
      } else {
        navigation.replace("Google");
      }
    } catch (e) {
      console.log("no data");
    }
  };
  // if(isAuth()){

  // setTimeout(function(){
  //     navigation.navigate('Login')
  // }, 3000);
  // }else{
  // setTimeout(function(){
  //               navigation.navigate('Login')
  //           }, 3000);
  // }

  return (
    // <ImageBackground
    //   source={images.splash}
    //   style={{ width: "100%", height: "100%" }}
    // >
    //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //     <Image
    //       source={{
    //         uri: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Choice_toxicity_icon.png",
    //       }}
    //       style={{ width: 100, height: 100 }}
    //     />
    //     <Text>Helloo wrold</Text>
    //   </View>
    // </ImageBackground>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#000",
      }}
    >
      <StatusBar animated={true} background="#000" style="light" />
      <TouchableOpacity>
        <Text style={{ fontSize: 70, color: "#fff" }}>Realback</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  centerContentStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
