---
title: How to Create a Core NFT Asset
metaTitle: How to Create a Core NFT Asset | Core Guides
description: Learn how to create a Core NFT Asset on the Solana blockchain with the Metaplex Core javascript package.
# remember to update dates also in /components/guides/index.js
created: '06-16-2024'
updated: '06-18-2024'
---

This is an initial guide on how to create a next-gen Digital Asset NFT (Core Asset) on the Solana blockchain using the Metaplex MPL Core protocol. MPL Core Assets provide the next wave of NFT projects on Solana with greater creativity and a broad dynamic experience for both creators and owners with MPL Core's simplified design and unique plugin system.

## Prerequisite

- Code Editor of your choice (recommended Visual Studio Code)
- Node 18.x.x or above.

## Initial Setup

This guide will run through create of an NFT Core Asset with Javascript based on a single file script. You may need to modify and move functions around to suit your needs.

### Initializing

Start by initializing a new project (optional) with the package manager of your choice (npm, yarn, pnpm, bun) and fill in required details when prompted.

```js
npm init
```

### Required Packages

Install the required packages for this guide.

{% packagesUsed packages=["umi", "umiDefaults", "core", "@metaplex-foundation/umi-uploader-irys"] type="npm" /%}

```js
npm i @metaplex-foundation/umi
```

```js
npm i @metaplex-foundation/umi-bundle-defaults
```

```js
npm i @metaplex-foundation/mpl-core
```

```js
npm i @metaplex-foundation/umi-uploader-irys;
```

### Imports and Wrapper Function

Here we will define all needed imports for this particular guide and create a wrapper function where all our code will execute.

```ts
import { create, mplCore } from '@metaplex-foundation/mpl-core'
import {
  createGenericFile,
  generateSigner,
  signerIdentity,
  sol,
} from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import { base58 } from '@metaplex-foundation/umi/serializers'
import fs from 'fs'
import path from 'path'

// Create the wrapper function
const createNft = async () => {
  ///
  ///
  ///  all our code will go in here
  ///
  ///
}

// run the wrapper function
createNft()
```

## Setting up Umi

This example is going to run through setting up Umi with a `generatedSigner()`. If you wish to try this example with React you'll need to setup Umi via the `React - Umi w/ Wallet Adapter` guide. Apart from the the wallet setup this guide will for fileStorage keys and wallet adapter.

### Generating a New Wallet

```ts
const umi = createUmi('https://api.devnet.solana.com')
  .use(mplCore())
  .use(
    irysUploader({
      // mainnet address: "https://node1.irys.xyz"
      // devnet address: "https://devnet.irys.xyz"
      address: 'https://devnet.irys.xyz',
    })
  )

const signer = generateSigner(umi)

umi.use(signerIdentity(signer))

// This will airdrop SOL on devnet only for testing.
console.log('Airdropping 1 SOL to identity')
await umi.rpc.airdrop(umi.identity.publickey, sol(1))
```

### Use an Existing Wallet Locally

```ts
const umi = createUmi('https://api.devnet.solana.com')
  .use(mplCore())
  .use(irysUploader())

// Generate a new keypair signer.
const signer = generateSigner(umi)

// You will need to us fs and navigate the filesystem to
// load the wallet you wish to use via relative pathing.
const walletFile = fs.readFileSync('./keypair.json')
  

// Convert your walletFile onto a keypair.
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(walletFile));

// Load the keypair into umi.
umi.use(keypairIdentity(umiSigner));
```

## Creating the NFT

### Uploading the Image

The first thing we need to do is to an image that represents the NFT and makes it recognizable. This can be in the form of jpeg, png or gif.

Umi comes with downloadable storage plugins that allow you to upload to storage solutions such Arweave, NftStorage, AWS, and ShdwDrive. At start of this guide we had installed the `irysUploader()` plugin which stores content on the Arweave blockchain so we'll stick with using that.

{% callout title="Local script/Node.js" %}
This example is using a local script/node.js approach using Irys to upload to Arweave. If you wish to upload files to a different storage provider or from the browser you will need to take a different approach. Importing and using `fs` won't work in a browser scenario.
{% /callout %}

```ts
// use `fs` to read file via a string path.

const imageFile = fs.readFileSync('./assets/my-image.jpg')

// Use `createGenericFile` to transform the file into a `GenericFile` type
// that umi can understand. Make sure you set the mimi tag type correctly
// otherwise Arweave will not know how to display your image.

const umiImageFile = createGenericFile(imageFile, 'my-image.jpeg', {
  tags: [{ name: 'Content-Type', value: 'image/jpeg' }],
})

// Here we upload the image to Arweave via Irys and we get returned a uri
// address where the file is located. You can log this out but as the
// uploader can takes an array of files it also returns an array of uris.
// To get the uri we want we can call index [0] in the array.

const imageUri = await umi.uploader.upload([umiImageFile]).catch((err) => {
  throw new Error(err)
})

console.log(imageUri[0])
```

### Uploading the Metadata

Once we have a valid and working image URI we can start working on the metadata for our token.

the standard for offchain metadata for a fungible token is as follows. This should be filled out and writen to either an object `{}` without Javascript or saved to a `metadata.json` file.
We are going to look at the Javascript object approach.

```ts
const metadata = {
  name: 'My NFT',
  description: 'This is an NFT on Solana',
  image: imageUri[0],
  external_url: 'https://example.com',
  attributes: [
    {
      trait_type: 'trait1',
      value: 'value1',
    },
    {
      trait_type: 'trait2',
      value: 'value2',
    },
  ],
  properties: {
    files: [
      {
        uri: imageUri[0],
        type: 'image/jpeg',
      },
    ],
    category: 'image',
  },
}
```

The fields here include:

| field         | description                                                                                                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name          | The name of your NFT.                                                                                                                                                                     |
| description   | The description of your NFT.                                                                                                                                                              |
| image         | This will be set to the `imageUri` (or any online location of the image) that we uploaded previously.                                                                                     |
| animation_url | This will be set to the `animation_ulr` (or any online location of the video/glb) that you've uploaded.                                                                                   |
| external_url  | This would link to an external address of your choice. This is normally the projects website.                                                                                             |
| attributes    | Using an object og `{trait_type: vlue, "value": "value1"}`                                                                                                                                |
| image         | This will be set to the `imageUri` (or any online location of the image) that we uploaded previously.                                                                                     |
| properties    | Contains the `files` field that takes an `[] array` of `{uri: string, type: mimeType}`. Also contains the category field which can be set to `image`, `audio`, `video`, `vfx`, and `html` |

#### Uploading the Metadata Json File

```js
// Call upon umi's `uploadJson()` function to upload our metadata to Arweave via Irys.

const metadataUri = await umi.uploader.uploadJson(metadata).catch((err) => {
  throw new Error(err)
})
```

Now if all has gone to plan we should have the URI of JSON file stored in the `metadataUri` providing it did not throw any errors.

### Minting the NFT Core Asset

From here we can use the `create` function from the `mpl-core` package to create our Core Asset NFT.

```ts
const assetSigner = generateSigner(umi)

const tx = await create(umi, {
  asset: nftSigner,
  name: 'My NFT',
  uri: metadataUri,
}).sendAndConfirm(umi)
```

### Loggin Out The Details

```ts
  // Log out the signature and the links to the transaction and the NFT.
  console.log('\nNFT Created')
  console.log('View Transaction on Solana Explorer')
  console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)
  console.log('\n')
  console.log('View NFT on Metaplex Explorer')
  console.log(`https://core.metaplex.com/explorer/${nftSigner.publicKey}?env=devnet`)
```

## Full Code Example

```ts
import { create } from '@metaplex-foundation/mpl-core'
import {
  createGenericFile,
  generateSigner,
  signerIdentity,
  sol,
} from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { base58 } from '@metaplex-foundation/umi/serializers'
import fs from 'fs'
import path from 'path'

const createNft = async () => {
  //
  // ** Setting Up Umi **
  //

  const umi = createUmi('https://api.devnet.solana.com')
    .use(mplCore())
    .use(
      irysUploader({
        // mainnet address: "https://node1.irys.xyz"
        // devnet address: "https://devnet.irys.xyz"
        address: 'https://devnet.irys.xyz',
      })
    )

  const signer = generateSigner(umi)

  umi.use(signerIdentity(signer))

  // Airdrop 1 SOL to the identity
  // if you end up with a 429 too many requests error, you may have to use
  // the filesystem wallet method or change rpcs.
  console.log('Airdropping 1 SOL to identity')
  await umi.rpc.airdrop(umi.identity.publicKey, sol(1))

  //
  // ** Upload an image to Arweave **
  //

  // use `fs` to read file via a string path.
  // You will need to understand the concept of pathing from a computing perspective.

  const imageFile = fs.readFileSync(
    path.join('./image.png')
  )

  // Use `createGenericFile` to transform the file into a `GenericFile` type
  // that umi can understand. Make sure you set the mimi tag type correctly
  // otherwise Arweave will not know how to display your image.

  const umiImageFile = createGenericFile(imageFile, 'image.png', {
    tags: [{ name: 'Content-Type', value: 'image/png' }],
  })

  // Here we upload the image to Arweave via Irys and we get returned a uri
  // address where the file is located. You can log this out but as the
  // uploader can takes an array of files it also returns an array of uris.
  // To get the uri we want we can call index [0] in the array.
  console.log('Uploading Image...')
  const imageUri = await umi.uploader.upload([umiImageFile]).catch((err) => {
    throw new Error(err)
  })

  console.log('imageUri: ' + imageUri[0])

  //
  // ** Upload Metadata to Arweave **
  //

  const metadata = {
    name: 'My NFT',
    description: 'This is an NFT on Solana',
    image: imageUri[0],
    external_url: 'https://example.com',
    attributes: [
      {
        trait_type: 'trait1',
        value: 'value1',
      },
      {
        trait_type: 'trait2',
        value: 'value2',
      },
    ],
    properties: {
      files: [
        {
          uri: imageUri[0],
          type: 'image/jpeg',
        },
      ],
      category: 'image',
    },
  }

  // Call upon umi's `uploadJson` function to upload our metadata to Arweave via Irys.

  console.log('Uploading Metadata...')
  const metadataUri = await umi.uploader.uploadJson(metadata).catch((err) => {
    throw new Error(err)
  })

  //
  // ** Creating the NFT **
  //

  // We generate a signer for the NFT
  const nftSigner = generateSigner(umi)

  console.log('Creating NFT...')
  const tx = await create(umi, {
    asset: nftSigner,
    name: 'My NFT',
    uri: metadataUri,
  }).sendAndConfirm(umi)

  // Finally we can deserialize the signature that we can check on chain.
  const signature = base58.deserialize(tx.signature)[0]

  // Log out the signature and the links to the transaction and the NFT.
  console.log('\nNFT Created')
  console.log('View Transaction on Solana Explorer')
  console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)
  console.log('\n')
  console.log('View NFT on Metaplex Explorer')
  console.log(`https://core.metaplex.com/explorer/${nftSigner.publicKey}?env=devnet`)
}

createNft()
```
