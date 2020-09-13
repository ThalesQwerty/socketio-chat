export default (originalValue = "main", main = "main", room = null) => {
    if (originalValue.length > 0 && originalValue != "main") return room || originalValue;
    else return main;
}