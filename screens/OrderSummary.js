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
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// const Item = ({ company, model , price , name}) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{company}</Text>
//      <Text style={styles.title}>{model}</Text>
//       <Text style={styles.title}>${price}</Text>
//        <Text style={styles.title}>:{name}</Text>
//   </View>
// );

const OrderDetails = ({ navigation, route }) => {
  const { ID, Company, Model, Adds, Msg, Service, Price, Payment, screen } =
    route.params;

  console.log("=========>>>>>>>>>>service", Service);
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

  const renderItem = () => {
    return (
      <View key={ID}>
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
            <Image
              source={{
                uri: screen,
              }}
              resizeMode="center"
              style={styles.stretch}
            />
          </View>
        </TouchableOpacity>
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>
            {Company} {Model}
          </Text>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Text style={styles.title}>Service</Text>

            <Text style={styles.title1}>{Service}</Text>
          </View>
          <Text style={styles.title1}>
            {Adds}
            <Entypo name="location-pin" size={24} color="white" />
          </Text>
          <Text style={styles.title1}>{Msg}</Text>

          <View style={styles.devider} />

          <Text style={{ color: "#fff" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </Text>
          <View style={styles.devider} />

          <View style={{ marginTop: 150 }}>
            {Payment !== "COD" ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.title}>$ {Price}</Text>
                <TouchableOpacity
                  style={{
                    height: 60,
                    backgroundColor: COLORS.purple,
                    borderRadius: SIZES.radius,
                    padding: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => navigation.navigate("Home")}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h4,
                      marginHorizontal: 15,
                    }}
                  >
                    Pay now
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  function renderHeader() {
    return (
      <View style={{ paddingHorizontal: SIZES.padding, marginTop: 40 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={30} color="white" />
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
      <LinearGradient
        colors={[
          COLORS.black,
          COLORS.black,
          COLORS.black,
          COLORS.black,
          COLORS.black2,
        ]}
        style={{ flex: 1 }}
      >
        <StatusBar animated={true} backgroundColor="#000" style="light" />
        {renderHeader()}
        <ScrollView>{renderItem()}</ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
  },
  title1: {
    fontSize: 18,
    marginVertical: 4,
    color: "#fff",
  },
  devider: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    marginVertical: 8,
  },
  stretch: {
    width: 400,
    height: 400,
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
