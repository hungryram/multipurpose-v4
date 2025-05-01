import { groq } from "next-sanity";
import { client } from "./sanity";

export const appearance = groq`
{
  'appearances': *[_type == 'appearances'][0]{
    'navColor': header.navColor.hex,
    'navScrollColor': header.navScrollColor.hex,
    'navBgColor': header.headerColor.hex,
    'navBgScrollColor': header.headerColorScroll.hex,
    'websiteTextColor': mainColors.websiteTextColor.hex,
    'websiteBodyColor': mainColors.websiteBodyColor.hex,
    'websiteHeadingColor': mainColors.websiteHeadingColor.hex,
    'mobileIconColor': header.hamburgerMenuColor.hex,
    'primaryButtonBg': mainColors.buttonBackgroundColor.hex,
    'primaryButtonText': mainColors.buttonTextColor.hex,
    'secondaryButtonBg': mainColors.secondaryButtonBackgroundColor.hex,
    'secondaryButtonText': mainColors.secondaryButtonTextColor.hex,
    'buttonRadius': globalButtonDesign.buttonCorner,
    'buttonXPadding': globalButtonDesign.xPadding,
    'buttonYPadding': globalButtonDesign.yPadding,
    'footerHeader': footer.headerColor.hex,
    'footerText': footer.textColor.hex,
    'footerBg': footer.footerBackgroundColor.hex,
    'primaryAccent': mainColors.primaryColor.hex,
    'secondaryColor': mainColors.secondaryColor.hex,
    'branding': branding {
      logo {
        asset-> {
          url
        }
      },
      logoScroll {
        asset-> {
          url
        }
      },
      logoWidth,
      mobileLogoWidth
    },
    'topHeaderBar': topHeaderBar {
      enableTopHeaderBar,
      'topHeaderBarBgColor': topHeaderBarBgColor.hex,
      'topHeaderBarTextColor': topHeaderBarTextColor.hex
    },
        mobileMenu {
    'mobileBgDrawer': mobileBgDrawer.hex,
    'mobileNavColor': mobileNavColor.hex,
    },
    'header': header {
      hideCta,
      menuLayout,
      'ctaLink': cta {
        newTab,
        _key,
        linkType,
        externalUrl,
        text,
        internalPath,
        internalLink->{
          title,
          'slug': slug.current,
          _type
        }
      },
      'mainNav': mainNav->{
        'navItems':items[]{
          'subMenu':subMenu[]{
            newTab,
            _key,
            linkType,
            externalUrl,
            text,
            internalPath,
            internalLink->{
              title,
              'slug': slug.current,
              _type
            }
          },
          linkType,
          externalUrl,
          text,
          _key,
          newTab,
            internalPath,

          internalLink->{
            title,
            'slug': slug.current,
            _type
          }
        }
      }
    },
    'footer': footer {
      singleColumn,
      footerText,
      footerDisclaimer,
      layoutType,
      shortText,
      quickLinksHeading,
      quickLinksTwoHeading,
      'footerLogo': footerLogo {
        asset->{
          url,
          altText,
          'lqip': metadata.lqip
        }
      },
      'quickLinks': quickLinks[]{
        newTab,
        _key,
        linkType,
        externalUrl,
        text,
            internalPath,
        internalLink->{
          title,
          name,
          'slug': slug.current,
          _type
        }
      },
      'secondQuickLinks': secondQuickLinks[]{
        newTab,
        _key,
        linkType,
        externalUrl,
        text,
        internalPath,
        internalLink->{
          title,
          name,
          'slug': slug.current,
          _type
        }
      }
    }
  },
  'legal': *[_type == 'legal']{
    title,
    'slug': slug.current,
    _id
  },
  'profileSettings': *[_type == 'profile'][0]{
    ...,
    company_name,
    social,
    contact_information {
      ...
    },
    address {
      ...
    },
    settings {
      ...
    }
  }
}
`

export const pageBuilderData = groq`
'backgroundImage': background.background {
  image {
    asset-> {
      'altText': altText,
      'lqip': metadata.lqip,
      url
    }
  }
},
'imageData': image {
  asset-> {
    'altText': altText,
    'lqip': metadata.lqip,
    url
  }
},
'childBlocks': blocks[] {
  ...,
  'blockLinking': button {
    'buttonText': text,
    externalUrl,
    linkType,
    newTab,
    internalPath,
    internalLink->{
      title,
      'slug': slug.current,
      _type
    }
  },
  image {
    asset-> {
      'altText': altText,
      'lqip': metadata.lqip,
      url
    }
  }
},
'childImage': images[] {
  _key,
  content,
  'buttonLinking': button {
    buttonBackground {
      ...
    },
    buttonTextColor {
      ...
    },
    '':button{
      'buttonText': text,
      linkType,
      externalUrl,
      newTab,
      internalPath,
      internalLink->{
        title,
        'slug': slug.current,
        _type
      }
    },
  },
  'secondButtonLinking': secondaryButton {
    buttonBackground {
      ...
    },
    buttonTextColor {
      ...
    },
    '':button{
      'buttonText': text,
      linkType,
      externalUrl,
      newTab,
      internalPath,
      internalLink->{
        title,
        'slug': slug.current,
        _type
      }
    },
  },
  asset->{
    'altText': altText,
    'lqip': metadata.lqip,
    url,
  }
},
'buttonLinking': button.button{
  'buttonText': text,
  linkType,
  externalUrl,
  newTab,
  internalPath,
  internalLink->{
    title,
    'slug': slug.current,
    _type
  }
},
'secondButtonLinking': secondaryButton.button{
  'buttonText': text,
  linkType,
  externalUrl,
  newTab,
  internalPath,
  internalLink->{
    title,
    'slug': slug.current,
    _type
  }
},
'form': formBuilder {
  fields[] {
    ...
  }
},
`

const homeOtherDocumentSections = groq`
'allServices': *[_type == 'services'] | order(sortOrder asc){
  _id,
  title,
  slug,
  detail,
  'imageData': featuredImage {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allTeam': *[_type == 'team'] {
  _id,
  name,
  position,
  seo {
    ...
  },
  slug,
  socialAccounts {
    ...
  },
  about,
  'imageData': image {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allBlog': *[_type == 'blog'] {
  _id,
  title,
  slug,
  content,
  excerpt,
  date,
  seo {
    ...
  },
  'imageData': coverImage {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allTestimonial': *[_type == 'testimonials']{
  _id,
  image,
  name,
  stars,
  testimonial,
  position
},
`

const otherDocumentSections = groq`
'allServices': *[_type == 'services'] {
  _id,
  title,
  slug,
  detail,
  'imageData': featuredImage {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allTeam': *[_type == 'team'] {
  _id,
  name,
  position,
  seo {
    ...
  },
  slug,
  socialAccounts {
    ...
  },
  about,
  'imageData': image {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allBlog': *[_type == 'blog'][0..2] {
  _id,
  title,
  slug,
  content,
  excerpt,
  date,
  seo {
    ...
  },
  'imageData': coverImage {
    asset->{
      'altText':altText,
      'lqip':metadata.lqip,
      url
    }
  },
},
'allTestimonial': *[_type == 'testimonials']{
  _id,
  image {
    asset-> {
      url,
      'lqip': metadata.lqip,
      altText
    }
  },
  name,
  testimonial,
  stars,
  position
},
`

export const profile = groq`
'profileSettings': *[_type == 'profile'][0]{
  ...,
},
`

export const mainLayoutProfile = groq`
{
  'profileSettings': *[_type == 'profile'][0]{
    company_name,
    seo {
      title_tag,
      meta_description,
      xHandle,
      sharingImageBanner {
        asset->{
          url
        }
      }
    },
    settings {
      googleVerification,
      websiteName
    }
  },
  'appearances': *[_type == "appearances"][0]{
    branding {
      favicon {
        asset->{
          url
        }
      }
    },
    mainColors {
      primaryColor{
        hex
      }
    }
  }
}
`

const metaDataProfile = groq`
'profileSettings': *[_type == 'profile'][0]{
  company_name,
  contact_information {
    ...
  },
  seo {
    xHandle,
    sharingImageBanner {
      asset->{
        url
      }
    }
  },
  social {
    ...
  },
  settings {
    googleVerification,
    websiteName
  },
},
'appearances': *[_type == "appearances"][0]{
  branding {
    favicon {
      asset->{
        url
      }
    }
  },
  mainColors {
    primaryColor{
      hex
    }
  }
},
`

export const homePageData = groq`
{
  'homeAppearance': *[_type == 'appearances'][0]{
  'homePage': homePage-> {
    pageBuilder[]{
        ...,
      ${pageBuilderData}
    }
    }
  },
  ${homeOtherDocumentSections}
  ${profile}
}
`

// app/blog/page.tsx
export async function blogPage(lastId?: number){
  if(lastId == null) {
    return client.fetch(groq`
    {
      ${metaDataProfile}
      'pageSetting': *[_type == 'pageSetting'][0]{
        blog {
          ...
        }
      },
      'blog': *[_type == 'blog'] | order(date desc){
        _id,
        title,
        date,
        excerpt,
        _updatedAt,
        'slug': slug.current,
        "author": author->{
          name,
          'avatar': picture{
            asset->{
              url,
            }
          }
        },
        seo {
          meta_description
        },
        'imageData': coverImage {
          asset-> {
            altText,
            'lqip':metadata.lqip,
            url
          }
        },
      }
    }
  `, { next: { revalidate: 60 } })
  }

   return client.fetch(groq`
   {
     ${metaDataProfile}
     'pageSetting': *[_type == 'pageSetting'][0]{
       blog {
         ...
       }
     },
     'blog': *[_type == 'blog'] | order(date desc) [0...$lastId]{
       _id,
       title,
       date,
       _updatedAt,
       'slug': slug.current,
       "author": author->{
         name,
         'avatar': picture{
           asset->{
             url,
           }
         }
       },
       seo {
         meta_description
       },
       'imageData': coverImage {
         asset-> {
           altText,
           'lqip':metadata.lqip,
           url
         }
       },
     }
   }
 `, {lastId});
}

// FOR app/services/page.tsx
export const servicesPage = groq`
  {
    ${metaDataProfile}
    'pageSetting': *[_type == 'pageSetting'][0]{
      services {
        ...,
      'imageData': image {
        asset-> {
          altText,
          'lqip':metadata.lqip,
          url
        }
      },
      }
    },
    'services': *[_type == 'services'] | order(sortOrder asc){
      title,
      detail,
      slug,
      'imageData': featuredImage {
        asset-> {
          altText,
          'lqip':metadata.lqip,
          url
        }
      },
    }
  }
`
//  app/team/page.tsx
export const teamPage = groq`
  {
    ${metaDataProfile}
    'profileSettings': *[_type == 'profile'][0]{
      settings {
        websiteName
      }
    },
    'pageSetting': *[_type == 'pageSetting'][0]{
      team {
        title,
        content,
        seo {
          ...
        }
      }
    },
    'team': *[_type == 'team']{
      ...,
      'imageData': image {
        asset-> {
          altText,
          'lqip':metadata.lqip,
          url
        }
      },
    }
  }
`

//  app/legal/page.tsx
export const legalPage = groq`
  {
    ${metaDataProfile}
    'pageSetting': *[_type == 'pageSetting'][0]{
      legal {
        title,
        content,
        'imageData': image {
        asset-> {
                  altText,
          'lqip':metadata.lqip,
          url
        }
        },
        seo {
          ...
        }
      }
    },
    'legal': *[_type == 'legal']{
      _id,
      title,
      'slug': slug.current
    }
  }
`

// 
// FOR /app/home/[slug]/page.tsx
// 
export async function getHome(slug: string) {
  return client.fetch(groq`
  {
    ${metaDataProfile}
    ${otherDocumentSections}
    'homeDesign': *[_type == "homeDesign" && slug.current == $slug][0]{
      _id,
      'imageData': featuredImage {
        asset->{
          url,
        }
      },
      "slug": slug.current,
      pageBuilder[]{
        ...,
        ${pageBuilderData}
    }
    }
  }
  `,
    { slug }
  )
}


// 
// FOR /app/[slug]/page.tsx
// 
export async function getPage(slug: string) {
  return client.fetch(groq`
    {
      ${metaDataProfile}
      ${otherDocumentSections}
      'pages': *[_type == "pages" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        seo {
          ...
        },
        pageBuilder[]{
          ...,
          ${pageBuilderData}
      }
      }
    }
    `,
    { slug }
  )
}

// 
// FOR /app/services/[slug]/page.tsx
// 
export async function getServices(slug: string) {
  return client.fetch(groq`
  {
    ${metaDataProfile}
    ${otherDocumentSections}
    'services': *[_type == "services" && slug.current == $slug][0]{
      _id,
      title,
      bannerText,
      cardHeading,
      columns,
      programsOffered,
      ctaText,
      textListHeading,
      textList,
      'imageData': featuredImage {
        asset->{
          url,
        }
      },
      seo {
        ...
      },
      "slug": slug.current,
      pageBuilder[]{
        ...,
        ${pageBuilderData}
    }
    }
  }
  `,
    { slug }
  )
}

// 
// FOR /app/team/[slug]/page.tsx
// 
export async function getTeam(slug: string) {
  return client.fetch(groq`
    {
      ${metaDataProfile}
      'team': *[_type == "team" && slug.current == $slug][0]{
        _id,
        name,
        about,
        "slug": slug.current,
        position,
        contactInformation {
          ...
        },
        socialAccounts {
          ...
        },
        seo {
          ...
        },
        'imageData': image {
          asset->{
            url,
            altText,
            'lqip': metadata.lqip
          }
        }
      }
    }
    `,
    { slug }
  )
}

// 
// FOR /app/blog/[slug]/page.tsx
// 
export async function getBlog(slug: string) {
  return client.fetch(groq`
  {
    ${metaDataProfile}
    'blog': *[_type == "blog" && slug.current == $slug][0]{
      _id,
      title,
      content,
      _updatedAt,
      date,
      "slug": slug.current,
      seo {
        ...
      },
      "author": author->{
        name,
        'avatar': picture{
          asset->{
            url,
            altText,
            'lqip': metadata.lqip
          }
        }
      },
      'imageData': coverImage {
        asset->{
          url,
          altText,
          'lqip': metadata.lqip
        }
      }
    }
  }
  `,
    { slug }
  )
}

// 
// FOR /app/legal/[slug]/page.tsx
// 
export async function getLegal(slug: string) {
  return client.fetch(groq`
{
  ${metaDataProfile}
  'pageSetting': *[_type == 'pageSetting'][0]{
        legal {
          'imageData': image {
          asset-> {
                      url,
            altText,
            'lqip': metadata.lqip
            }
          }
        }
      },
  'legal': *[_type == "legal" && slug.current == $slug][0]{
    _id,
    title,
    content,
    "slug": slug.current,
    seo {
      ...
    },
  }
}
  `,
    { slug }
  )
}

// USED FOR SITEMAP
export const getAllPages = groq`
{
  'profileSettings': *[_type == 'profile'][0]{
    settings {
      websiteName
    }
  },
  'legal': *[_type == "legal"]{
    'slug': slug.current,
    _updatedAt
  },
  'pages': *[_type == "pages"]{
    'slug': slug.current,
    _updatedAt
  },
  'blog': *[_type == "blog"]{
    'slug': slug.current,
    _updatedAt
  },
  'services': *[_type == "services"]{
    'slug': slug.current,
    _updatedAt
  },
  'team': *[_type == "team"]{
    'slug': slug.current,
    _updatedAt
  },
}
`