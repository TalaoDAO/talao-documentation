# Verifier configuration

Updated the 16th of October 2024.

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

* did : wallets resolve the DID Document to validate the request object signature, All standards DID methods are supported through an external instance of the DID resolver managed by Talao.
* x509_san_dns : wallets get the public key from the last X509 certificate to validate the request object signature. Wallets use the dNSName Subject Alternative Name (SAN) to request consent from user to present the VC.
* verifier_attestation: wallets validate the signature of the request object with the publick key in the cnf of the verifier attestation,
* redirect_uri: there is no validation of the request as the request object must not be signed.

## Wallet metadata

Wallet metadata are available "out of band", see [here](https://doc.wallet-provider.io/wallet/wallet-metadata).

## sd-jwt presentation rules

The presentation is done in two steps which are the choice of the credential then the selection of the data that will be presented. The credential contains 3 types of data:

* The standards jwt attributes as iss, iat, vct,...that are systematically presented and not displayed to the user during the process,
* The “disclosable” claims that are displayed and selectable (except for `limit_disclosure = required`),
* Other claims defined in the jwt are displayed to the user and not selectable

For data minimization purpose, in case of a presentation_definition including the `limit_disclosure = required` option, user can only accept or refuse to present the verifiable credential. The data set of the VC is limited to what is strictly required by the verifier.

## Submission Requirement Features

Learn more about tghis topic [here](https://identity.foundation/presentation-exchange/#submission-requirement-feature).

To be done
