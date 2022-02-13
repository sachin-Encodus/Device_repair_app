import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { LinearProgress } from "react-native-elements";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { ScrollView, ActivityIndicator } from "react-native";
// const Item = ({ company, model , price , name}) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{company}</Text>
//      <Text style={styles.title}>{model}</Text>
//       <Text style={styles.title}>${price}</Text>
//        <Text style={styles.title}>:{name}</Text>
//   </View>
// );

const Pricedetails = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [devicename, setDevicename] = useState("");

  const [company, setCompany] = useState([]);
  const [modelno, setModelno] = useState([]);
  const [devicedata, setDevicedata] = useState([]);
  const Dtype = "mobile";
  useEffect(() => {
    // getcompany();

    async function fetchdata() {
      setLoading(true);
      const res = await axios.get(
        `https://559bea0779f1.ngrok.io/api/getCompany/${Dtype}`
      );

      console.log(res.data.device);
      setCompany(res.data.device);
      setLoading(false);
    }
    fetchdata();
  }, []);

  const getcompany = async () => {
    try {
      const res = await axios.get(
        `https://9c8c02ef1e6c.ngrok.io/api/getCompany/${Dtype}`
      );

      console.log(res.data.device);
      setCompany(res.data.device);
    } catch (error) {}
  };

  const getmodel = async (itemValue) => {
    try {
      const res = await axios.get(
        `https://559bea0779f1.ngrok.io/api/getmodel/${itemValue}`
      );
      console.log(itemValue);
      // console.log("====>>>>>>>>>>>", res.data.device.model);
      console.log("====>>>>>>>>>>>devicename", res.data.device.deviceName);
      setModelno(res.data.device.model);
      setDevicename(res.data.device.deviceName);
    } catch (error) {
      console.log(error);
    }
  };

  const getservice = async (itemValue) => {
    try {
      const filteredData = modelno.filter((item) => item._id === itemValue);
      setDevicedata(filteredData);
      console.log("============>>>>>>>>>>", filteredData[0].modedata);
      console.log("============>>>>>>>>>>xxxxxxxxxxx", filteredData[0].modelno);
    } catch (error) {}

    // try {
    //   console.log(">>>>>>>>>>", itemValue);
    //   const res = await axios.get(
    //     `https://da442eef6d97.ngrok.io/api/getmodedata/${itemValue}`
    //   );
    //   console.log(itemValue);
    //   // console.log("====>>>>>>>>>>>aaaaaaaa", res.data.device.modedata);
    //   console.log("====>>>>>>>>>>>xxxxxx", res.data.device.model.modedata);
    //   setDevicedata(res.data.device.modedata);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const [brand, setBrand] = React.useState("Selcet company");
  const [model, setModel] = React.useState("select model");
  const pickerRef = React.useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  const { ID, image, dname, desc, orderdata, email } = route.params;

  console.log(ID, image, dname, email, desc);
  // const [userdata, setUserdata] = useState([])
  // const [email, setEmail] = useState('noreply@gmail.com')
  //  const [loading, setLoading] = useState(false);

  // const cartdata = () =>{
  //   setLoading(true)
  //   axios.get(`http://realback4c.herokuapp.com/api/cart/${email}`,)
  //   .then(({data})=> setUserdata(data.user))
  //   .catch(err =>{

  // console.log(err);

  //   })
  // setLoading(false)
  //  }

  // useEffect(() => {

  //    setEmail('sachin1245e@gmail.com')
  //    setLoading(true)
  //    cartdata()

  // }, [email])

  // const renderItem = ({item}) => {
  //       let items = [];
  //       if( item.newRow) {
  //         items = item.newRow.map(row => {
  //           return <Text>hello {row.text}</Text>
  //         })
  //       }
  console.log("=========", devicedata);
  const renderItem = () => {
    return (
      <View key={ID}>
        {loading ? <ActivityIndicator size="large" color="#000" /> : null}

        <TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              padding: 20,
              marginTop: 10,
              marginHorizontal: 16,
              alignItems: "center",
            }}
          >
            <Image source={image} resizeMode="center" style={styles.stretch} />
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: 30,
            backgroundColor: "#fff",
            borderRadius: 30,
          }}
        >
          <Text style={styles.title}>{dname}</Text>

          {/* <Text style={styles.title1}>
                        {Msg}
                    </Text> */}

          {/* <View style={styles.devider} /> */}
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.title}>Get your device</Text>
            <Text style={styles.title}>Service</Text>
            {/* <View>{Service}</View> */}
          </View>
          {/* <Text style={styles.title1}>
            {desc}
            <Entypo name="location-pin" size={24} color="black" />
          </Text> */}

          {/* <View style={styles.devider} /> */}
        </View>
        <View
          style={{
            backgroundColor: "#efefef",
            marginHorizontal: 30,
            marginTop: 6,
            //   width:widthPercentageToDP(90),
            borderRadius: 15,
            alignSelf: "stretch",
          }}
        >
          <Picker
            style={{
              padding: 30,
              marginHorizontal: 10,
              backgroundColor: "#efefef",
            }}
            ref={pickerRef}
            selectedValue={brand}
            onValueChange={(itemValue, itemIndex) => getmodel(itemValue)}
          >
            <Picker.Item label={brand} value="1" />

            {company.map((item) => (
              <Picker.Item
                key={item._id}
                label={item.deviceName}
                value={item._id}
              />
            ))}
          </Picker>
        </View>
        <View
          style={{
            backgroundColor: "#efefef",
            marginHorizontal: 30,
            marginTop: 6,
            //   width:widthPercentageToDP(90),
            borderRadius: 15,
            alignSelf: "stretch",
          }}
        >
          <Picker
            style={{
              padding: 30,
              marginHorizontal: 10,
              backgroundColor: "#efefef",
            }}
            ref={pickerRef}
            selectedValue={model}
            onValueChange={(itemValue, itemIndex) => getservice(itemValue)}
          >
            <Picker.Item label={model} value="1" />
            {modelno.map((item) => (
              <Picker.Item
                key={item._id}
                label={item.modelno}
                value={item._id}
              />
            ))}
          </Picker>
        </View>

        <View style={{ margin: SIZES.padding * 3 }}>
          <TouchableOpacity
            disabled={devicedata.length === 0 ? true : false}
            style={{
              height: 60,
              backgroundColor: "#000",
              borderRadius: SIZES.radius / 1.5,
              alignItems: "center",
              justifyContent: "center",
              elevation: 15,
            }}
            onPress={() =>
              navigation.navigate("Service", {
                sdata: devicedata,
                email: email,
                devicename: devicename,
              })
            }
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>pay now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  function renderHeader() {
    return (
      <View style={{ paddingHorizontal: SIZES.padding, marginTop: 40 }}>
        {/* {loading === true ? <LinearProgress color="primary" /> : null} */}
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity onPress={() => navigation.navigate("Order")}>
              <Image
                source={icons.cart}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  // <Item company={item.company}
  // price={item.totalPrice}
  // model={item.model}
  // name={item.products.name}
  // />

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar style="light" /> */}
      {renderHeader()}
      <ScrollView>{renderItem()}</ScrollView>
    </SafeAreaView>
  );
};

export default Pricedetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#000",
    padding: 20,
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 25,
    elevation: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    lineHeight: 60,
  },
  title1: {
    fontSize: 18,
    marginVertical: 4,
  },
  devider: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    marginVertical: 8,
  },
  stretch: {
    width: 300,
    height: 300,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0070f3",
    padding: 15,

    borderRadius: 10,
    marginBottom: 10,
    elevation: 6,
  },
});

// import * as React from 'react';
// import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
// import Constants from 'expo-constants';

// // You can import from local files
// import AssetExample from './components/AssetExample';

// // or any pure javascript modules available in npm
// import { Card } from 'react-native-paper';

// const App = () => {
//   const {width} = Dimensions.get('window');
//   return (
//     <ScrollView
//       horizontal
//       pagingEnabled
//       style={{ flex: 1 }}
//       contentContainerStyle={{backgroundColor:'white' }}
//     >
//       <View style={{ width, backgroundColor: 'red', height: '100%' }} />
//       <View style={{ width, backgroundColor: 'green', height: '100%' }} />
//       <View style={{ width, backgroundColor: 'blue', height: '100%' }} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default App;

//  <View
//   style={{
//     flexDirection: "row",
//     justifyContent: "space-between",
//   }}
// >
//   <Text style={styles.title}>$ 75</Text>
//   <TouchableOpacity
//     style={{
//       height: 60,
//       backgroundColor: COLORS.black,
//       borderRadius: SIZES.radius,
//       padding: 20,
//       alignItems: "center",
//       justifyContent: "center",
//     }}
//     onPress={() =>
//       navigation.navigate("Service", {
//         sdata: orderdata,
//       })
//     }
//   >
//     <Text
//       style={{
//         color: COLORS.white,
//         ...FONTS.h4,
//         marginHorizontal: 15,
//       }}
//     >
//       Pay now
//     </Text>
//   </TouchableOpacity>
// </View>
