# Wallet profiles

Updated the 14th of October 2024.

Users can access to wallet profiles through Settings/Wallet Profiles. This feature feature can be hidden in case of a specific wallet configuration through the Wallet Provider Backend.

Talao and Altme wallets can be directly downloaded from the Google or Apple stores and used as is. In that scenario users can choose between a list of 5 standards profiles and advances users can define their specific custom profile.

## Embedded standard wallet profiles

The standard profiles available are:


| Profiles  | VC format              | OIDC4VCI | OIDC4VP |
| :---------- | ------------------------ | ---------- | --------- |
| Default   | ldp_vc                 | 11       | 13      |
| EBSI V3.x | jwt_vc                 | 11       | 18      |
| EBSI V4.0 | jwt_vc_json, sd-jwt vc | 13       | 20      |
| DIIP V2.1 | jwt_vc_json            | 13       | 18      |
| DIIP V3.0 | sd-jwt vc              | 13       | 20      |

## Custom profile

To define a custom profile of the wallet:

1. Choose profile "Custom",
2. Select  Settings/Self Sovereign Identity/OIDC4VCI settings

This section allows an advanced user to specify manually the SSI profile of his wallet.
