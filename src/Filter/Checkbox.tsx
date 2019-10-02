import React from 'react';
import { Checkbox as AntCheckbox } from 'antd';

interface CheckboxProps {
    defaultValue: boolean;
    onChange: (value: boolean) => void;
}

export const Checkbox : React.FunctionComponent<CheckboxProps> = ({
    defaultValue,
    onChange
}) => {
    function handleChange(e: any) {
        onChange(e.target.checked);
    }
    return <AntCheckbox onChange={handleChange} defaultChecked={defaultValue} />
};

// https://github.com/ant-design/ant-design/blob/master/components/checkbox/Checkbox.tsx