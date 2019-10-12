import React from "react";
import { getObjectLink } from "./util";
import { View } from "react-native";
import * as WebBrowser from "expo-web-browser";
/**
 * A Privacy page
 */
const Redirect = ({ redirectToUrlWith, pathname, search }) => {
  const newUrl = redirectToUrlWith(pathname, getObjectLink(search));
  WebBrowser.openBrowserAsync(newUrl);

  return <View />;
};

export default Redirect;
