import HeaderSection from './header-section';
import Link from 'next/link';

interface Props {
    content: string;
    services: any
    imageData: string
    textAlign: string;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any;
    backgroundStyles: any;
    columnNumber: string;
    paddingTop: string;
    paddingBottom: string;
}

export default function ServicesNoImage({
    backgroundStyles,
    services,
    content,
    textAlign,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle,
    paddingTop,
    paddingBottom,
    columnNumber
}: Props) {

    const styles = {
        paddingTop: paddingTop ?? '5rem',
        paddingBottom: paddingBottom ?? '5rem',
      }
    
      const allStyles = { ...backgroundStyles, ...styles }

    return (
        <div style={allStyles}>
            <div className="container">
                {(content || primaryButtonLink || secondaryButtonLink) && (
                    <HeaderSection
                        content={content}
                        textAlign={textAlign}
                        // PRIMARY
                        buttonLink={primaryButtonLink}
                        primaryButtonText={primaryButtonText}
                        primaryButtonStyle={primaryButtonStyle}
                        // SECONDARY
                        secondaryButtonLink={secondaryButtonLink}
                        secondaryButtonText={secondaryButtonText}
                        secondaryButtonStyle={secondaryButtonStyle}
                    />
                )}
                <div className={`divide-y divide-gray-200 overflow-hidden rounded-md shadow grid ${columnNumber} mx-auto sm:gap-px sm:divide-y-0 ${content && 'mt-16'}`}>
                    {services?.map((node: any) => (
                        <div
                            key={node._id}
                            className="group relative p-6 bg-white hover:opacity-80">
                            <div className="my-4">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">
                                    <Link href={`services/${node?.slug?.current}`} className="focus:outline-none">
                                        {/* Extend touch target to entire panel */}
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        {node.title}
                                    </Link>
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    {node?.detail}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
