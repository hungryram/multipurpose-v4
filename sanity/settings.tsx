import { definePlugin } from 'sanity';
import { client } from './lib/client';

type SettingsPluginConfig = {
  types: string[];
};

export const settingsPlugin = definePlugin<SettingsPluginConfig>(({ types }) => {
  return {
    name: 'settings',
    document: {
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter((templateItem) => !types.includes(templateItem.templateId));
        }
        return prev;
      },
      actions: (prev, { schemaType }) => {
        if (types.includes(schemaType)) {
          return prev.filter(({ action }) => action !== 'delete' && action !== 'duplicate');
        }
        return prev;
      },
    },
  };
});
