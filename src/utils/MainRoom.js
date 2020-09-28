export default (originalValue = "main", main = "main", room = null) => {
    if (originalValue.trim() != "" && originalValue != "main") return room || originalValue.trim();
    else return main;
}