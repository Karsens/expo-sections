import React from "react";
import { View, Button, Image } from "react-native";
import { Config } from "../config";
import * as WebBrowser from "expo-web-browser";

import googlePlayBadge from "../assets/google-play-badge.svg";
import appStoreBadge from "../assets/app-store-badge.svg";
import { TouchableOpacity } from "react-native-gesture-handler";

const MailChimpForm = View; //extrapolate from intro
class Download extends React.Component {

  state = {
    value: ""
  };

  render() {
    return (
      <View>
        {Config.mailChimpSubscribeUrl ? (
          <MailChimpForm />
        ) : (
          <View style={{ flexDirection: "row" }}>
            {[
              { link: Config.androidLink, image: googlePlayBadge },
              { link: Config.androidLink, image: appStoreBadge }
            ].map(({ link, image }, index) => {
              return (
                <TouchableOpacity
                  key={`button${index}`}
                  onPress={() => WebBrowser.openBrowserAsync(link)}
                >
                  <Image source={image} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  }

}

export default Download;
