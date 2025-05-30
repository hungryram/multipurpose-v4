export const textAlign = [
    { title: 'Left', value: 'left' },
    { title: 'Center', value: 'center' },
    { title: 'Right', value: 'right' },
]

export const primaryButton = {
    title: 'Primary Button',
    name: 'button',
    type: 'buttonSettings',
    group: 'content'
}

export const secondaryButton = {
    title: 'Secondary Button',
    name: 'secondaryButton',
    type: 'secondaryButton',
    group: 'content'
}

export const colorOptions = {
    title: 'Color Options',
    name: 'background',
    group: 'settings',
    type: 'backgroundOptions'
}

export const paddingTop = {
    title: 'Padding Top',
    name: 'paddingTop',
    type: 'string',
    group: 'settings',
    description: 'Add top padding using px, em, rem, or percentages'
}

export const paddingBottom = {
    title: 'Padding Bottom',
    name: 'paddingBottom',
    type: 'string',
    group: 'settings',
    description: 'Add bottom padding using px, em, rem, or percentages'
}

export const pageBuilder = [
    {type: 'hero'},
    {type: 'contentField'},
    {type: 'featuredGrid'},
    {type: 'ctaSection'},
    {type: 'disclosureSection'},
    {type: 'logos'},
    {type: 'gallery'},
    {type: 'codeBlock'},
    {type: 'testimonialBuilder'},
    {type: 'teamDisplay'},
    {type: 'blogDisplay'},
    {type: 'servicesDisplay'},
    {type: 'leadForm'},
]

export const internalPath = [
    { title: "Blog", value: "/blog" },
    { title: "Services", value: "/services" }, // Fixed duplicate title
];