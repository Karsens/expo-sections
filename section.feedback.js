import React from "react";
import { View, Text, Platform, Linking } from "react-native";
import { Config } from "../config";
import { ReviewBox } from "../userfeedback.reviewbox";

const Mission = () => {
  return (
    <View>
      {Platform.OS !== "web" ? (
        <View>
          <Text style={{ margin: 15, fontSize: 20 }}>Help jij mee?</Text>

          <ReviewBox
            appleID={Config.manifest.ios?.bundleIdentifier}
            androidPackage={Config.manifest.android?.package}
            setReviewed={() => null}
            handleFeedback={() =>
              Linking.openURL(
                `mailto:${Config.email}?subject=Feedback&body=Beste makers van ${Config.name},\n\n\n\n`
              )
            }
            language={{
              likeText: "Vind je het top?",
              likeButton: "Review ons!",
              improveText: "Kan er iets beter?",
              improveButton: "Geef feedback"
            }}
            showAlways={true}
            shouldShow={true}
          />
        </View>
      ) : (
        undefined
      )}
    </View>
  );
};

export default Mission;
