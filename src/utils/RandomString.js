class RandomString extends String {
    constructor(length = 32, lowerCase = true, upperCase = true, digits = true) {
        let chars = "";

        if (digits) chars += "0123456789";
        if (lowerCase) chars += "abcdefghijklmnopqrstuvwxyz";
        if (upperCase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        let str = "";

        for (let i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }

        super(str);
    }
}

export default RandomString;