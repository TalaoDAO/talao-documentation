# Wallet Metadata Configuration

Metadata in the context of digital wallets like Talao and Altme describe the specific configurations that define the wallet’s compatibility, supported formats, cryptographic algorithms, and available features. They are crucial for setting up and integrating wallets for credential issuance and verification.

## Why is Metadata Important?

Metadata ensures standardization in interactions between different systems, guaranteeing optimal compatibility and security. It specifies supported data formats, signature algorithms, user authentication types, and more. This allows communication systems (such as issuers and verifiers) to operate with consistent and secure configurations.

### Example Metadata for an Issuer

The following metadata is used to configure an issuer in the Talao or Altme wallet thanks to wallet_metadata_for_issuer.json:

```json
{
    "vp_formats_supported": {
        "jwt_vp": {
            "alg": ["ES256", "ES256K", "EdDSA"]
        },
        "jwt_vc": {
            "alg": ["ES256", "ES256K", "EdDSA"]
        },
        "jwt_vp_json": {
            "alg": ["ES256", "ES256K", "EdDSA"]
        },
        "jwt_vc_json": {
            "alg": ["ES256", "ES256K", "EdDSA"]
        },
        "vc+sd-jwt": {
            "alg": ["ES256", "ES256K", "EdDSA"]
        },
        "ldp_vp": {
            "proof_type": [
                "JsonWebSignature2020",
                "Ed25519Signature2018",
                "EcdsaSecp256k1Signature2019",
                "RsaSignature2018"
            ]
        },
        "ldp_vc": {
            "proof_type": [
                "JsonWebSignature2020",
                "Ed25519Signature2018",
                "EcdsaSecp256k1Signature2019",
                "RsaSignature2018"
            ]
        }
    },
    "grant_types": ["authorization code", "pre-authorized_code"],
    "redirect_uris": ["https://app.altme.io/app/download/callback"],
    "subject_syntax_types_supported": ["did:key", "did:jwk"],
    "subject_syntax_types_discriminations": ["did:key:jwk_jcs-pub", "did:ebsi:v1"],
    "response_types_supported": ["vp_token", "id_token"],
    "token_endpoint_auth_method_supported": [
        "none", 
        "client_id", 
        "client_secret_post", 
        "client_secret_basic", 
        "client_secret_jwt"
    ],
    "credential_offer_endpoint_supported": [
        "openid-credential-offer://", 
        "haip://"
    ],
    "contacts": ["contact@talao.io"]
}
```

#### Explanation:
- **Supported Presentation Formats (vp_formats_supported):** Defines the supported formats for Verifiable Presentations (JWT, LDP).
- **Cryptographic Algorithms (alg):** Specifies the cryptographic algorithms used for signing data (ES256, ES256K, EdDSA).
- **Subject Types (subject_syntax_types_supported):** Indicates the supported types of identifiers, such as `did:key` and `did:jwk`.
- **Authentication Methods (token_endpoint_auth_method_supported):** Lists the supported methods for authenticating requests to the token endpoint.

### Example Metadata for a Verifier

The following metadata is used to configure a verifier in the wallet thanks to wallet_metadata_for_verifiers.json:

```json
{
    "wallet_name": "talao_wallet",
    "key_type": "software",
    "user_authentication": "system_biometry",
    "authorization_endpoint": "https://app.altme.io/app/download/authorize",
    "grant_types_supported": ["authorization_code", "pre-authorized_code"],
    "response_types_supported": ["vp_token", "id_token"],
    "vp_formats_supported": {
        "jwt_vc_json": {
            "alg_values_supported": ["ES256", "ES256K", "EdDSA"]
        },
        "jwt_vp_json": {
            "alg_values_supported": ["ES256", "ES256K", "EdDSA"]
        },
        "vc+sd-jwt": {
            "alg_values_supported": ["ES256", "ES256K", "EdDSA"]
        },
        "ldp_vp": {
            "proof_type": [
                "JsonWebSignature2020",
                "Ed25519Signature2018",
                "EcdsaSecp256k1Signature2019",
                "RsaSignature2018"
            ]
        },
        "ldp_vc": {
            "proof_type": [
                "JsonWebSignature2020",
                "Ed25519Signature2018",
                "EcdsaSecp256k1Signature2019",
                "RsaSignature2018"
            ]
        }
    },
    "client_id_schemes_supported": [
        "did", 
        "redirect_uri", 
        "x509_san_dns", 
        "verifier_attestation"
    ],
    "request_object_signing_alg_values_supported": ["ES256", "ES256K"],
    "presentation_definition_uri_supported": true,
    "contacts": ["contact@talao.io"]
}
```

#### Explanation:
- **Wallet Name (wallet_name):** The name of the configured wallet (`talao_wallet`).
- **User Authentication (user_authentication):** Specifies the user authentication method, here using system biometrics.
- **Supported Presentation Formats (vp_formats_supported):** The types of supported Verifiable Presentation formats.
- **Supported Algorithms (alg_values_supported):** The cryptographic algorithms supported for signing presentation objects.

These metadata configurations enable wallets and credential exchange systems to function smoothly and securely.
```
