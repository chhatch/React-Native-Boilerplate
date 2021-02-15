import React from 'react'
import { connect } from 'react-redux'
import PropTypes, { InferProps } from 'prop-types'

import AuthNavigator from './AuthNavigator'
import BottomTabNavigator from './BottomTabNavigator'

import { AppDispatch, RootState } from '../ts/types'

const mapStateToProps = (state: RootState) => {
    const auth = state.auth.authenticated
    return {auth}
}

const propTypes = {
    auth: PropTypes.bool.isRequired,
}

type Props = InferProps<typeof propTypes>


const Root: React.FC<Props> = ({auth}) => {
    if (auth) return <BottomTabNavigator />
    return <AuthNavigator />
}

export default connect(mapStateToProps)(Root)
