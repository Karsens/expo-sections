import React from "react";
import { MarkdownView } from "react-native-markdown-view";
import { View, Linking } from "react-native";
/**
 * A Privacy page
 */
class MarkdownSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      source: props.markdown
    };
  }

  componentDidMount() {
    if (this.props.url) {
      this.getMarkdown(this.props.url);
    }
  }

  getMarkdown(url) {
    fetch(url)
      .then(response => response.text())
      .then(source => {
        this.setState({ source });
      });
  }

  render() {
    const { style } = this.props;
    const { source } = this.state;

    return (
      <View style={[{ padding: 20, marginTop: 30 }, style]}>
        <MarkdownView
          onLinkPress={link => {
            Linking.openURL(link);
            console.log("open link", link);
          }}
        >
          {source}
        </MarkdownView>
      </View>
    );
  }
}

export default MarkdownSection;
