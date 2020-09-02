class EasilyReadable {
    createFunctions(className, array, method) {
        for (const f of array) {
            className.prototype[f] = function(args) {
                return method(f, args);
            } 
        }
    }
}

export default EasilyReadable;