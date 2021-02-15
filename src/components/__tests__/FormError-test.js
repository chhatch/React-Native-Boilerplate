import * as React from 'react'
import renderer from 'react-test-renderer'

import FormError from '../FormError'
import { styles } from '../../styles/styles'

const message = 'Snapshot test!'
const style = styles.formError

it(`renders an error`, () => {
    const tree = renderer.create(<FormError isError={true} message={message} style={style} />).toJSON()
    expect(tree).toMatchSnapshot()
})

it(`does not render an error`, () => {
    const tree = renderer.create(<FormError isError={false} message={message} style={style} />).toJSON()
    expect(tree).toMatchSnapshot()
})
