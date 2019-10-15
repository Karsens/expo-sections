import React from "react";
import { MarkdownView } from "react-native-markdown-view";
import { View, Text, Image, Linking } from "react-native";

class ImageTextSection extends React.Component {
  renderText(title, text) {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            marginTop: 30,
            paddingLeft: 30,
            paddingRight: 30,
            flex: 1,
            justifyContent: "center"
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>{title}</Text>
          <View style={{ marginTop: 10 }}>
            <MarkdownView
              onLinkPress={link => {
                Linking.openURL(link);
              }}
            >
              {text}
            </MarkdownView>
          </View>
        </View>
      </View>
    );
  }

  renderImage(image) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center"
        }}
      >
        <Image source={image} style={{ width: 300, height: 300 }} />
      </View>
    );
  }

  render() {
    const { opposite, image, title, text } = this.props;

    const textRender = this.renderText(title, text);

    const imageRender = this.renderImage(image);

    const left = opposite ? textRender : imageRender;
    const right = opposite ? imageRender : textRender;

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          backgroundColor: undefined
        }}
      >
        {left}

        {right}
      </View>
    );
  }
}

export default ImageTextSection;
