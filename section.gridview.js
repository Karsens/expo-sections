import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";

class GridView extends React.Component {

  render() {
    const { grid } = this.props;

    return (
      <View>
        {grid.map(({ image, title, url }, index) => (
          <TouchableOpacity
            onPress={() => WebBrowser.openBrowserAsync(url)}
            key={index}
          >
            <View>
              <Image source={image} width="100%" height="100%" />
              <Text>{title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

}

export default GridView;
