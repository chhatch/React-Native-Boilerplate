import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export const styles = StyleSheet.create({
    input: {
        height: 50,
        backgroundColor: '#ededed',
        width: '33%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        marginBottom: 20,
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
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formError: {
        marginBottom: 20,
    },
})

interface Alerts {
    alertContainer: ViewStyle
    error: TextStyle
    success: TextStyle
}

export const alertStyles = StyleSheet.create<Alerts>({
    alertContainer: {
        marginTop: 63,
        position: 'absolute',
        width: width,
        zIndex: 999,
    },
    error: {
        backgroundColor: 'red',
        fontSize: 20,
    },
    success: {
        backgroundColor: 'green',
        fontSize: 20,
    },
})
