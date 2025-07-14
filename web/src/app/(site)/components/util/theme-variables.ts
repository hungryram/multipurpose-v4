export function buildThemeVariables(data: any): Record<string, string> {
  return {
    'swiper-navigation-size': '30px',

    'top-header-background': data?.appearances?.topHeaderBar?.topHeaderBarBgColor ?? 'transparent',
    'top-header-text-color': data?.appearances?.topHeaderBar?.topHeaderBarTextColor ?? '#000000',

    'primary-accent': data?.appearances?.primaryAccent ?? '#cccccc',
    'radio-color': data?.appearances?.primaryAccent ?? '#cccccc',

    'primary-button-background': data?.appearances?.primaryButtonBg ?? 'transparent',
    'primary-button-text': data?.appearances?.primaryButtonText ?? '#000000',
    'secondary-button-background': data?.appearances?.secondaryButtonBg ?? 'transparent',
    'secondary-button-text': data?.appearances?.secondaryButtonText ?? '#cccccc',
    'secondary-color': data?.appearances?.secondaryColor ?? '#cccccc',

    'header-background-color': data?.appearances?.navBgColor ?? 'transparent',
    'header-scroll-background-color': data?.appearances?.navBgScrollColor ?? 'transparent',
    'header-navigation-color': data?.appearances?.navColor ?? '#ffffff',
    'header-navigation-scroll-color': data?.appearances?.navScrollColor ?? '#ffffff',

    'mobile-icon-color': data?.appearances?.mobileIconColor ?? '#ffffff',
    'mobile-bg-color': data?.appearances?.mobileMenu?.mobileBgDrawer ?? '#000000',
    'mobile-nav-color': data?.appearances?.mobileMenu?.mobileNavColor ?? '#ffffff',

    'loading-background-color': data?.appearances?.loaderColor ?? '#0e0e0e',
    'loading-image': `url(${data?.appearances?.loaderImage ?? ''})`,

    'website-body-color': data?.appearances?.websiteBodyColor ?? '#ffffff',
    'website-text-color': data?.appearances?.websiteTextColor ?? '#222222',
    'website-heading-color': data?.appearances?.websiteHeadingColor ?? '#000000',

    'button-radius': `${data?.appearances?.buttonRadius ?? 6}px`,
    'button-y-padding': `${data?.appearances?.buttonYPadding ?? 8}px`,
    'button-x-padding': `${data?.appearances?.buttonXPadding ?? 12}px`,

    'announcementbar-background-color': data?.appearances?.announcementBar?.announcementBgColor ?? 'transparent',
    'announcementbar-text-color': data?.appearances?.announcementBar?.announcementTextColor ?? '#000000',
  };
}
