# Issuer Configuration

Updated the 16th of October 2024.

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
* batch endpoint (Draft 13 and Draft 14),
* DPoP for code and token (soon available),
* encrypted credentials.

## Invocation schemes for issuance

Wallet support different invocation schemes:

* openid-credential-offer://,
* haip://,
* https://app.altme.io/app/download/oidc4vc,
* https://app.talao.co/app/download/oidc4vc

Those schemes can be displayed as QR code for wallet app scanner, smartphone camera or as a deeplink/universal link (a button in a html page for the smartphone browser).

## Display credentials

### Attributes of a VC

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

### Attributes of a claim

Wallets show only but all claims that are in the issuer metadata, rules are:

* if there is a` display` attribute in the claim, wallet displays the label in bold with the claim value on the same line. Otherwise wallet displays the claim value alone,
* if the claim is a json object (nested claims) without `display` -> it goes to the line and indent,
* if the claim is a json object with a `display` -> it displays the label in bold and goes to the line and indent.

With this issuer metadata:

```
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

```
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
