import React from "react";
import { View, Text, Platform, Image } from "react-native";
import { Config } from "../config";

const IMG_SIZE = 100;
/**
 * column for every package
 */
const Clients = ({ clients }) => {
  const isIOS = Platform.OS === "ios";
  // const flexGoodForIOS = isIOS ? "1 0 auto" : 1;
  const BLURP_WIDTH = 200;

  const slug = Config.manifest.slug;
  return (
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
        {clients.map((item, index) => {
          return (
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
                  alignItems: "center",
                  justifyContent: "center",
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
                {item.name}
              </Text>

              {item.description && (
                <Text
                  style={{
                    textAlign: "center",
                    width: BLURP_WIDTH,
                    fontStyle: "italic"
                  }}
                >
                  {item.description}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Clients;
