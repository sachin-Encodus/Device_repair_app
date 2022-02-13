import { StatusBar } from "expo-status-bar";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { TouchableOpacity, Button, TextInput, ScrollView } from "react-native";
import { StyleSheet, Text, View, Linking } from "react-native";
import { Image, Avatar } from "react-native-elements";
import { SocialIcon } from "react-native-elements";
import {
  Entypo,
  FontAwesome,
  AntDesign,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { Alert } from "react-native";
import { signout } from "../helpers/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation, route }) => {
  const { Fname, Email, Url } = route.params;
  console.log(Fname, Email, Url);
  const defaultUri =
    "https://cdn.dribbble.com/users/1786866/screenshots/13992097/media/c461eeae4d4b523c9d3bab7c66264916.png";

  const signOutUser = async () => {
    await AsyncStorage.removeItem("UserData");
    navigation.replace("Google");
  };

  return (
    <ScrollView style={{ backgroundColor: "#000" }}>
      <View style={styles.header}>
        {/* <View>
   <TouchableOpacity     onPress={() => navigation.navigate('Profile')} style={{marginLeft:30, marginTop:10}} >
  <FontAwesome name="user-circle-o" size={80} color="black" />
  </TouchableOpacity>
</View> */}

        <View style={{ flexDirection: "row", marginHorizontal: 30 }}>
          <TouchableOpacity style={{ justifyContent: "center" }}>
            <Avatar
              size="large"
              rounded
              source={{
                uri: route.params.Url === undefined ? defaultUri : Url,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 20, marginHorizontal: 30, color: "#fff" }}>
              {Fname}
            </Text>
            <Text style={{ fontSize: 15, marginHorizontal: 30, color: "#fff" }}>
              {Email}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <StatusBar animated={true} backgroundColor="#000" style="light" />
        {/* <View style={{flex:1 , marginTop:30, }}  >
  <Image  source={require('../assets/1b98aadae5912ce9f9a7eee5abd82c01.png')}
style={{width:420, marginBottom:10,  height:350, }}
        />
       
      </View> */}
        <View
          style={{
            marginHorizontal: 40,
            marginTop: 40,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => navigation.navigate("Home")}
          >
            {/* <Entypo  style={{marginTop:5 , marginRight:10}} name="home"   size={24} color="black" /> */}
            <Text style={{ fontSize: 20, color: "#fff", marginBottom: 10 }}>
              {" "}
              Home{" "}
            </Text>
          </TouchableOpacity>
          <View style={styles.devider} />
          <TouchableOpacity
            onPress={() => navigation.navigate("About")}
            style={{ flexDirection: "row" }}
          >
            {/* <AntDesign  style={{marginTop:5 , marginRight:10}} name="trademark" size={24} color="black" /> */}
            <Text style={{ fontSize: 20, color: "#fff", marginBottom: 10 }}>
              {" "}
              About{" "}
            </Text>
          </TouchableOpacity>
          <View style={styles.devider} />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://wa.me/qr/GVTGJWV6SXYUH1");
            }}
            style={{ flexDirection: "row" }}
          >
            {/* <MaterialIcons  style={{marginTop:5 , marginRight:10}} name="connect-without-contact" size={24} color="black" /> */}
            <Text style={{ fontSize: 20, color: "#fff", marginBottom: 10 }}>
              {" "}
              Contact us{" "}
            </Text>
          </TouchableOpacity>
          <View style={styles.devider} />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("whatsapp://send?text=Hello&phone=+919522540020");
            }}
            style={{ flexDirection: "row" }}
          >
            {/* <Entypo  style={{marginTop:5 , marginRight:10}} name="heart" size={24} color="black" /> */}
            <Text style={{ fontSize: 20, color: "#fff", marginBottom: 10 }}>
              {" "}
              WhatsApp us{" "}
            </Text>
          </TouchableOpacity>
          <View style={styles.devider} />
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => signOutUser()}
          >
            {/* <AntDesign  style={{marginTop:5 , marginRight:10}} name="logout" size={24} color="black" /> */}
            <Text style={{ fontSize: 20, color: "#fff", marginBottom: 10 }}>
              {" "}
              Logout{" "}
            </Text>
          </TouchableOpacity>
          <View style={styles.devider} />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginBottom: 20,
            marginTop: 100,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity>
            <SocialIcon type="twitter" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SocialIcon title="Sign In With Facebook" type="facebook" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SocialIcon light type="medium" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://www.instagram.com/realbackindia?r=nametag"
              );
            }}
          >
            <SocialIcon light type="instagram" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 15,
              paddingLeft: 50,
              paddingRight: 50,
              textAlign: "center",
              backgroundColor: "#000",
              color: "#b3b3b3",
            }}
          >
            Powerd by Realback
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  devider: {
    borderBottomColor: "rgb(82, 82, 82)",
    borderBottomWidth: 0.5,
    marginBottom: 30,
  },
  header: {
    height: 150,
    backgroundColor: "#000",
    flexDirection: "row",
    marginTop: 40,
  },
  title1: {
    fontSize: 32,
    marginLeft: 20,
    marginTop: 5,
    textAlign: "center",
    alignItems: "center",
  },
  main: {
    position: "relative",
    top: 100,
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ffc107",
    padding: 15,
    fontSize: 20,
    borderRadius: 30,
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,

    justifyContent: "center",
  },

  input: {
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 50,
    fontSize: 20,
    paddingLeft: 30,
    width: 350,
  },
});

// 150791395139-2qr4v4hvaf5njhves3aoe94f1tr11jhu.apps.googleusercontent.com
