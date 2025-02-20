import { cn } from "../../../../../lib/utils";
import BlogSection from "./blog-section";
import CtaSection from "./call-to-action";
import DisclosureSection from "./disclosure-section";
import FeaturedGrid from "./feature-section";
import FormBuilder from "./form-builder";
import ImageGallery from "./gallery-swiper";
import GallerySlider from "./gallery-swiper";
import Hero from "./hero";
import LeadFormSection from "./lead-form-section";
import LogoCloudSection from "./logo-cloud-section";
import ServiceList from "./services-section";
import TeamComponent from "./team-section";
import TestimonialSection from "./testimonials-section";


interface Props {
    pageBuilder: any[];
    allTestimonials: any[];
    allServices: any[];
    allTeam: any[];
    allBlog: any[];
    // CONTACT
    email: string;
    phone_number: string;
    office_number: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    // SOCIAL
    facebook: any;
    youtube: any;
    instagram: any;
    twitter: any;
    reddit: any;
    linkedin: any;
    yelp: any;
    pinterest: any;
    tiktok: any;
    zillow: any;
}

interface Background {
    backgroundType: 'color' | 'image';
    color?: { hex: string };
    imageOverlayColor?: {
        rgb: { r: number; g: number; b: number; a: number };
    };
}

interface Section {
    background?: {
        background: Background;
        contentColor?: { hex: string };
    };
    backgroundImage?: {
        image?: {
            asset?: {
                url: string;
            };
        };
    };
    // Add other section properties as needed
}

export default function PageBuilder({
    pageBuilder,
    allTestimonials,
    allTeam,
    allServices,
    allBlog
}: Props) {


    return (
        <>

            {pageBuilder.map((section) => {

                const bg = section?.background?.background;
                const textColor = section?.background?.contentColor?.hex;

                const backgroundStyles: React.CSSProperties = {
                    color: textColor,
                    backgroundColor: bg?.backgroundType === 'color' ? bg.color?.hex : undefined,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    paddingTop: section.paddingTop ? `${section.paddingTop}` : '5rem',
                    paddingBottom: section.paddingBottom ? `${section.paddingBottom}` : '5rem',
                };

                if (bg?.backgroundType === 'image') {
                    const overlayColor = bg.imageOverlayColor?.rgb;
                    const overlayGradient = `rgba(${overlayColor?.r ?? 0}, ${overlayColor?.g ?? 0}, ${overlayColor?.b ?? 0}, ${overlayColor?.a ?? 0})`;

                    backgroundStyles.backgroundImage = `linear-gradient(${overlayGradient}, ${overlayGradient}), url(${section.backgroundImage?.image?.asset?.url})`;
                }

                // PRIMARY BUTTON STYLES
                const primaryButton = {
                    backgroundColor: `rgba(
                                        ${section?.button?.buttonBackground?.rgb.r}, 
                                        ${section?.button?.buttonBackground?.rgb.g}, 
                                        ${section?.button?.buttonBackground?.rgb.b}, 
                                        ${section?.button?.buttonBackground?.rgb.a})`,
                    color: `${section?.button?.buttonTextColor?.hex}`,
                    border: `1px solid ${section?.button?.buttonBorderColor?.hex}`
                }

                // SECONDARY BUTTON STYLES
                const secondaryButton = {
                    backgroundColor: `rgba(
                                        ${section?.secondaryButton?.buttonBackground?.rgb.r}, 
                                        ${section?.secondaryButton?.buttonBackground?.rgb.g}, 
                                        ${section?.secondaryButton?.buttonBackground?.rgb.b}, 
                                        ${section?.secondaryButton?.buttonBackground?.rgb.a})`,
                    color: `${section?.secondaryButton?.buttonTextColor?.hex}`,
                    border: `1px solid ${section?.secondaryButton?.buttonBorderColor?.hex}`
                }

                if (section._type === "hero" && section?.layoutType === 'hero') {

                    return (

                        <Hero
                            content={section.content}
                            textAlign={section.textAlign}
                            primaryButton={section?.buttonLinking ? {
                                text: section.buttonLinking.buttonText,
                                link: section.buttonLinking,
                                style: primaryButton
                            } : undefined}
                            secondaryButton={section?.secondButtonLinking ? {
                                text: section.secondButtonLinking.buttonText,
                                link: section.secondButtonLinking,
                                style: secondaryButton
                            } : undefined}
                            image={section.imageData?.asset?.url}
                            layout={section.layoutType}
                            height={section?.imageHeight}
                            textColor={section?.textColor?.hex}
                        />
                    )
                }

                if (section._type === "ctaSection" && section?.layoutType === 'fullWidthTextImage') {

                    return (
                        <CtaSection
                            content={section.content}
                            // textAlign={section.props.textAlign}
                            // primaryButton={section.props.primaryButton}
                            // secondaryButton={section.props.secondaryButton}
                            layout={section.layoutType || "full-width"}
                            image={section.imageData?.asset?.url}
                            altText={section?.props?.altText}
                            reverseColumn={section.reverseColumn}
                            columnLayout={section.columnLayout}
                            subtitle={section.subtitle}
                        />
                    )
                }

                return (
                    <section key={section.id} style={backgroundStyles}>
                        <div className="container">
                            {(() => {
                                switch (section._type) {
                                    case "hero":
                                        return (
                                            <section key={section.id}
                                                className={cn("w-full", {
                                                    "bg-cover bg-center": bg?.backgroundType === 'image'
                                                })}
                                                style={backgroundStyles}
                                            >
                                                <Hero
                                                    content={section.content}
                                                    textAlign={section.textAlign}
                                                    primaryButton={section?.buttonLinking ? {
                                                        text: section.buttonLinking.buttonText,
                                                        link: section.buttonLinking,
                                                        style: primaryButton
                                                    } : undefined}
                                                    secondaryButton={section?.secondButtonLinking ? {
                                                        text: section.secondButtonLinking.buttonText,
                                                        link: section.secondButtonLinking,
                                                        style: secondaryButton
                                                    } : undefined}
                                                    image={section.imageData?.asset?.url}
                                                    layout={section.layoutType}
                                                    height={section?.imageHeight}
                                                    textColor={section?.textColor?.hex}
                                                />
                                            </section>
                                        )
                                    case "ctaSection":
                                        return (
                                            <CtaSection
                                                content={section.content}
                                                // textAlign={section.props.textAlign}
                                                // primaryButton={section.props.primaryButton}
                                                // secondaryButton={section.props.secondaryButton}
                                                layout={section.layoutType || "full-width"}
                                                image={section.imageData?.asset?.url}
                                                altText={section?.props?.altText}
                                                reverseColumn={section.reverseColumn}
                                                columnLayout={section.columnLayout}
                                                subtitle={section.subtitle}
                                            />
                                        )
                                    // case "showcase":
                                    //     return (
                                    //         <ShowcaseSection
                                    //             content={section.props.content}
                                    //             textAlign={section.props.textAlign}
                                    //             items={section.props.items}
                                    //             layout={section.layout}
                                    //         />
                                    //     )
                                    case "leadForm":
                                        return (
                                            <LeadFormSection
                                                formSchema={section.formBuilder}
                                                content={section.content}
                                                layout={section?.layoutType}
                                                alignContent={section?.alignContentCenter}
                                                textAlign={section?.textAlign}
                                                labelColor={section?.labelColor?.hex}
                                                formContent={section?.formContent}
                                                formBackgroundColor={section?.formBackgroundColor?.hex}
                                            />
                                        )
                                    // case "content":
                                    //     return (
                                    //         <div className="container mx-auto">
                                    //             <HeaderSection content={section.props.content} textAlign={section.props.textAlign} />
                                    //         </div>
                                    //     )
                                    case "gallery":
                                        return (
                                            // <ImageGallery
                                            //     images={section.childImage}
                                            //     layout={section.layoutType}
                                            //     // slidesToShow={section.props.slidesToShow || 1}
                                            //     // showArrows={section.props.showArrows}
                                            //     // showPagination={section.props.showPagination}
                                            // />
                                            <GallerySlider
                                                images={section.childImage}
                                                showArrows={true}
                                                content={section?.content}
                                                textColor={section?.textColor?.hex}
                                                textAlign={section?.textAlign}
                                                showPagination={true}
                                                slidesToShow={2}
                                                effect="fade"
                                            />
                                        )
                                    case "featuredGrid":
                                        return (
                                            <FeaturedGrid
                                                blocks={section.childBlocks}
                                                content={section?.content}
                                                textColor={section?.textColor?.hex}
                                                textAlign={section?.textAlign}
                                                columns={section?.columnNumber}
                                                imageHeight={section?.imageHeight}
                                                cardLayout={section?.layoutType}
                                            />
                                        )
                                    case "testimonialBuilder":
                                        console.log(section.layoutType)
                                        return (
                                            <TestimonialSection
                                                key={section?._key}
                                                testimonials={allTestimonials}
                                                content={section?.content}
                                                textAlign={section?.textAlign}
                                                layout={section?.layoutType}
                                                slidesToShow={section?.slideNumber}
                                            />
                                        )
                                    case "teamDisplay":
                                        console.log(section.layoutType)
                                        return (
                                            <TeamComponent
                                                key={section?._key}
                                                team={allTeam}
                                                content={section?.content}
                                                textAlign={section?.textAlign}
                                                layout={section?.layoutType}
                                                limit={section?.limit}
                                                columns={section?.columnNumber}
                                            />
                                        )
                                    case "logos":
                                        return (
                                            <LogoCloudSection
                                                content={section?.content}
                                                textAlign={section?.textAlign}
                                                images={section?.childImage}
                                                columns={section?.columnNumber}
                                                layout={section.layoutType}
                                            />
                                        )
                                    case "disclosureSection":
                                        return (
                                            <DisclosureSection
                                                key={section?._key}
                                                disclosure={section?.disclosures}
                                                disclosureBackgroundColor={section?.disclosureBackgroundColor}
                                                disclosureTextColor={section?.disclosureTextColor}
                                                disclosureContentColor={section?.disclosureContentColor}
                                                content={section?.content}
                                                layout={section.layoutType}
                                            />
                                        )
                                    case "servicesDisplay":
                                        return (
                                            <ServiceList
                                                key={section?._key}
                                                services={allServices}
                                                columns={section?.columnNumber}
                                                content={section?.content}
                                                limit={section?.limit}
                                                layout={section.layoutType}
                                            />
                                        )
                                    case "blogDisplay":
                                        return (
                                            <BlogSection
                                                blog={allBlog}
                                                content={section?.content}
                                                textAlign={section?.textAlign}
                                                columns={section?.columnNumber}
                                                limit={section?.limit}
                                                layout={section.layoutType}
                                            />
                                        )
                                    // case "social":
                                    //     return (
                                    //         <SocialComponent links={section.props.links} layout={section.layout} size={section.props.size} />
                                    //     )
                                    default:
                                        return null
                                }
                            })()}
                        </div>
                    </section>
                )
            })}
        </>
    );
}