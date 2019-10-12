import React from "react";
import { View, Text, Platform, Image } from "react-native";

import { Config } from "../config";

const { blurps } = Config;
const IMG_SIZE = 80;

export type Blurp = {
  image: ImageBitmap,
  title: string,
  subtitle: string,
  text: string
};
/**
 * column for every package
 */
const Blurps = () => {
  const BLURP_WIDTH = 170;
  return blurps ? (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        {blurps.map((item, index) => (
          <View
            key={index}
            style={{
              margin: 10,
              padding: 10,
              width: BLURP_WIDTH,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1
            }}
          >
            <View
              style={{
                width: BLURP_WIDTH,
                height: IMG_SIZE,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                borderRadius: IMG_SIZE / 2
              }}
            >
              <View
                style={{
                  width: IMG_SIZE,
                  height: IMG_SIZE,
                  backgroundColor: "#CCC",
                  borderRadius: IMG_SIZE / 2
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    alignSelf: "center",
                    width: IMG_SIZE,
                    height: IMG_SIZE,
                    borderRadius: IMG_SIZE / 2
                  }}
                />
              </View>
            </View>

            <Text
              style={{
                textAlign: "center",
                width: BLURP_WIDTH,
                fontWeight: "bold"
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                textAlign: "center",
                marginVertical: 10,
                width: BLURP_WIDTH
              }}
            >
              {item.subtitle}
            </Text>

            <Text
              style={{
                textAlign: "center",
                width: BLURP_WIDTH,
                fontStyle: "italic"
              }}
            >
              {item.text}
            </Text>
          </View>
        ))}
      </View>
    </View>
  ) : null;
};

export default Blurps;
