import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { Button, Text, TextInput, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import PropTypes, { InferProps } from 'prop-types'
import { StackNavigationProp } from '@react-navigation/stack'

import { styles } from '../styles/styles'

import { AppDispatch, RootState } from '../ts/types'
import { signIn } from '../auth/thunks'
import FormError from '../components/FormError'
import { loading } from '../loading/thunks'

const mapStateToProps = (state: RootState) => {
    return {}
}

const actionCreators = { loading, signIn }

const propTypes = {
    navigation: StackNavigationProp,
    signIn: PropTypes.func.isRequired,
}

type Props = InferProps<typeof propTypes>

const SignInScreen: React.FC<Props> = ({ loading, navigation, signIn }) => {
    const { control, getValues, handleSubmit, errors, setValue } = useForm()
    const onChangeField = (name: string) => (text: string) =>
        setValue(name, text)
    const onSubmit = (data, e) =>
        loading(signIn(data.email.toLowerCase(), data.password))

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
                defaultValue="Password"
            />
            <FormError
                isError={errors.password}
                message={'This is required'}
                style={styles.formError}
            />

            <View style={styles.button}>
                <Button title="Sign In" onPress={handleSubmit(onSubmit)} />
            </View>

            <View style={styles.button}>
                <Button
                    title="Don't have an account? Sign up here."
                    onPress={() => navigation.navigate('sign-up')}
                />
            </View>
        </View>
    )
}

export default connect(mapStateToProps, actionCreators)(SignInScreen)
