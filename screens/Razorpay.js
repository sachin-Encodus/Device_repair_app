import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {WebView}  from 'react-native-webview'

const Razorpay = ({route}) => {
const {totalPrice,  name , email, number} = route.params;
console.log(totalPrice);
const data ={
    //  _id,
     totalPrice,
     name,
     email,
     number
}

console.log("data=======>>", data);


    return (
       
    <>
    
  <WebView  style={styles.container}
    source={{uri:'https://realback4c.herokuapp.com'}}

        />
    </>

    )
}

export default Razorpay


const styles = StyleSheet.create({
    container:{
    flex: 1,
    backgroundColor: 'white',
  alignItems:'center',
  marginTop:50
    
},
})

