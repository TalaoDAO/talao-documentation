# Light Trusted List Mechanism

Updated the 21st of July, 2025

**Version** : 1.9
**Status** : Draft
**Maintainer** : Altme Identity & Compliance Team

## Table of Contents

1. [Overview](#overview)
2. [Objectives](#objectives)
3. [Use Cases for the Trusted List](#use-cases-for-the-trusted-list)
   1. [Relying Parties Verify Attestations Issuers Identities and Capabilities](#1-relying-parties-verify-attestation-issuers-identities-and-capabilities)
   2. [Wallets Verify Relying Parties Identities and Capabilities](#2-wallets-verify-relying-parties-identities-and-capabilities)
   3. [Wallets Verify Issuers Identities and Capabilities](#3-wallets-verify-issuers-identities-and-capabilities)
   4. [Issuers or Relying Parties Verify Wallets Instance Attestations](#4-issuers-or-relying-parties-verify-wallets-instance-attestations)
4. [Ecosystem Roles and Responsibilities](#ecosystem-roles-and-responsibilities)
   1. [Ecosystem Authority](#ecosystem-authority)
   2. [Issuers and Verifiers](#issuers-and-verifiers)
   3. [Wallets](#wallets)
5. [User Trust Management Strategy](#user-trust-management-strategy)
6. [Certificate Chain Validation](#certificate-chain-validation)
7. [Compatibility with Other Standards](#compatibility-with-other-standards)
8. [Components](#components)
   1. [Trusted List URL](#1-trusted-list-url)
   2. [Trusted List API (JSON Format)](#2-trusted-list-api-json-format)
   3. [Field Descriptions](#3-field-descriptions)
9. [Backend Management Interface](#backend-management-interface)
10. [Error Handling](#error-handling)
11. [Security Recommendations](#security-recommendations)
12. [Example Trusted List URL](#example-trusted-list-url)
13. [Signature Validation of the Trusted List](#signature-validation-of-the-trusted-list)
14. [Revocation Mechanism](#revocation-mechanism)
15. [Security Threat Modeling (Extension)](#security-threat-modeling-extension)
16. [Glossary and References](#glossary-and-references)


## Overview

This specification defines a simple and light trusted list mechanism. The trusted list is based on **standard Public Key Infrastructure (PKI)** and **X.509 certificates issued by recognized Certificate Authorities (CAs) and/or  Decentralzed Identifiers (DIDs)**. The motivation behind this approach is to provide a **standards-based solution** to establish a **trusted ecosystem of issuers and verifiers** for small or medium sized **ecosystems estimated below 20/30 entities**. The approach explicitly takes into account the OIDC4VC protocol suite, supporting use cases such as issuance and verification of VCs.

This version of the specification also introduces **capability support** within the trusted model (e.g., what types of credentials or actions are trusted per entity) and **restricts trust anchor methods** to **just two mechanisms** : X.509 certificates and DIDs. This simplifies validation logic and implementation in constrained environments.

Unlike the ETSI TS 119 612 specification that defines complex XML-based trusted lists for qualified trust service providers (QTSPs), this specification offers a significantly **simpler and JSON-based alternative**. The goal is to enable **easier implementation, parsing, and maintenance** , especially suitable for ecosystems that do not require the full compliance and overhead of eIDAS-qualified services. Compared to approaches like the EBSI Trust Framework or OpenID Federation, this model avoids dynamic resolution or layered delegation by focusing on two static verification methods: X.509 certificates and DIDs. It offers capability-based trust while keeping implementation minimal and predictable.

Each wallet, issuer or verifier must retrieve and regularly update a list of trusted parties. This trusted list is provided by an ecosystem API specified by the wallet provider for wallet instances initialization. Each ecosystem must implement a compliant API to expose its trusted participants.

This specification is particularly targeted at **small to medium-sized ecosystems** , where a centralized trusted list is practical and operationally efficient. In practice it addresses the needs and requirements of many projects which uses SSI technologies.

## Objectives

- Establish a secure trust framework between wallets, issuers, and verifiers using standard PKI principles or DIDs
- Provide a lightweight alternative to complex federation models for small and medium-sized ecosystems
- Promote interoperability and cross-ecosystem recognition of credential issuers and verifiers
- Support timely and manageable updates to trust relationships through routine trusted list refreshes
- Enable trusted operations without requiring complex or real-time federation or revocation mechanisms

## Use Cases for the Trusted List

The trusted list defined in this specification supports a range of **identity-related use cases** across relying parties (issuers), verifiers, and wallet providers. It acts as the **root of trust** for validating certificates, signatures, and metadata used in OIDC4VP, SD-JWT, and related protocols.

### 1. Relying Parties Verify Attestation Issuers’ Identities and Capabilities

Trusted **X.509 root certificates** in the list are used to validate issuers that embed their signing certificate chains (e.g., `x5c` headers) in credential formats such as **SD-JWT** or through **DIDs** in JWT/LD-based credentials.
This ensures that any issued Verifiable Credential (VC) or SD-JWT can be traced back to a recognized and trusted issuer.

### 2. Wallets Verify Relying Parties’ Identities and Capabilities

During an **OIDC4VP flow**, wallets use the trusted list to validate the **authenticity of verifier-signed authorization requests (JWTs)**.
The verifier’s signing key (e.g., specified in `client_id=x509_san_dns:<domain>`) must chain back to one of the **trusted root certificates** in the list, ensuring the verifier is a legitimate and authorized relying party.

### 3. Wallets Verify Issuers’ Identities and Capabilities

Issuer metadata (e.g., issuer configuration endpoints or credential schemas) may be **signed as JWTs** by issuers.
Wallets, as consumers of such metadata, can verify the **issuer’s identity and integrity of metadata** using the **trusted list of X.509 roots**.

### 4. Issuers or Relying Parties Verify Wallet Instance Attestations

Wallet providers may issue **wallet instance attestations** (e.g., supported features, compliance level, security certifications).
Issuers and relying parties can validate these attestations against entries in the **trusted list**, ensuring that only **compliant and certified wallets** can participate in sensitive operations like credential issuance or stablecoin transactions.

## Ecosystem Roles and Responsibilities

### Ecosystem Authority

Each ecosystem authority is responsible for maintaining and publishing the trusted list. This
includes:

- Hosting the JSON API endpoint
- Ensuring the list is up-to-date and accurate
- Managing the lifecycle of issuer, verifier, and wallet-provider entries

### Issuers and Verifiers

Issuers and verifiers are responsible for:

- Downloading and caching the trusted list
- Verifying the authenticity and scope of credential-related data
- Relying only on entries validated through the trusted list structure

### Wallets

- Fetch the trusted list from the configured URL
- Parse and validate the list and root certificates or DIDs
- Filter valid issuers/verifiers by supported vcTypes
- Store a local copy with timestamp
- Trigger a refresh if the list is older than 24 hours
- Check and verify the trusted chain or resolve DIDs
- Manage user information and consent

## User Trust Management Strategy

The way in which each party (wallet provider, issuer, verifier) chooses to manage the trust status and presentation of trusted list data to end users is **out of scope** of this specification.

Examples include:

- A **wallet provider** may choose to simply inform the user about the trust status of a verifier and leave the access decision to the user.
- An **issuer** may decide to reject a credential issuance request if the verifier or wallet provider is not listed.
- A **verifier** may enforce access control based on list membership or certificate lineage. These decisions are implementation-specific and should align with each ecosystem's user experience, legal context, and risk posture.

## Certificate Chain Validation

Wallets and verifiers MUST perform standard X.509 path validation using the root certificates listed in the trusted list. Intermediate certificates (e.g., those included via x5c) must be validated up to a trusted root using established PKI rules. If X.509 certificates are not used, wallets MAY use DID-based key for validation.

## Compatibility with Other Standards

This specification is designed independently of the eIDAS Trusted List XML format and similar registries. It does not aim to be interoperable with those formats but instead offers a simplified alternative suitable for lightweight deployments.

## Components

### 1. Trusted List URL

JSON
Each wallet must be configured with a **Trusted List URL** , provided by its backend or ecosystem. This URL should return the list of trusted entities in JSON format. It may be downloaded:

- At first initialization
- Once daily thereafter

### 2. Trusted List API (JSON Format)

Each ecosystem must implement an HTTP(S) endpoint returning the following JSON structure:

```json

{
    "ecosystem": "eu-wallet-network",
    "lastUpdated": "2025-07-15T12:00:00Z",
    "entities": [
        {
            "id": "https://example.com/issuer1",
            "name": "GovID Issuer A",
            "description": "Issuer for testing purpose",
            "endpoint": "https://example.com/issuer1",
            "type": "issuer",
            "postalAddress": {
                "streetAddress": "Piazzale Flaminio 1B",
                "locality": "Rome",
                "postalCode": "00196",
                "countryName": "Italy"
            },
            "rootCertificates": [
                "MIIB..."
            ],
            "electronicAddress": {
                "uri": "mailto:leone.riello@infocert.it",
                "lang": "en"
            },
            "vcTypes": [
                "Pid",
                "EmailPass"
            ]
        },
        {
            "id": "did:web:talao.co:example",
            "name": "Talao Issuer",
            "description": "Issuer for testing purpose",
            "endpoint": "https://example.com/issuer2",
            "type": "issuer",
            "postalAddress": {
                "streetAddress": "Piazzale Flaminio 1B",
                "locality": "Rome",
                "postalCode": "00196",
                "countryName": "Italy"
            },
            "rootCertificates": [
                "MIIB..."
            ],
            "electronicAddress": {
                "uri": "mailto:leone.riello@infocert.it",
                "lang": "en"
            },
            "vcTypes": [
                "Pid",
                "AMLStatusCredential"
                "EmailPass"
            ]
        },
        {
            "id": "https://example.com/verifier1",
            "name": "KYC Verifier Co",
            "description": "Verifier for testing purpose",
            "type": "verifier",
            "postalAddress": {
                "streetAddress": "Piazzale Flaminio 1B",
                "locality": "Rome",
                "postalCode": "00196",
                "countryName": "Italy"
            },
            "rootCertificates": [
                "MIIC..."
            ],
            "vcTypes": [
                "Pid"
            ]
        },
        {
            "id": "https://wallet.example.com/provider",
            "name": "Altme Wallet Provider",
            "description": "Wallet provider for Talao and Altme",
            "type": "wallet-provider",
            "rootCertificates": [
                "MIID..."
            ]
        }
    ]
}
```

### 3. Field Descriptions

- `ecosystem` : REQUIRED. Unique identifier for the issuing ecosystem or trust domain
- `lastUpdated` : REQUIRED. ISO timestamp for the last update
- `entities` : REQUIRED. Array of a json object defining an issuer, a verifier or a wallet-provider.
  - `id` : REQUIRED. URI identifying the organization (URL or DID). It could be the `iss` of an sd-jwt, the subject of an x509 certificate or the `issuer` of a W3C VC. In case of a verifier this is the `client_id` of the OIDC4VP authorization request.
  - `name` : Human-readable name of the entity
  - `description`: Description of the service offered,
  - `endpoint`: For an issuer it is the credential issuer URL. For a verifier this is where the wallet (holder) is redirected to start the presentation flow.
  - `type` : REQUIRED.`issuer`, `verifier`, or `wallet-provider`
  - `postalAddress` : json object. The postalAddress field supports structured location data for better alignment with eIDAS ETSI TS 119 612. It includes:
    - `streetAddress` : Street and civic number
    - `locality` : City or town
    - `postalCod`e : Zip/postal code
    - `countryName` : Country of the entity
  - `electronicAddress` provides a URI (e.g., email or HTTPS address) and an optionallanguage tag.
  - `rootCertificates` : REQUIRED if `id` is not a DID. Array of PEM-formatted X.509 root certificates
  - `vcTypes` : REQUIRED for issuers and verifiers. Array of credential types supported or allowed to request(e.g., PersonIdentityCredential,AMLStatusCredential)

## Backend Management Interface

The wallet backend must expose a configuration setting where:

- The **Trusted List URL** can be registered or updated
- Multiple ecosystem URLs can be supported if multi-ecosystem federation is needed

## Error Handling

- If the trusted list cannot be fetched, the wallet should use the last valid cached copy
- If no copy is available, wallet operations requiring verification should be restricted until retrieval is successful

## Security Recommendations

- The trusted list API endpoint must support HTTPS
- Certificates should be validated using standard X.509 verification chains or DID key identifiers
- Ecosystems should rotate keys and certificates periodically and version control updates

## Example Trusted List URL

```
https://talao.co/.well-known/trusted-list.json
```

## Signature Validation of the Trusted List

This level of trust assurance is not currently supported in this specification. It is intentionally excluded to maintain simplicity and agility for small to medium-sized ecosystems, where centralized list management is practical and sufficient.

## Revocation Mechanism

This specification adopts a **lightweight revocation mechanism** suitable for **small and medium-sized ecosystems**. Rather than implementing complex revocation infrastructures such as CRLs or OCSP, revocation is handled directly through updates to the trusted list. If an issuer or verifier is no longer trusted, the ecosystem authority simply **removes the corresponding entry** from the trusted list JSON. Since wallets refresh the list daily, the entity will automatically be excluded from trust evaluations after the next update.

Benefits

- No need for signature validation or certificate revocation lists
- Immediate enforcement upon list update
- Easy to maintain and monitor using a centralized endpoint

Considerations

- Wallets must refresh the trusted list at least once every 24 hours
- A local cache should be maintained for resilience in offline or degraded network scenarios



## Security Threat Modeling (Extension)

This section outlines potential threats to the trusted list mechanism, their impact, and possible mitigations. Some of these recommendations extend beyond the current scope of this specification but are valuable for future-proofing the ecosystem.

### 1. Threats Against Trusted List Integrity

- **Tampering with the Trusted List**  
  *Threat:* An attacker could modify the list during transit or at rest, injecting unauthorized entities.  
  *Mitigation:*  
  - Sign the trusted list with a **JWS (JSON Web Signature)** or CMS signature.  
  - Distribute only over **TLS 1.3** with strict server authentication (e.g., certificate pinning).

- **Fake Trusted List (Endpoint Impersonation)**  
  *Threat:* A malicious endpoint could serve a fake trusted list.  
  *Mitigation:*  
  - Use **DNSSEC** and **HTTPS with CA-pinned certificates**.  
  - Hardcode the root signing key fingerprints in wallets.


### 2. Threats Against Authenticity and Authorization

- **Malicious Entity Insertion**  
  *Threat:* A compromised backend might add fake issuers or merchants to the list.  
  *Mitigation:*  
  - Require **multi-signature approvals** for list updates.  
  - Use a **public transparency log** (e.g., Merkle-tree-based, like Certificate Transparency).

- **Key Compromise of Authority**  
  *Threat:* If the ecosystem authority’s root signing key is compromised, the entire trust model collapses.  
  *Mitigation:*  
  - Use **Hardware Security Modules (HSMs)** to store signing keys.  
  - Implement **key rotation** and backup secondary signing keys.


## Glossary and References

- VC : Verifiable Credential
- x5c : A JWT header field carrying a certificate chain (X.509)
- OIDC4VP : OpenID Connect for Verifiable Presentations
- OIDC4VCI : OpenID Connect for Verifiable Credential Issuance
- PKI : Public Key Infrastructure
- CRL : Certificate Revocation List
- KID : Key Identifier used in DIDs or JWT headers
