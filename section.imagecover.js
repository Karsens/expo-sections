import React from "react";
import { View, Image, Text, Platform, Dimensions } from "react-native";
import { Config } from "../config";

const { width, height } = Dimensions.get("window");

const ImageCover = ({ title, description, image }) => {
  const right = title?.length * 30;

  const real = right > width - 50 ? width - 50 : right;

  return (
    <View style={{}}>
      <Image
        source={image}
        style={{
          position: "relative",
          width,
          height,
          maxHeight: 1000
        }}
      />
      {title && (
        <Text
          style={{
            position: "absolute",
            fontFamily:
              Platform.OS === "web"
                ? Config.layouts?.[0]?.fontFamily.title
                : undefined,
            bottom: 50,
            left: width < 700 ? 50 : width - real,
            fontWeight: "bold",
            width,
            padding: 15,
            fontSize: 40
          }}
        >
          {title}
        </Text>
      )}
      <Text>{description}</Text>
    </View>
  );
};

export default ImageCover;
