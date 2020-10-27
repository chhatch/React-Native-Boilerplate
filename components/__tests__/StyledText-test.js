import * as React from 'react'
import renderer from 'react-test-renderer'

import { MonoText } from '../StyledText'

const text = 'Snapshot test!'

//putting text directly into <MonoText> caused a linting error about not being
//able to use text outside of <text>, but <MonoText> is a wraper for <Text> that applies a particular font
it(`renders correctly`, () => {
    const tree = renderer.create(<MonoText>{text}</MonoText>).toJSON()
    expect(tree).toMatchSnapshot()
})
