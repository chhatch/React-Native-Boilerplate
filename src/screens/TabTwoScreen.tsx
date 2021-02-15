import * as React from 'react'
import { Button, StyleSheet } from 'react-native'
import * as Linking from 'expo-linking'
import { Table, Row, Rows } from 'react-native-table-component'
import { connect } from 'react-redux'

import { styles } from '../styles/styles'

import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'

import { logOut } from '../auth/.actionCreators'

function TabTwoScreen() {
     const testData = {
        tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
        tableData: [
            ['1', '2', '3', '4'],
            ['a', 'b', 'c', 'd'],
            ['TEST', '2', '3', '456\n789'],
            ['a', 'b', 'c', 'd'],
        ],
    }

   return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab Two</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <Button
                onPress={() =>
                    Linking.openURL(
                        'https://www.aedmarket.com/collections/new-aeds-1/products/defibtech-lifeline-view-aed'
                    )
                }
                title="Shopify Link"
            />
             <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row
                    data={testData.tableHead}
                    style={styles.head}
                    textStyle={styles.text}
                />
                <Rows data={testData.tableData} textStyle={styles.text} />
            </Table>
       </View>
    )
}

export default connect(null)(TabTwoScreen)
