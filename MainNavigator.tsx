import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";
import Home from "../screens/Home";
import RouteNames from "./RouteNames";
import Actions from "../screens/Actions";
import Chats from "../screens/Chats";
import Colors from "../assets/colors/Colors";
import CustomText from "../components/CustomText";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../reduxs/app/userSlice";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { RootState } from "../reduxs/store";
import TextToSpeech from "../screens/TextToSpeech";
import useHandleMessage from "../hooks/useHandleMessage";
import Overlay from "../screens/Overlay";
import GameNavigator from "./GameNavigator";
import SelectLanguage from "../components/SelectLanguage";
import { removeItem, setItem } from "../utils/storage";
import { signOut } from "../api/firebase/firebase";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createStackNavigator();

const MainNavigator = () => {
  const { i18n } = useTranslation();
  const navigation = useNavigation<any>();
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowDimensions();
  const [offset, setOffet] = useState(-width);
  const { userData, profiles } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  useHandleMessage();
  const signOutGoogle = async () => {
    const response = await fetch("https://accounts.google.com/Logout", {
      method: "GET",
      credentials: "include",
    });
    return response;
  };
  const onLogout = async () => {
    try {
      await signOutGoogle();
      await removeItem("user");
      await removeItem("tts_enabled");
      await removeItem("tts_ai_enabled");
      dispatch(setUserData(null));
      navigation.navigate(RouteNames.Home);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeLanguage = async (lng) => {
    await setItem("lng", JSON.stringify(lng));
    i18n.changeLanguage(lng);
  };

  return (
    <>
      {width <= 600 && (
        <View
          style={{
            flexDirection: "row",
            backgroundColor: Colors.primaryColor,
            paddingVertical: 10,
            height: 60,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              alignSelf: "center",
            }}
            onPress={() => {
              if (offset == 0) {
                setOffet(-width);
              } else {
                setOffet(0);
              }
            }}
          >
            <Image
              style={{ height: 30, width: 30 }}
              source={require("../assets/images/menu.png")}
            />
          </TouchableOpacity>
          <CustomText
            textKey={""}
            style={{
              fontSize: 40,
              fontWeight: "600",
              flex: 1,
              alignSelf: "center",
            }}
          >
            <CustomText
              textKey={""}
              style={{ color: "#d9a600", fontSize: 45, fontWeight: "bold" }}
            >
              V
            </CustomText>
            Live
          </CustomText>
        </View>
      )}
      <View style={styles.wrapper}>
        <View
          style={[
            styles.sidebar,
            width <= 600 && {
              position: "absolute",
              left: offset,
              width: "100%",
              height: "100%",
              backgroundColor: "#edece1",
              zIndex: 1,
            },
          ]}
        >
          {width > 600 && (
            <View
              style={{
                backgroundColor: Colors.primaryColor,
                paddingVertical: 20,
              }}
            >
              <CustomText
                textKey={""}
                style={{
                  fontSize: 40,
                  fontWeight: "600",
                  letterSpacing: 2,
                  alignSelf: "center",
                }}
              >
                <CustomText
                  textKey={""}
                  style={{ color: "#d9a600", fontSize: 45, fontWeight: "bold" }}
                >
                  V
                </CustomText>
                Live
                {userData?.subscriptionStatus === "pro" && (
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#d1005b",
                      fontWeight: "bold",
                      marginLeft: 10,
                    }}
                  >
                    PRO
                  </Text>
                )}
              </CustomText>
            </View>
          )}

          <TouchableOpacity
            style={{
              paddingVertical: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setOffet(-width);
              navigation.navigate(RouteNames.Home);
            }}
          >
            <CustomText
              textKey={"setup"}
              style={[
                activeIndex == 0
                  ? styles.textItemActive
                  : styles.textItemInactive,
              ]}
            >
              Setup
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setOffet(-width);
              navigation.navigate(RouteNames.GameNavigator);
            }}
          >
            <CustomText
              textKey={"games"}
              style={[
                activeIndex == 1
                  ? styles.textItemActive
                  : styles.textItemInactive,
              ]}
            >
              Games
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setOffet(-width);
              navigation.navigate(RouteNames.Actions);
            }}
          >
            <CustomText
              textKey={"action_event"}
              style={[
                activeIndex == 2
                  ? styles.textItemActive
                  : styles.textItemInactive,
              ]}
            >
              Actions and Events
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setOffet(-width);
              navigation.navigate(RouteNames.TextToSpeech);
            }}
          >
            <CustomText
              textKey={"text_to_speech"}
              style={[
                activeIndex == 3
                  ? styles.textItemActive
                  : styles.textItemInactive,
              ]}
            >
              Text to speech
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setOffet(-width);
              navigation.navigate(RouteNames.Overlay);
            }}
          >
            <CustomText
              textKey={"overlay"}
              style={[
                activeIndex == 4
                  ? styles.textItemActive
                  : styles.textItemInactive,
              ]}
            >
              Text to speech
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setOffet(-width);
              navigation.navigate(RouteNames.Chats);
            }}
          >
            <CustomText
              textKey={"view_chat"}
              style={[
                activeIndex == 5
                  ? styles.textItemActive
                  : styles.textItemInactive,
              ]}
            >
              View Chats
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onLogout}
            style={{
              padding: 10,
              width: "100%",
              position: "absolute",
              bottom: 60,
            }}
          >
            <CustomText
              textKey="logout"
              style={{
                color: "red",
                fontWeight: "900",
                alignSelf: "center",
                fontSize: 16,
              }}
            >
              Logout
            </CustomText>
          </TouchableOpacity>
          <View
            style={{
              padding: 10,
              width: "100%",
              position: "absolute",
              bottom: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <CustomText
              style={{
                fontSize: 14,
                fontWeight: "bold",
                alignSelf: "center",
                marginRight: 10,
              }}
              textKey="language"
            ></CustomText>
            <SelectLanguage
              language={i18n.language}
              onChangeLanguage={(e) => handleChangeLanguage(e.target.value)}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Tab.Navigator
            // tabBar={(props) => {
            //   const index = props.state.index;
            //   setActiveIndex(index);
            //   return null;
            // }} // Use custom tab bar
            screenOptions={{
              headerShown: false,
            }}
          >
            <Tab.Screen name={RouteNames.Home} component={Home} />
            <Tab.Screen
              name={RouteNames.GameNavigator}
              component={GameNavigator}
            />
            <Tab.Screen name={RouteNames.Actions} component={Actions} />
            <Tab.Screen
              name={RouteNames.TextToSpeech}
              component={TextToSpeech}
            />
            <Tab.Screen name={RouteNames.Overlay} component={Overlay} />
            <Tab.Screen name={RouteNames.Chats} component={Chats} />
          </Tab.Navigator>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 250,
    backgroundColor: "#edece1",
    height: "100%",
  },
  content: {
    flex: 1,
  },
  textItemInactive: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  textItemActive: {
    fontSize: 20,
    color: "#4738eb",
    fontWeight: "bold",
  },
  tabBar: {
    // flexDirection: "row",
    backgroundColor: Colors.primaryColor,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    height: "100%",
    width: 100,
    position: "absolute",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default MainNavigator;
