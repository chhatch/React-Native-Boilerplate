import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import PropTypes, { InferProps } from 'prop-types'
import { StackNavigationProp } from '@react-navigation/stack'

import { styles } from '../styles/styles'

import { AppDispatch, RootState } from '../ts/types'
import { confirmUser, signUp } from '../auth/thunks'
import FormError from '../components/FormError'

const mapStateToProps = (state: RootState) => {
    return { signUpEmail: state.auth.user.email }
}

const actionCreators = { confirmUser, signUp }

const propTypes = {
    confirmUser: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
    signUpEmail: PropTypes.string.isRequired,
    signUp: PropTypes.func.isRequired,
}

type Props = InferProps<typeof propTypes>

const SignUpScreen: React.FC<Props> = ({
    confirmUser,
    navigation,
    signUpEmail,
    signUp,
}) => {
    const { control, getValues, handleSubmit, errors, setValue } = useForm()
    const onChangeField = (name: string) => (text: string) =>
        setValue(name, text)
    const onSubmit = (data, e) =>
        signUp(data.email.toLowerCase(), data.password)

    const authCode = useRef('')
    const onChangeText = (variable: string) => (code: string) => {
        authCode.current = code
    }

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <TextInput
                        placeholder="Email"
                        onChangeText={onChangeField('email')}
                        style={styles.input}
                    />
                )}
                name="email"
                rules={{ required: true }}
                defaultValue="Email Address"
            />
            <FormError
                isError={errors.email}
                message={'This is required'}
                style={styles.formError}
            />

            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={onChangeField('password')}
                        style={styles.input}
                    />
                )}
                name="password"
                rules={{ required: true }}
                defaultValue=""
            />
            <FormError
                isError={errors.password}
                message={'This is required'}
                style={styles.formError}
            />

            <TextInput
                placeholder="Input Code"
                onChangeText={(value) => onChangeText('authCode')(value)}
                style={styles.input}
            />
            <FormError
                isError={errors.code}
                message={'This is required'}
                style={styles.formError}
            />

            <View style={styles.button}>
                <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
            </View>
            <Button
                title="Confirm User"
                onPress={() => confirmUser(signUpEmail, authCode.current)}
            />
        </View>
    )
}

export default connect(mapStateToProps, actionCreators)(SignUpScreen)
