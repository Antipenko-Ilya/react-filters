import React from 'react';
import { Checkbox as AntCheckbox } from 'antd';

interface CheckboxProps {
    onChange: (value: boolean) => void;
    label: string;
}

export const Checkbox : React.FunctionComponent<CheckboxProps> = ({
    onChange,
    label
}) => {
    function handleChange(e: any) {
        onChange(e.target.checked);
    }
    return (
        <div>
            {label}
            <AntCheckbox onChange={handleChange} />
        </div>
    );
};

// https://github.com/ant-design/ant-design/blob/master/components/checkbox/Checkbox.tsx