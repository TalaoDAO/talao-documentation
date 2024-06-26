import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {

  // But you can create a sidebar manually
  documentationSidebar: [
    'SSI_flow',
    'wallet_startup',
    'Talao_app',
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'enterprise_configuration',
        'wallet_configuration',
      ],
    },
    'architecture',
    {
      type: 'category',
      label: 'FAQs',
      items: [
        'FAQs_Talao',
        'FAQs_wallet_provider',
      ],
    },
  ],
};

export default sidebars;
