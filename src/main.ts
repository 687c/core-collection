import {
	createCollectionV1,
	createV1 as createCoreAsset,
	fetchAssetV1,
	mplCore,
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
import { UINT_USER_KEYPAIR } from "./helpers";

dotenv.config();

// const umi = createUmi(
// 	`https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`
// );

const umi = createUmi(clusterApiUrl("devnet"));

const keypair = umi.eddsa.createKeypairFromSecretKey(UINT_USER_KEYPAIR);

umi.use(keypairIdentity(keypair)).use(mplCore());

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
	console.log("this is being called too sooon");

	let noToMint = 9;
	for (let i = 1; i <= noToMint; i++) {
		const asset = generateSigner(umi);

		await createCoreAsset(umi, {
			asset,
			collection: collection.publicKey,
			name: `Kobeni ${i}`,
			uri: "https://raw.githubusercontent.com/687c/solana-nft-native-client/main/metadata.json",
		}).sendAndConfirm(umi);

		console.log("minted ", i);
		await sleep(1000);
	}
}

const sleep = async (ms: number = 10000) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

mintCoreCollection().then().catch(console.error);
