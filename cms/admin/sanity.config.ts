import { defineConfig } from 'sanity'
import {deskTool} from 'sanity/desk'
import { colorInput } from "@sanity/color-input";
import { MdOutlineDesignServices, MdPersonOutline } from "react-icons/md"
import {media} from 'sanity-plugin-media'

//  DOCUMENTS
import authorType from '../admin/schemas/documents/author'
import postType from '../admin/schemas/documents/blog'
import homeDocument from '../admin/schemas/documents/home'
import profileDocument from '../admin/schemas/documents/profile'
import pagesDocument from '../admin/schemas/documents/pages'
import appearanceDocument from '../admin/schemas/documents/appearance'
import testimonialsDocument from '../admin/schemas/documents/testimonials'
import teamDocument from '../admin/schemas/documents/team'
import navigationDocument from '../admin/schemas/documents/navigation'
import servicesDocument from '../admin/schemas/documents/services'
import legalDocument from '../admin/schemas/documents/legal'
import pageSettingsDocument from "../admin/schemas/documents/page-settings"

// OBJECTS
import contentObject from '../admin/schemas/objects/content'
import seoObject from '../admin/schemas/objects/seo'
import contactObject from '../admin/schemas/objects/contact'
import youtubeObject from '../admin/schemas/objects/youtube'
import locationObject from '../admin/schemas/objects/location'
import socialObject from '../admin/schemas/objects/social'
import mainColorObject from '../admin/schemas/objects/maincolors'
import headerMenuObject from '../admin/schemas/objects/headermenu'
import brandingObject from '../admin/schemas/objects/branding'
import imagecolorObject from '../admin/schemas/objects/imagecolor'
import submenuObject from '../admin/schemas/objects/submenu'
import navigationObject from '../admin/schemas/objects/navigation'
import linksObject from '../admin/schemas/objects/links'
import buttonSettingsObject from '../admin/schemas/objects/button-settings'
import secondaryButtonObject from '../admin/schemas/objects/secondary-button'
import codeBlockObject from '../admin/schemas/objects/codeBlock'
import backgroundStylesObject from '../admin/schemas/objects/background-style'
import formBuilderObject from '../admin/schemas/objects/form-builder'

//  PAGEBUILDER
import heroBuilder from '../admin/schemas/pagebuilder/hero'
import bannerBuilder from '../admin/schemas/pagebuilder/call-to-action'
import disclosureBuilder from '../admin/schemas/pagebuilder/disclosure'
import codeBuilder from '../admin/schemas/pagebuilder/code'
import testimonialsBuilder from '../admin/schemas/pagebuilder/testimonials'
import imageGalleryBuilder from '../admin/schemas/pagebuilder/image-gallery'
import featuredGridBuilder from '../admin/schemas/pagebuilder/featured-grid'
import leadFormBuilder from '../admin/schemas/pagebuilder/lead-form'
import logosBuilder from '../admin/schemas/pagebuilder/logos'
import teamSectionBuilder from '../admin/schemas/pagebuilder/team-section'
import blogSectionBuilder from '../admin/schemas/pagebuilder/blog-section'
import servicesSectionBuilder from '../admin/schemas/pagebuilder/service-section'
import contentBuilder from '../admin/schemas/pagebuilder/content'

export default defineConfig({
  name: 'default',
  title: 'admin',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  schema: {
    types: [
      // DOCUMENTS
      // settingsType,
      appearanceDocument,
      profileDocument,
      pageSettingsDocument,
      homeDocument,
      navigationDocument,
      pagesDocument,
      servicesDocument,
      teamDocument,
      testimonialsDocument,
      // pressDocument,
      postType,
      authorType,
      legalDocument,
      // OBJECTS
      contentObject,
      youtubeObject,
      buttonSettingsObject,
      secondaryButtonObject,
      seoObject,
      contactObject,
      locationObject,
      socialObject,
      mainColorObject,
      headerMenuObject,
      linksObject,
      brandingObject,
      imagecolorObject,
      backgroundStylesObject,
      submenuObject,
      navigationObject,
      codeBlockObject,
      formBuilderObject,
      // PAGEBUILDER
      heroBuilder,
      codeBuilder,
      testimonialsBuilder,
      imageGalleryBuilder,
      teamSectionBuilder,
      blogSectionBuilder,
      bannerBuilder,
      disclosureBuilder,
      leadFormBuilder,
      featuredGridBuilder,
      servicesSectionBuilder,
      contentBuilder,
      logosBuilder,
    ]
  },
  plugins: [
    deskTool({
      structure: (S) => {
        const profileListItem = // A singleton not using `documentListItem`, eg no built-in preview
          S.listItem()
            .title(profileDocument.title || '')
            .icon(MdPersonOutline)
            .child(
              S.editor()
                .id(profileDocument.name)
                .schemaType(profileDocument.name)
                .documentId(profileDocument.name)
            )

        const appearanceListItem = // A singleton not using `documentListItem`, eg no built-in preview
          S.listItem()
            .title(appearanceDocument.title || '')
            .icon(MdOutlineDesignServices)
            .child(
              S.editor()
                .id(appearanceDocument.name)
                .schemaType(appearanceDocument.name)
                .documentId(appearanceDocument.name)
            )

        const PageSettingsListItem = // A singleton not using `documentListItem`, eg no built-in preview
          S.listItem()
            .title(pageSettingsDocument.title || '')
            .child(
              S.editor()
                .id(pageSettingsDocument.name)
                .schemaType(pageSettingsDocument.name)
                .documentId(pageSettingsDocument.name)
            )

        // The default root list items (except custom ones)
        const defaultListItems = S.documentTypeListItems().filter((listItem) => {
          const listItemID = listItem.getId();
          return (
            listItemID &&
            ![appearanceDocument.name, pageSettingsDocument.name, 'media.tag', profileDocument.name].includes(listItemID)
          );
        });

        return S.list()
          .title('Content')
          .items([profileListItem, appearanceListItem, PageSettingsListItem, S.divider(), ...defaultListItems])
      },

    }),
    // settingsPlugin({ types: [appearanceDocument.name, pageSettingsDocument.name, profileDocument.name] }),
    // PreviewPlugin({ types: ['pages', 'team', 'legal', 'services', 'blog', 'homeDesign'] }),
    colorInput(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    media(),
  ],
})
