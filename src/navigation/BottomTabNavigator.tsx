import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { connect } from 'react-redux'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import TabOneScreen from '../screens/TabOneScreen'
import TabTwoScreen from '../screens/TabTwoScreen'
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

const mapStateToProps = (state: RootState) => {
    return {
        role: state.auth.user.role,
    }
}

function BottomTabNavigator({ role }: { role: string }) {
    const colorScheme = useColorScheme()
    const isAdmin = role === 'ADMIN' || role === 'GLOBAL_ADMIN'
    const isGlobal = role === 'GLOBAL_ADMIN'

    return (
        <BottomTab.Navigator
            initialRouteName="TabOne"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
        >
            <BottomTab.Screen
                name="TabOne"
                component={TabOneNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="ios-code" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="TabTwo"
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="ios-code" color={color} />
                    ),
                }}
            />
            {isGlobal ? (
                <BottomTab.Screen
                    name="Global Admin"
                    component={TabOneNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <TabBarIcon name="ios-code" color={color} />
                        ),
                    }}
                />
            ) : (
                null
            )}
            {isAdmin ? (
            <BottomTab.Screen
                name="Admin"
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="ios-code" color={color} />
                    ),
                }}
            />
            ) : (
                null
            )}
        </BottomTab.Navigator>
    )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>()

function TabOneNavigator() {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="TabOneScreen"
                component={TabOneScreen}
                options={{ headerTitle: 'Tab One Title' }}
            />
        </TabOneStack.Navigator>
    )
}

const TabTwoStack = createStackNavigator<TabTwoParamList>()

function TabTwoNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="TabTwoScreen"
                component={TabTwoScreen}
                options={{ headerTitle: 'Tab Two Title' }}
            />
        </TabTwoStack.Navigator>
    )
}

export default connect(mapStateToProps)(BottomTabNavigator)
