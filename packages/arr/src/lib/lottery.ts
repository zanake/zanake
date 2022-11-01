export default (value: Array<any>) : any => {
    const index = Math.floor(Math.random() * value.length)
    return value[index];
}