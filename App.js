// // App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { AuthProvider } from './context/AuthProvider';

// import SplashScreen from './screens/SplashScreen';
// import LanguageScreen from './screens/LanguageScreen';
// import SelectRoleScreen from './screens/SelectRoleScreen';
// import SubRoleScreen from './screens/SubRoleScreen';
// import RegisterMobileScreen from './screens/RegisterMobileScreen';
// import OtpScreen from './screens/OtpScreen';
// import RegisterEmailScreen from './screens/RegisterEmailScreen';
// import LoginEmailScreen from './screens/LoginEmailScreen';
// import HomeScreen from './screens/HomeScreen';

// // role pages
// import Farmer from './screens/roles/Farmer';
// import Fisherman from './screens/roles/Fisherman';
// import GeneralUser from './screens/roles/GeneralUser';
// import WeatherEnthusiast from './screens/roles/WeatherEnthusiast';
// import Forecaster from './screens/roles/Forecaster';
// import OutdoorActivities from './screens/roles/OutdoorActivities';
// import Stargazer from './screens/roles/Stargazer';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Splash"
//           screenOptions={{
//             headerTintColor: '#fff',
//             headerStyle: { backgroundColor: 'transparent' },
//             headerBackTitleVisible: false
//           }}
//         >
//           <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Language" component={LanguageScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="SelectRole" component={SelectRoleScreen} options={{ title: 'Select Role' }} />
//           <Stack.Screen name="SubRole" component={SubRoleScreen} options={{ title: 'Select Subrole' }} />
//           <Stack.Screen name="RegisterMobile" component={RegisterMobileScreen} options={{ title: 'Register - Mobile' }} />
//           <Stack.Screen name="Otp" component={OtpScreen} options={{ title: 'Enter OTP' }} />
//           <Stack.Screen name="RegisterEmail" component={RegisterEmailScreen} options={{ title: 'Register - Email' }} />
//           <Stack.Screen name="LoginEmail" component={LoginEmailScreen} options={{ title: 'Login' }} />
//           <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: () => null, gestureEnabled: false }} />

//           {/* role screens */}
//           <Stack.Screen name="Farmer" component={Farmer} />
//           <Stack.Screen name="Fisherman" component={Fisherman} />
//           <Stack.Screen name="GeneralUser" component={GeneralUser} />
//           <Stack.Screen name="WeatherEnthusiast" component={WeatherEnthusiast} />
//           <Stack.Screen name="Forecaster" component={Forecaster} />
//           <Stack.Screen name="OutdoorActivities" component={OutdoorActivities} />
//           <Stack.Screen name="Stargazer" component={Stargazer} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }




// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import SplashScreen from "./screens/SplashScreen";
// import LanguageScreen from "./screens/LanguageScreen";
// import RegisterEmailScreen from "./screens/RegisterEmailScreen";
// import RegisterMobileScreen from "./screens/RegisterMobileScreen";
// import OtpScreen from "./screens/OtpScreen";
// import LoginEmailScreen from "./screens/LoginEmailScreen";
// // import LoginMobileScreen from "./screens/LoginMobileScreen";
// // import HomeScreen from "./screens/HomeScreen";


// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Language" component={LanguageScreen} />
//         <Stack.Screen name="RegisterEmail" component={RegisterEmailScreen} />
//         <Stack.Screen name="RegisterMobile" component={RegisterMobileScreen} />
//         <Stack.Screen name="Otp" component={OtpScreen} />
//         <Stack.Screen name="LoginEmail" component={LoginEmailScreen} />
//         {/* <Stack.Screen name="LoginMobile" component={LoginMobileScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} /> */}
        
        
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }








// // App.js
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import SplashScreen from "./screens/SplashScreen";
// import LanguageScreen from "./screens/LanguageScreen";
// import RegisterEmailScreen from "./screens/RegisterEmailScreen";
// import RegisterMobileScreen from "./screens/RegisterMobileScreen";
// import OtpScreen from "./screens/OtpScreen";
// import LoginEmailScreen from "./screens/LoginEmailScreen";
// import SelectRoleScreen from "./screens/SelectRoleScreen";
// import SubRoleScreen from "./screens/SubRoleScreen";
// import Farmer from "./screens/roles/Farmer";
// import Fisherman from "./screens/roles/Fisherman";
// // import Home from "./screens/Home";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
        
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Language" component={LanguageScreen} />
//         <Stack.Screen name="RegisterEmail" component={RegisterEmailScreen} />
//         <Stack.Screen name="RegisterMobile" component={RegisterMobileScreen} />
//         <Stack.Screen name="Otp" component={OtpScreen} />
//         <Stack.Screen name="LoginEmail" component={LoginEmailScreen} />
//         <Stack.Screen name="SelectRoleScreen" component={SelectRoleScreen} />
//         <Stack.Screen name="SubRoleScreen" component={SubRoleScreen} />
//         <Stack.Screen name="Farmer" component={Farmer} />
//         <Stack.Screen name="Fisherman" component={Fisherman} />
//         {/* <Stack.Screen name="Home" component={Home} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }




import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import SelectRoleScreen from "./screens/SelectRoleScreen";
import SubRoleScreen from "./screens/SubRoleScreen";
import Farmer from "./screens/roles/Farmer";
import Fisherman from "./screens/roles/Fisherman";
// import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectRoleScreen">
        <Stack.Screen
          name="SelectRoleScreen"
          component={SelectRoleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SubRoleScreen"  // Must match exactly what you use in navigation.navigate
          component={SubRoleScreen}
        />
        <Stack.Screen name="Farmer" component={Farmer} />
        <Stack.Screen name="Fisherman" component={Fisherman} />
        {/* <Stack.Screen name="Home" component={Home} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}










// // App.js
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";


// // Screens
// import SelectRoleScreen from "./screens/SelectRoleScreen";
// import SubRoleScreen from "./screens/SubRoleScreen";
// import RegisterEmail from "./screens/RegisterEmailScreen";
// import Farmer from "./screens/roles/Farmer";
// import Fisherman from "./screens/roles/Fisherman";
// // import Home from "./screens/Home";

// // Subrole screens
// import WeatherEnthusiast from "./screens/roles/WeatherEnthusiast";
// import ProfessionalForecaster from "./screens/roles/ProfessionalForecaster";
// import OutdoorActivities from "./screens/roles/OutdoorActivities";
// import Stargazer from "./screens/roles/Stargazer";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="SelectRoleScreen">
//         {/* Main Role Selection */}
//         <Stack.Screen
//           name="SelectRoleScreen"
//           component={SelectRoleScreen}
//           options={{ headerShown: false }}
//         />

//         {/* SubRole for General Users */}
//         <Stack.Screen
//           name="SubRoleScreen"
//           component={SubRoleScreen}
//           options={{ title: "Select Your Subrole" }}
//         />

//         {/* Registration */}
//         <Stack.Screen
//           name="RegisterEmailScreen"
//           component={RegisterEmail}
//           options={{ title: "Register with Email" }}
//         />

//         {/* Roles */}
//         <Stack.Screen name="Farmer" component={Farmer} />
//         <Stack.Screen name="Fisherman" component={Fisherman} />

//         {/* Home */}
//         {/* <Stack.Screen name="Home" component={Home} /> */}

//         {/* Subrole Screens */}
//         <Stack.Screen
//           name="WeatherEnthusiast"
//           component={WeatherEnthusiast}
//           options={{ title: "Weather Enthusiast" }}
//         />
//         <Stack.Screen
//           name="ProfessionalForecaster"
//           component={ProfessionalForecaster}
//           options={{ title: "Professional Forecaster" }}
//         />
//         <Stack.Screen
//           name="OutdoorActivities"
//           component={OutdoorActivities}
//           options={{ title: "Outdoor Activities" }}
//         />
//         <Stack.Screen
//           name="Stargazer"
//           component={Stargazer}
//           options={{ title: "Stargazers" }}
//         />
//       </Stack.Navigator>
      
//     </NavigationContainer>
//   );
// }












