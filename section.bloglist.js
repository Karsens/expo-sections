type Props = DefaultScreenProps & {};

import React from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";

import { fetchGhost } from "./fetch.ghost";
import { Config } from "../config";
import { DefaultScreenProps } from "../types";
import NavigationLink from "../expo-elements/navigation.link";

const { width } = Dimensions.get("window");

const CARDSIZE = 300;

const cutOnWord = (
  text: string,
  characters: number,
  suffix: string
): string => {
  if (!text) {
    return "";
  }
  if (text.length <= 100) {
    return text;
  }

  const words = text && text.substring(0, characters).split(" ");
  const wordsWithoutLast = words.slice(0, -1);
  const returnText = wordsWithoutLast.join(" ");
  return returnText + suffix;
};
/**
 * Responsibility: This blog thingy now gets an input of blogs,
 * but blogs are always gotten from the internet. So why don't I just put an API here?
 *  It's better because then it kind of becomes a CMS powered page, not hardcoded.
 *
 * It could have multiple purposes:
 *
 * - Blogging for ourselves, on Medium.
 * - Blogging for ourselves on Ghost
 * - Crossposting interesting blogs I read before.
 * - Linking to interesting websites (medium articles) of other people,
 * that are social proof of the truth of my app
 * - Linking to scientific evidence
 * - Linking to books, maybe?
 *
 */

type Article = {
  id: string,
  date?: Date,
  title: string,
  description: string,
  link: string,
  figure: string // can be an URL, but can also be required image
};

class Blog extends React.Component<Props> {
  state = {
    hover: null,
    mediumArticles: [],
    ghostArticles: [],
    isLoading: true
  };

  componentDidMount = async () => {
    const { limit } = this.props;
    await this.fetchMedium();

    const { labelSlug, ghostLink, ghostKey, slug } = Config;

    const ghostArticles = await fetchGhost(
      {
        labelSlug,
        ghostLink,
        ghostKey,
        slug
      },
      { limit }
    );
    this.setState({ ghostArticles });
    this.setState({ isLoading: false });
  };

  fetchMedium(url): Article[] {
    if (!url) {
      return null;
    }

    //returns list of medium articles

    // const medium: Article[] = data && data.web && data.web.mediumArticles;

    return null;
  }

  render() {
    const { title, articles, navigation } = this.props;

    const { isLoading, mediumArticles, ghostArticles } = this.state;

    const allArticles = []
      .concat(articles, mediumArticles, ghostArticles)
      .sort((a: Article, b: Article) => a.date < b.date);

    const aStyle = id => ({
      color: "black",
      textDecoration: "none",
      transform: this.state.hover === id ? "scale(1.03)" : undefined
    });

    const isIOS = Platform.OS === "ios";

    return (
      <View style={{ backgroundColor: "#f4f8fb", flex: 1 }}>
        <View>
          <Text>{title}</Text>
          {isLoading && <Text>Loading...</Text>}

          <View
            style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}
          >
            {allArticles &&
              allArticles.length > 0 &&
              allArticles.map((c: Article) =>
                c ? (
                  <NavigationLink
                    // onNavigate={route => this.setCurrent(route)}
                    navigation={navigation}
                    routeName="Blog"
                    params={{ slug: c.slug }}
                  >
                    <TouchableOpacity style={aStyle(c.id)} key={`key-${c?.id}`}>
                      <View
                        style={{
                          flex: 1,
                          maxWidth: isIOS ? undefined : "20vw",
                          minWidth: CARDSIZE
                        }}
                      >
                        <View
                          style={{
                            margin: 20,
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "white",
                            boxShadow: "2px 3px 1px #EEE",
                            height: isIOS ? undefined : 400,
                            borderRadius: 5
                          }}
                        >
                          {c.figure && (
                            <View
                              style={{
                                display: "flex",
                                borderRadius: 20,
                                backgroundColor: "transparent"
                              }}
                            >
                              <Image
                                style={{
                                  width: CARDSIZE - 40,
                                  height: 200,
                                  borderTopLeftRadius: 5,
                                  borderTopRightRadius: 5
                                }}
                                alt={c.title}
                                source={c.figure}
                              />
                            </View>
                          )}

                          <Text
                            style={{
                              marginTop: 10,
                              marginLeft: 10,
                              marginRight: 10,
                              fontSize: 18,
                              fontWeight: "bold"
                            }}
                          >
                            {c.title}
                          </Text>

                          {c.description ? (
                            <View
                              style={{
                                marginLeft: 10,
                                marginRight: 10
                              }}
                            >
                              <Text>
                                {cutOnWord(c.description, 100, "...")}
                              </Text>
                            </View>
                          ) : null}
                        </View>
                      </View>
                    </TouchableOpacity>
                  </NavigationLink>
                ) : null
              )}
          </View>
        </View>
      </View>
    );
  }
}

export default Blog;
