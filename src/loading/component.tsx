import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { styles } from '../styles/styles'

import { View } from '../components/Themed'
import { RootState } from '../ts/types'

import TabTwoScreen from '../screens/TabTwoScreen'

const mapStateToProps = (state: RootState) => ({
    loading: state.loading.loading,
})

const Loading = (props) => {
    if (props.loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="black" />
            </View>
        )
    } else {
        return []
    }
}

export default connect(mapStateToProps)(Loading)
