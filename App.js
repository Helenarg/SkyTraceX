import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import LanguageScreen from "./screens/LanguageScreen";
import RegisterEmailScreen from "./screens/RegisterEmailScreen";
import RegisterMobileScreen from "./screens/RegisterMobileScreen";
import OtpScreen from "./screens/OtpScreen";
import LoginEmailScreen from "./screens/LoginEmailScreen";
import { AuthProvider } from "./context/AuthProvider";
import Home from "./screens/Home";
import CommunityScreen from "./screens/CommunityScreen";
import Dashboard from "./screens/roles/Dashboard";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";

import SelectRoleScreen from "./screens/SelectRoleScreen";
import SubRoleScreen from "./screens/SubRoleScreen";
import Farmer from "./screens/roles/Farmer";
import Fisherman from "./screens/roles/Fisherman";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="RegisterEmail" component={RegisterEmailScreen} />
        <Stack.Screen name="RegisterMobile" component={RegisterMobileScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="LoginEmail" component={LoginEmailScreen} />
        <Stack.Screen name="SubRoleScreen" component={SubRoleScreen} />
        <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
        <Stack.Screen name="Fisherman" component={Fisherman} />
        <Stack.Screen name="Farmer" component={Farmer} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}
