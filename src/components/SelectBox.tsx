import React, { useRef } from 'react'
import { ViewStyle } from 'react-native'
import { Picker } from '@react-native-picker/picker'

type Option = { label: string; value: string }
type Options = Option[]

interface ISelectBox {
    defaultValue: string
    onChange: Function
    options: Options
    prompt: string
    style: ViewStyle
}
const SelectBox = ({
    defaultValue,
    onChange,
    options,
    prompt,
    style,
}: ISelectBox) => {
    const val = useRef(defaultValue)
    return (
        <Picker
            selectedValue={val.current}
            style={style}
            onValueChange={(itemValue, itemIndex) => {
                val.current = itemValue
                onChange(itemValue)
            }}
            prompt={prompt}
        >
            {options.map(({ label, value }: IOption, index: number) => (
                <Picker.Item label={label} value={value} key={index} />
            ))}
        </Picker>
    )
}

export default SelectBox
