import React from "react";
import { View, Text } from "react-native";

import NavigationLink from "../expo-elements/navigation.link";
import { Config } from "../config";

import ContactSection from "../expo-sections/section.contact";

import { pagesWithDefaults } from "../config.navigation.default";

const links = pagesWithDefaults?.filter(page => page.showInFooter);
/**
 * The footer presentational component
 */
const Footer = ({ navigation }) => {
  const year = new Date(Date.now()).getFullYear();
  return (
    <View
      style={{
        backgroundColor: Config.layouts?.[0]?.colors?.primary,
        padding: 20
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around"
        }}
      >
        {links ? (
          <View>
            <Text
              style={{
                marginBottom: 20,
                fontWeight: "bold",
                color: Config.layouts?.[0]?.colors?.defaultText
              }}
            >
              More info
            </Text>
            {links.map(({ title, route }, index) => (
              <NavigationLink
                textStyle={{
                  color: Config.layouts?.[0]?.colors?.defaultText,
                  fontSize: 13,
                  margin: 2,
                  textAlign: "left"
                }}
                key={`footer${index}`}
                navigation={navigation}
                routeName={route}
                title={title}
              />
            ))}
          </View>
        ) : null}

        <ContactSection
          noPadding
          color={Config.layouts?.[0]?.colors?.defaultText}
        />
      </View>

      <Text
        style={{
          textAlign: "center",
          color: Config.layouts?.[0]?.colors?.defaultText
        }}
      >
        &copy; {year} {Config.name}. All Rights Reserved.
      </Text>
    </View>
  );
};

export default Footer;
