# Overview

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

The Wallet Provider Backend is offered in the form of a commercial license. The Talao and Altme wallets are autonomous and do not require access to the backend, however the latter is useful for a complex configuration of the wallet or for the deployment of projects in companies.

To open an account to test the Wallet Provider Backend send us an email to [contact@talao.io](mailto:contact@talao.io).