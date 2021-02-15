import * as React from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes, { InferProps } from 'prop-types'

import { Text, TextProps, View } from '../components/Themed'
import { RootState } from '../ts/types'

import { alertStyles } from '../styles/styles'

const mapStateToProps = (state: RootState) => ({
    alerts: state.alert.alerts,
})

const propTypes = {
    alerts: PropTypes.array.isRequired,
}

type Props = InferProps<typeof propTypes>

const Alert: React.FC<Props> = ({ alerts }) => {
    if (alerts.length === 0) {
        return <Text />
    } else {
        return (
            <View style={alertStyles.alertContainer}>
                {alerts.map((alert) => {
                    let alertType = alert.alertType || 'success'
                    //must verify alertType exists
                    //check exists on alertStyles?
                    if (alert.alertType) alertType == alert.alertType
                    return (
                        <Text key={alert.id} style={alertStyles[alertType]}>
                            {alert.msg}
                        </Text>
                    )
                })}
            </View>
        )
    }
}

export default connect(mapStateToProps)(Alert)
