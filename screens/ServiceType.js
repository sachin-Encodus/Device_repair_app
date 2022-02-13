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
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Button, Overlay } from "react-native-elements";
import data from "./data";
import { ScrollView, Modal } from "react-native";

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

const Serivce = ({ navigation, route }) => {
  const { sdata, email, devicename, screen } = route.params;
  console.log("======== s data", sdata);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [selected, setSelected] = React.useState(new Map());
  const onSelect = React.useCallback(
    (_id) => {
      const newSelected = new Map(selected);
      newSelected.set(_id, !selected.get(_id));

      setSelected(newSelected);
    },
    [selected]
  );

  const device = "mobile";
  const [cartItems, setCartItems] = useState([]);
  //   console.log("",cartItems);
  // const [showdata, setShowdata] = useState(false);
  // const show = () =>{
  //   setShowdata(true)
  // }
  //   const hide = () =>{
  //   setShowdata(false)
  // }
  console.log("====================================", cartItems);

  const onAdd = (item) => {
    const exist = cartItems.find((x) => x._id === item._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === item._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };
  const onRemove = (item) => {
    const exist = cartItems.find((x) => x._id === item._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== item._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === item._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = 0.0;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const discount = itemsPrice > 2000 ? 200 : 20;
  const totalPrice = itemsPrice - discount + shippingPrice;

  const [userdata, setUserdata] = useState([]);
  // const [email, setEmail] = useState("noreply@gmail.com");
  const [loading, setLoading] = useState(false);

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

  //  console.log("============>>>>>>>>>>", sdata);

  // const renderItem = ({item}) => {
  //       let items = [];
  //       if( item.newRow) {
  //         items = item.newRow.map(row => {
  //           return <Text>hello {row.text}</Text>
  //         })
  //       }

  const renderItem = ({ item }) => {
    //       let items = [];
    //       if( item.products) {
    //         items = item.products.map(prod => {
    //           return(
    // <View  style={{justifyContent:'space-between' , flexDirection:'row'}}   key={prod.id}  >

    //    <Text  style={styles.title1} >{prod.name}</Text>
    // </View>

    //           )
    //         })
    //       }

    return (
      <View
        key={item._id}
        style={[
          styles.item,
          { backgroundColor: !!selected.get(item._id) ? "black" : "lightgrey" },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            onSelect(item._id);
            !!selected.get(item._id) ? onRemove(item) : onAdd(item);
          }}

          //   onPress={() => navigation.navigate('Summary', {ID:item._id ,
          //  Company:item.company,
          //  Model:item.model,
          //  Adds:item.Address,
          //  Msg:item.message,
          //  Service:items,
          //  Price:item.totalPrice,
          //  Payment:item.mode

          //   })}
        >
          <View
            key={item._id}
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text
              style={[
                styles.title,
                { color: !!selected.get(item._id) ? "white" : "black" },
              ]}
            >
              {item.name}
            </Text>

            <Text
              style={[
                styles.title1,
                { color: !!selected.get(item._id) ? "white" : "black" },
              ]}
            >
              Rs. {item.price}
            </Text>
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
      <View style={{ marginVertical: 10 }}>
        <View style={{ marginHorizontal: 30 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={30} color="black" />
          </TouchableOpacity>
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
      {/* {renderHeader()}  */}
      <View style={{ marginHorizontal: 30, marginVertical: 18 }}>
        <Text style={{ fontSize: 35, fontWeight: "bold" }}>What are the </Text>
        <Text style={{ fontSize: 35, fontWeight: "bold" }}>
          problems you facing now
        </Text>
        <Text style={{ fontSize: 35, fontWeight: "bold" }}>
          {devicename} {sdata[0].modelno}{" "}
        </Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}
          >
            <View style={{ margin: SIZES.padding * 3 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      color: COLORS.black,
                      ...FONTS.h3,
                      marginVertical: 10,
                    }}
                  >
                    Total
                  </Text>
                  <Text
                    style={{
                      color: COLORS.black,
                      ...FONTS.h3,
                      marginVertical: 10,
                    }}
                  >
                    shippingPrice
                  </Text>
                  <Text
                    style={{
                      color: COLORS.black,
                      ...FONTS.h3,
                      marginVertical: 10,
                    }}
                  >
                    discount
                  </Text>
                  <Text
                    style={{
                      color: COLORS.black,
                      ...FONTS.h3,
                      marginVertical: 10,
                    }}
                  >
                    Tax
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: COLORS.black,
                      ...FONTS.h3,
                      marginVertical: 10,
                    }}
                  >
                    Rs. {totalPrice}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.black,
                      ...FONTS.h3,
                      marginVertical: 10,
                    }}
                  >
                    Rs. {shippingPrice}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.black,
                      ...FONTS.h3,
                      marginVertical: 10,
                    }}
                  >
                    Rs. {discount}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.black,
                      ...FONTS.h3,
                      marginVertical: 10,
                    }}
                  >
                    Rs. {taxPrice}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={{
                  height: 60,
                  backgroundColor: "#000",
                  borderRadius: SIZES.radius / 1.5,
                  alignItems: "center",
                  justifyContent: "center",
                  elevation: 15,
                }}
                onPress={() => setVisible(false)}
              >
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ flex: 1 }}>
        <FlatList
          data={sdata[0].modedata}
          renderItem={renderItem}
          // keyExtractor={extractKey}
          keyExtractor={(item) => `${item._id}`}
          onRefresh={() => _onRefresh()}
          refreshing={loading}
          showsVerticalScrollIndicator={false}
          // ListFooterComponent={<View style={{ marginBottom: 80 }}></View>}
        />
      </View>

      <View>
        <View
          style={{
            margin: SIZES.padding * 3,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            disabled={cartItems.length === 0 ? true : false}
            style={{
              height: 60,
              backgroundColor: "#000",
              borderRadius: SIZES.radius / 1.5,
              alignItems: "center",
              justifyContent: "space-between",
              elevation: 15,
              flexDirection: "row",
              paddingHorizontal: 60,
            }}
            onPress={() => setVisible(true)}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 60,
              backgroundColor: "#000",
              borderRadius: SIZES.radius / 1.5,
              alignItems: "center",
              justifyContent: "center",
              elevation: 15,
              flexDirection: "row",
              paddingHorizontal: 60,
            }}
            onPress={() =>
              navigation.navigate("Payment", {
                cartItems: cartItems,
                totalPrice: totalPrice,
                email: email,
                devicename: devicename,
                model: sdata[0].modelno,
                screen: screen,
              })
            }
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Serivce;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  item: {
    backgroundColor: "lightgrey",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 30,
    borderRadius: 15,
    elevation: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  title1: {
    fontSize: 20,
  },
  devider: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    marginVertical: 8,
  },
  stretch: {
    width: 110,
    height: 110,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0070f3",
    padding: 15,

    borderRadius: 10,
    marginBottom: 10,
    elevation: 6,
  },
  devider: {
    borderBottomColor: "rgb(82, 82, 82)",
    borderBottomWidth: 0.5,
    marginBottom: 30,
  },
});
