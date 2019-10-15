/**
 * Responsibility:
 *
 * Should be wrapped around every screen automatically on web using some kind of hook, but only on web.
 **/

import React from "react";
import { View, Platform, ScrollView, Dimensions } from "react-native";
import { Config } from "../config";
import Header from "./web.header";
import Footer from "./web.footer";
const { width, height } = Dimensions.get("window");

class WebWrapper extends React.Component {
  state = {
    Helmet: null
  };

  componentDidMount() {
    this.importHelmetIfWeb();
  }

  async importHelmetIfWeb() {
    if (Platform.OS === "web") {
      const Helmet = await import("react-helmet");
      this.setState({ Helmet: Helmet.default });
    }
  }

  renderHelmet() {
    const { Helmet } = this.state;

    const { title } = this.props;

    return Platform.OS === "web" && Helmet ? (
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
    ) : (
      undefined
    );
  }

  render() {
    const { navigation, children, markdown, download } = this.props;

    return Platform.OS === "web" ? (
      <ScrollView style={{ flex: 1 }}>
        {this.renderHelmet()}
        {Config.noWebHeader ? undefined : <Header navigation={navigation} />}
        <View
          style={[
            {
              minHeight: height - 250
            },
            width > 500
              ? { width: "70%", alignSelf: "center", flex: 1 }
              : undefined
          ]}
        >
          {children}
        </View>
        {Config.noWebFooter ? undefined : <Footer navigation={navigation} />}
      </ScrollView>
    ) : (
      <View style={{ flex: 1 }}>{children}</View>
    );
  }
}

export default WebWrapper;
