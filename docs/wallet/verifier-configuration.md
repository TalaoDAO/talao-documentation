# Verifier configuration

Updated the 14th of October 2024.

## OIDC4VP Specifications Drafts

Wallets support both OIDC4VP and SIOPV2 specifications.

* [OIDC4VP Draft 18](https://openid.net/specs/openid-4-verifiable-presentations-1_0-18.html) supported
* [OIDC4VP Draft 20](https://openid.net/specs/openid-4-verifiable-presentations-1_0-20.html) supported
* [OIDC4VP Draft 21](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) coming soon
* [SIOPV2 Draft 13](https://openid.net/specs/openid-connect-self-issued-v2-1_0.html) supported

## OIDC4VP and SIOPV2 features

Wallets support:

* client_id_scheme,
* request in value and request_uri,
* presentation_definition and presentation_definition_uri,
* direct_post and direct_post.jwt,
* id_token, vp_token, id_token vp_token response_type,
* client_metadata
* signed response JARM

Wallets do not support:

* request uri Method Post,
* encrypted response,
* openid federation 1.0.

## Invocation schemes for verification

Wallets support different invocation schemes:

* openid://,
* openid-vc://,
* haip://,
* siopv2://
* https://app.altme.io/app/download/authorize,
* https://app.talao.co/app/download/authorize

Those schemes can be displayed as QR code for wallet app scanner, smartphone camera or as a deeplink/universal link (a button in a html page for the smartphone browser).

## client_id_scheme

Wallet supports the following [client_id_scheme](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-verifier-metadata-managemen) of verifiers:

* did,
* x509_san_dns,
* verifier_attestation,
* redirect_uri

## wallet metadata

Wallet metadata are available "out of band", see [here](https://doc.wallet-provider.io/wallet/wallet-metadata).

## sd-jwt presentation

The presentation is done in two steps which are the choice of the credential then the selection of the data that will be presented. The credential contains 3 types of data:

* The payload jwt attribute (iss, iat, vct,...) that is systematically presented and is not displayed to the user during the process,
* The “disclosure” data that is displayed and selectable,
* The data defined by a “claim” is displayed to the user. If this data is in the “disclosure” it is selectable.

In the case of a presentation with the “limit disclosure” option, the user does not make a choice and the “disclosure” data targeted by the filters are selected automatically. User can only accept or refuse to send the verifiable credential.
