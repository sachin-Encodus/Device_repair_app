import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Placeholder() {
  const [selectedLanguage, setSelectedLanguage] = React.useState();
  const pickerRef = React.useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#efefef",
          marginHorizontal: 16,
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
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="select language" value="1" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="c++" value="c" />
          <Picker.Item label="python" value="python" />
        </Picker>
      </View>
      <View
        style={{
          backgroundColor: "#efefef",
          marginHorizontal: 16,
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
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="select language" value="1" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="c++" value="c" />
          <Picker.Item label="python" value="python" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
