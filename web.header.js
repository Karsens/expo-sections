import React from "react";
import { View, Platform, ScrollView, Text, Image } from "react-native";
import { Config } from "../config";
import NavigationLink from "../expo-elements/navigation.link";
import { Page } from "../types.fundamentals";
const headerHeight = Platform.OS === "web" ? 0 : 20;

import { pagesWithDefaults } from "../config.navigation.default";
const pages: Page[] = pagesWithDefaults?.filter(p => p.showInMenu) || [];

class Header extends React.Component {
  state = { route: null, path: null };

  setCurrent(route) {
    this.setState({ route });
  }

  componentDidUpdate() {
    this.scrollMenu();
  }

  scrollMenu = () => {
    const { route } = this.state;
    if (this.scroller) {
      const currentIndex = pages.findIndex(p => p.route === route);

      const x = currentIndex * 50;

      this.scroller.scrollTo({ x: x, y: 0, animated: true });
    }
  };

  renderHeader() {
    const { navigation } = this.props;
    const { route } = this.state;

    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: Config.layouts?.[0]?.colors?.primary || "#000"
        }}
      >
        <NavigationLink
          onNavigate={route => this.setCurrent(route)}
          navigation={navigation}
          routeName={pages[0].route}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              paddingTop: 20 + headerHeight
            }}
          >
            <Image
              source={require("../apps/_current/assets/_current/logo1024.png")}
              style={{ marginHorizontal: 20, width: 60, height: 60 }}
            />

            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: Config.layouts?.[0]?.colors?.defaultText
                }}
              >
                {Config.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: Config.layouts?.[0]?.colors?.defaultText
                }}
              >
                {Config.slogan}
              </Text>
            </View>
          </View>
        </NavigationLink>

        <ScrollView
          horizontal
          ref={ref => (this.scroller = ref)}
          contentOffset={{ x: 100, y: 200 }}
          style={{ flexDirection: "row" }}
          contentContainerStyle={{ justifyContent: "center" }}
        >
          {pages?.length > 0
            ? pages.map((page, index) => {
                return (
                  <NavigationLink
                    style={[
                      { height: 100, justifyContent: "center" },
                      route === page.route
                        ? {
                            backgroundColor:
                              Config.layouts?.[0]?.colors?.primaryLighter
                          }
                        : undefined
                    ]}
                    textStyle={{
                      color: Config.layouts?.[0]?.colors?.defaultText
                    }}
                    key={`page${index}`}
                    navigation={navigation}
                    onNavigate={route => this.setCurrent(route)}
                    routeName={page.route}
                    title={page.title}
                  />
                );
              })
            : null}
        </ScrollView>
      </View>
    );
  }

  render() {
    return Platform.OS === "web" ? this.renderHeader() : null;
  }
}

export default Header;
