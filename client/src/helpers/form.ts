export const filterChange = (e: React.ChangeEvent<HTMLInputElement>, func?: (v: string) => string): {[x: string]: string} => {
    const { name, value } = e.target;
    return { [name]: typeof func === "function"? func(value) : value };
};