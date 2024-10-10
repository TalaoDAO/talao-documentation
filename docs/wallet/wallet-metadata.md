# Wallet Metadata

Metadata in the context of digital wallets like Talao and Altme describes the specific configurations that define the wallet’s compatibility, supported formats, cryptographic algorithms, and available features. They are crucial for setting up and integrating wallets for credential issuance and verification..

### Issuance : Wallet acts as a client

Wallet endpoints start either with https://app.talao.co/xxxx for Talao wallet or with https://app.altme.io/xxx for Altme wallet.

Below metadata is for Altme wallet:

```
{
    "vp_formats_supported": {
        "jwt_vp": {
            "alg": [
                "ES256",
                "ES256K",
                "EdDSA"
            ]
        },
        "jwt_vc": {
            "alg": [
                "ES256",
                "ES256K",*
                "EdDSA"
            ]
        },
        "jwt_vp_json": {
            "alg": [
                "ES256",
                "ES256K",
                "EdDSA"
            ]
        },
        "jwt_vc_json": {
            "alg": [
                "ES256",
                "ES256K",
                "EdDSA"
            ]
        },
        "vc+sd-jwt": {
            "alg": [
                "ES256",
                "ES256K",
                "EdDSA"
            ]
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
    "grant_types": [
        "authorization code",
        "pre-authorized_code"
    ],
    "redirect_uris": [
        "https://app.altme.io/app/download/callback"
    ],
    "subject_syntax_types_supported": [
        "did:key",
        "did:jwk"
    ],
    "subject_syntax_types_discriminations": [
        "did:key:jwk_jcs-pub",
        "did:ebsi:v1"
    ],
    "token_endpoint_auth_method_supported": [
        "none", 
        "client_id", 
        "client_secret_post", 
        "client_secret_basic", 
        "client_secret_jwt"
    ],
    "credential_offer_endpoint": [
        "openid-credential-offer://", 
        "haip://"
    ],
    "client_name": "Altme wallet",
    "contacts": [
        "contact@talao.io"
    ]
}
```

### Verification: wallet acts as an Authorization Server

Wallet endpoints start either with https://app.talao.co/xxxx for Talao wallet or with https://app.altme.io/xxx for Altme wallet.

Below metadata is for Altme wallet:

```
{
    "client_name": "Altme_wallet",
    "authorization_endpoint": "https://app.altme.io/app/download/authorize",
    "response_types_supported": [
        "vp_token",
        "id_token"
    ],
    "vp_formats_supported": {
        "jwt_vc_json": {
            "alg_values_supported": [
                "ES256",
                "ES256K",
                "EdDSA"
            ]
        },
        "jwt_vp_json": {
            "alg_values_supported": [
                "ES256",
                "ES256K",
                "EdDSA"
            ]
        },
        "vc+sd-jwt": {
            "alg_values_supported": [
                "ES256",
                "ES256K",
                "EdDSA"
            ]
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
    "request_object_signing_alg_values_supported": [
        "ES256",
        "ES256K",
        "EdDSA"
    ],
    "presentation_definition_uri_supported": true,
    "contacts": [
        "contact@talao.io"
    ]
}
```

