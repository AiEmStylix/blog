import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
    youtube: {
      render: component('./src/components/Youtube.astro'),
      attributes: {
        id: { type: String, required: true },
        title: { type: String },
      },
    },
  },
});