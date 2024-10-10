# Developer Mode

The developer mode allow any technical users to get internal information about the wallet data and logic. It modifies the display of verifiable credentials and it provides data of the wallet calls and responses.

The developer mode can be removed from the settings menu of the wallet through the Wallet Provider Backend.

Below are all the wallet features which are enhanced or modified in the developer mode.

## Display of verifiable credentials

Verifiable credentials are displayed in their original form as json-ld or jwt. For jwt users have an access to the header and payload of the credentials. For sd-jwt vc, jwt are displayed with all disclosures decoded.

## Display of the wallet instance attestation

If the wallet is used with the wallet provider backend the developer mode gives access to the wallet instance attestation which is displayed on the main screen of the wallet.

## Verifiable credentials status and validity

In case of signature failure or invalid status, the reasons of the problems are provided in details.

## Protocol flow

After scanning an OIDC4VC QR code a popup proposes to users to:

* display the QR code data and the OpeinID issuer metadata,
* download this information as a text file,
* skip to bypass.

Within the OIDC4VCI flow, the wallet proposes to display or download the data received from:

- the token endpoint,
- the credential endpoint.

## Display of errors

In case of an error response from issuers or verifiers, users have an access to the `error_description` data returned.
