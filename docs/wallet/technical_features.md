# Wallet features

Updated the 14th of October 2024.

## Protocole OIDC4VC

* OIDC4VCI Draft 11 and 13,
* OIDC4VP Draft 20,
* SIOPV2 Draft 12
* [Verifiable presentation request](https://w3c-ccg.github.io/vp-request-spec/),
* VC formats: ldp_vc, jwt_vc_json, jwt_vc_json-ld, vc+sd-jwt vc.

### OIDC4VCI

* Flows : authorization code flow, pre-authorized code flow with Tx, PAR,
* credential_offer_uri,
* endpoint supported : credential, deferred,
* wallet attestations, PKCE, scope and authorization details,
* client authentication methode : none, client_id, client secret basic, client secret post, jwt,
* identifier : jwk thumbprint, did:key, did:jwk,
* proof type : jwt, ldp_vp.

### OIDC4VP:

* client_id_scheme : did, verifier_attestation, X509, redirect_uri,
* presentation_definition and presentation_definition_uri,
* request object and request_uri,
* direct_post and direct_post.jwt,
* PEX 2.0 partial.

### Signature suites

* Jose: ES256, ES256K, EdDSA,
* linked data proof: Ed25519Signature2018, RsaSignature2018.

### Other features

* Bitstring status list 1.0 and IETF token status list,
* OIDC4VC Embedded profiles: HAIP, EBSI-V3 (compliant wallet), DIIP V2.1, DIIP V3.0,
* Talao [DID resolver](https://github.com/decentralized-identity/universal-resolver) for did:web, did:ethr, did:ebsi, did:dht, did:sov, did:cheqd...,
* wallet user authentication : PIN and biometric,
* user chat and notification through [Matrix.org](https://matrix.org),
* developer mode for internal data and protocol requests and responses,
* embedded issuers for PID, email proof, phone proof, age proof with AI or document authentication.

## Altme Wallet features

* Same features as Talao wallet,
* blockchain support: Tezos, Ethereum, Polygon, Fantom, BNB, Etherlink,
* send/receive crypto, token, NFT,
* buy crypto with [Wert.io](https://wert.io)
