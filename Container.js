import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons'

// Screen
import Calculator from "./src/screens/calculator";
import Notes from "./src/screens/notes";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTab() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Calculator') {
                        iconName = focused ? 'md-calculator-sharp' : 'md-calculator-outline';
                    } else if (route.name === 'Notes') {
                        iconName = focused ? 'md-list-circle-sharp' : 'md-list-circle-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Calculator" component={Calculator} />
            <Tab.Screen name="Notes" component={Notes} />
        </Tab.Navigator>
    );
}



export default function Container() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MyApp" component={MyTab} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}