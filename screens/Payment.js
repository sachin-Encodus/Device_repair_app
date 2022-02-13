import React from "react";
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
  StyleSheet,
  ToastAndroid,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { authenticate } from "../helpers/auth";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const Payment = ({ navigation, route }) => {
  const { cartItems, totalPrice } = route.params;
  console.log(cartItems, totalPrice, "Dmail", route.params.model);
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState(route.params.email);
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [screen, setScreen] = React.useState(
    "https://media1.popsugar-assets.com/files/thumbor/JhWnT0vhNmv7Ie6CxCThVmAaBGo/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/10/13/960/n/1922507/9b46ae508c936f82_iPhone_12_Pro_Max_iPhone_12_Pro_pacific_blue/i/iPhone-12-Pro-Max.png"
  );
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const [company, setCompany] = React.useState(
    route.params.devicename + " " + route.params.model
  );
  const [message, setMessage] = React.useState("");
  const [adds, setAdds] = React.useState([]);
  const [mode, setMode] = React.useState("COD");
  const [products, setProducts] = React.useState([]);
  const [areas, setAreas] = React.useState([]);
  const [selectedArea, setSelectedArea] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [textChange, setTextchange] = React.useState("Submit");
  console.log("====vvv", company);

  // console.log("===>>>>>>>", email , password);

  React.useEffect(() => {
    let isMounted = true;
    addsdata();
    return () => {
      isMounted = false;
    };
  }, [adds]);

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

        if (areaData.length > 0) {
          let defaultData = areaData.filter((a) => a.code == "IN");

          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      });
  }, [adds]);

  const addsdata = () => {
    axios
      .get(`http://realback4c.herokuapp.com/api/cart/${email}`)
      .then(({ data }) => setAdds(data.user[0]))
      .catch((err) => {
        console.log(err);
      });
    if (adds !== undefined) {
      setAddress(adds.Address);
      setCountry(adds.country);
      setCity(adds.city);
      setName(adds.name);
      setNumber(adds.number);
      setPincode(adds.pincode);
      setState(adds.state);
    }
  };
  console.log("=====>>>>>>>>>>>>>>>>>>addsreess", adds);
  // Function to generate OTP
  function generateOTP() {
    // Declare a digits variable
    // which stores all digits
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  const orderOtp = generateOTP();

  const onSubmits = () => {
    if (
      email &&
      company &&
      number &&
      country &&
      state &&
      city &&
      pincode &&
      Address
    ) {
      setProducts(cartItems);
      console.log("email", email);

      setTextchange("Submitting");
      axios
        .post(`http://realback4c.herokuapp.com/api/device`, {
          email,
          name,
          company,

          message,
          products: cartItems,
          mode,
          orderOtp,

          number,
          totalPrice,
          screen,
          country,
          state,
          city,
          pincode,
          Address,
        })
        .then((res) => {
          setEmail("");

          console.log(res.data);

          ToastAndroid.show(`login succefully`, ToastAndroid.SHORT);
        })
        .catch((err) => {
          setCompany("");
          console.log("====>>>>>>>>>>>>>", err.response.data.errors);
          //    ToastAndroid.show(err.response.data.errors, ToastAndroid.SHORT);
        });
    } else {
      ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
    }
  };

  // curl -u [YOUR_KEY_ID]:[YOUR_KEY_SECRET] \
  // -X POST https://api.razorpay.com/v1/payment_links/ \
  // -H 'Content-type: application/json' \
  // -d '{
  //   "upi_link": "true",
  //   "amount": 100,
  //   "currency": "INR",
  //   "reference_id": "#456",
  //   "description": "Payment for policy no #23456",
  //   "customer": {
  //     "name": "Gaurav Kumar",
  //     "contact": "+919999999999",
  //     "email": "null"
  //   },
  //   "expire_by": "1526282829",
  //   "notify": {
  //     "sms": true
  //   },
  //   "reminder_enable": true,
  //   "notes": {
  //     "policy_name": "Jeevan Bima"
  //   }
  // }

  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 40,
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
          height: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={images.wallieLogo}
          resizeMode="contain"
          style={{
            width: "60%",
          }}
        />
      </View>
    );
  }

  function renderForm() {
    return (
      <View
        style={{
          marginTop: 10,
          marginHorizontal: SIZES.padding * 3,
        }}
      >
        {/* Full Name */}

        {/* <TextInput
                         style={styles.input}
                        placeholder="email"  autoFocus   value={email}  onChangeText={(text) => setEmail(text)}
                        placeholderTextColor={COLORS.black}
                        selectionColor={COLORS.white}
                    /> */}

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor={COLORS.black}
          selectionColor={COLORS.black}
        />

        {/* <TextInput
                         style={styles.input}
                        placeholder="company"  autoFocus   value={company}  onChangeText={(text) => setCompany(text)}
                        placeholderTextColor={COLORS.black}
                        selectionColor={COLORS.white}
                    /> */}

        {/* Phone Number */}
        <View>
          <View style={{ flexDirection: "row" }}>
            {/* Country Code */}
            <TouchableOpacity
              style={[styles.input, { flexDirection: "row", marginRight: 5 }]}
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

            {/* Phone Number */}
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="mobile"
              autoFocus
              value={number}
              onChangeText={(text) => setNumber(text)}
              placeholderTextColor={COLORS.black}
              selectionColor={COLORS.black}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Password */}

        <TextInput
          style={styles.input}
          placeholder="Message"
          autoFocus
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholderTextColor={COLORS.black}
          selectionColor={COLORS.white}
        />

        <TextInput
          style={styles.input}
          placeholder="Address"
          autoFocus
          value={Address}
          onChangeText={(text) => setAddress(text)}
          placeholderTextColor={COLORS.black}
          selectionColor={COLORS.white}
          // secureTextEntry={!showPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="country"
          autoFocus
          value={country}
          onChangeText={(text) => setCountry(text)}
          placeholderTextColor={COLORS.black}
          selectionColor={COLORS.white}
        />

        <TextInput
          style={styles.input}
          placeholder="state"
          autoFocus
          value={state}
          onChangeText={(text) => setState(text)}
          placeholderTextColor={COLORS.black}
          selectionColor={COLORS.white}
        />

        <TextInput
          style={styles.input}
          placeholder="city"
          autoFocus
          value={city}
          onChangeText={(text) => setCity(text)}
          placeholderTextColor={COLORS.black}
          selectionColor={COLORS.white}
        />

        <TextInput
          style={styles.input}
          placeholder="pincode"
          autoFocus
          value={pincode}
          onChangeText={(text) => setPincode(text)}
          placeholderTextColor={COLORS.black}
          selectionColor={COLORS.white}
        />
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{ margin: SIZES.padding * 3 }}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: "#000",
            borderRadius: SIZES.radius / 1.5,
            alignItems: "center",
            justifyContent: "center",
            elevation: 15,
          }}
          onPress={() => {
            onSubmits();

            Linking.openURL("https://rzp.io/i/SHwKqveO");
          }}
          // onPress={() => {
          //   Linking.openURL("https://rzp.io/i/SHwKqveO");
          // }}
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
                colors={[COLORS.lime, COLORS.bl]}
                style={{ flex: 1 }}
            > */}
      <ScrollView>
        {renderHeader()}
        {/* {renderLogo()} */}
        {renderForm()}
        {renderButton()}
      </ScrollView>
      {/* </LinearGradient> */}
      {renderAreaCodesModal()}
    </KeyboardAvoidingView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  input: {
    borderRadius: SIZES.radius / 1.5,
    marginTop: 10,
    padding: 20,
    alignSelf: "stretch",

    backgroundColor: "#f2f2f2",

    color: COLORS.black,
    ...FONTS.body2,
  },
});

// //React Native TextInput
// //https://aboutreact.com/react-native-textinput/

// //import React in our code
// import React, {useState} from 'react';

// //import all the components we are going to use
// import { StyleSheet, View, Text, SafeAreaView, TextInput ,ScrollView} from 'react-native';

// const Payment = () => {
//   const [userName, setUserName] = useState('');
//   return (

//       <View style={styles.container}>

//         <View style={{backgroundColor:'red' , marginTop:10}}  >
//            <Text style={{textAlign:'center' , color:'black'}} >Insert any text in below input</Text>
//       <ScrollView>

//         <TextInput
//           value={userName}
//           onChangeText={(userName) => setUserName(userName)}
//           placeholder={'UserName'}
//           style={styles.input}
//         />
//         <TextInput
//           value={userName}
//           onChangeText={(userName) => setUserName(userName)}
//           placeholder={'UserName'}
//           style={styles.input}
//         />
//         <TextInput
//           value={userName}
//           onChangeText={(userName) => setUserName(userName)}
//           placeholder={'UserName'}
//           style={styles.input}
//         />
//         <TextInput
//           value={userName}
//           onChangeText={(userName) => setUserName(userName)}
//           placeholder={'UserName'}
//           style={styles.input}
//         />
//         <TextInput
//           value={userName}
//           onChangeText={(userName) => setUserName(userName)}
//           placeholder={'UserName'}
//           style={styles.input}
//         />
//         <TextInput
//           value={userName}
//           onChangeText={(userName) => setUserName(userName)}
//           placeholder={'UserName'}
//           style={styles.input}
//         />
//         <TextInput
//           value={userName}
//           onChangeText={(userName) => setUserName(userName)}
//           placeholder={'UserName'}
//           style={styles.input}
//         />

//         <Text style={{textAlign:'center' , color:'black'}}>{userName}</Text>
//         </ScrollView>
//         </View>
//       </View>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     marginTop: 20,
//     backgroundColor: '#ffffff',
//   },
//   input: {
//     borderRadius:10,
//         paddingHorizontal:20,
//         marginVertical:6,
//         alignSelf:"stretch",
//         fontFamily:"OpenSans",
//         marginHorizontal:20,
//         backgroundColor:"#f2f2f2",
//         height:50,
//   },
// });

// export default Payment;
