# Issuer configuration

Updated the 28th of October 2024.

The wallets support most of the VC options of the OIDC4VCI standard for issuer configuration.

## OIDC4VCI Specifications Drafts

OIDC4VCI has evolved rapidly between 2022 (Draft 10/11) and 2024 (Draft >= 13). The issuer metadata has changed multiple times. Right now wallets support Draft 10/11 and Draft 13 of the specifications. The selection of one Draft or another can be done manually in the wallet with the custom profile and the OIDCVC settings screen or through the wallet provider backend.

**EBSI V3.x is based on OIDC4VCI Draft 10**, DIIP V2.1, DIIP V3.0 and ARF uses Draft 13.

Specifications of the different Drafts are available here:

* [Draft 10](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-10.html) supported
* [Draft 11](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-11.html) supported
* [Draft 12](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-12.html) not supported
* [Draft 13](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-13.html) supported
* [Draft 14](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-14.html) soon supported

## OIDC4VCI flow and features

Wallets support:

* credential offer by value and by reference,
* pre authorized code (by default), authorized code flow, push authorization request, PKCE,
* [Attestation based client authentication](https://datatracker.ietf.org/doc/draft-ietf-oauth-attestation-based-client-auth/),
* `tx_code` with`input_mode` `text`or`numeric`, `lenght`and`description`,
* `authorization_details` and `scope`. Tune with OIDCVC settings or wallet provider backend to use `scope`.,
* authorization server as a standalone server associated to one VC type,
* dynamic credential request,
* client secret post, client secret basic and public client authentication,
* bearer credential (no crypto binding),
* proof types as `jwt` or `ldp_vc`,
* proof of possession header with `kid` or `jwk`,
* deferred endpoint,
* key identifiers as jwk thumbprint of DID,
* keys as EdDSA, P-256, seckp256k1.

Wallets do not support:

* notification endpoint,
* batch endpoint of Draft 13,
* DPoP for code and token,
* encrypted credentials.

## Invocation schemes for issuance

Wallet support different invocation schemes:

* openid-credential-offer://,
* haip://,
* https://app.altme.io/app/download/oidc4vc,
* https://app.talao.co/app/download/oidc4vc

Those schemes can be displayed as QR code for wallet app scanner, smartphone camera or as a deeplink / universal link (a button in a html page for the smartphone browser).

# Support of Universal Links and App Links

For security reasons Talao wallets use Universal Links and App Links to redirect to wallet authorization endpoints and callback endpoints. However those links are not supported by default by all browsers. We suggest to use **Safari for IOS** phones and **Chrome for Android**. You may need to setup browser options manually to allow Universal links or App Links with Firefox, Brave, Samsung explorer or even Chrome on IOS.

## Dynamic Credential Request

Dynamic Credential Request is an option to operate a VP presentation for user authentication inside an authorization code flow.

The differences between this process and the use of a VP authentication step (OIDC4VP) followed by the issuance of a VC by pre authorized code flow (OIDC4VCI) are multiple:

- the VP(s) requested from the user depend on the VC requested by the user,
- the integration and the UX are simpler.

In order to manage that combination wallet must provide its own authorization endpoint to the issuer. Right now, our wallets support the "EBSI V3.x implementation" way with a `client_metadata` argument added to the authorization request and push authorization request.

Example of client_metadata:

```json
{
    "authorization_endpoint":"https://app.altme.io/app/download/authorize",
    "scopes_supported":[
        "openid"
    ],
    "response_types_supported":[
        "vp_token","id_token"
    ],
    "client_id_schemes_supported":[
        "redirect_uri","did"
    ],
    "grant_types_supported":......
}

```

Here is a script of the issuance of a VC in using another VC as a mean of authentication:

1. Wallet makes an authorization request to the AS of the issuer through a QRcode or a deeplink. The `client_metadata` attribute (or wallet_issuer attribute) is added to the request aside the standard `redirect_uri` endpoint of the wallet. For this step the wallet opens a browser session and redirects the user agent to the AS authorization endpoint.
2. To process the authentication step, the issuer fetches the wallet authorization endpoint from the `client_metadata` and prepares a VP request with its own `reponse_uri` endpoint like a verifier. The VP request is sent as a redirect to the wallet authorization endpoint. For implementation issuer can add the `state` attribute to the VP request to link the request to the original wallet request.
3. Wallet selects the VP requested and transfers is through a POST to the `response_uri` endpoint provided in the VP request. The state is added to the `vp_token` and `presentation_submission`.
4. Issuer acting as a verifier validates the VP data needed to prepare the VC and redirects the user agent to the `redirect_uri` endpoint of the wallet with the `code`. For implementation the `state` can be associated to the `code`.
5. Wallet requests an `access_token` in exchange of the `code`. For implementation the `code` can be associated to the `access_token`.
6. Wallet requests the credential with the access token.

In case of the use of the `wallet_issuer` attribute, issuer must discover the wallet authorization endpoint through the standard `/.well-known/openid-configuration` endpoint:

* Talao: [https://app.talao.co/wallet-issuer/.well-known/openid-configuration](https://app.talao.co/wallet-issuer/.well-known/openid-configuration)
* Altme: [https://app.altme.io/wallet-issuer/.well-known/openid-configuration](https://app.altme.io/wallet-issuer/.well-known/openid-configuration)

Learn more about [Dynamic Credential Request](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-dynamic-credential-request).

## Wallet rendering - display credentials

### Attributes of a VC

Wallet support all the attributes of the display.

```json
"credential_configurations_supported": {
    "IBANLegalPerson": {
    "scope": "IBANLegalPerson_scope",
    "display": [
        {
            "name": "Company IBAN",
            "description": "IBAN",
            "text_color": "#FBFBFB",
            "text_color": "#FFFFFF",
            "logo": {
                "uri": "https://i.ibb.co/ZdVm5Bg/abn-logo.png",
                "alt_text": "ABN Amro logo"
            },
            "background_image": {
                "uri": "https://i.ibb.co/kcb9XQ4/abncard-iban-lp.png",
                "alt_text": "ABN Amro Card"
            }
```

The `uri` can be either a link or a data uri scheme. `text_color` and `background_color` are fallbacks options if links are not provided.

`name` is used as the VC name if there is no background image.

If `display` is not provided wallets use a fallback blue card with white text color.

### Attributes of a claim

Wallets show only but all claims that are in the issuer metadata, rules are:

* if there is a` display` attribute in the claim, wallet displays the label in bold with the claim value on the same line. Otherwise wallet displays the claim value alone,
* if the claim is a json object (nested claims) without `display` -> it goes to the line and indent,
* if the claim is a json object with a `display` -> it displays the label in bold and goes to the line and indent.

With this issuer metadata:

```json
"claims": {
    "given_name": {
        "display": [
            {
                "name": "Given Name",
                "locale": "en-US"
            }
        ]
    },
    "family_name": {
        "display": [
            {
                "name": "Surname",
                "locale": "en-US"
            }
        ]
    },
    "email": {},
    "phone_number": {},
    "address": {
        "street_address": {},
        "locality": {},
        "region": {},
        "country": {}
    },
    "birthdate": {},
    "is_over_18": {},
    "is_over_21": {},
    "is_over_65": {}
}
```

wallets rendering will be:

```
Given name: John
Surname: DOE
john.doe@gmail.com
+33678876876
13 rue de Paris
Paris
Paris
France
12/09/1990
True
True
False
```

Wallets support all attributes of the display :

```json
"claims": {
    "given_name": {
    "value_type": "string",
    "display": [
        {
            "name": "First Name",
            "locale": "en-US"
        },
   
```

`value_type` supported are:

* `string`,
* `integer`,
* `bool`,
* `email`,
* `uri`,
* `image/jpeg` , `image/png`

`email` and `uri` are active as you can launch the browser or open the smartphone email manager with a clic.

`order` is supported

`mandatory` in not supported.

## Locale

Locale language is chosen depending on the smartphone language. If the smartphone language translation is not provided with the claim, wallet will use locale. If locale is not provided in the issuer metadata, wallet will use english.

```json
"issuing_country": {
    "mandatory": true,
    "value_type": "string",
    "display": [
        {
            "name": "Issuing country",
        },
        {
            "name": "Issuing country",
            "locale": "en-US"
        },
        {
            "name": "Pays d'emission",
            "locale": "fr-FR"
        }
    ]
}
```

### Images

Use the value_type `image/jpeg` or `image/png`

Image can be provided as value (data:uri) or reference https://...

```json
"picture": {
    "mandatory": True,
    "value_type": "image/jpeg",
    "display": [
        {
            "name": "Picture",
            "locale": "en-US"
        },
        {
            "name": "Portrait",
            "locale": "fr-FR"}],
        },
```

## Type metadata of SD-JWT VC

Wallet does not support the [type metadata](https://www.ietf.org/archive/id/draft-ietf-oauth-sd-jwt-vc-05.html#name-type-metadata) of the sd-jwt VC IETF standard.

## VC Status list support

Wallets support the following specifications depending on the VC format:

* ldp_vc, jwt_vc, jwt_vc_json, jwt_vc_json-l : [Bitstring Status List V1.0](https://www.w3.org/TR/vc-bitstring-status-list/)
* sd-jwt-vc : [Token Status List](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)

When the VC is received from the issuer or displayed, the wallet verifies the signature of the VC, the signature of the status list and the status of the VC. If any of these checked fails teh wallet display a red card status. These verification steps can by passed with an option in the wallet provider backed through a security low profile.

## Waltid integration

All `issuer.{..}`, `expirationDate`, `issuanceDate`and `credentialSubject.id` claims must be removed from the credential data as they are already provided in the json_jwt_vc as `iss`, `sub`, `iat`. Here is a correct configuration needed to make the waltid example running :

```json
{
    "issuerKey": {
        "type": "jwk",
        "jwk": {
        "kty": "EC",
        "d": "uTIT47GfSlRa0Da4CsyoIZpjjwQLFxmL2qmBuzZpEy0",
        "crv": "P-256",
        "kid": "FsHUZY4_tDJDvxdp5B6moS1kwpP7PBekw4KfK7m0LCU",
        "x": "keR9l4u1SaZKMZ7wHvj_3z44vP0sa3nlzrnc8UjpQV0",
        "y": "pmcaedg5dtc2R6ZPZfWCBY56_M_5fUZgsz4LWD0mG8U"
    }
    },
    "credentialConfigurationId": "UniversityDegree_jwt_vc_json",
    "credentialData":{
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://www.w3.org/2018/credentials/examples/v1"
        ],
        "type": [
            "VerifiableCredential",
            "UniversityDegreeCredential"
        ],
        "credentialSubject": {
            "degree":{
                "type": "BachelorDegree",
                "name": "Bachelor of Science and Arts"
            }
        }
    },
    "authenticationMethod": "PRE_AUTHORIZED",
    "issuerDid": "did:jwk:eyJrdHkiOiJFQyIsImNydiI6IlAtMjU2Iiwia2lkIjoiRnNIVVpZNF90REpEdnhkcDVCNm1vUzFrd3BQN1BCZWt3NEtmSzdtMExDVSIsIngiOiJrZVI5bDR1MVNhWktNWjd3SHZqXzN6NDR2UDBzYTNubHpybmM4VWpwUVYwIiwieSI6InBtY2FlZGc1ZHRjMlI2WlBaZldDQlk1Nl9NXzVmVVpnc3o0TFdEMG1HOFUifQ"
}
```

## Issuance flow example

This example is based on the flow of [this issuer](https://talao.co/sandbox/issuer/test_2).

Below the URL encoded credential offer which is read as a QR code by the wallet:

```
openid-credential-offer://?credential_offer_uri=https://talao.co/issuer/credential_offer_uri/ca0f1c7e-9426-11ef-b6e7-0a1628958560
```

First the wallet calls the credential_offer_uri endpoint:

```https
GET /issuer/credential_offer_uri/ca0f1c7e-9426-11ef-b6e7-0a1628958560
Host: talao.co
```

The issuer responds with the credential offer which looks like this:

```json
{
      "credential_offer": {
            "credential_issuer": "https://talao.co/issuer/sobosgdtgd",
            "credential_configuration_ids": [
                  "InsuranceNaturalPerson"
            ],
            "grants": {
                  "urn:ietf:params:oauth:grant-type:pre-authorized_code": {
                        "pre-authorized_code": "dfc8ee59-9430-11ef-9e55-0a1628958560"
                  }
            }
      }
}
```

Then the wallet calls the issuer metadata endpoint:

```https
GET /issuer/sobosgdtgd/.well-known/openid-credential-issuer
Host: talao.co
```

The issuer responds with the issuer matadata which looks like this:

```json
{
    "credential_issuer": "https://talao.co/issuer/sobosgdtgd",
    "pre-authorized_grant_anonymous_access_supported": true,
    "display": [
        {
            "name": "Talao issuer",
            "locale": "en-US",
            "logo": {
                "uri": "https://talao.co/static/img/talao.png",
                "alt_text": "Talao logo"
            }
        },
        {
            "name": "Talao issuer",
            "locale": "fr-FR",
            "logo": {
                "uri": "https://talao.co/static/img/talao.png",
                "alt_text": "Talao logo"
            }
        }
    ],
    "credential_endpoint": "https://talao.co/issuer/sobosgdtgd/credential",
    "deferred_credential_endpoint": "https://talao.co/issuer/sobosgdtgd/deferred",
    "scopes_supported": [
        "openid"
    ],
    "response_types_supported": [
        "vp_token",
        "id_token"
    ],
    "response_modes_supported": [
        "query"
    ],
    "grant_types_supported": [
        "authorization_code",
        "urn:ietf:params:oauth:grant-type:pre-authorized_code"
    ],
    "subject_types_supported": [
        "public",
        "pairwise"
    ],
    "id_token_signing_alg_values_supported": [
        "ES256",
        "ES256K",
        "EdDSA",
        "RS256"
    ],
    "request_object_signing_alg_values_supported": [
        "ES256",
        "ES256K",
        "EdDSA",
        "RS256"
    ],
    "request_parameter_supported": true,
    "request_uri_parameter_supported": true,
    "token_endpoint_auth_methods_supported": [
        "client_secret_basic",
        "client_secret_post",
        "client_secret_jwt",
        "none"
    ],
    "request_authentication_methods_supported": {
        "authorization_endpoint": [
            "request_object"
        ]
    },
    "subject_syntax_types_supported": [
        "urn:ietf:params:oauth:jwk-thumbprint",
        "did:key",
        "did:ebsi",
        "did:pkh",
        "did:ethr",
        "did:web",
        "did:jwk"
    ],
    "subject_syntax_types_discriminations": [
        "did:key:jwk_jcs-pub",
        "did:ebsi:v1"
    ],
    "subject_trust_frameworks_supported": [
        "ebsi"
    ],
    "id_token_types_supported": [
        "subject_signed_id_token"
    ],
    "authorization_endpoint": "https://talao.co/issuer/sobosgdtgd/authorize",
    "token_endpoint": "https://talao.co/issuer/sobosgdtgd/token",
    "jwks_uri": "https://talao.co/issuer/sobosgdtgd/jwks",
    "pushed_authorization_request_endpoint": "https://talao.co/issuer/sobosgdtgd/authorize/par",
    "credential_configurations_supported": {
        "InsuranceNaturalPerson": {
            "scope": "InsuranceNaturalPerson_scope",
            "display": [
                {
                    "locale": "en-US",
                    "name": "Issurance attestation",
                    "description": "Insurance for liability risks",
                    "background_color": "#3B6F6D",
                    "text_color": "#FFFFFF",
                    "logo": {
                        "uri": "https://dutchblockchaincoalition.org/assets/images/icons/Logo-DBC.png",
                        "alt_text": "AXA International."
                    },
                    "background_image": {
                        "uri": "https://i.ibb.co/CHqjxrJ/dbc-card-hig-res.png",
                        "alt_text": "AXA International"
                    }
                }
            ],
            "id": "InsuranceNaturalPerson",
            "credential_definition": {
                "type": [
                    "VerifiableCredential",
                    "InsuranceNaturalPerson"
                ],
                "credentialSubject": {
                    "insurerName": {
                        "display": [
                            {
                                "name": "Insurer name",
                                "locale": "en-US"
                            }
                        ]
                    },
                    "leiCodeInsurer": {
                        "display": [
                            {
                                "name": "LEI code",
                                "locale": "en-US"
                            }
                        ]
                    },
                    "contractId": {
                        "display": [
                            {
                                "name": "Contract Identifier",
                                "locale": "en-US"
                            }
                        ]
                    },
                    "insuredPerson": {}
                }
            },
            "format": "jwt_vc_json",
            "cryptographic_binding_methods_supported": [
                "did:jwk",
                "did:key"
            ],
            "proof_types_supported": {
                "jwt": {
                    "proof_signing_alg_values_supported": [
                        "ES256"
                    ]
                }
            },
            "credential_signing_alg_values_supported": [
                "ES256"
            ]
        }
    }
}

```

Then wallet calls the token endpoint with the pre authorized code and a client_id (optional):

```https
POST /issuer/sobosgdtgd/token HTTP/1.0
Host: talao.co
Content-Type: application/x-www-form-urlencoded
Content-Length: 321

grant_type=urn:ietf:params:oauth:grant-type:pre-authorized_code
&pre-authorized_code=dfc8ee59-9430-11ef-9e55-0a1628958560
&client_id=did:jwk:eyJjcnYiOiJQLTI1NiIsImt0eSI6IkVDIiwieCI6IkthY0xyeG1OMXhNNGlrZWY2bHJRM1F5d25PVEdrR05xV3hhM2Rsc1pReDgiLCJ5IjoiYXZWZWgzY3Z5SVl1Q0NUVDF5YnZKeFoyeXNvQ2FuaDFOOE9nTzFBT1M3WSJ9
```

The issuer responds with an access token and a c_nonce (optional):

```json
{
    "access_token": "4fed3ac3-9431-11ef-b492-0a1628958560",
    "c_nonce": "4fed3cc1-9431-11ef-beed-0a1628958560",
    "token_type": "bearer",
    "expires_in": 10000,
    "c_nonce_expires_in": 1704466725,
    "refresh_token": "4fed3c24-9431-11ef-b9f1-0a1628958560"
}
```

Then the wallet calls the credential endpoint with the format and type of the credential and a proof of key ownership as a jwt:

```https
POST /issuer/sobosgdtgd/credential HTTP/1.0
Host: talao.co
Authorization: Bearer 4fed3ac3-9431-11ef-b492-0a1628958560
Content-Type: application/json
Content-Length: 932

{
    "format": "jwt_vc_json",
    "credential_definition": {
        "type": [
            "VerifiableCredential",
            "InsuranceNaturalPerson"
        ]
    },
    "proof": {
        "proof_type": "jwt",
        "jwt": "eyJhbGciOiJFUzI1NiIsInR5cCI6Im9wZW5pZDR2Y2ktcHJvb2Yrand0Iiwia2lkIjoiZGlkOmp3azpleUpqY25ZaU9pSlFMVEkxTmlJc0ltdDBlU0k2SWtWRElpd2llQ0k2SWt0aFkweHllRzFPTVhoTk5HbHJaV1kyYkhKUk0xRjVkMjVQVkVkclIwNXhWM2hoTTJSc2MxcFJlRGdpTENKNUlqb2lZWFpXWldnelkzWjVTVmwxUTBOVVZERjVZblpLZUZveWVYTnZRMkZ1YURGT09FOW5UekZCVDFNM1dTSjkjMCJ9.eyJpc3MiOiJkaWQ6andrOmV5SmpjbllpT2lKUUxUSTFOaUlzSW10MGVTSTZJa1ZESWl3aWVDSTZJa3RoWTB4eWVHMU9NWGhOTkdsclpXWTJiSEpSTTFGNWQyNVBWRWRyUjA1eFYzaGhNMlJzYzFwUmVEZ2lMQ0o1SWpvaVlYWldaV2d6WTNaNVNWbDFRME5VVkRGNVluWktlRm95ZVhOdlEyRnVhREZPT0U5blR6RkJUMU0zV1NKOSIsImlhdCI6MTczMDAxMjQ3MCwiYXVkIjoiaHR0cHM6Ly90YWxhby5jby9pc3N1ZXIvc29ib3NnZHRnZCIsIm5vbmNlIjoiNGZlZDNjYzEtOTQzMS0xMWVmLWJlZWQtMGExNjI4OTU4NTYwIn0.2rQCQ8PJy5bu8wVUJ76C_qVXcdrj5ajyUFNwk3agvMbPMH40B8fu0Oq5dMiz7h2YGPgjI87wQBjFHToEhaN-5w"
    }
}
```

The issuer responds with the credential:

```json
{
  "credential": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDp3ZWI6YXBwLmFsdG1lLmlvOmlzc3VlciNrZXktMSIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjE1NDg1MDAsImlhdCI6MTczMDAxMjUwMCwiaXNzIjoiZGlkOndlYjphcHAuYWx0bWUuaW86aXNzdWVyIiwianRpIjoidXJuOnV1aWQ6NTBjZmJmMzEtOTQzMS0xMWVmLTg1ZDUtMGExNjI4OTU4NTYwIiwibmJmIjoxNzMwMDEyNTAwLCJub25jZSI6IjRmZWQzY2MxLTk0MzEtMTFlZi1iZWVkLTBhMTYyODk1ODU2MCIsInN1YiI6ImRpZDpqd2s6ZXlKamNuWWlPaUpRTFRJMU5pSXNJbXQwZVNJNklrVkRJaXdpZUNJNklrdGhZMHh5ZUcxT01YaE5OR2xyWldZMmJISlJNMUY1ZDI1UFZFZHJSMDV4VjNoaE0yUnNjMXBSZURnaUxDSjVJam9pWVhaV1pXZ3pZM1o1U1ZsMVEwTlVWREY1WW5aS2VGb3llWE52UTJGdWFERk9PRTluVHpGQlQxTTNXU0o5IiwidmMiOnsiY3JlZGVudGlhbFN0YXR1cyI6W3siaWQiOiJodHRwczovL3RhbGFvLmNvL3NhbmRib3gvaXNzdWVyL2JpdHN0cmluZ3N0YXR1c2xpc3QvMSM2NTU1MiIsInN0YXR1c0xpc3RDcmVkZW50aWFsIjoiaHR0cHM6Ly90YWxhby5jby9zYW5kYm94L2lzc3Vlci9iaXRzdHJpbmdzdGF0dXNsaXN0LzEiLCJzdGF0dXNMaXN0SW5kZXgiOiI2NTU1MiIsInN0YXR1c1B1cnBvc2UiOiJyZXZvY2F0aW9uIiwidHlwZSI6IkJpdHN0cmluZ1N0YXR1c0xpc3RFbnRyeSJ9XSwiY3JlZGVudGlhbFN1YmplY3QiOnsiY29udHJhY3QiOnsiY29udHJhY3RBbW91bnQiOjEwMDAwMDAwLCJjb250cmFjdFR5cGUiOiJMaWFiaWxpdHkgcmlza3MiLCJjdXJyZW5jeSI6IkVVUiJ9LCJjb250cmFjdElkIjoiODk3ODk3NjUgOTc2OTY1IiwiaWQiOiIiLCJpbnN1cmVkUGVyc29uIjp7ImJpcnRoZGF0ZSI6IjIwMDAtMTItMDEiLCJmYW1pbHlfbmFtZSI6IkRvZSIsImdpdmVuX25hbWUiOiJKb2huIn0sImluc3VyZXJOYW1lIjoiQVhBIEludGVybmF0aW9uYWwiLCJsZWlDb2RlSW5zdXJlciI6IjAyMDk5ODc2RlI3NSJ9LCJleHBpcmF0aW9uRGF0ZSI6IjIwMjUtMTAtMjdUMDY6NTg6MzBaIiwiaWQiOiJ1cm46dXVpZDo0ZDQ3YTZiYS01MWNkLTQxZWYtOWJhYi1mYzQ5NjNiNWFmZjMiLCJpc3N1YW5jZURhdGUiOiIyMDI0LTEwLTI3VDA2OjU4OjMwWiIsInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJJbnN1cmFuY2VOYXR1cmFsUGVyc29uIl19fQ.1DI8Fwe-uWXF3FyxksgNVb453XylOBL8CeQuf-sPI0_Soo_MXHYmwGsKiS6m-rOVCNu4DihclrtIG4NElWbnAg"
}
```

The wallet stores the credential with the issuer metadata for correct rendering.
