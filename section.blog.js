import React from "react";
import { Text, View, Dimensions, Linking } from "react-native";
import HTML from "react-native-render-html";
import { fetchGhost } from "./fetch.ghost";
import { DefaultScreenProps } from "../types";
import { Config } from "../config";

const { width } = Dimensions.get("window");

type Props = DefaultScreenProps & {};

class BlogScreen extends React.Component<Props> {
  state = { ghostArticles: null };
  componentDidMount = async () => {
    const {
      navigation,
      navigation: {
        state: { params }
      }
    } = this.props;
    const { labelSlug, slug, ghostLink, ghostKey } = Config;

    const ghostArticles = await fetchGhost(
      {
        labelSlug,
        slug,
        ghostLink,
        ghostKey
      },
      { slug: params.slug }
    );

    this.setState({ ghostArticles });
  };

  render() {
    const { ghostArticles } = this.state;

    const first = ghostArticles?.[0];
    return (
      <View style={{ marginHorizontal: 20 }}>
        {first ? (
          <HTML
            imagesMaxWidth={width}
            onLinkPress={link => {
              console.log("LINK", link);
              // Linking.openURL(link);
            }}
            html={first.html}
          />
        ) : null}
      </View>
    );
  }
}
export default BlogScreen;
