import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import Navigation from './src/navigation'
import { appStore } from './src/redux/ConfigureStore'

import Loading from './src/loading/component'
import Alert from './src/alert/component'

export default function App() {
    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()

    return (
        <Provider store={appStore}>
            {isLoadingComplete ? (
                <SafeAreaProvider>
                    <Alert />
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                    <Loading />
                </SafeAreaProvider>
            ) : (
                []
            )}
        </Provider>
    )
}
