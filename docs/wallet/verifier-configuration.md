# Verifier configuration

Updated the 21st of October 2024.

## OIDC4VP Specifications Drafts

Wallets support both OIDC4VP and SIOPV2 specifications.

- [OIDC4VP Draft 18](https://openid.net/specs/openid-4-verifiable-presentations-1_0-18.html) supported
- [OIDC4VP Draft 20](https://openid.net/specs/openid-4-verifiable-presentations-1_0-20.html) supported
- [OIDC4VP Draft 21](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) coming soon
- [SIOPV2 Draft 13](https://openid.net/specs/openid-connect-self-issued-v2-1_0.html) supported

## OIDC4VP and SIOPV2 features

Wallets support:

- client_id_scheme,
- request in value and request_uri,
- presentation_definition and presentation_definition_uri,
- direct_post and direct_post.jwt,
- id_token, vp_token, id_token vp_token response_type,
- client_metadata
- signed response JARM

Wallets do not support:

- request uri Method Post,
- encrypted response,
- openid federation 1.0.

## Invocation schemes for verification

Wallets support different invocation schemes:

- openid://,
- openid-vc://,
- haip://,
- siopv2://
- https://app.altme.io/app/download/authorize,
- https://app.talao.co/app/download/authorize

Those schemes can be displayed as QR code for wallet app scanner, smartphone camera or as a deeplink / universal link (a button in a html page for the smartphone browser).

# Support of Universal Links and App Links

For security reasons Talao wallets use Universal Links and App Links to redirect to wallet authorization endpoints and callback endpoints. However those links are not supported by default by all browsers. We suggest to use **Safari for IOS** phones and **Chrome for Android**. You may need to setup browser options manually to allow Universal links and App Links with Firefox, Brave, Samsung explorer or even Chrome on IOS.

## client_id_scheme

Wallet supports the following [client_id_scheme](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-verifier-metadata-managemen) of verifiers:

- did : wallets resolve the DID Document to validate the request object signature, All standards DID methods are supported through an external instance of the DID resolver managed by Talao.
- x509_san_dns : wallets get the public key from the last X509 certificate to validate the request object signature. Wallets use the dNSName Subject Alternative Name (SAN) to request consent from user to present the VC.
- verifier_attestation: wallets validate the signature of the request object with the public key in the cnf of the verifier attestation,
- redirect_uri: there is no validation of the request as the request object must not be signed.

## Wallet metadata

Wallet metadata are available "out of band".

- Talao: [https://app.talao.co/wallet-issuer/.well-known/openid-configuration](https://app.talao.co/wallet-issuer/.well-known/openid-configuration)
- Altme: [https://app.altme.io/wallet-issuer/.well-known/openid-configuration](https://app.altme.io/wallet-issuer/.well-known/openid-configuration)

## Submission presentation

Submission presentation seng by wallets support nested_path.

## sd-jwt presentation rules

The presentation is done in two steps which are the choice of the credential then the selection of the data that will be presented. In case of only 1 credential that fits with the presentation_definition the choice step is by passed.

The credential contains 3 types of data:

- The standards jwt attributes as iss, iat, vct,...that are systematically presented and not displayed to the user during the process,
- The “disclosable” claims that are displayed and selectable (except for `limit_disclosure = required`),
- Other claims defined in the jwt are displayed to the user and not selectable

For data minimization purpose, in case of a presentation_definition including the `limit_disclosure = required` option, user can only accept or refuse to present the verifiable credential. The data set of the VC is limited to what is strictly required by the verifier.

## Submission Requirement Features

Learn more about this topic [here](https://identity.foundation/presentation-exchange/#submission-requirement-feature).

To be done

## Waltid integration

Integration of the example provided by waltid documentation must be updated by:

- QR code returned by Waltid API must be corrected as client_id must be equal to response_uri when `client_id_scheme = redirect_uri`. See [https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-verifier-metadata-managemen](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-verifier-metadata-managemen)
- `path` must be providd from upper object. Replace `$.type` by `$.vc.type`
- `type` is an array so filter must be set accordingly

```
constraints': {
    'fields': [
        {
            'path': [
                '$.vc.type'
            ],
            'filter': {
                'type': 'array',
                'contains': {
                    'const': 'UniversityDegreeCredential'
                }
            }
        }
    ]
}
```
