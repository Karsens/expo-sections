import React from "react";
import { Image, View, Text, Dimensions, Platform } from "react-native";
import { Config } from "../config";
import Download from "./section.download";
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
        alignItems: "center"
      }}
    >
      <Image
        source={require("../apps/_current/assets/bg.jpeg")}
        style={{ width, height }}
      />

      <View style={{ position: "absolute" }}>
        <Text
          style={{
            marginTop: 100,
            fontWeight: "bold",
            fontFamily:
              Platform.OS === "web"
                ? Config.layouts?.[0]?.style?.fontFamily.title
                : undefined,
            fontSize: titleSize || 40,
            marginLeft: 12
          }}
        >
          {title}
        </Text>

        <Download absolute autoFocus />
      </View>
    </View>
  );
};

export default ImageTitle;
