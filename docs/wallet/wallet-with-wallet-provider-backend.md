# Wallet with Wallet Provider Backend

Updated the 14th of October 2024.

The Wallet Provider Backend is a web application for managing the wallets that an organization makes available to its employees or users. This application allows advanced customization of the wallet, whether in terms of branding or technical parameters, choice of attestation formats and issuers available directly in the wallet. The Wallet Provider Backend also allows fine management of users and their wallets (revocation, suspension, etc.). The Wallet Provider Backend is based on the ARF architecture and issues in particular the Wallet Instance Attestation (WIA) which certifies the origin of the wallet and the cryptographic material used (Trust Chain). This application is installed on an AWS server on a French site.

With the wallet provider backend it is possible to customize the wallet and in particular:

- create organizations or projects of wallet users,
- add or desactivate users in an orgnization,
- adapt the look and feel of the mobile app,
- simplify the interface of the app to hide the features that are useless for the use case,
- customize the technical parameters of the wallet app to the ecosystem profile,
- get QR code to configure a wallet and installation links to download and configures wallest in one step,
- add issuers links embedded in et wwallet app,
- use chat and notification services to support users.

After defining a configuration in the web application it is possible to configure the wallet by scanning a QR code with the app camera.

## Examples of configurations with QR code

You can use these QR codes when the wallet app **is already installed** on your smartphone.

[**Simple Wallet**](https://wallet-provider.talao.co/configuration/webpage?login=guest@Simple%20Wallet&password=MALJGM&wallet-provider=https://wallet-provider.talao.co/) demonstrates how one can simplify the interface, change titles, colors and logos. Open the Talao or Altme wallet app and scan the QR code of the link. Reset the wallet if needed as only one configuration is allowed.

[**EUDI wallet**](https://wallet-provider.talao.co/configuration/webpage?login=guest@EUDI&password=AIXGCH&wallet-provider=https://wallet-provider.talao.co/) is the configuration to integrate the wallet in an ARF ecosystem.Open the Talao or Altme wallet app and scan the QR code of the link. Reset the wallet if needed as only one configuration is allowed.

## Examples of installation links

You can use these links when the wallet app **is not installed** on your smartphone.

If users click on these links inside the smartphone (in an email, SMS, or in the browser), the link will redirect users to the Apple or Google stores and then the wallet will download the configuration automatically.

Simple Wallet link: `https://app.talao.co/install?password=guest&login=guest@Simple Wallet&wallet-provider=https://wallet-provider.talao.co`

EUDI wallet link: `https://app.talao.co/install?password=guest&login=guest@EUDI&wallet-provider=https://wallet-provider.talao.co`

Copy the link. The link must be used with the smartphone inside an email, an SMS or on the smartphone browser. To test the link with your own smartphone, remove the wallet app from your smartphone. For iphone users, you need to remove the wallet cache first as the removal of the app is not enough. The way to do it is :

- open the Talao or Altme wallet,
- enter 3 wrong PINs,
- delete the account,
- remove the app.

## Update the configuration

If you update the configuration on the Wallet Provider Backend, users must download the new configuration to their wallet instance to take advantage of the new features. To do that they can clic on the "Update your wallet config now" option in the settings menu.

You can send a notification to alert all users through the notification services offered by the Wallet Provider Backend.
