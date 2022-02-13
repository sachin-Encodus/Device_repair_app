import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const About = () => {
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#000" style="light" />

      <TouchableOpacity>
        <Text style={styles.text}>Realback </Text>
        <Text style={styles.text}>Version 1.0.2</Text>
        <Text style={[styles.text, { color: "rgb(82, 82, 82)" }]}>
          © 2021 Realback Inc.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#fff",
  },
});
