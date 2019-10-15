import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import Blurps from "./pure.blurps";

const Team = ({ teamMembers }) => {
  return (
    <Blurps
      blurps={teamMembers?.map(
        ({ remoteImage, firstName, role, description }) => ({
          remoteImage,
          title: firstName,
          subtitle: role,
          text: description
        })
      )}
    />
  );
};

export default Team;
