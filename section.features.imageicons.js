import React from "react";
import { Image, View, Text, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { FeaturesOptions } from "../types";

const Separator = () => (
  <View style={{ height: 1, flex: 1, backgroundColor: "#CCC" }} />
);
const FeatureCard = ({ title, description }) => (
  <View style={{ margin: 20, width: width / 3 }}>
    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>{title}</Text>
    <Text>{description}</Text>
  </View>
);
/**
 * A component for a features section.
 */
const Features = ({
  title,
  subtitle,
  features,
  image1,
  noPhone
}: FeaturesOptions) => {
  if (!features) {
    return (
      <View>
        <Text>No features given!</Text>
      </View>
    );
  }

  return (
    <View>
      <View>
        <Text style={{ fontSize: 26 }}>{title}</Text>
        <Text>{subtitle}</Text>
        <Separator />
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </View>
    </View>
  );
};

export default Features;
