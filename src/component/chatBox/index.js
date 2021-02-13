import React from "react";
import { View, Text, Image } from "react-native";
import { Card, CardItem } from "native-base";
import styles from "./styles";
import { color } from "../../utility/colors/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { uuid } from "../../utility/constants";
import { deviceWidth } from "../../utility/styleHelper/appStyle";

const ChatBox = ({ userId, msg, img, onImgTap }) => {
  let isCurrentUser = userId === uuid ? true : false;
  // alert(msg)
  return (
    <Card
      transparent
      style={{
        maxWidth: deviceWidth / 2 + 10,
        alignSelf: isCurrentUser ? "flex-end" : "flex-start",
      }}
    >
      <View
        style={[
          styles.chatContainer,
          isCurrentUser && {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 0,
            // backgroundColor: color.DARK_GRAY,
          },
        ]}
      >
        {img ? (
          <CardItem cardBody>
            <TouchableOpacity onPress={onImgTap}>
              <Image
                source={{ uri: img }}
                resizeMode="cover"
                style={{ height: 200, width: deviceWidth / 2 }}
              />
            </TouchableOpacity>
          </CardItem>
        ) : (
          <Text
            style={[styles.chatTxt, isCurrentUser && { color: 'black' }]}
          >
            {msg}
          </Text>
        )}
      </View>
    </Card>
  );
};

export default ChatBox;
