import React from "react";
import { MarkdownView } from "react-native-markdown-view";
import { View, Text, Image, Linking } from "react-native";

/**
 * In the end, this component should be able to render video's too. On mollie.com, jpg's change into video once the video is loaded. This should be doable.
 *
 * #todo
 * - [ ] Align picture right
 * - [ ] Add video mp4 prop & render it the way mollie does
 * - [ ] on mobile, text should always be below image. uniformity
 */
class ImageTextSection extends React.Component {

  renderText(title, text) {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View style={{ marginTop: 30, paddingLeft: 30, paddingRight: 30 }}>
          <Text>{title}</Text>
          <View style={{ marginTop: 10 }}>
            <MarkdownView
              onLinkPress={link => {
                Linking.openURL(link);
                console.log("wkwkwkw");
              }}
            >
              {text}
            </MarkdownView>
          </View>
        </View>
      </View>
    );
  }

  renderImage(image, title) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center"
        }}
      >
        <Image source={image} width="100%" height="auto" />
      </View>
    );
  }

  render() {
    const { opposite, image, title, text } = this.props;

    const textRender = this.renderText(title, text);

    const imageRender = this.renderImage(image, title);

    const left = opposite ? textRender : imageRender;
    const right = opposite ? imageRender : textRender;

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          backgroundColor: opposite ? "#EEE" : undefined
        }}
      >
        {left}

        {right}
      </View>
    );
  }

}

export default ImageTextSection;
