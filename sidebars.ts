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

  // Manual sidebar creation
  documentationSidebar: [
    {
      type: 'category',
      label: 'Wallet',
      items: [
        'wallet/overview',
        'wallet/setup-the-wallet',
        'wallet/main-wallet-screens',
        'wallet/settings-menu',
        'wallet/wallet-profiles',
        'wallet/wallet-security',
        'wallet/self-sovereign-identity',
        'wallet/developer-mode',
        'wallet/help-center',
        'wallet/about-and-activity-log',
        'wallet/reset-wallet',
        'wallet/altme-and-blockchain-support',
        'wallet/wallet-with-wallet-provider-backend',
        'wallet/issuer-configuration',
        'wallet/verifier-configuration',
        'wallet/wallet-technical-features',
        'wallet/faq',
        'wallet/beta-tester-program',
      ],
    },
    {
      type: 'category',
      label: 'Wallet provider backend',
      items: [
        'wallet-provider-backend/overview',
        'wallet-provider-backend/manage-organizations',
        'wallet-provider-backend/manage-users',
        'wallet-provider-backend/branding',
        'wallet-provider-backend/settings',
        'wallet-provider-backend/ssi-data',
        'wallet-provider-backend/issuer-marketplace',
        'wallet-provider-backend/blockchain',
        'wallet-provider-backend/support',
        'wallet-provider-backend/faq',
      ],
    },
    'architecture',
  ],
};

export default sidebars;
