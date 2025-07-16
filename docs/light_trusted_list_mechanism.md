# Trusted List Mechanism

Updated the 16th of July 2025.

## Overview

This specification defines a simple and light trusted list mechanism. The trusted list is based on
**standard Public Key Infrastructure (PKI)** and **X.509 certificates issued by recognized
Certificate Authorities (CAs)**. The motivation behind this approach is to provide a **lightweight,
standards-based solution** to establish a **trusted ecosystem of issuers and verifiers** using
**standard PKI infrastructure or a DID infrastructure**. The approach explicitly takes into
account the OIDC4VC protocol suite, supporting use cases such as OIDC4VP and OIDC4VCI.
The Verifiable Credential format is open and supports multiple encoding formats, including
SD-JWT, JWT, or JSON-LD representations to establish a **trusted ecosystem of issuers and
verifiers** using **standard PKI infrastructure or a DID infrastructure.**

This version of the specification also introduces **capability support** within the trusted model
(e.g., what types of credentials or actions are trusted per entity) and **restricts trust anchor
methods** to **just two mechanisms** : X.509 certificates and DIDs with kid key identifiers. This
simplifies validation logic and implementation in constrained environments.

Unlike the ETSI TS 119 612 specification that defines complex XML-based trusted lists for
qualified trust service providers (QTSPs), this specification offers a significantly **simpler and
JSON-based alternative**. The goal is to enable **easier implementation, parsing, and
maintenance** , especially suitable for small to medium-sized ecosystems that do not require the
full compliance and overhead of eIDAS-qualified services. Compared to approaches like the
EBSI Trust Framework or OpenID Federation, this model avoids dynamic resolution or layered
delegation by focusing on two static verification methods: X.509 certificates and DID key
identifiers (kid). It offers capability-based trust while keeping implementation minimal and
predictable.

Each wallet, issuer or verifier must retrieve and regularly update a list of trusted parties. This
trusted list is provided by a backend URL specified by the wallet provider for wallet instances.

Each ecosystem must implement a compliant API to expose its trusted participants.

This specification is particularly targeted at **small to medium-sized ecosystems** , where a
centralized trusted list is practical and operationally efficient. It also addresses the needs of
**private ecosystems and use cases** that require trusted identity exchange without the
overhead of complex federations.

## Objectives

- Establish a secure trust framework between wallets, issuers, and verifiers using standard
  PKI principles
- Provide a lightweight alternative to complex federation models for small and
  medium-sized ecosystems
- Promote interoperability and cross-ecosystem recognition of credential issuers and
  verifiers
- Support timely and manageable updates to trust relationships through routine trusted list
  refreshes
- Enable trusted operations without requiring complex or real-time federation or revocation
  mechanisms

## Use Cases for the Trusted List

The trusted list defined in this specification supports a range of identity-related use cases across
issuers, verifiers, and wallet providers:

### 1. Verifiable Credentials (VCs) with Embedded x5c Chains

Trusted X.509 root certificates in the list are used to validate issuers that embed their signing
certificate chains (e.g., x5c) in formats such as SD-JWT or other JWT/LD-based credentials.

### 2. OIDC4VP Authorization Requests

During an OIDC4VP flow, verifiers use the list to verify the trustworthiness of wallet-attached
signed JWT authorization requests, using the public roots in the trusted list.

### 3. OIDC4VCI Issuer Metadata

OIDC4VCI metadata endpoints may be signed by issuers. Consumers of such metadata can
verify these signatures using the trusted list.

### 4. Wallet Attestations

Wallet providers listed in the trusted list can issue attestations (e.g., capabilities, compliance
status) that other parties can validate against the trusted list entries.

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
- Parse and validate the list and root certificates or DID kid
- Filter valid issuers/verifiers by supported vcTypes
- Store a local copy with timestamp
- Trigger a refresh if the list is older than 24 hours
- Check and verify the trusted chain or DID key ID (kid)
- Manage user information and consent

## User Trust Management Strategy

The way in which each party (wallet provider, issuer, verifier) chooses to manage the trust status
and presentation of trusted list data to end users is **out of scope** of this specification.
Examples include:

- A **wallet provider** may choose to simply inform the user about the trust status of a
  verifier and leave the access decision to the user.
- An **issuer** may decide to reject a credential issuance request if the verifier or wallet
  provider is not listed.
- A **verifier** may enforce access control based on list membership or certificate lineage.
  These decisions are implementation-specific and should align with each ecosystem's user
  experience, legal context, and risk posture.

## Certificate Chain Validation

Wallets and verifiers MUST perform standard X.509 path validation using the root certificates
listed in the trusted list. Intermediate certificates (e.g., those included via x5c) must be validated
up to a trusted root using established PKI rules. If X.509 certificates are not used, wallets MAY
use DID-based key identifiers (kid) for validation.

## Compatibility with Other Standards

This specification is designed independently of the eIDAS Trusted List XML format and similar
registries. It does not aim to be interoperable with those formats but instead offers a simplified
alternative suitable for lightweight deployments.

## Components

### 1. Trusted List URL

JSON
Each wallet must be configured with a **Trusted List URL** , provided by its backend or
ecosystem. This URL should return the list of trusted entities in JSON format.
Downloaded:
○ At first initialization
○ Once daily thereafter

### 2. Trusted List API (JSON Format)

Each ecosystem must implement an HTTP(S) endpoint returning the following JSON structure:

```json
{
  "schemaVersion": "1.0",
  "ecosystem": "eu-wallet-network",
  "lastUpdated": "2025-07-15T12:00:00Z",
  "entities": [
    {
      "id": "https://example.com/issuer1",
      "name": "GovID Issuer A",
      "type": "issuer",
      "postalAddress": {
        "streetAddress": "Piazzale Flaminio 1B",
        "locality": "Rome",
        "postalCode": "00196",
        "countryName": "Italy"
      },
      "rootCertificates": ["MIIB..."],
      "kid": "did:example:123#keys-1",
      "electronicAddress": {
        "uri": "mailto:leone.riello@infocert.it",
        "lang": "en"
      },
      "vcTypes": ["PersonIdentityCredential", "AMLStatusCredential"]
    },
    {
      "id": "https://example.com/verifier1",
      "name": "KYC Verifier Co",
      "type": "verifier",
      "postalAddress": {
        "streetAddress": "Piazzale Flaminio 1B",
        "locality": "Rome",
        "postalCode": "00196",
        "countryName": "Italy"
      },
      "rootCertificates": ["MIIC..."],
      "kid": "did:example:456#keys-2",
      "vcTypes": ["PersonIdentityCredential"]
    },
    {
      "id": "https://wallet.example.com/provider",
      "name": "Altme Wallet Provider",
      "type": "wallet-provider",
      "postalAddress": {
        "streetAddress": "Piazzale Flaminio 1B",
        "locality": "Rome",
        "postalCode": "00196",
        "countryName": "Italy"
      },
      "rootCertificates": ["MIID..."],
      "kid": "did:example:789#keys-3",
      "vcTypes": []
    }
  ]
}
```

### 3. Field Descriptions

Some fields in each entity are optional, depending on the trust method used:

- If id is a DID, then the kid field is **mandatory**.
- If rootCertificates are not present, validation relies solely on the provided kid.
- Either rootCertificates or kid must be present, but both can coexist.
  The postalAddress field supports structured location data for better alignment with eIDAS
  ETSI TS 119 612. It includes:
- **streetAddress** : Street and civic number
- **locality** : City or town
- **postalCode** : Zip/postal code
- **countryName** : Country of the entity
  The electronicAddress provides a URI (e.g., email or HTTPS address) and an optional
  language tag.
- **ecosystem** : Unique identifier for the issuing ecosystem or trust domain
- **lastUpdated** : ISO timestamp for the last update
- **entities[]** : Array of trusted issuers or verifiers
- **id** : URI identifying the organization or its DID URL
- **name** : Human-readable name of the entity
- **type** : issuer, verifier, or wallet-provider
- **postalAddress** : Physical mailing address of the entity
- **rootCertificates[]** : Array of PEM-formatted X.509 root certificates (if applicable)
- **kid** : Key identifier (e.g., from DID document) as alternative trust mechanism
- **vcTypes[]** : Array of credential types (e.g., PersonIdentityCredential,
  AMLStatusCredential)

## Backend Management Interface

The wallet backend must expose a configuration setting where:

- The **Trusted List URL** can be registered or updated
- Multiple ecosystem URLs can be supported if multi-ecosystem federation is needed

## Error Handling

- If the trusted list cannot be fetched, the wallet should use the last valid cached copy
- If no copy is available, wallet operations requiring verification should be restricted until
  retrieval is successful

## Security Recommendations

- The trusted list API endpoint must support HTTPS
- Certificates should be validated using standard X.509 verification chains or DID key
  identifiers
- Ecosystems should rotate keys and certificates periodically and version control updates

## Example Trusted List URL

```
https://talao.co/.well-known/trusted-list.json
```

## Signature Validation of the Trusted List

This level of trust assurance is not currently supported in this specification. It is intentionally
excluded to maintain simplicity and agility for small to medium-sized ecosystems, where
centralized list management is practical and sufficient.

## Revocation Mechanism

This specification adopts a **lightweight revocation mechanism** suitable for **small and
medium-sized ecosystems**. Rather than implementing complex revocation infrastructures such
as CRLs or OCSP, revocation is handled directly through updates to the trusted list.

### 1. Revocation by List Update

If an issuer or verifier is no longer trusted, the ecosystem authority simply **removes the
corresponding entry** from the trusted list JSON. Since wallets refresh the list daily, the entity
will automatically be excluded from trust evaluations after the next update.

### 2. Benefits

- No need for signature validation or certificate revocation lists
- Immediate enforcement upon list update
- Easy to maintain and monitor using a centralized endpoint

### 3. Considerations

- Wallets must refresh the trusted list at least once every 24 hours
- A local cache should be maintained for resilience in offline or degraded network
  scenarios

## Glossary and References

- VC : Verifiable Credential
- x5c : A JWT header field carrying a certificate chain (X.509)
- OIDC4VP : OpenID Connect for Verifiable Presentations
- OIDC4VCI : OpenID Connect for Verifiable Credential Issuance
- PKI : Public Key Infrastructure
- CRL : Certificate Revocation List
- KID : Key Identifier used in DIDs or JWT headers

**Version** : 1.4
**Status** : Draft
**Maintainer** : Altme Identity & Compliance Team
