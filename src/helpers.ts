import dotenv from "dotenv";
dotenv.config();

export const secretKey = (): Uint8Array => {
	let secret = process.env.SECRET_KEY;
	if (!secret) throw new Error("not 8 bit int array of secret key bytes");

	let split = secret.split(",");
	let arr = split.splice(1, split.length - 2).map(Number);
	let first_el = split[0].substring(1, split[0].length);
	let last_el = split[1].substring(1, split[0].length - 1);

	let final = [first_el, ...arr, last_el].map(Number);
	return Uint8Array.from(final);
};

secretKey();
