import React from "react";
import { View, Text, Dimensions, Platform } from "react-native";
import { Config } from "../config";
const { height, width } = Dimensions.get("window");

const ImageTitle = ({ title, text, titleSize }) => {
  /*
  import { invertColor } from "../util";

  for now, don't use bg color, it complicates things, but this is how to do it
  const backgroundColor = Config.layouts?.[0]?.colors?.primary;
  const color = invertColor(backgroundColor, true);
  */

  return (
    <View
      style={{
        flex: 1,
        minHeight: height,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontFamily:
            Platform.OS === "web"
              ? Config.layouts?.[0]?.style?.fontFamily.title
              : undefined,
          fontSize: titleSize || 50,
          marginLeft: 12
        }}
      >
        {title}
      </Text>

      <Text style={{ maxWidth: width * 0.6, margin: 20 }}>{text}</Text>
    </View>
  );
};

export default ImageTitle;
