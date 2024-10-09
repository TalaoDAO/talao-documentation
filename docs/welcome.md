# Welcome

Updated the 9th of October 2024.

Here you will find the documentation concerning the technical use and integration of the Talao and Altme wallets. You will also find information concerning the use of the Wallet Provider Backend associated with these wallets.

## Wallets

The Talao and Altme wallets are mobile applications for collecting, storing and presenting certificates in the verifiable credentials format. These wallets store the data associated with these certificates, the cryptographic keys associated with these certificates and the exchange protocols between the different stakeholders of a Self Sovereign Identity architecture: the issuers (or attribute providers) and the verifiers (or Relying parties).
In addition to these features, the Altme wallet also allows you to manage the active cryptos of different blockchains.

## Wallet Provider Backend

The wallet provider backend is a web application that allows you to make the link between an organization, a project or a trusted environment (Trust framework) and the instance of a particular user's wallet. The essential role of the Wallet Provider Backend is to issue and sign a certificate to each instance of the wallet whose purpose is to prove that the instance complies with the security and quality policy of the ecosystem. Subsequently, taking advantage of this infrastructure, other roles have been assigned to the Wallet Provider Backend: activation and suspension of users, configuration of wallet instances, user support, etc.

## Standards

The SSI Talao and Altme wallets have been developed according to several standards and in particular:

for the verifiable credential formats:

- [The W3C verifiable credential data model 1.1](https://www.w3.org/TR/vc-data-model/)
- [The SD-JWT based verifiable credential IETF specification](https://www.ietf.org/archive/id/draft-ietf-oauth-sd-jwt-vc-01.html)

for protocols:

- [The OpenID for verifiable credential specifications](https://openid.net/sg/openid4vc/)
- [The W3C draft of Verifibale Presentation Request 2024](https://w3c-ccg.github.io/vp-request-spec/)

We also use specifications of ecosystems or technical profiles as:

* [EBSI](https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/Home)
* [EUDI wallet / ARF](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/1.1.0/arf/)
* [The Decentralized Identity Interop Profile](https://dutchblockchaincoalition.org/en/bouwstenen-2/diip-2)
* [The High Assurance Interoperability Profile](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-sd-jwt-vc-1_0.html)

## Notice

The Altme and Talao wallets are available in open source code on the [Talao github repository](https://github.com/TalaoDAO/AltMe), the wallet provider backend is offered in the form of a license agreement. The Talao and Altme wallets are autonomous and do not require access to the backend, however the latter is useful for a complex configuration of the wallet or for the deployment of projects in companies.
