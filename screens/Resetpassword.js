import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform,
  ToastAndroid,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { authenticate } from "../helpers/auth";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const Resetpassword = ({ navigation, route }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [emails, setEmails] = React.useState("");
  const [reset, setReset] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [cpassword, setCpassword] = React.useState("");
  const [textChange, setTextchange] = React.useState("Select email");

  const SignIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "150791395139-2qr4v4hvaf5njhves3aoe94f1tr11jhu.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log("======>>>>>", result);
        // setName( result.user.name)
        // setToken(result.accessToken)
        // setPhotoUrl( result.user.photoUrl)

        setEmails(result.user.email);
        //   setSignedIn(true)
        setTextchange("Reset");
        setReset(true);
      } else {
        ToastAndroid.show("canceled", ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const Submit = () => {
    console.log("====================>>>>>>");

    if (password && cpassword) {
      if (password === cpassword) {
        setTextchange("Resetting");
        axios
          .put("http://realback4c.herokuapp.com/api/resetpass", {
            newPassword: password,
            email: emails,
            // resetPasswordLink: token
          })
          .then((res) => {
            ToastAndroid.show(
              res.data.user.email + "your password has been changed",
              ToastAndroid.SHORT
            );
            navigation.navigate("SignIn", {
              screen: "SignIn",
              params: {
                email: res.data.user.email,
              },
              email: res.data.user.email,
            });
          })
          .catch((err) => {
            ToastAndroid.show(
              "Something is wrong try again",
              ToastAndroid.SHORT
            );
          });
      } else {
        ToastAndroid.show("Passwords don't matches", ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("enter your password", ToastAndroid.SHORT);
    }
  };

  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: SIZES.padding * 6,
          paddingHorizontal: SIZES.padding * 3,
        }}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back-ios" size={30} color="black" />
        <Text
          style={{
            marginLeft: SIZES.padding * 1.5,
            color: COLORS.black,
            ...FONTS.h4,
          }}
        ></Text>
      </TouchableOpacity>
    );
  }

  function renderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 5,

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
          Forgot password!
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
          please select an Email to reset password
        </Text>

        {/* <Image
                    source={images.wallieLogo}
                    resizeMode="contain"
                    style={{
                        width: "60%"
                    }}
                /> */}
      </View>
    );
  }

  function renderForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 3,
          marginHorizontal: SIZES.padding * 3,
        }}
      >
        {reset === true ? (
          <View style={{ marginTop: SIZES.padding * 2 }}>
            <TextInput
              style={styles.input}
              placeholder="email"
              autoFocus
              value={emails}
              onChangeText={(text) => setEmails(text)}
              placeholderTextColor={COLORS.black}
              selectionColor={COLORS.white}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoFocus
              maxLength={10}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={COLORS.black}
              selectionColor={COLORS.black}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 0,
                bottom: 10,
                height: 30,
                width: 30,
              }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                source={showPassword ? icons.disable_eye : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.black,
                }}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              autoFocus
              maxLength={10}
              value={cpassword}
              onChangeText={(text) => setCpassword(text)}
              placeholderTextColor={COLORS.black}
              selectionColor={COLORS.black}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              style={{
                position: "absolute",
                right: 5,
                bottom: 10,
                height: 40,
                width: 30,
              }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                source={showPassword ? icons.disable_eye : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.black,
                }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <Text
            style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}
          >
            Don't worry your will be change in just two Simple Steps
          </Text>
        )}
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{ margin: SIZES.padding * 3, marginTop: 60 }}>
        <TouchableOpacity
          style={[
            styles.shadow2,
            {
              height: 60,
              backgroundColor: "#000",
              borderRadius: SIZES.radius / 1.5,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
          onPress={() => {
            reset ? Submit() : SignIn();
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{textChange}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      {/* <LinearGradient
                colors={[COLORS.lightpurple, COLORS.black]}
                style={{ flex: 1 }}
            > */}
      <ScrollView>
        {renderHeader()}
        {renderLogo()}
        {renderForm()}
        {renderButton()}
      </ScrollView>
      {/* </LinearGradient> */}
    </KeyboardAvoidingView>
  );
};

export default Resetpassword;
const styles = StyleSheet.create({
  shadow2: {
    elevation: 15,
  },
  stretch: {
    width: 300,
    height: 300,
  },
  input: {
    borderRadius: SIZES.radius / 1.5,

    padding: 20,
    alignSelf: "stretch",

    marginBottom: 10,
    backgroundColor: "#f2f2f2",

    color: COLORS.black,
    ...FONTS.body2,
  },
});
