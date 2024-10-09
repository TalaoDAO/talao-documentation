# Issuer configuration

The wallets support most of the VC options of the OIDC4VCI standard for issuer configuration.

## OIDC4VCI Specifications Drafts

OIDC4VCI has evolved rapidly between 2022 (Draft 10/11) and 2024 (Draft >= 13). The issuer metadata has changed multiple times. Right now wallets support Draft 10/11 and Draft 13 of the specifications. The selection of one Draft or another can be done manually in the wallet with the custom profile and the OIDCVC settings screen or through the wallet provider backend.

**EBSI V3.x is based on OIDC4VCI Draft 10**, DIIP V2.1, DIIP V3.0 and ARF uses Draft 13.

Specifications of the different Drafts are available here:

* [Draft 10](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-10.html)
* [Draft 11](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-11.html) very close to 10
* [Draft 12](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-12.html) Almost not used
* [Draft 13](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-13.html) current official specs
* [Draft 14](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-14.html) soon supported by wallets (Oct 2024)

## OIDC4VCI flow and features

Wallets support:

* credential offer by value and by reference,
* pre authorized code (by default), authorized code flow, push authorization request, PKCE,
* [Attestation based client authentication](https://datatracker.ietf.org/doc/draft-ietf-oauth-attestation-based-client-auth/),
* `tx_code` with`input_mode` `text`or`numeric`, `lenght`and`description`,
* `authorization_details` (by default) and `scope`. Tune with OIDCVC settings or wallet provider backend to use `scope`.,
* authorization server as a standalone server associated to one VC type,
* dynamic credential request,
* client secret post, client secret basic and public client authentication
* bearer credential (no crypto binding)
* proof types as `jwt` or `ldp_vc`
* proof of possession header with `kid` or `jwk`
* deferred endpoint
* wallet id scheme as cnf of DID

Wallets do not support:

* notification endpoint,
* batch endpoint (Draft 13)
* DPoP for code and token (soon available)
* encrypted credentials

## Invocation schemes for issuance

Wallet support different invocation schemes:

* openid-credential-offer://,
* haip://,
* https://app.altme.io/app/download/oidc4vc,
* https://app.talao.co/app/download/oidc4vc

Those schemes can be displayed as QR code for wallet app scanner, smartphone camera or as a deeplink/universal link (a button in a html page for the smartphone browser).

## Display credentials

### Attribute of a VC

Wallet support all the attributes of the display.

```
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

### Attribute of a claim

Only claims defined with a `display` attribute are displayed in the card detail screen of the wallets. The reason is that some issuers do not want to display claims which do not make sense (a hash, an identifier, ...) so it is the only way to let them manage that option.

Wallets support all attributes of the display :

```
"claims": {
    "given_name": {
    "value_type": "string",
    "display": [
        {
            "name": "First Name",
            "locale": "en-US"
        },
   
```

`value_type` supported are `string`, `integer`, `email` and `uri` and `image/jpeg` . `email` and `uri` are active as you can launch the browser or open the smartphone email manager with a clic.

`order` is supported,`mandatory` in not supported.

`locale` is supported. Locale language is chosen depending on the smartphone language. If the smartphone language translation is not provided with the claim, wallet will use english or locale.

### Nested claims

Wallets display nested claims with an indent. Nested json in VC must be defined with nested display json in the issuer metadata. Example with PID `address` description in the issuer metadata:

```
"address": {
    "mandatory": true,
    "value_type": "string",
    "display": [
        {
            "name": "Address",
            "locale": "en-US"
        },
        {
            "name": "Adresse",
            "locale": "fr-FR"
        }
    ],
    "formatted": {
        "mandatory": true,
        "value_type": "string",
        "display": [
            {
                "name": "Formatted",
                "locale": "en-US"
            },
            {
                "name": "Complete",
                "locale": "fr-FR"
            }
        ]
    },
   
}
```

### Pictures

Use the value_type `image/jpeg`

```"
picture": {
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
