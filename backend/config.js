import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
const STRIPE_SECRET_KEY = "sk_test_51QTm8ZGqwAPcRAhaxxWFhNcU1YkR1rjikIa48xBzbO74NTqD5xOUwrN0gMM5VmFhULdqHqdQXPiZiDDYBsYJ4Adv00UqhIs0DR";

export default {
    JWT_SECRET,
    JWT_ADMIN_SECRET,
    STRIPE_SECRET_KEY,
};