import React, { useRef, useEffect } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'
import PropTypes, { InferProps } from 'prop-types'
import * as Linking from 'expo-linking'

import EditScreenInfo from '../components/EditScreenInfo'
import SelectBox from '../components/SelectBox'

import { logOut, updateUser } from '../auth/thunks'

import { styles } from '../styles/styles'

import { AppDispatch, RootState } from '../ts/types'

const mapStateToProps = (state: RootState) => {
    const user = state.auth.user
    return { user }
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    //returning the void operator prevents react complaining about a returned value to useEffect
    updateUser: (userData: any) => void dispatch(updateUser(userData)),
    logOut: () => void dispatch(logOut),
})

const propTypes = {
    updateUser: PropTypes.func.isRequired,
    user: PropTypes.any,
}

type Props = InferProps<typeof propTypes>

const TabOneScreen: React.FC<Props> = (props) => {
    const { control, getValues, handleSubmit, errors, setValue } = useForm()
    const onChangeField = (name: string) => (text: string) =>
        setValue(name, text)
    const onSubmit = (data, e) => props.updateUser(data)

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <TextInput
                        defaultValue={props.user.email}
                        disabled
                        onChangeText={onChangeField('email')}
                        style={styles.input}
                    />
                )}
                name="email"
                rules={{ required: true }}
                defaultValue={props.user.email}
            />
            {errors.email && <Text>This is required.</Text>}

            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <SelectBox
                        defaultValue={props.user.role}
                        onChange={onChangeField('role')}
                        options={[
                            { label: 'GLOBAL_ADMIN', value: 'GLOBAL_ADMIN' },
                            { label: 'ADMIN', value: 'ADMIN' },
                            { label: 'USER', value: 'USER' },
                        ]}
                        prompt="organization"
                        style={styles.input}
                    />
                )}
                name="role"
                rules={{ required: true }}
                defaultValue={props.user.role}
            />
            {errors.role && <Text>This is required.</Text>}

            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <SelectBox
                        defaultValue={props.user.organization}
                        onChange={onChangeField('organization')}
                        options={[
                            { label: 'Holy Paladins Order', value: 'hpo' },
                            { label: 'Blacksmiths Union', value: 'bu' },
                            { label: 'Conjurers Cabal', value: 'cc' },
                            { label: 'Thieves Guild', value: 'tg' },
                        ]}
                        prompt="organization"
                        style={styles.input}
                    />
                )}
                name="organization"
                rules={{ required: true }}
                defaultValue={props.user.organization}
            />
            {errors.organization && <Text>This is required.</Text>}

            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <TextInput
                        defaultValue={props.user.equipment}
                        onChangeText={(value) =>
                            console.log('New equipment!', value)
                        }
                        style={styles.input}
                    />
                )}
                name="equipment"
                rules={{ required: true }}
                defaultValue={props.user.equipment}
            />
            {errors.email && <Text>This is required.</Text>}

            <View style={styles.button}>
                <Button title="Update" onPress={handleSubmit(onSubmit)} />
            </View>
            <View style={styles.button}>
                <Button title="Log Out" onPress={props.logOut} />
            </View>
        </View>
    )
}

TabOneScreen.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(TabOneScreen)
