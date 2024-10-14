import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  documentationSidebar: [
    'welcome',
    {
      type: 'category',
      label: 'Wallet',
      items: [
        'wallet/setup_wallet',
        'wallet/getting_started',
        'wallet/main-wallet-screens',
        'wallet/wallet-profiles',
        'wallet/oidc4vc_settings',
        'wallet/self-sovereign-identity',
        'wallet/developer-mode',
        'wallet/wallet-with-wallet-provider-backend',
        'wallet/issuer_configuration',
        'wallet/technical_features',
        'wallet/verifier-configuration',
        'wallet/wallet-metadata',
      ],
    },
    {
      type: 'category',
      label: 'Wallet provider backend',
      items: [
        'wallet-provider-backend/wallet-provider-backend-overview',
        'wallet-provider-backend/manage-organizations',
        'wallet-provider-backend/manage-users',
        'wallet-provider-backend/ssi-data',
        'wallet-provider-backend/issuer-marketplace',
        'wallet-provider-backend/support',
      ],
    },
  ],
};

export default sidebars;
