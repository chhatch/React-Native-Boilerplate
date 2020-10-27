import React, { useRef, useEffect } from 'react'
import { Button, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import PropTypes, { InferProps } from 'prop-types'

import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'

import { fetchTest, setTest } from '../redux/ActionCreators'

import { AppDispatch, RootState } from '../ts/types'

const mapStateToProps = (state: RootState) => {
    const test = state.test
    return test
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    //returning the void operator prevents react complaining about a returned value to useEffect
    fetchTest: () => void dispatch(fetchTest),
    setTest: (val: string) => void dispatch(setTest(val)),
})

const propTypes = {
    fetchTest: PropTypes.func.isRequired,
    setTest: PropTypes.func.isRequired,
    test: PropTypes.string.isRequired,
}

type Props = InferProps<typeof propTypes>

const TabOneScreen: React.FC<Props> = (props) => {
    const newValue: any = useRef()
    const setNewValue = (val: string) => (newValue.current = val)
    useEffect(() => {
        props.fetchTest()
        newValue.current = ''
    }, [])
    console.log('props', props)

    return (
        <View style={styles.container}>
            <Text style={styles.title}> {'Tab One Value: ' + props.test} </Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <EditScreenInfo path="/screens/TabOneScreen.js" />
            <TextInput
                placeholder="Enter new value here.."
                //this cause a rerender on every keystroke
                onChangeText={(val) => {
                    console.log(newValue)
                    setNewValue(val)
                }}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
            <Button
                onPress={() => props.setTest(newValue.current)}
                title="Button"
            />
        </View>
    )
}

TabOneScreen.propTypes = propTypes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(TabOneScreen)
