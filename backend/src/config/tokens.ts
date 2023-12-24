import { SignOptions } from "jsonwebtoken";

const crypto = {

    privateKey: "",

    publicKey: "",

    signOptions: {
        
        algorithm: "RS256",

        expiresIn: "1d"

    } as SignOptions

};

export default crypto;