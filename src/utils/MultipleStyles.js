export default styles => {
    let string = "";

    for (const style of styles) {
        string += style + ' ';
    }

    return string;
}