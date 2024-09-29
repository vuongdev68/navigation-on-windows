import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";
const Tab = createStackNavigator();
const MainNavigator = () => {
  const navigation = useNavigation<any>();
 

  return (
    <>
        <View style={styles.content}>
          <Tab.Navigator
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
