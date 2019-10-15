import React from "react";
import { View, Linking, Text } from "react-native";
import { Config } from "../config";
import { removeSpacing } from "../util";
import { MarkdownView } from "react-native-markdown-view";

class ContactSection extends React.Component {
  renderAddress() {
    const { color } = this.props;
    return Config.address ? (
      <View>
        <Text
          style={{
            marginBottom: 20,
            fontWeight: "bold",
            color
          }}
        >
          Contact Information
        </Text>
        {Config.address.map((addressLine, index) => (
          <Text key={`addressLine${index}`} style={{ color }}>
            {addressLine}
          </Text>
        ))}
      </View>
    ) : null;
  }

  renderExtra() {
    const { addExtra } = this.props;

    const source = `
    ${Config.email ? `✉️ [${Config.email}](mailto:${Config.email})` : ""}
${
  Config.phoneNumber
    ? `📞 [${Config.phoneNumber}](tel:${removeSpacing(Config.phoneNumber)})`
    : ""
}
    ${Config.kvk ? `**KVK** ${Config.kvk}` : ""}`;

    return addExtra ? (
      <MarkdownView
        onLinkPress={link => {
          Linking.openURL(link);
        }}
      >
        {source}
      </MarkdownView>
    ) : null;
  }

  render() {
    const { noPadding } = this.props;
    return (
      <View style={[noPadding ? {} : { padding: 20, marginTop: 30 }]}>
        {this.renderAddress()}

        {this.renderExtra()}
      </View>
    );
  }
}

export default ContactSection;
