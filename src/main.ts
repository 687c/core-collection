import {
	createCollectionV1,
	createV1 as createCoreAsset,
	fetchAssetV1,
	pluginAuthorityPair,
	ruleSet,
} from "@metaplex-foundation/mpl-core";
import {
	createSignerFromKeypair,
	generateSigner,
	keypairIdentity,
	keypairPayer,
	percentAmount,
	Program,
	publicKey,
	transactionBuilder,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import { clusterApiUrl } from "@solana/web3.js";
import dotenv from "dotenv";
import { secretKey } from "./helpers";

dotenv.config();

// const umi = createUmi(
// 	`https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`
// );

const umi = createUmi(clusterApiUrl("devnet"));

const keypair = umi.eddsa.createKeypairFromSecretKey(secretKey());

umi.use(keypairIdentity(keypair)); /* .use(mplTokenMetadata()); */

// mint collection
// create a metaplex core collection
async function mintCoreCollection() {
	const collection = generateSigner(umi);
	await createCollectionV1(umi, {
		collection: collection,
		name: `Kobeni Supremacy`,
		uri: "https://raw.githubusercontent.com/687c/solana-nft-native-client/main/metadata.json",
	}).sendAndConfirm(umi);

	await sleep();

	let noToMint = 10;
	for (let i = 1; i <= noToMint; i++) {
		const asset = generateSigner(umi);

		await createCoreAsset(umi, {
			asset,
			name: `Kobeni Supremacy ${i}`,
			uri: "https://raw.githubusercontent.com/687c/solana-nft-native-client/main/metadata.json",
			collection: collection.publicKey,
		}).sendAndConfirm(umi);

		console.log("minted ", i);

		await sleep(2500);
	}
}

const sleep = async (ms: number = 1000) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

mintCoreCollection().then().catch(console.error);
