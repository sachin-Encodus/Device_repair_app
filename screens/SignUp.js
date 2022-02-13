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

const SignUp = ({ navigation, route }) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState(route.params.name);
  const [photoUrl, setPhotoUrl] = useState(route.params.photoUrl);
  const [signedIn, setSignedIn] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState(route.params.email);
  const [mobile, setMobile] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [areas, setAreas] = React.useState([]);
  const [selectedArea, setSelectedArea] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [textChange, setTextchange] = React.useState("Sign Up");

  // console.log("===>>>>>>>bbbbbbbbbbb", email , password, mobile, name);
  React.useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => response.json())
      .then((data) => {
        let areaData = data.map((item) => {
          return {
            code: item.alpha2Code,
            name: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`,
          };
        });

        setAreas(areaData);
        console.log(areas);
        if (areaData.length > 0) {
          let defaultData = areaData.filter((a) => a.code == "IN");

          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
            console.log(selectedArea);
          }
        }
      });
  }, []);

  const SignUp = async () => {
    if (email && name && password && mobile) {
      setTextchange("Submitting");
      try {
        const res = await axios.post(
          "http://realback4c.herokuapp.com/api/googlesignUp",
          {
            name,
            email,
            password,
            mobile,
          }
        );
        authenticate(res);
        setTextchange("Signed In");

        console.log("===>>>>>>>>", res.data);
        navigation.navigate("Home", {
          screen: "Home",
          params: {
            name: route.params.name,
            email: route.params.email,
            pUrl: route.params.photoUrl,
          },
        });
      } catch (error) {
        setTextchange("Sign In");
        ToastAndroid.show(error.response.data.errors, ToastAndroid.SHORT);
        console.log(error);
      }
    } else {
      ToastAndroid.show("please fill all the fields", ToastAndroid.SHORT);
    }
  };

  const saveData = async () => {
    // console.log(process.env.REACT_APP_API_URL);

    if (email && password && mobile && name) {
      setTextchange("Submitting");
      try {
        //  const requestOptions = {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //               mobile:mobile,
        //               name:name,
        //               email:email,
        //               password:password
        //              })
        //     };
        //     fetch('http://aafa12f24d27.ngrok.io/api/googlelogin', requestOptions)
        //         .then(response => response.json())
        //         .then(data => console.log("========>>>>>>>",data));

        const res = await axios.post(
          " http://c6c62ce1330a.ngrok.io/api/googlelogin",
          {
            mobile,
            name,
            email,
            password: password,
          }
        );

        //     //   authenticate(res, () => {
        setTextchange("Signed In");

        console.log("===>>>>>>>>", res);
        // toast.success(`Hey ${res.data.token}, Welcome back!`);
        // console.log("xxxxxxxxxxxxxxx",res.data.myname);
        navigation.navigate("Home");
        //  isAuth() ?  navigation.navigate('Home' ,{name:res.data.myname}) : null
        //   })
      } catch (error) {
        setTextchange("Sign In");
        console.log(error);
      }
    } else {
      console.log(" all blocks");
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
          Create new account
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
          please fill in tha form to continue
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
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Email
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Full name"
            autoFocus
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={COLORS.black}
            selectionColor={COLORS.white}
          />
        </View>

        <View style={{ marginTop: SIZES.padding * 2 }}>
          <TextInput
            style={styles.input}
            placeholder="email"
            autoFocus
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={COLORS.black}
            selectionColor={COLORS.white}
          />
        </View>

        {/* Phone mobile */}
        <View>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Phone mobile
          </Text>

          <View style={{ flexDirection: "row" }}>
            {/* Country Code */}
            <TouchableOpacity
              style={[
                styles.input,
                {
                  marginRight: 5,

                  flexDirection: "row",
                  ...FONTS.body2,
                },
              ]}
              onPress={() => setModalVisible(true)}
            >
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={icons.down}
                  style={{
                    width: 10,
                    height: 10,
                    tintColor: COLORS.black,
                  }}
                />
              </View>
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Image
                  source={{ uri: selectedArea?.flag }}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>

              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Text style={{ color: COLORS.black, ...FONTS.body3 }}>
                  {selectedArea?.callingCode}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Phone mobile */}
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="mobile"
              autoFocus
              value={mobile}
              onChangeText={(text) => setMobile(text)}
              placeholderTextColor={COLORS.black}
              selectionColor={COLORS.black}
              keyboardType="phone-pad"
            />
          </View>
        </View>

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
        {/* <TouchableOpacity
                    style={[styles.shadow2,{
                        height: 60,
                        backgroundColor: '#000',
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom:20
                    }]} 
                    onPress={() => navigation.navigate('SignIn')}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{textChange}</Text>
                </TouchableOpacity> */}

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
      </View>
    );
  }

  function renderAreaCodesModal() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ padding: SIZES.padding, flexDirection: "row" }}
          onPress={() => {
            setSelectedArea(item);
            setModalVisible(false);
          }}
        >
          <Image
            source={{ uri: item.flag }}
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
            }}
          />
          <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                height: 400,
                width: SIZES.width * 0.8,
                backgroundColor: COLORS.lightGreen,
                borderRadius: SIZES.radius,
              }}
            >
              <FlatList
                data={areas}
                renderItem={renderItem}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={false}
                style={{
                  padding: SIZES.padding * 2,
                  marginBottom: SIZES.padding * 2,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
      {renderAreaCodesModal()}
    </KeyboardAvoidingView>
  );
};

export default SignUp;
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
