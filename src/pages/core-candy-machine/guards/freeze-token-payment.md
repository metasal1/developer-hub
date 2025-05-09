---
title: 'Freeze Token Payment Guard'
metaTitle: 'Freeze Token Payment Guard | Core Candy Machine'
description: "The Core Candy Machine 'Freeze Token Payment' guard allows you to set an SPL Token as the currency of minting and its value while also freezing the minted Core NFT Assets upon purchase for a set duration of time."
---

## Overview

The **Freeze Token Payment** guard allows minting frozen Assets by charging the payer a specific amount of tokens from a certain mint account. Frozen Assets cannot be transferred or listed on any marketplaces until thawed.

Frozen Assets can be thawed by anyone as long as one of the following conditions is met:

- The Candy Machine has minted out.
- The Candy Machine was deleted.
- The configured Freeze Period — which can be a maximum of 30 days — has passed.

The tokens are transferred to a "Freeze Escrow" account which must be initialized by the Candy Guard authority before minting can start. Once all Frozen Assets have been thawed, the funds can be unlocked and transferred to the configured destination account by the Candy Guard authority.

You may initialize the Freeze Escrow account, thaw Assets and unlock funds [via the route instruction](#route-instruction) of this guard.

{% diagram  %}

{% node #initialize label="Initialize Freeze Escrow" theme="indigo" /%}
{% node parent="initialize"  theme="transparent" x="-8" y="-1" %}
①
{% /node %}
{% edge from="initialize" to="freezeEscrow-pda" path="straight" /%}
{% node #freezeEscrow-pda label="Freeze Escrow PDA" theme="slate" parent="initialize" x="15" y="70" /%}
{% node theme="transparent" parent="freezeEscrow-pda" x="178" y="-15"%}
Funds are transferred

to the escrow account
{% /node %}
{% node #mintFrozen label="Mint Frozen Assets" theme="indigo" parent="initialize" x="250" /%}
{% node parent="mintFrozen"  theme="transparent" x="-8" y="-1" %}
②
{% /node %}
{% edge from="mintFrozen" to="frozen-Asset-bg2" path="straight" /%}
{% edge from="mintFrozen" to="freezeEscrow-pda" toPosition="right" fromPosition="bottom" /%}
{% node #frozen-Asset-bg2 label="Frozen Asset" theme="slate" parent="frozen-Asset" x="-10" y="-10" /%}
{% node #frozen-Asset-bg1 label="Frozen Asset" theme="slate" parent="frozen-Asset" x="-5" y="-5" /%}
{% node #frozen-Asset label="Frozen Asset" theme="slate" parent="mintFrozen" x="33" y="120" /%}

{% node #clock label="🕑" theme="transparent" parent="mintFrozen" x="165" y="-30" /%}
{% edge from="clock" to="clockDesc" arrow="none" theme="dimmed" path="straight" /%}
{% node #clockDesc  theme="transparent" parent="clock" y="220" x="-91" %}
_When all Assets have been minted_

_OR at the end of the freeze period._
{% /node %}

{% edge from="frozen-Asset" to="thawed-Asset-bg2" path="straight" /%}

{% node #thaw label="Thaw Assets" theme="indigo" parent="mintFrozen" x="200" /%}
{% node parent="thaw"  theme="transparent" x="-8" y="-1" %}
③
{% /node %}
{% edge from="thaw" to="thawed-Asset-bg2" path="straight" /%}
{% node #thawed-Asset-bg2 label="Thawed Asset" theme="slate" parent="thawed-Asset" x="-10" y="-10" /%}
{% node #thawed-Asset-bg1 label="Thawed Asset" theme="slate" parent="thawed-Asset" x="-5" y="-5" /%}
{% node #thawed-Asset label="Thawed Asset" theme="slate" parent="thaw" y="130" x="3" /%}


{% node #clock2 label="🕑" theme="transparent" parent="thaw" x="130" y="-30" /%}
{% edge from="clock2" to="clockDesc2" arrow="none" theme="dimmed" path="straight" /%}
{% node #clockDesc2  theme="transparent" parent="clock2" y="260" x="-91" %}
_When all Assets have been thawed._
{% /node %}

{% node #unlock label="Unlock Funds" theme="indigo" parent="thaw" x="180" /%}
{% node parent="unlock"  theme="transparent" x="-8" y="-1"%}
④
{% /node %}
{% node #freezeEscrow-pda2 label="Freeze Escrow PDA" theme="slate" parent="unlock" x="-20" y="70" /%}
{% edge from="freezeEscrow-pda2" to="treasury" theme="dimmed" path="straight" /%}
{% node #treasury label="Treasury" theme="slate" parent="freezeEscrow-pda2" y="70" x="40" /%}

{% /diagram %}
## Guard Settings

The Freeze Token Payment guard contains the following settings:

- **Amount**: The number of tokens to charge the payer.
- **Mint**: The address of the mint account defining the SPL Token we want to pay with.
- **Destination Associated Token Address (ATA)**: The address of the associated token account to eventually send the tokens to. We can get this address by finding the Associated Token Address PDA using the **Mint** attribute and the address of any wallet that should receive these tokens.

{% dialect-switcher title="Set up a Candy Machine using the Freeze Token Payment guard" %}
{% dialect title="JavaScript" id="js" %}
{% totem %}

Here’s how we can create a Candy Machine using the Freeze Token Payment guard. Note that, in this example, we’re using Umi's identity as the destination wallet.

```tsx
import { findAssociatedTokenPda } from "@metaplex-foundation/mpl-toolbox";

create(umi, {
  // ...
  guards: {
    freezeTokenPayment: some({
      amount: 300,
      mint: tokenMint.publicKey,
      destinationAta: findAssociatedTokenPda(umi, {
        mint: tokenMint.publicKey,
        owner: umi.identity.publicKey,
      }),
    }),
  },
});
```

{% /totem %}
{% /dialect %}
{% /dialect-switcher %}

## Mint Settings

The Freeze Token Payment guard contains the following Mint Settings:

- **Mint**: The address of the mint account defining the SPL Token we want to pay with.
- **Destination Associated Token Address (ATA)**: The address of the associated token account to eventually send the tokens to.

Note that, if you’re planning on constructing instructions without the help of our SDKs, you will need to provide these Mint Settings and more as a combination of instruction arguments and remaining accounts. See the [Candy Guard’s program documentation](https://github.com/metaplex-foundation/mpl-core-candy-machine/tree/main/programs/candy-guard#freezetokenpayment) for more details.

{% dialect-switcher title="Set up a Candy Machine using the Freeze Token Payment Guard" %}
{% dialect title="JavaScript" id="js" %}
{% totem %}

You may pass the Mint Settings of the Freeze Token Payment guard using the `mintArgs` argument like so.

```ts
mintV1(umi, {
  // ...
  mintArgs: {
    freezeTokenPayment: some({
      mint: tokenMint.publicKey,
      destinationAta,
    }),
  },
});
```

{% /totem %}
{% /dialect %}
{% /dialect-switcher %}

## Route Instruction

The Freeze Token Payment route instruction supports the following features.

- [Overview](#overview)
- [Guard Settings](#guard-settings)
- [Mint Settings](#mint-settings)
- [Route Instruction](#route-instruction)
  - [Initialize the Freeze Escrow](#initialize-the-freeze-escrow)
  - [Thaw a Frozen Asset](#thaw-a-frozen-asset)
  - [Unlock Funds](#unlock-funds)
- [Stop Freezing Assets](#stop-freezing-assets)
- [Freeze Escrows and Guard Groups](#freeze-escrows-and-guard-groups)

### Initialize the Freeze Escrow

_Path: `initialize`_

When using the Freeze Token Payment guard, we must initialize the Freeze Escrow account before minting can start. This will create a PDA account derived from the Destination ATA attribute of the guard's settings.

The Freeze Escrow PDA account will keep track of several parameters such as:

- How many Frozen Assets were minted through this guard.
- When was the first Frozen Asset minted via this guard as the Freeze Period starts counting after that.

When initializing this Freeze Escrow account, we must provide the following arguments to the route instruction of the guard:

- **Path** = `initialize`: Selects the path to execute in the route instruction.
- **Mint**: The address of the mint account defining the SPL Token we want to pay with.
- **Destination Associated Token Address (ATA)**: The address of the associated token account to eventually send the tokens to.
- **Period**: The amount of time in seconds that the Freeze Period should last. This can be a maximum of 30 days (2,592,000 seconds) and it will start from the very first Frozen Asset minted via this guard. The Freeze Period provides a safety mechanism to ensure Frozen Assets can eventually be thawed even if the Candy Machine never mints out.
- **Candy Guard Authority**: The authority of the Candy Guard account as a Signer.

{% diagram  %}

{% node %}
{% node #candy-machine label="Candy Machine" theme="blue" /%}
{% node theme="dimmed" %}

Owner: Candy Machine Core Program {% .whitespace-nowrap %}

{% /node %}
{% /node %}

{% node parent="candy-machine" y="100" x="22" %}
{% node #candy-guard label="Candy Guard" theme="blue" /%}
{% node label="Owner: Candy Guard Program" theme="dimmed" /%}
{% node #guards label="Guards" theme="mint" z=1/%}
{% node #freezeTokenPayment label="Freeze Token Payment" /%}
{% node #amount label="Amount = 300"  /%}
{% node #mint label="Mint"  /%}
{% node #destination-ata label="Destination ATA" /%}
{% node label="..." /%}
{% /node %}

{% node parent="candy-machine" x="415" %}
  {% node #candy-guard-route theme="pink" %}
    Route with Path {% .whitespace-nowrap %}
    
    = *Initialize*
  {% /node %}
  {% node parent="candy-guard-route" theme="pink" %}
    Candy Machine Guard Program {% .whitespace-nowrap %}
  {% /node %}
{% /node %}
{% node parent="candy-guard-route" y="-20" x="-4" theme="transparent" %}
  Initialize Freeze Escrow
{% /node %}

{% node #freeze-period parent="candy-guard-route" x="220" y="14" label="Freeze Period" theme="slate" /%}
{% edge from="freeze-period" to="candy-guard-route" theme="pink" path="straight" /%}

{% edge from="amount" to="candy-guard-route" theme="pink" toPosition="left" /%}


{% edge from="candy-guard-route" to="freezeEscrow-PDA3" theme="pink" path="straight" y="-10" /%}

{% node #freezeEscrow-PDA3 parent="destination-ata" x="397" y="-10" %}
  Freeze Escrow PDA
{% /node %}

{% edge from="candy-guard" to="candy-machine" /%}

{% edge from="destination-ata" to="freezeEscrow-PDA3" arrow="none" dashed=true path="straight" /%}

{% edge from="candy-guard-route" to="mint-candy-machine" path="straight" /%}

{% /diagram %}

Last but not least, the Freeze Escrow PDA account will receive the funds of all Frozen Assets minted through this guard.

{% diagram  %}

{% node %}
{% node #candy-machine label="Candy Machine" theme="blue" /%}
{% node theme="dimmed" %}
Owner: Candy Machine Core Program {% .whitespace-nowrap %}
{% /node %}
{% /node %}

{% node parent="candy-machine" y="100" x="21" %}
{% node #candy-guard label="Candy Guard" theme="blue" /%}
{% node label="Owner: Candy Guard Program" theme="dimmed" /%}
{% node #guards label="Guards" theme="mint" z=1 /%}
{% node #freezeTokenPayment label="Freeze Token Payment" /%}
{% node #amount label="Amount = 300"  /%}
{% node #mint label="Mint"  /%}
{% node #destination-ata label="Destination ATA" /%}
{% node label="..." /%}
{% /node %}

{% node #freezeEscrow-PDA4 parent="destination-ata" x="300" y="-8" theme="slate" %}
  Freeze Escrow PDA
{% /node %}
{% edge from="destination-ata" to="freezeEscrow-PDA4" arrow="none" dashed=true path="straight" /%}

{% node parent="candy-machine" x="600" %}
  {% node #mint-candy-guard theme="pink" %}
    Route with
    
    Path = *Initialize*
  {% /node %}
    {% node parent="candy-guard-route" theme="pink" %}
    Candy Machine Guard Program {% .whitespace-nowrap %}
  {% /node %}
{% /node %}
{% node parent="mint-candy-guard" y="-20" x="100" theme="transparent" %}
  Access Control
{% /node %}
{% edge from="mint-candy-guard" to="freezeEscrow-PDA4" theme="pink" toPosition="top"/%}
{% node parent="freezeEscrow-PDA4" y="-250" x="90" theme="transparent" %}
  Transfer 300 tokens

  to the Freeze Escrow's

  Associated Token Address
{% /node %}

{% node parent="mint-candy-guard" y="150" x="2" %}
  {% node #mint-candy-machine theme="pink" %}
    Mint
  {% /node %}
  {% node parent="mint-candy-guard" theme="pink" %}
    Candy Machine Core Program {% .whitespace-nowrap %}
  {% /node %}
{% /node %}
{% node parent="mint-candy-machine" y="-20" x="120" theme="transparent" %}
  Mint Logic
{% /node %}


{% edge from="mint-candy-machine" to="frozen-Asset" path="straight" /%}
{% node #frozen-Asset parent="mint-candy-machine" y="120" x="31" theme="slate" %}
  Frozen Asset
{% /node %}

{% edge from="candy-guard" to="candy-machine" /%}

{% edge from="mint-candy-guard" to="mint-candy-machine" path="straight" /%}

{% /diagram %}

{% seperator h="6" /%}

{% dialect-switcher title="Initialize the Freeze Escrow" %}
{% dialect title="JavaScript" id="js" %}
{% totem %}

In the example below, we initialize the Freeze Escrow account with a maximum Freeze Period of 15 days and we use the current identity as the Core Candy Guard authority.

```ts
route(umi, {
  // ...
  guard: "freezeTokenPayment",
  routeArgs: {
    path: "initialize",
    mint: tokenMint.publicKey,
    destinationAta,
    period: 15 * 24 * 60 * 60, // 15 days.
    candyGuardAuthority: umi.identity,
  },
});
```

{% /totem %}
{% /dialect %}
{% /dialect-switcher %}

### Thaw a Frozen Asset

_Path: `thaw`_

Frozen Assets can be thawed by anyone as long as one of the following conditions is met:

- The Core Candy Machine has minted out.
- The Core Candy Machine was deleted.
- The configured Freeze Period — which can be a maximum of 30 days — has passed.

Note that since the tokens in the Freeze Escrow are not transferrable until all Assets are thawed, this creates an incentive for the treasury to thaw all Assets as soon as possible.

To thaw a Frozen Asset, we must provide the following arguments to the route instruction of the guard:

- **Path** = `thaw`: Selects the path to execute in the route instruction.
- **Mint**: The address of the mint account defining the SPL Token we want to pay with.
- **Destination Associated Token Address (ATA)**: The address of the associated token account to eventually send the tokens to.
- **Asset Address**: The mint address of the Frozen Asset to thaw.
- **Asset Owner**: The address of the owner of the Frozen Asset to thaw.

{% diagram  %}

{% node %}
{% node #candy-machine label="Candy Machine" theme="blue" /%}
{% node theme="dimmed" %}
  Candy Machine Core Program {% .whitespace-nowrap %}
{% /node %}
{% /node %}

{% node parent="candy-machine" y="100" x="-3" %}
{% node #candy-guard label="Candy Guard" theme="blue" /%}
{% node theme="dimmed" %}
Candy Machine Guard Program {% .whitespace-nowrap %}
{% /node %}
{% node #guards label="Guards" theme="mint" z=1 /%}
{% node #freezeTokenPayment label="Freeze Token Payment" /%}
{% node #amount label="Amount = 300"  /%}
{% node #mint label="Mint"  /%}
{% node #destination-ata label="Destination ATA" /%}
{% node label="..." /%}
{% /node %}

{% node parent="candy-machine" x="427" y="-14" %}
  {% node #candy-guard-route theme="pink" %}
    Route with
    
    Path = *thaw*
  {% /node %}
  {% node parent="mint-candy-guard" theme="pink" %}
    Candy Machine Core Program {% .whitespace-nowrap %}
  {% /node %}
{% /node %}
{% node parent="candy-guard-route" y="-20" x="80" theme="transparent" %}
  Thaw a Frozen Asset
{% /node %}

{% node #freeze-period parent="candy-guard-route" x="218" y="15" label="Freeze Escrow PDA" /%}
{% edge from="freeze-period" to="candy-guard-route" theme="pink" path="straight" /%}

{% edge from="candy-machine" to="candy-guard-route" theme="pink" /%}
{% edge from="candy-guard" to="candy-guard-route" theme="pink" toPosition="left" /%}
{% edge from="amount" to="candy-guard-route" theme="pink" toPosition="left" /%}


{% edge from="candy-guard-route" to="freezeEscrow-PDA5" theme="pink" path="straight" /%}

{% node #frozen-Asset parent="candy-guard-route" y="-100" x="29" label="Frozen Asset" /%}
{% edge from="frozen-Asset" to="candy-guard-route" path="straight" /%}

{% node #freezeEscrow-PDA5 parent="candy-guard-route" x="25" y="150" label="Thawed Asset" /%}
{% edge from="candy-guard" to="candy-machine" /%}

{% edge from="candy-guard-guards" to="guards" /%}
{% edge from="candy-guard-route" to="mint-candy-machine" path="straight" /%}

{% /diagram %}

{% seperator h="6" /%}

{% dialect-switcher title="Set up a Candy Machine using the Freeze Token Payment guard" %}
{% dialect title="JavaScript" id="js" %}
{% totem %}

In the example below, we thaw a Frozen Asset that belongs to the current identity.

```ts
route(umi, {
  // ...
  guard: "freezeTokenPayment",
  routeArgs: {
    path: "thaw",
    mint: tokenMint.publicKey,
    destinationAta,
    AssetMint: AssetMint.publicKey,
    AssetOwner: umi.identity.publicKey,
    AssetTokenStandard: candyMachine.tokenStandard,
  },
});
```

{% /totem %}
{% /dialect %}
{% /dialect-switcher %}

### Unlock Funds

_Path: `unlockFunds`_

Once all Frozen Assets have been thawed, the treasury can unlock the funds from the Freeze Escrow account. This will transfer the tokens to the configured Destination ATA address.

To unlock the funds, we must provide the following arguments to the route instruction of the guard:

- **Path** = `unlockFunds`: Selects the path to execute in the route instruction.
- **Mint**: The address of the mint account defining the SPL Token we want to pay with.
- **Destination Associated Token Address (ATA)**: The address of the associated token account to eventually send the tokens to.
- **Candy Guard Authority**: The authority of the Core Candy Guard account as a Signer.

{% diagram  %}

{% node %}
{% node #candy-machine label="Candy Machine" theme="blue" /%}
{% node theme="dimmed" %}
Owner: Candy Machine Core Program
{% /node %}
{% /node %}

{% node parent="candy-machine" y="100" x="19" %}
{% node #candy-guard label="Candy Guard" theme="blue" /%}
{% node theme="dimmed" %}
Candy Machine Guard Program {% .whitespace-nowrap %}
{% /node %}
{% node #guards label="Guards" theme="mint" z=1 /%}
{% node #freezeTokenPayment label="Freeze Token Payment" /%}
{% node #amount label="- Amount"  /%}
{% node #mint label="- Mint" /%}
{% node #destination-ata label="- Destination ATA" /%}
{% node label="..." /%}
{% /node %}
{% edge from="destination-ata" to="token-account" arrow="none" dashed=true arrow="none" /%}

{% node parent="candy-machine" x="600" %}
  {% node #candy-guard-route theme="pink" %}
    Route with
    
    Path = *unlockFunds*
  {% /node %}
  {% node parent="mint-candy-guard" theme="pink" %}
    Candy Machine Guard Program {% .whitespace-nowrap %}
  {% /node %}
{% /node %}

{% node parent="candy-guard-route" y="-32" x="95" theme="transparent" %}
  Unlock funds 
  
  from the escrow
{% /node %}

{% node #freeze-escrow parent="candy-guard-route" y="100" x="2" label="Freeze Escrow PDA" /%}
{% edge from="freeze-escrow" to="candy-guard-route" theme="pink" path="straight" /%}

{% edge from="guards" to="candy-guard-route" theme="pink" toPosition="top" /%}

{% node parent="candy-guard" x="300" y="29" %}
{% node #mint-account label="Mint Account" theme="blue" /%}
{% node theme="dimmed" %}
Owner: Token Program {% .whitespace-nowrap %}
{% /node %}
{% /node %}
{% edge from="mint" to="mint-account" arrow="none" dashed=true arrow="none" /%}
{% edge from="mint-account" to="token-account" /%}

{% node parent="mint-account" y="100" %}
{% node #token-account theme="blue" %}
Token Account {% .whitespace-nowrap %}
{% /node %}
{% node theme="dimmed" %}
Owner: Token Program {% .whitespace-nowrap %}
{% /node %}
{% /node %}

{% node parent="token-account" y="90" x="-40" %}
{% node #destination-wallet label="Destination Wallet" theme="indigo" /%}
{% node theme="dimmed" %}
Owner: Candy Machine Core Program  {% .whitespace-nowrap %}
{% /node %}
{% /node %}
{% edge from="token-account" to="destination-wallet" arrow="none" /%}
{% edge from="candy-guard-route" to="token-account" theme="pink" /%}
{% node parent="token-account" theme="transparent" x="210" y="-20" %}
Transfer all funds from

the Freeze Escrow Account
{% /node %}

{% edge from="candy-guard" to="candy-machine" /%}

{% edge from="candy-guard-guards" to="guards" /%}

{% /diagram %}

{% seperator h="6" /%}

{% dialect-switcher title="Set up a Candy Machine using the Freeze Token Payment Guard" %}
{% dialect title="JavaScript" id="js" %}
{% totem %}

In the example below, we unlock the funds from the Freeze Escrow account using the current identity as the Candy Guard authority.

```ts
route(umi, {
  // ...
  guard: 'freezeTokenPayment',
  routeArgs: {
    path: 'unlockFunds',
    destination,
    candyGuardAuthority: umi.identity,
  },
})
```

API References: [route](https://mpl-core-candy-machine.typedoc.metaplex.com/functions/route.html), [freezeTokenPaymentRouteArgsUnlockFunds](https://mpl-core-candy-machine.typedoc.metaplex.com/types/FreezeTokenPaymentRouteArgsUnlockFunds.html)

{% /totem %}
{% /dialect %}
{% /dialect-switcher %}

## Stop Freezing Assets

It is possible to stop the freezing of Assets within a Freeze Token Payment guard. In other words, new-minted Assets will no longer be frozen but **existing Frozen Assets will remain frozen**.

There are several ways of achieving this, which can be separated into two categories:

- ☀️ **Can Thaw**: Existing Frozen Assets can be thawed by anyone using the `thaw` path of the route instruction.
- ❄️ **Cannot Thaw**: Existing Frozen Assets cannot be thawed yet and we have to wait for one "Can Thaw" condition to be met.

With that in mind, here is the exhaustive list of ways to stop freezing Assets and whether or not each of them allows thawing existing Frozen Assets:

- The Candy Machine has minted out → ☀️ **Can Thaw**.
- The configured Freeze Period — which can be a maximum of 30 days — has passed → ☀️ **Can Thaw**.
- The Candy Machine account was deleted → ☀️ **Can Thaw**.
- The Candy Guard account was deleted → ❄️ **Cannot Thaw**.
- The Freeze Token Payment guard was removed from the settings → ❄️ **Cannot Thaw**.

## Freeze Escrows and Guard Groups

When using multiple Freeze Token Payment guards within various [Guard Groups](/core-candy-machine/guard-groups), it is important to understand the relationship between a Freeze Token Payment guard and a Freeze Escrow account.

The Freeze Escrow account is a PDA derived from a Destination address. This means that if **multiple Freeze Token Payment guards** are configured to use the **same Destination address**, they will all **share the same Freeze Escrow account**.

Therefore, they will also share the same Freeze Period and all funds will be collected by the same escrow account. This also means, we only need to call the `initialize` route instruction once per configured Destination address.This implies that the route instruction is only required once per the configured Destination address.  Same applies for `unlockFunds`. To `thaw` you can use whichever label you like provided that those shared the same escrow account.

It is also possible to use multiple Freeze Token Payment guards with different Destination addresses. In this case, each Freeze Token Payment guard will have its own Freeze Escrow account and its own Freeze Period.

The example below illustrates a Candy Machine with three Freeze Token Payment guards in three groups such that:

- Groups 1 and 2 share the same Destination address and therefore the same Freeze Escrow account.
- Group 3 has its own Destination address and therefore its own Freeze Escrow account.

{% diagram  %}

{% node %}
{% node #candy-machine label="Candy Machine" theme="blue" /%}
{% node theme="dimmed" %}
Owner: Candy Machine Core Program {% .whitespace-nowrap %}
{% /node %}
{% /node %}

{% node parent="candy-machine" y="100" x="21" %}
{% node #candy-guard label="Candy Guard" theme="blue" /%}
{% node label="Owner: Candy Guard Program" theme="dimmed" /%}
{% node #guards label="Guard Group 1" theme="mint" /%}
{% node #freezeTokenPayment label="Freeze Token Payment" /%}
{% node #amount label="Amount = 300" /%}
{% node #mint label="Mint" /%}
{% node #destination-ata label="Destination ATA A" /%}
{% node label="..." /%}
{% node #guards-2 label="Guard Group 2" theme="mint" /%}
{% node #freezeTokenPayment-2 label="Freeze Token Payment" /%}
{% node #amount-2 label="Amount = 300" /%}
{% node #mint-2 label="Mint" /%}
{% node #destination-2 label="Destination ATA A" /%}
{% node label="..." /%}
{% node #guards-3 label="Guard Group 3" theme="mint" /%}
{% node #freezeTokenPayment-3 label="Freeze Token Payment" /%}
{% node #amount-3 label="Amount = 300" /%}
{% node #mint-3 label="Mint" /%}
{% node #destination-3 label="Destination ATA B" /%}
{% node label="..." /%}
{% /node %}
{% /node %}

{% node #freezeEscrow-PDA-A parent="destination-ata" x="213" y="-23" %}
  Freeze Escrow PDA

  For Destination A
{% /node %}
{% edge from="destination-ata" to="freezeEscrow-PDA-A" arrow="none" dashed=true path="straight" /%}
{% edge from="destination-2" to="freezeEscrow-PDA-A" arrow="none" dashed=true toPosition="bottom" /%}

{% node parent="freezeEscrow-PDA-A" y="-125" x="-4" %}
  {% node #route-init-a theme="pink" %}
    Route with 
    
    Path = *Initialize*
  {% /node %}
  {% node theme="pink" %}
    Candy Machine Guard Program {% .whitespace-nowrap %}
  {% /node %}
{% /node %}
{% node parent="route-init-a" y="-20" x="50" theme="transparent" %}
  Initialize Freeze Escrow
{% /node %}
{% edge from="route-init-a" to="freezeEscrow-PDA-A" theme="pink" path="straight" /%}

{% node #freeze-period-a parent="route-init-a" x="240" y="15" theme="slate" %}
  Freeze Period A
{% /node %}
{% edge from="freeze-period-a" to="route-init-a" theme="pink" path="straight" /%}

{% node #freezeEscrow-PDA-B parent="destination-3" x="420" y="-22" %}
  Freeze Escrow PDA

  For Destination B
{% /node %}
{% edge from="destination-3" to="freezeEscrow-PDA-B" arrow="none" dashed=true path="straight" /%}

{% node parent="freezeEscrow-PDA-B" y="-125" x="-4" %}
  {% node #route-init-b theme="pink" %}
    Route with 
    
    Path = *Initialize*
  {% /node %}
  {% node theme="pink" %}
    Candy Machine Guard Program {% .whitespace-nowrap %}
  {% /node %}
{% /node %}
{% node parent="route-init-b" y="-20" x="50" theme="transparent" %}
  Initialize Freeze Escrow
{% /node %}
{% edge from="route-init-b" to="freezeEscrow-PDA-B" theme="pink" path="straight" /%}

{% node #freeze-period-b parent="route-init-b" x="240" y="15" theme="slate" %}
  Freeze Period B
{% /node %}
{% edge from="freeze-period-b" to="route-init-b" theme="pink" path="straight" /%}

{% edge from="candy-guard" to="candy-machine" /%}

{% /diagram %}