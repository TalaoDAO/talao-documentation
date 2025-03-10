# Wallet features

Updated the 26th of February 2025.

## Protocols

* [OIDC4VC](https://openid.net/sg/openid4vc/):
  * OIDC4VCI Draft 11 and 13,
  * OIDC4VP Draft 20,
  * SIOPV2 Draft 12
* [W3C Verifiable presentation request](https://w3c-ccg.github.io/vp-request-spec/),
* VC formats:
  * [ldp_vc, jwt_vc_json, jwt_vc_json-ld](https://www.w3.org/TR/vc-data-model/),
  * [vc+sd-jwt vc](https://www.ietf.org/archive/id/draft-ietf-oauth-sd-jwt-vc-05.html).

### OIDC4VCI

* Flows : authorization code flow, pre-authorized code flow with Tx, PAR,
* credential_offer_uri,
* issuer endpoints supported : credential, deferred,
* wallet attestations, PKCE, scope and authorization details,
* client authentication methode : anonymous, client_id, client secret basic, client secret post, jwt,
* identifier : jwk thumbprint, [did:key](https://w3c-ccg.github.io/did-method-key/), [did:jwk](https://github.com/quartzjer/did-jwk/blob/main/spec.md),
* proof type : jwt, ldp_vp.

### OIDC4VP:

* client_id_scheme : did, verifier_attestation, X509, redirect_uri,
* presentation_definition and presentation_definition_uri,
* request object and request_uri,
* direct_post and direct_post.jwt,
* PEX 2.0 partial.

### Signature suites

* JWT: ES256, ES256K, EdDSA, RSA
* linked data proof : Ed25519Signature2018, Ed25519Signature20, Secp256r1Signature2019, EcdsaSecp256r1Signature2019, RsaSignature2018.

### Other features

* [Bitstring status list 1.0](https://www.w3.org/TR/vc-bitstring-status-list/) and [IETF token status list](https://www.ietf.org/archive/id/draft-ietf-oauth-status-list-04.html),
* OIDC4VC Embedded profiles: [HAIP](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-sd-jwt-vc-1_0.html), EBSI-V3 (compliant wallet), DIIP V2.1, DIIP V3.0,
* Talao [DID resolver](https://github.com/decentralized-identity/universal-resolver) for did:web, did:ethr, did:ebsi, did:dht, did:sov, did:cheqd...,
* wallet user authentication : PIN and biometric,
* user chat and notification through [Matrix.org](https://matrix.org),
* developer mode for internal data and protocol requests and responses,
* embedded issuers for [PID](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/blob/main/docs/annexes/annex-3/annex-3.01-pid-rulebook.md), email proof, phone proof, age proof with AI or document authentication.

## Altme Wallet features

* Same features as Talao wallet,
* blockchain support: Tezos, Ethereum, Polygon, Fantom, BNB, Etherlink,
* send/receive crypto, token, NFT,
* buy crypto with [Wert.io](https://wert.io)
