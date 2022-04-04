import * as React from "react";

import { extendTheme, NativeBaseProvider } from 'native-base';

import AppLoading from "expo-app-loading"
import { useFonts, BalsamiqSans_400Regular } from '@expo-google-fonts/balsamiq-sans';

import Container from './Container';

export default function App() {
  let [fontsLoaded] = useFonts({
    BalsamiqSans_400Regular,
  })

  const fontsConfig = {
    BalsamiqSans: {
      400: {
        normal: "BalsamiqSans_400Regular"
      }
    }
  }

  const theme = extendTheme({
    fontConfig: fontsConfig,
    font: {
      heading: "BalsamiqSans",
      body: "BalsamiqSans",
      mono: "BalsamiqSans"
    },
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <Container />
      </NativeBaseProvider>
    );
  }
}
