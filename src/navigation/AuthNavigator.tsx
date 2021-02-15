import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createStackNavigator()

const AuthNavigator = () => (
        <Stack.Navigator initialRouteName="sign-in">
            <Stack.Screen name="sign-in" component={SignInScreen} options={{ title: 'Sign In' }} />
            <Stack.Screen name="sign-up" component={SignUpScreen} options={{ title: 'Sign Up' }} />
        </Stack.Navigator>
)

export default AuthNavigator
