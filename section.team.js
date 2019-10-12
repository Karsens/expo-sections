import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { Config } from "../config";

const BLURP_WIDTH = 200;
const IMG_SIZE = 100;
const Team = () => {
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
        {Config.teamMembers
          ? Config.teamMembers.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => (item.url ? Linking.openURL(item.url) : null)}
                key={index}
                style={{
                  margin: 10,
                  padding: 0,
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
                      source={{ uri: item.remoteImage }}
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
                  {item.firstName}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: BLURP_WIDTH
                  }}
                >
                  {item.role}
                </Text>

                {item.description ? (
                  <Text
                    style={{
                      marginTop: 10,
                      // textAlign: "center",
                      // width: BLURP_WIDTH,
                      fontStyle: "italic"
                    }}
                    numberOfLines={5}
                  >
                    {item.description}
                  </Text>
                ) : null}
              </TouchableOpacity>
            );
          })
          : null}
      </View>
    </View>
  );
};

export default Team;
