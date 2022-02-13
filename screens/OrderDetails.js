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
  ActivityIndicator,
} from "react-native";
import image from "../assets/images/max3.png";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import axios from "axios";
import { Entypo, AntDesign } from "@expo/vector-icons";

// const Item = ({ company, model , price , name}) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{company}</Text>
//      <Text style={styles.title}>{model}</Text>
//       <Text style={styles.title}>${price}</Text>
//        <Text style={styles.title}>:{name}</Text>
//   </View>
// );

const extractKey = ({ newRow }) => newRow;
var { width, height } = Dimensions.get("window");
const OrderDetails = ({ navigation, route }) => {
  const { email } = route.params;
  const [userdata, setUserdata] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);

  const cartdata = () => {
    setLoading(true);
    axios
      .get(`http://realback4c.herokuapp.com/api/cart/${email}`)
      .then(({ data }) => setUserdata(data.user))
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    cartdata();
    setFetch(false);
    return () => {
      isMounted = false;
    };
  }, [loading]);

  const _onRefresh = async () => {
    setLoading(true);

    cartdata();
    setLoading(false);

    // this.setState({ refreshing: true });
    // this.setState({ isLoading: true });

    // const userProfileId = await AsyncStorage.getItem("userPrfileId");
    // if (userProfileId !== null) {
    //   this.setState({ userProfileId });
    // }

    // const profilePic = await AsyncStorage.getItem("profilePic");
    // if (profilePic !== null) {
    //   this.setState({ profilePic });
    // }

    // await fetch(
    //   "http://demo.wiraa.com/api/Notification/GetNotifications?Id="+
    //     userProfileId
    // )
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     let notifications = [...this.state.notifications];
    //     responseJson.map((item) => {
    //       notifications.push({
    //         id: item.$id,
    //         notifyId: item.notificationID,
    //         userName: item.userName,
    //         profilePic: item.profilePic,
    //         postedOn: item.postedOn,
    //         comments: item.comments,
    //         isSeen: item.isSeen,
    //       });

    //       this.setState({ notifications });
    //     });
    //     this.setState({ refreshing: false });
    //     this.setState({ isLoading: false });
    //   })
    //   .catch((error) => {
    //     //Error
    //     console.error(error);
    //     this.setState({ isLoading: false });
    //     this.setState({ refreshing: false });
    //   });

    // this.setState({ isLoading: false });
    // this.setState({ refreshing: false });
  };

  // const renderItem = ({item}) => {
  //       let items = [];
  //       if( item.newRow) {
  //         items = item.newRow.map(row => {
  //           return <Text>hello {row.text}</Text>
  //         })
  //       }

  const renderItem = ({ item }) => {
    // console.log(item.screen);
    // const myScreen = item.screen;
    // console.log("==========>>>>>>>>>>>>>", myScreen);

    // var string = "images.max3";
    // var length = 7;
    // var trimmedString = screen.substring(length);
    // console.log(trimmedString);
    const mytext = item.Address;
    if (mytext.length > 10) {
      var mytrucn = mytext.substring(0, 20) + "...";
    }
    // console.log("============lenght", mytext, mytrucn);
    let items = [];
    if (item.products) {
      items = item.products.map((prod) => {
        return prod.name;
      });
    }
    console.log("=========>>>>>>>>>>>items", items);
    return (
      <View key={item._id} style={styles.item}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Summary", {
              ID: item._id,
              Company: item.company,
              Model: item.model,
              Adds: item.Address,
              Msg: item.message,
              Service: items,
              Price: item.totalPrice,
              Payment: item.mode,
              screen: item.screen,
            })
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <View>
              <Image
                source={{
                  uri: item.screen,
                }}
                resizeMode="contain"
                style={styles.stretch}
              />
            </View>
            <View
              style={{
                marginLeft: 40,

                marginVertical: 20,
              }}
            >
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.title]}
              >
                {item.company} {item.model}
              </Text>

              <Text
                // allowFontScaling={false}
                numberOfLines={2}
                style={styles.title1}
              >
                {mytrucn}
                <Entypo name="location-pin" size={24} color="black" />
              </Text>
            </View>
          </View>

          {/* <View style={{justifyContent:'space-between' , flexDirection:'row', marginBottom:20 }}  >
         <Text style={styles.title}>
           Total
          </Text>
               <Text style={styles.title}>
           $ {item.totalPrice}
          </Text>
          
          </View> */}
        </TouchableOpacity>
      </View>
    );
  };

  function renderHeader() {
    return (
      <View style={{ paddingHorizontal: SIZES.padding, marginVertical: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color="black" />
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
      {renderHeader()}
      {userdata.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text style={styles.title2}>Sorry you don't</Text>
          <Text style={styles.title2}>have make any order</Text>
          <Text style={styles.title2}>We are waiting for order</Text>
          <View style={{ margin: SIZES.padding * 3 }}>
            <TouchableOpacity
              style={{
                height: 60,
                backgroundColor: "#000",
                borderRadius: SIZES.radius / 1.5,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => _onRefresh()}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Refresh</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ marginBottom: 30 }}>
          <FlatList
            data={userdata}
            renderItem={renderItem}
            keyExtractor={extractKey}
            onRefresh={() => _onRefresh()}
            refreshing={loading}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  item: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 25,

    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 35,
    fontWeight: "bold",
    marginHorizontal: 30,
  },
  title1: {
    fontSize: 15,
  },
  devider: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    marginVertical: 8,
  },
  stretch: {
    width: 90,
    height: 90,
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
