# Wallet setup

Updated the 14th of October 2024.

Talao and Altme wallets can be directly downloaded from the Google or Apple stores and used as is, but they can also be installed and configured with the Wallet Provider Backend support for extended functionality.

## Download and configure a wallet

### Download the wallet from the stores with the standard configurations

The links to download the wallets are:

* [Altme Google store](https://play.google.com/store/apps/details?id=co.altme.alt.me.altme&hl=en-US&pli=1)
* [Altme Apple store](https://apps.apple.com/fr/app/altme-wallet/id1633216869)
* [Talao Google store](https://play.google.com/store/apps/details?id=co.talao.wallet&hl=fr)
* [Talao Apple store](https://apps.apple.com/fr/app/talao-wallet/id1582183266?platform=iphone)


As any smartphone app users can download either Altme or Talao wallet for their Apple smartphone or Android device. In this case users can only access the predefined embedded configurations. Right now there are 5 predefined configuration named "Profiles" and one named "Custom" to allow manual settings. Below the main features of the 5 embedded profiles of the wallet:


| Profiles  | VC format              | OIDC4VCI | OIDC4VP |
| :---------- | ------------------------ | ---------- | --------- |
| Default   | ldp_vc                 | 11       | 13      |
| EBSI V3.x | jwt_vc                 | 11       | 18      |
| EBSI V4.0 | jwt_vc_json, sd-jwt vc | 13       | 20      |
| DIIP V2.1 | jwt_vc_json            | 13       | 18      |
| DIIP V3.0 | sd-jwt vc              | 13       | 20      |

In that scenario users can switch between the different profiles and even create their own very specific profile. The wallets propose a lots of technical options for advanced users and developers.


### Download the wallet and configure it with a QR code to get a specific configuration

**This feature requires a Wallet Provider Backend account.**

In this case users must first download the wallet from the store then scan the QR code provided to install the wallet to your device with a specific configuration defined in the wallet provider backend. The QR code could be displayed on website or could be sent by email or SMS as a deeplink. There are 2 types of users:

* standard users : they have a login/password and they are managed through the wallet provider backend. They can be suspended or even revoked if needed. They also have a personal access to the wallet provider backend to manage their own account,
* guest: they have no login/password, it is a public access to your onboard unknown users

**It is the best solution to deploy your wallet to a group of known people.**

### Download and configure the wallet in one step with an installation link

**This feature requires a Wallet Provider Backend account.**

In this case the link allowed your users to install the wallet to their device with a specific configuration defined in the wallet provider backend. The installation link is in the form of:

* `https://app.talao.co/install?password=guest&login=guest@identinet&wallet-provider=https://wallet-provider.talao.co `or
* `https://app.altme.io/install?password=guest&login=guest@identinet&wallet-provider=https://wallet-provider.talao.co`

The installation link is only available for guests.

**It is the best solution to deploy your wallet to a wide public**.

## Initial setup

Like any other smartphone app, user must initialize their wallet first. 2 options are proposed:

* import an account : users have previously saved their private keys through a passphrase in this app or in another wallet. they can recover their private keys,
* create an account: for new users.

They will be then asked to choose their mean of authentication as a PIN code, a biometric or both to get a more secure 2 factors authentication. If a PIN code is chosen, confirmation will be requested.

Nota Bene:

* in case of 3 wrong PIN codes, the wallet will delete the wallet data stored in the smartphone and will restart from scratch. In that situation all data and keys could be lost if user did not backup before,
* the import account option allow users to recover the private keys of their identity (DID) and eventually the private keys of their crypto accounts (Altme wallet). This porcess does not concern the verifiable credentials data which must be backuped and restored separatly.

In case of Altme wallet a specific step will be proposed to backup the new passphrase. If the wallet is used to manage crypto assets, it is highly recommended to keep a copy of this passphrase.
