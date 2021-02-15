import React from 'react'
import { StyleProp, Text, View } from 'react-native'
import PropTypes, { InferProps } from 'prop-types'

//this will be done with a proper type, but this is the syntax for this approach
const FormError = ({isError, message, style}: {isError: bool, message: string, style: StyleProp}) => {
    return <Text style={style}>{isError ? message : ' '}</Text>
}

export default FormError
