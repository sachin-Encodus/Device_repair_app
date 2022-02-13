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
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({ navigation, route }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [emails, setEmails] = React.useState(
    route.params === undefined ? "" : route.params.email
  );
  console.log(
    "=================>>>>>>>>>>>>>>>",
    route.params === undefined ? "" : route.params.email
  );
  const [password, setPassword] = React.useState("");

  const [textChange, setTextchange] = React.useState("Sign In");

  const SignUp = async () => {
    if (emails && password) {
      setTextchange("Submitting");
      try {
        const res = await axios.post(
          "http://realback4c.herokuapp.com/api/signin",
          {
            email: emails,
            password: password,
          }
        );
        const jsonValue = JSON.stringify(res.data.useremail);
        await AsyncStorage.setItem("UserData", jsonValue);
        setTextchange("Signed In");

        const { email, name } = res.data.useremail;
        console.log("===>>>>>>>>xxx", res.data.useremail);

        navigation.navigate("Home", {
          screen: "Home",
          params: {
            name: name,
            email: email,
            pUrl: res.data.photoUrl,
          },
        });
      } catch (error) {
        setTextchange("Sign In");
        ToastAndroid.show(error.response.data.errors, ToastAndroid.SHORT);
        console.log("================>>>>>>>>", error.response.data.errors);
      }
    } else {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
    }
  };

  //   const saveData = async() => {
  //     // console.log(process.env.REACT_APP_API_URL);

  //     if (email && password && mobile && name) {

  //     setTextchange('Submitting');
  // try {

  // //  const requestOptions = {
  // //         method: 'POST',
  // //         headers: { 'Content-Type': 'application/json' },
  // //         body: JSON.stringify({
  // //               mobile:mobile,
  // //               name:name,
  // //               email:email,
  // //               password:password
  // //              })
  // //     };
  // //     fetch('http://aafa12f24d27.ngrok.io/api/googlelogin', requestOptions)
  // //         .then(response => response.json())
  // //         .then(data => console.log("========>>>>>>>",data));

  //      const res  = await axios.post(" http://c6c62ce1330a.ngrok.io/api/googlelogin" , {
  //           mobile,
  //           name,
  //           email,
  //           password:password
  //         })

  //     //     //   authenticate(res, () => {
  //           setTextchange('Signed In')

  //           console.log("===>>>>>>>>",res);
  //             // toast.success(`Hey ${res.data.token}, Welcome back!`);
  //         // console.log("xxxxxxxxxxxxxxx",res.data.myname);
  //         navigation.navigate('Home')
  //     //  isAuth() ?  navigation.navigate('Home' ,{name:res.data.myname}) : null
  //         //   })
  // } catch (error) {

  //           setTextchange('Sign In')
  //           console.log( error);

  // }

  //     } else {
  //       console.log(' all blocks');
  //     }
  //   };

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
          Welcome back!
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
          please sign in to your account
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
        {/* Full Name */}

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
        </View>

        {/* Phone mobile */}

        {/* Password */}
        <View>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Password
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
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
        </View>
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
          onPress={() => SignUp()}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{textChange}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Reset")}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 30,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Forgot Password ?
          </Text>
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

export default SignIn;
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

    backgroundColor: "#f2f2f2",

    color: COLORS.black,
    ...FONTS.body2,
  },
});
