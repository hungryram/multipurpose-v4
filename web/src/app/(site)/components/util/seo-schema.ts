export function localBusiness(data: any) {
  // Build address only if it has values
  const address = {
    "@type": "PostalAddress",
    ...(data?.profileSettings?.address?.address && { streetAddress: data.profileSettings.address.address }),
    ...(data?.profileSettings?.address?.city && { addressLocality: data.profileSettings.address.city }),
    ...(data?.profileSettings?.address?.state && { addressRegion: data.profileSettings.address.state }),
    ...(data?.profileSettings?.address?.zip_code && { postalCode: data.profileSettings.address.zip_code }),
    ...(data?.profileSettings?.address?.addressCountry && { addressCountry: data.profileSettings.address.addressCountry }),
  };

  const addressHasFields = Object.keys(address).length > 1; // >1 because "@type" always exists

  // Build contact points
  const contactPoints = [
    ...(data?.profileSettings?.contact_information?.office_number
      ? [{
        "@type": "ContactPoint",
        telephone: data.profileSettings.contact_information.office_number,
        contactType: "Office Phone",
        ...(data?.profileSettings?.contact_information?.email && { email: data.profileSettings.contact_information.email }),
      }]
      : []),
    ...(data?.profileSettings?.contact_information?.phone_number
      ? [{
        "@type": "ContactPoint",
        telephone: data.profileSettings.contact_information.phone_number,
        contactType: "Direct Phone",
      }]
      : []),
  ];

  // Filter out null/undefined for sameAs
  const sameAs = [
    data?.profileSettings?.social?.facebook,
    data?.profileSettings?.social?.x,
    data?.profileSettings?.social?.instagram,
    data?.profileSettings?.social?.youtube,
    data?.profileSettings?.social?.reddit,
    data?.profileSettings?.social?.linkedin,
    data?.profileSettings?.social?.yelp,
    data?.profileSettings?.social?.pinterest,
    data?.profileSettings?.social?.tiktok,
    data?.profileSettings?.social?.zillow,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...(data?.profileSettings?.company_name && { name: data.profileSettings.company_name }),
    ...(data?.profileSettings?.seo?.meta_description && { description: data.profileSettings.seo.meta_description }),
    ...(data?.profileSettings?.settings?.websiteName && { url: data.profileSettings.settings.websiteName }),
    ...(data?.appearances?.branding?.logo?.asset?.url && { logo: data.appearances.branding.logo.asset.url }),
    ...(data?.profileSettings?.seo?.imageData?.asset?.url && { image: data.profileSettings.seo.imageData.asset.url }),
    ...(addressHasFields && { address }),
    ...(contactPoints.length > 0 && { contactPoint: contactPoints }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function websiteSchema(data: any) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    ...(data?.profileSettings?.company_name && { name: data.profileSettings.company_name }),
    ...(data?.profileSettings?.settings?.websiteName && { url: data.profileSettings.settings.websiteName }),
    ...(data?.profileSettings?.seo?.meta_description && { description: data.profileSettings.seo.meta_description }),
  };
}
