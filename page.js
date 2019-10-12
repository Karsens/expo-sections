/*
 * Every page is the same. It's built up out of sections,
 * and has some universal page things that every page has in common,
 * like a container, menu, footer, and a contact button
 * */

// Global Styles
import React from "react";
// import Helmet from "react-helmet";
import { View } from "react-native";
// settings
import { Page, Section, Options } from "../types";

// components
import Team from "./section.team";
import Feedback from "./section.feedback";
import Mission from "./section.mission";

import Clients from "./section.clients";
import Blog from "./section.blog";
import BlogList from "./section.bloglist";
import Privacy from "./section.privacy"; // long page with privacy statement
import Markdown from "./section.markdown";
import GridView from "./section.gridview";
import Redirect from "./section.redirect";
import Pricing from "./section.pricing";
import Blurps from "./section.blurps"; // 3 blurps in a row
// import Timeline from "./REBUILD:section.timeline";
import ImageCover from "./section.imagecover";
import Download from "./section.download";
import Contact from "./section.contact";
import ImageIconsFeatures from "./section.features.imageicons";
import ImageTextFeatures from "./section.features.imagetext";
import ImageTitle from "./section.image.title";
// import Stats from "./COMMUNIFY.FUCKIT.section.stats"; // should be CommunifyStats

const SectionComponents = {
  ImageCover,
  Clients,
  GridView,
  Blog,
  BlogList,
  Redirect,
  Markdown,
  Feedback,
  Mission,
  Pricing,
  Download,
  // Timeline,
  ImageTitle,
  ImageIconsFeatures,
  ImageTextFeatures,
  Team,
  Blurps,
  Contact,
  Privacy
  // #todo
  // Reviews,
  // DoubleImageTitle,
  // ImageCover,
  // Video,
};

const isObject = value => value !== null && typeof value === "object";
const isArray = obj => obj !== null && Array.isArray(obj);
const isLanguageObject = value => isObject(value) && value.en !== undefined;
const isNoLanguageObjectButObject = val => {
  return isObject(val) && !isLanguageObject(val);
};

/**
 * to be called with deepMap. converts all languageObjects to strings.
 * @param {*} value
 * @param {*} key
 */
const getTranslateValues = ({ value, key, tryLanguage, fallbackLanguage }) => {
  if (!isLanguageObject(value)) {
    return value; //shouldn't happen
  }
  const translatedValue = value[tryLanguage] || value[fallbackLanguage];
  return translatedValue;
};

/**
 * Modified answer of this (https://stackoverflow.com/questions/25333918/js-deep-map-function) to work with my isLanguageObject check.
 * @param {*} obj
 * @param {*} f (value: languageObject, key) =>
 * @param {*} shouldRecurse val => boolean
 */
function deepMap(obj, f, shouldRecurse) {
  if (isArray(obj)) {
    return obj.map(function(val, key) {
      return shouldRecurse(val) ? deepMap(val, f, shouldRecurse) : f(val, key);
    });
  } else if (isObject(obj)) {
    var res = {};
    for (var key in obj) {
      var val = obj[key];
      if (shouldRecurse(val)) {
        res[key] = deepMap(val, f, shouldRecurse);
      } else {
        res[key] = f(val, key);
      }
    }
    return res;
  } else {
    return obj;
  }
}

const search = { lang: "nl" };

class PageComponent extends React.Component<Page> {

  render() {
    const { page, navigation, screenProps, ...rest } = this.props;

    return page.sections ? (
      page.sections.map(({ type, optionsArray, ...rest }: Section, index) => {
        const SectionComponent = SectionComponents[type];

        const key = `section-${index}`;

        if (!SectionComponent) {
          console.log("Can't find section ", type);
          return <View key={key} />;
        }

        /**
         * step 1: find options (personalisation)
         */
        const options: Options = optionsArray
          ? optionsArray.find(opt => opt.reference === search.ref) ||
            optionsArray[0]
          : rest;

        /**
         * step 2: find all language strings
         */

        const setLanguage = search.lang;
        const deviceLanguage = "en";
        const fallbackLanguage = "en";

        const tryLanguage = setLanguage || deviceLanguage;

        const functionToMap = (value, key) =>
          getTranslateValues({
            value,
            key,
            tryLanguage,
            fallbackLanguage
          });

        const translatedOptions = deepMap(
          options,
          functionToMap,
          isNoLanguageObjectButObject
        );

        return (
          <SectionComponent
            navigation={navigation}
            key={key}
            {...translatedOptions}
            pathname={null}
            search={search}
          />
        );
      })
    ) : (
      <View />
    );
  }

}
//NB: OMG SO PRETTY SO CLEAN SO THOUGHT THROUGH IM GOD :O

export default PageComponent;
