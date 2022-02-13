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
  Platform,
  ToastAndroid,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
// import * as Expo from 'expo'
import { StatusBar } from "expo-status-bar";

import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import * as Google from "expo-google-app-auth";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

import { authenticate } from "./../helpers/auth";
export default Login = ({ navigation }) => {
  //  const [token, setToken] = useState("")
  //   const [name, setName] = useState("sachin")
  //   const [photoUrl, setPhotoUrl] = useState("")
  const [signedIn, setSignedIn] = useState(false);
  //   const [email, setEmail] = useState("sachin1245e@gmail.com")
  //   constructor(props) {
  //     super(props)
  //     this.state = {
  //       signedIn: false,
  //       name: "",
  //       photoUrl: "",
  //       token:""
  //     }
  //   }

  const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "150791395139-2qr4v4hvaf5njhves3aoe94f1tr11jhu.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        setSignedIn(true);
        console.log("======>>>>>", result);
        // setName( result.user.name)
        // setToken(result.accessToken)
        // setPhotoUrl( result.user.photoUrl)

        // setEmail(result.user.email)

        try {
          const res = await axios.post(
            "http://realback4c.herokuapp.com/api/googlelogin",
            {
              email: result.user.email,
            }
          );
          authenticate(res);
          ToastAndroid.show("Success", ToastAndroid.SHORT);
          console.log("===>>>>>>>>", result.user.photoUrl);
          navigation.replace("Home", {
            screen: "Home",
            params: {
              name: result.user.name,
              email: result.user.email,
              pUrl: result.user.photoUrl,
            },
          });
        } catch (error) {
          ToastAndroid.show(error.response.data.errors, ToastAndroid.SHORT);
          navigation.navigate("SignUp", {
            name: result.user.name,
            email: result.user.email,
            photoUrl: result.user.photoUrl,
          });
        }
      } else {
        ToastAndroid.show("canceled", ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  // if(signedIn === true){
  //     console.log(signedIn);
  //     navigation.navigate("Home", {
  //               name:name,
  //               photourl:photoUrl,
  //               token:token
  //           })
  // }else{
  //      console.log(signedIn);

  // }
  const android = () => {
    ToastAndroid.show("Success", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <StatusBar animated={true} style="dark" />
      <View style={{ flex: 3, justifyContent: "flex-start" }}>
        <TouchableOpacity>
          <View
            style={{
              justifyContent: "center",

              alignItems: "center",
            }}
          >
            <Image source={images.career} resizeMode="center" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: 30, flex: 1 }}>
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>Welcome </Text>
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>to Realback</Text>
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>
          Services login to use
        </Text>
      </View>

      <View
        style={{ marginHorizontal: 30, flex: 1, justifyContent: "flex-end" }}
      >
        {/* <TouchableOpacity
                    style={[styles.shadow2,{
                        height: 60,
                        backgroundColor:'#000',
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom:20
                    }]}
                    onPress={() => android()}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Sign</Text>
                </TouchableOpacity>   */}
        <TouchableOpacity
          style={[
            styles.shadow2,
            {
              height: 60,
              backgroundColor: "#000",
              borderRadius: SIZES.radius / 1.5,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            },
          ]}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.shadow2,
            {
              height: 60,
              backgroundColor: "#000",
              borderRadius: SIZES.radius / 1.5,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            },
          ]}
          onPress={() => {
            signIn();
          }}
        >
          {signedIn ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <AntDesign name="google" size={30} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const LoggedInPage = props => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Welcome:{props.name}</Text>
//        <Text style={styles.header}>Welcome:{props.token}</Text>
//       <Image style={styles.image} source={{ uri: props.photoUrl }} />
//     </View>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 25,
  },
  image: {
    marginTop: 15,
    width: 100,
    height: 100,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150,
  },
  shadow2: {
    shadowColor: "#000",
    shadowOffset: {
      width: 110,
      height: 220,
    },
    shadowOpacity: 10.58,
    shadowRadius: 16.0,
    elevation: 20,
  },
  stretch: {
    width: 300,
    height: 300,
  },
});
