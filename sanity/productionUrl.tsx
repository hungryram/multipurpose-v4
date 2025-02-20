import { definePlugin } from 'sanity';
import { client } from './lib/client';

type SettingsPluginConfig = {
  types: string[];
};

export const PreviewPlugin = definePlugin<SettingsPluginConfig>(({ types }) => {
  return {
    name: 'settings',
    document: {
      productionUrl: async (prev, context) => {
        const { document } = context;
        const domain = await client.fetch(`*[_type == 'profile'][0].settings.websiteName`);

        const getTypeSlug = (type: string) => {
          const slug = (document as any).slug?.current;
          if (slug) {
            return `${domain}/${type !== 'pages' ? type + '/' : ''}${slug}`;
          }
          return null;
        };

        for (const type of types) {
          if (document._type === type) {
            const url = getTypeSlug(type);
            if (url) {
              return url;
            }
          }
        }

        // Handle other page types here

        return prev;
      },
    },
  };
});
