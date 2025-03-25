import IFormGeneratorField from "../components/dynamic/form/interface";

export const filterChange = (e: React.ChangeEvent<HTMLInputElement>, func?: (v: string) => string): {[x: string]: string} => {
    const { name, value } = e.target;
    return { [name]: typeof func === "function"? func(value) : value };
};

export const mapForm = (form: IFormGeneratorField[], values: {[key: string]: string | number | boolean | undefined | null }) => {
    const formData: {[key: string]: string | number | boolean | undefined | null } = {};
    form.map((field) => {
        if(field.name && values[field.name])
            formData[field.name] = values[field.name];
    });
    return formData;
}