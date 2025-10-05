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
import Home from "./screens/HomeScreen";
import CommunityScreen from "./screens/CommunityScreen";
import Dashboard from "./screens/roles/Dashboard";

// import LoginMobileScreen from "./screens/LoginMobileScreen";
// import HomeScreen from "./screens/HomeScreen";
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
        {/* <Stack.Screen name="LoginMobile" component={LoginMobileScreen} />
        <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="SubRoleScreen" component={SubRoleScreen} />
        <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
        <Stack.Screen name="Fisherman" component={Fisherman} />
        <Stack.Screen name="Farmer" component={Farmer} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Community" component={CommunityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}
