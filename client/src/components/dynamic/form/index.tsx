import { ReactNode, useEffect, useState } from "react";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import IFormGeneratorField from "./interface";

const FormGeneratorPicker = ({ form, groupName }: { form: IFormGeneratorField, groupName?: string}) => {
    const [ data, setData ] = useState<string | number>(form?.defaultValue || '');
    
    useEffect(() => {
      if(form?.value !== undefined)
        setData(form.value);
    }, [ form.value ]);
    
    switch (form.type) {
        case ('select'):
            return (
                <>
                { form.label? <InputLabel className='mt-3'>{ form.label }</InputLabel> : null }
                <Select
                    name={ `${groupName || ''}${!!groupName? '.' : ''}${form.name}` }
                    value={ data }
                    onChange={ (e) => setData(e.target.value) }
                    defaultValue={ data }
                    fullWidth={ typeof form.fullWidth === "undefined"? true : form.fullWidth }
                    required={ form.required }
                >
                    { form.options?.map((option) => (
                        <MenuItem
                            disabled={ option?.disabled }
                            key={ option.value }
                            value={ option.value }
                        >{ option.label }</MenuItem>
                    )) }
                </Select>
                </>
            );
        case ('text'):
            return (
                <>
                { form.label? <InputLabel className='mt-3'>{ form.label }</InputLabel> : null }
                <TextField
                    name={ `${groupName || ''}${!!groupName? '.' : ''}${form.name}` }
                    value={ data }
                    onChange={ (e) => setData(typeof form?.transformer === "function"? form.transformer(e.target.value) : e.target.value) }
                    fullWidth={ typeof form.fullWidth === "undefined"? true : form.fullWidth }
                    placeholder={ form.placeholder || form.label }
                    required={ form.required }
                />
                </>
            );
        case ('textarea'):
            return (
                <>
                { form.label? <InputLabel className='mt-3'>{ form.label }</InputLabel> : null }
                <TextField
                    name={ `${groupName || ''}${!!groupName? '.' : ''}${form.name}` }
                    value={ data }
                    onChange={ (e) => setData(typeof form?.transformer === "function"? form.transformer(e.target.value) : e.target.value) }
                    multiline
                    fullWidth={ typeof form.fullWidth === "undefined"? true : form.fullWidth }
                    placeholder={ form.placeholder || form.label }
                    required={ form.required }
                />
                </>
            );
        case ('api'):
            return (
                <input
                    type="hidden"
                    name={ `${groupName || ''}${!!groupName? '.' : ''}${form.name}` }
                    value={ data }
                />
            );
        default:
            return null;
    }
}

export interface IFormGeneratorComponent
{
    children: JSX.Element | ReactNode,
    setLoading: (loading: boolean) => void,
    form: IFormGeneratorField[],
    id: string,
    groupName?: string,
    onSubmitEvent: <T = any>(e: T, setLoading: (loading: boolean) => void) => void,
    values?: any,
}

export const FormGeneratorComponent = ({
    children,
    setLoading,
    form,
    id,
    groupName,
    onSubmitEvent,
    values,
}: IFormGeneratorComponent) => {
    return (
        <form
            id={ id }
            onSubmit={ (e: any) => {
                e.preventDefault();
                setLoading(true);
                const data = new FormData(e.target);
                let formData: any = {};
                for(let [ key, value ] of data.entries()) {
                    const splitGroup = key.split('.');
                    if(splitGroup.length > 1) {
                        if(!formData[splitGroup[0]]) {
                            formData[splitGroup[0]] = {};
                        }
                        formData[splitGroup[0]][splitGroup[1]] = value;
                    } else {
                        if(!formData.data) {
                            formData.data = {};
                        }
                        formData.data[key] = value;
                    }
                }
                onSubmitEvent(formData, setLoading);
            }}
        > 
            { values?._id && <input type="hidden" name="_id" value={ values._id } /> }
            { form.map((field) => {
                let defVal = field.name? values?.[field.name] || field.value : field.value || field.defaultValue || '';
                return (
                <FormGeneratorPicker
                    key={ field.name }
                    form={ {...field, value: defVal } }
                    groupName={ groupName }
                />
            )}) }
            { children }
        </form>
    );
}

export default FormGeneratorComponent;