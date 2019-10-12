import React from "react";
import { View } from "react-native";
import ImageTextSection from "./section.imagetext";

class ImageTextFeatures extends React.Component {

  render() {
    const { features } = this.props;

    return (
      <View>
        {features.map((feature, index) => (
          <ImageTextSection
            key={index}
            {...feature}
            opposite={index % 2 === 0}
          />
        ))}
      </View>
    );
  }

}

export default ImageTextFeatures;
