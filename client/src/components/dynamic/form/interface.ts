interface IFormGeneratorField
{
    value?: string | number,
    label?: string,
    name?: string,
    type: 'api' | 'text' | 'textarea' | 'select' | string,
    options?: { label: string, value: string, disabled?: boolean }[],
    required?: boolean,
    fullWidth?: boolean,
    defaultValue?: string,
    placeholder?: string,
    transformer?: (value: string) => string,
}

export default IFormGeneratorField;