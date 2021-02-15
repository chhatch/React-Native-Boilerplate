import * as React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'

import LoadingComponent from '../component'

const mockStore = configureStore([])

describe('Loading component', () => {
    it('should show loading if loading', () => {
        store = mockStore({
            loading: {
                loading: true,
            },
        })
        const tree = renderer
            .create(
                <Provider store={store}>
                    <LoadingComponent />
                </Provider>
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('should not show loading if not loading', () => {
        store = mockStore({
            loading: {
                loading: false,
            },
        })
        const tree = renderer
            .create(
                <Provider store={store}>
                    <LoadingComponent />
                </Provider>
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})
