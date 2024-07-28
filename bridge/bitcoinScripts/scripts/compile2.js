const bitcoin = require('bitcoinjs-lib');
const network = bitcoin.networks.regtest;
const { ECPairFactory } = require("ecpair");
const tinysecp = require('tiny-secp256k1');

const ECPair = ECPairFactory(tinysecp);

// Generate three key pairs (simulating three different users)
const keyPair1 = ECPair.fromPrivateKey(Buffer.from('', 'hex'), { network });
const keyPair2 = ECPair.fromPrivateKey(Buffer.from('', 'hex'), { network });
const keyPair3 = ECPair.fromPrivateKey(Buffer.from('', 'hex'), { network });

// Extract the public keys
const pubkey1 = keyPair1.publicKey;
console.log(pubkey1.toString('hex'));
const pubkey2 = keyPair2.publicKey;
console.log(pubkey2.toString('hex'));
const pubkey3 = keyPair3.publicKey;
console.log(pubkey3.toString('hex'));

// Create a 2-of-3 multisig redeem script
const redeemScript = bitcoin.payments.p2ms({
    m: 2, // 2 signatures required
    pubkeys: [pubkey1, pubkey2, pubkey3],
    network: network,
}).output;

// Create the P2SH address
const p2sh = bitcoin.payments.p2sh({
    redeem: { output: redeemScript, network },
    network: network,
});
console.log(p2sh.redeem.output.toString('hex'))

console.log("P2SH Address:", p2sh.address);