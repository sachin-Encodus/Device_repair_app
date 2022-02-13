import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Header } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
import data from "./data";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { isAuth, signout } from "../helpers/auth";
import { ToastAndroid } from "react-native";
// import Serivce from './ServiceType';
import axios from "axios";
const Home = ({ navigation, route }) => {
  const { name, email, pUrl } = route.params;
  const defaultUri =
    "https://cdn.dribbble.com/users/1786866/screenshots/13992097/media/c461eeae4d4b523c9d3bab7c66264916.png";
  // console.log(Name, Token , Photourl);
  console.log(name, email, pUrl);

  const callupi = async () => {
    // try {
    //   const res = await axios.post("https://dc0219bef51e.ngrok.io/api/upi");
    //   console.log("======upi payment", res);
    // } catch (error) {
    //   console.log(error);
    console.log("hello world");
    // }
  };

  const { mobile, laptop, airpod, watch, ipad, led, drone, powerbank } = data;
  const [sdata, setSdata] = useState("");
  const featuresData = [
    {
      id: 1,
      icon: icons.reload,
      color: COLORS.purple,
      backgroundColor: COLORS.lightpurple,
      description: "Top Up",
    },
    {
      id: 2,
      icon: icons.send,
      color: COLORS.yellow,
      backgroundColor: COLORS.lightyellow,
      description: "Transfer",
    },
    {
      id: 3,
      icon: icons.internet,
      color: COLORS.primary,
      backgroundColor: COLORS.lightGreen,
      description: "Internet",
    },
    {
      id: 4,
      icon: icons.wallet,
      color: COLORS.red,
      backgroundColor: COLORS.lightRed,
      description: "Wallet",
    },
    {
      id: 5,
      icon: icons.bill,
      color: COLORS.yellow,
      backgroundColor: COLORS.lightyellow,
      description: "Bill",
    },
    {
      id: 6,
      icon: icons.game,
      color: COLORS.primary,
      backgroundColor: COLORS.lightGreen,
      description: "Games",
    },
    {
      id: 7,
      icon: icons.phone,
      color: COLORS.red,
      backgroundColor: COLORS.lightRed,
      description: "Mobile Prepaid",
    },
    {
      id: 8,
      icon: icons.more,
      color: COLORS.purple,
      backgroundColor: COLORS.lightpurple,
      description: "More",
    },
  ];

  const specialPromoData = [
    {
      id: 1,
      img: images.wallieLogo,
      title: "Airpod pro",
      description: "Don't miss it. Grab it now!",
      screen: "airpodpro.png",
      color: COLORS.lightRed,
      data: "airpod",
    },
    {
      id: 2,
      img: images.promoBanner,
      title: "Smartphone",
      description: "Don't miss it. Grab it now!",
      screen: "iphone12.png",
      color: COLORS.lightpurple,
      data: "mobile",
    },
    {
      id: 3,
      img: images.iwatch,
      title: "iWatch",
      description: "Don't miss it. Grab it now!",
      screen: "iwatch.png",
      color: COLORS.lightGreen,
      data: "watch",
    },
    {
      id: 4,
      img: images.laptop,
      title: "Laptop",
      description: "Don't miss it. Grab it now!",
      screen: "macbook.png",
      color: COLORS.lightyellow,
      data: "laptop",
    },
    {
      id: 5,
      img: images.ipad,
      title: "Ipad pro",
      description: "Don't miss it. Grab it now!",
      screen: "ipad.png",
      color: COLORS.lightGray,
      data: "ipad",
    },
    {
      id: 6,
      img: images.max3,
      title: "Airpod Max",
      description: "Don't miss it. Grab it now!",
      screen: "max3.png",
      color: COLORS.lightpurple,
      data: "drone",
    },
    {
      id: 7,
      img: images.led,
      title: "Led",
      description: "Don't miss it. Grab it now!",
      screen: "net.png",
      color: COLORS.lightGreen,
      data: "led",
    },
    {
      id: 8,
      img: images.bank,
      title: "Power banks",
      description: "Don't miss it. Grab it now!",
      screen: "bank.png",
      color: COLORS.lightRed,
      data: "powerbank",
    },
  ];

  const [features, setFeatures] = React.useState(featuresData);
  const [specialPromos, setSpecialPromos] = React.useState(specialPromoData);

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          marginVertical: SIZES.padding * 2,
          marginTop: 40,
        }}
      >
        <TouchableOpacity
          style={{ flex: 1, flexDirection: "row" }}
          onPress={() =>
            navigation.navigate("Profile", {
              Fname: name,
              Email: email,
              Url: pUrl,
            })
          }
        >
          {/* <TouchableOpacity style={{ justifyContent: "center" }}> */}
          <Avatar
            size="medium"
            rounded
            source={{
              uri: route.params.pUrl === undefined ? defaultUri : pUrl,
            }}
          />
          {/* </TouchableOpacity> */}
          <Text
            allowFontScaling={true}
            style={{ ...FONTS.h2, marginTop: 10, marginLeft: 10 }}
          >
            {name}
          </Text>
          {/* <Text style={{ ...FONTS.body2, color: COLORS.gray }}>{email}</Text> */}
        </TouchableOpacity>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Order", {
                email: email,
              })
            }
            style={{
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.lightGray,
            }}
          >
            <Ionicons name="cart" size={34} color="black" />
            <View
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                height: 10,
                width: 10,
                backgroundColor: COLORS.red,
                borderRadius: 5,
              }}
            ></View>
          </TouchableOpacity>
        </View>
        {/* <TextInput
        style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => setInput(text)}
        inlineImageLeft="username"
        inlineImagePadding={2}
        underlineColorAndroid="transparent"
        value={input}
      /> */}
      </View>
    );
  }

  function renderBanner() {
    return (
      <View style={{ marginTop: 10, marginBottom: 30 }}>
        <KeyboardAvoidingView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <View>
            <TextInput
              style={[styles.input, { fontSize: 20, width: 200 }]}
              placeholder="Search service"
              value={sdata}
              onChangeText={(text) => setSdata(text)}
              placeholderTextColor={COLORS.black}
              selectionColor={COLORS.white}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.shadow2,
              {
                backgroundColor: "#000",
                borderRadius: 10,
                padding: 15,
                justifyContent: "center",
              },
            ]}
          >
            <Ionicons name="search-outline" size={30} color="white" />
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <TouchableOpacity
          onPress={() => callupi()}
          style={[
            styles.shadow2,
            {
              backgroundColor: "#000",
              borderRadius: 20,
            },
          ]}
        >
          <View
            style={{
              // borderRadius: 20,
              // backgroundColor:'#000',
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ marginHorizontal: 10, padding: 10 }}>
              <Text style={{ fontSize: 25, color: "#fff" }}>Prefrential</Text>

              <Text style={{ fontSize: 20, color: "#5a5a5a" }}>
                20% save your next Serivce
              </Text>
              <Text style={{ fontSize: 20, color: "#5a5a5a" }}>
                We are trying to give you best service
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: "rgb(131, 131, 131)",
                  marginTop: 10,
                }}
              >
                Lean more
              </Text>
            </View>

            {/* <View>
              <MaterialCommunityIcons name="gift" size={100} color="white" />
            </View> */}

            {/* <Image
                    source={images.banner}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 20
                    }}
                       /> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderFeatures() {
    const Header = () => (
      <View style={{ marginBottom: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h3 }}>Features</Text>
      </View>
    );

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          marginBottom: SIZES.padding * 2,
          width: 60,
          alignItems: "center",
        }}
        onPress={() => console.log(item.description)}
      >
        <View
          style={{
            height: 50,
            width: 50,
            marginBottom: 5,
            borderRadius: 20,
            backgroundColor: item.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{
              height: 20,
              width: 20,
              tintColor: item.color,
            }}
          />
        </View>
        <Text style={{ textAlign: "center", flexWrap: "wrap", ...FONTS.body4 }}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        ListHeaderComponent={Header}
        data={features}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        style={{ marginTop: SIZES.padding * 2 }}
      />
    );
  }

  function renderPromos() {
    const HeaderComponent = () => (
      <View>
        {renderHeader()}

        {renderBanner()}
        {/* {renderFeatures()} */}
        {renderPromoHeader()}
      </View>
    );

    const renderPromoHeader = () => (
      <View
        style={{
          flexDirection: "row",
          marginBottom: SIZES.padding,
        }}
      >
        <TouchableOpacity
          onPress={() => alert("elctronic")}
          style={{ flex: 1 }}
        >
          <Text style={{ ...FONTS.h3 }}>Electronic Gadgets</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("View All")}>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>View All</Text>
        </TouchableOpacity>
      </View>
    );

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={[
          styles.shadow2,
          {
            marginVertical: SIZES.base,
            width: SIZES.width / 2.4,
            borderRadius: 20,
          },
        ]}
        onPress={() =>
          navigation.navigate("Device", {
            ID: item.id,
            image: item.img,
            dname: item.title,
            desc: item.description,
            orderdata: item.data,
            email: email,
            screen: item.screen,
          })
        }
      >
        <View
          style={{
            height: 220,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: item.color,
            padding: 20,
          }}
        >
          <Image
            source={item.img}
            resizeMode="contain"
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        </View>

        <View
          style={{
            padding: SIZES.padding,
            backgroundColor: item.color,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Text style={{ ...FONTS.h4, textAlign: "center", marginVertical: 5 }}>
            {item.title}
          </Text>
          {/* <Text style={{ ...FONTS.body4, textAlign: "center" }}>
            {item.description}
          </Text> */}
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{ paddingHorizontal: SIZES.padding * 2.5 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={specialPromos}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ marginBottom: 80 }}></View>}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar animated={true} backgroundColor="#fff" style="dark" />

      {/* <Header
        statusBarProps={{ barStyle: "dark-content" }}
        barStyle="default"
        containerStyle={{
          backgroundColor: "#171717",
          justifyContent: "space-around",
        }}
        leftComponent={{
          icon: "menu",
          color: "#fff",
          iconStyle: { color: "#fff" },
        }}
        centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
        rightComponent={{ icon: "home", color: "#fff" }}
      /> */}

      {renderPromos()}
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,

    paddingVertical: 18,
    borderColor: "lightgrey",
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  shadow2: {
    shadowColor: "#000",
    shadowOffset: {
      width: 110,
      height: 220,
    },
    shadowOpacity: 10.58,
    shadowRadius: 16.0,
  },
});

// https://github.com/expo/expo/tree/sdk-41/packages/expo-in-app-purchases
// https://github.com/alexZajac/react-native-skeleton-content#props
