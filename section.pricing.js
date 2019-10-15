import React from "react";
import { View, Text, Button, Linking } from "react-native";
import * as Icon from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { MarkdownView } from "react-native-markdown-view";

import { Config } from "../config";

const colors = ["green", "blue", "purple", "red"];

const PRICING_WIDTH = 250;

class Pricing extends React.Component {
  renderFeature = (feature: string, available: boolean) => (
    <View
      key={feature}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Icon.SimpleLineIcons
        name={available ? "check" : "close"}
        style={{ color: available ? "green" : "red" }}
      />
      <Text style={{ margin: 5, maxWidth: "60vw" }}>{feature}</Text>
    </View>
  );

  renderHeader(item, index) {
    const { titleFontSize, buttonTitle } = this.props;
    const color = item.color || colors[index % colors.length];

    return (
      <View
        style={{
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          borderWidth: 2,
          borderColor: color
        }}
      >
        <Text
          style={{
            flex: 1,
            fontWeight: "bold",
            fontSize: titleFontSize,
            color,
            textAlign: "center"
          }}
        >
          {item.name}
        </Text>
        {item.nameDescription ? (
          <Text
            style={{
              color,
              textAlign: "center",
              width: PRICING_WIDTH - 30 //30 padding and margins
            }}
          >
            {item.nameDescription}
          </Text>
        ) : null}

        <View style={{}}>
          <Text
            style={{
              color,
              fontSize: 80,
              textAlign: "center",
              fontWeight: "100"
            }}
          >
            {item.price}
          </Text>

          <Text
            style={{
              marginTop: 0,
              color,
              textAlign: "center"
            }}
          >
            {item.priceDescription || "Limited Edition"}
          </Text>
        </View>

        {item.link && (
          <Button
            color={color}
            style={{ flex: 1 }}
            title={item.buttonTitle || buttonTitle || `Get ${item.name}`}
            onPress={() => WebBrowser.openBrowserAsync(item.link)}
          />
        )}
      </View>
    );
  }

  renderFeatures(item, index) {
    const { pricing } = Config;
    const { isIncremental, titleFontSize } = this.props;
    const color = item.color || colors[index % colors.length];

    const previous = pricing[index - 1];

    return (
      <View
        style={{
          margin: 10,
          padding: 10,
          flex: 1
        }}
      >
        <Text style={{ color, fontSize: titleFontSize }}>
          {item.name} includes
        </Text>

        {isIncremental === false ? null : (
          <Text style={{ color }}>
            {previous
              ? `Everything in ${previous.name}, and:`
              : "All of these features:"}
          </Text>
        )}

        <View style={{ height: 1, backgroundColor: color, width: "100%" }} />

        {item.features &&
          item.features.map(feature => this.renderFeature(feature, true))}
        {item.notFeatures &&
          item.notFeatures.map(feature => this.renderFeature(feature, false))}
      </View>
    );
  }

  render() {
    const { pricing, pricingNotes } = Config;

    return (
      <View>
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          {pricing.map((item, index) => (
            <View
              key={index}
              style={{
                margin: 10,
                padding: 10,
                flex: 1,
                minWidth: PRICING_WIDTH
              }}
            >
              {this.renderHeader(item, index)}

              {this.renderFeatures(item, index)}
            </View>
          ))}
        </View>
        <MarkdownView
          onLinkPress={link => {
            Linking.openURL(link);
          }}
        >
          {pricingNotes}
        </MarkdownView>
      </View>
    );
  }
}

export default Pricing;
