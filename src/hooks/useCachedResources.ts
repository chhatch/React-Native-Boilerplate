import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'
import { connect } from 'react-redux'

import { loadAuthToken } from '../auth/services/loadAuthToken'

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false)

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync()

                // Load fonts
                await Promise.all([
                    Font.loadAsync({
                        ...Ionicons.font,
                        'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
                    }),
                    loadAuthToken(),
                ])
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e)
            } finally {
                setLoadingComplete(true)
                SplashScreen.hideAsync()
            }
        }

        loadResourcesAndDataAsync()
    }, [])

    return isLoadingComplete
}
