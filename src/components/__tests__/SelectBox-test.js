import * as React from 'react'
import renderer from 'react-test-renderer'

import SelectBox from '../SelectBox'
import { styles } from '../../styles/styles'

const message = 'Snapshot test!'
const style = styles.formError


it(`renders a select box`, () => {
    const tree = renderer
        .create(
            <SelectBox
                defaultValue={'USER'}
                onChange={() => console.log('this is a test')}
                options={[
                    { label: 'GLOBAL_ADMIN', value: 'GLOBAL_ADMIN' },
                    { label: 'ADMIN', value: 'ADMIN' },
                    { label: 'USER', value: 'USER' },
                ]}
                prompt="organization"
                style={styles.input}
            />
        )
        .toJSON()
    expect(tree).toMatchSnapshot()
})
