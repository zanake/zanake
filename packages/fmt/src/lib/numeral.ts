export default (value: string | number) :string => {
    try {
        return (value || '').toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    } catch (error) {
        const parts = (value || '').toString().split('.');

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }
};