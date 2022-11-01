export default (value: any) : Array<any> => {
    return Array.isArray(value) ? value : [];
}