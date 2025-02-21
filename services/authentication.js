import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export function createTokenForUser(user) {
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, "supersecret" , { expiresIn: "1h" });
    return token;
}
