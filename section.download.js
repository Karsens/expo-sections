/**
 * Responsibility:
 *
 * Either show a MailchimpForm, downloadbuttons to app store, or nothing.
 *
 */
import React from "react";

import {
  Image,
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity
} from "react-native";

import { Config } from "../config";
import * as WebBrowser from "expo-web-browser";

import googlePlayBadge from "../assets/google-play-badge.svg";
import appStoreBadge from "../assets/app-store-badge.svg";

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const checkMailChimp = (email, onSuccess, onFailure) => {
  if (validateEmail(email)) {
    fetch(`${Config.mailchimp}&EMAIL=${email}`)
      .then(response => response.json())
      .then(data => {
        console.log("DATA === ", data);
        onSuccess?.(data);
      });
  } else {
    onFailure();
  }
};

class MailChimpForm extends React.Component {
  state = { value: "" };
  render = () => {
    const { absolute, autoFocus, black } = this.props;

    const onSuccess = () => Alert.alert("Success");
    const onFailure = () => Alert.alert("Failure");

    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          position: absolute ? "absolute" : undefined,
          marginTop: 280
        }}
      >
        <TextInput
          autoFocus={autoFocus}
          placeholder={"Enter email"}
          placeholderTextColor={black ? "#000" : "#FFF"}
          selectionColor="#FFF"
          underlineColorAndroid="transparent"
          autoCorrect={false}
          value={this.state.value}
          onChangeText={value => this.setState({ value })}
          onSubmitEditing={text => {
            checkMailChimp(text, onSuccess, onFailure);
          }}
          style={{
            padding: 10,
            marginRight: 20,

            color: black ? "black" : "white",
            fontSize: 24,
            borderBottomColor: black ? "black" : "white",
            borderBottomWidth: 3
          }}
        />

        <TouchableOpacity
          onPress={() => {
            checkMailChimp(this.state.value, onSuccess, onFailure);
          }}
          style={[
            {
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderBottomColor: Config.layouts?.[0]?.colors?.primary,
              borderBottomWidth: 3,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Config.layouts?.[0]?.colors?.primary
            }
          ]}
        >
          <Text
            style={{
              fontSize: 24,
              color: Config.layouts?.[0]?.colors.defaultText
            }}
          >
            Request Access
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

class Download extends React.Component {
  render() {
    const { absolute, autoFocus, black } = this.props;

    return Config.mailChimpSubscribeUrl ? (
      <MailChimpForm absolute={absolute} autoFocus={autoFocus} black={black} />
    ) : Config.androidLink || Config.iosLink ? (
      <View style={{ flexDirection: "row" }}>
        {[
          { link: Config.androidLink, image: googlePlayBadge },
          { link: Config.iosLink, image: appStoreBadge }
        ].map(({ link, image }, index) => {
          return link ? (
            <TouchableOpacity
              key={`button${index}`}
              onPress={() => WebBrowser.openBrowserAsync(link)}
            >
              <Image source={image} />
            </TouchableOpacity>
          ) : null;
        })}
      </View>
    ) : null;
  }
}

export default Download;
