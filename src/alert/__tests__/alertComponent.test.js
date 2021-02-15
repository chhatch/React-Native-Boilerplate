import * as React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'

import AlertComponent from '../component'

const mockStore = configureStore([])

describe('Alert component', () => {
    it(`should render alerts if exist`, () => {
        store = mockStore({
            alert: {
                alerts: [
                    { id: 0, msg: 'test0', type: 'success' },
                    { id: 1, msg: 'test1', type: 'error' },
                ],
            },
        })
        const tree = renderer
            .create(
                <Provider store={store}>
                    <AlertComponent />
                </Provider>
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it(`should not render alerts if none`, () => {
        store = mockStore({
            alert: {
                alerts: [],
            },
        })
        const tree = renderer
            .create(
                <Provider store={store}>
                    <AlertComponent />
                </Provider>
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})
