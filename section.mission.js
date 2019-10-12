import React from "react";
import { View, Text } from "react-native";
import { Config } from "../config";

const Mission = () => {
  return (
    <View>
      <Text style={{ margin: 15, fontSize: 20 }}>
        {Config.missionStatement}
      </Text>
    </View>
  );
};

export default Mission;
