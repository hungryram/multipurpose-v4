import { urlForImage } from "../../../../../sanity/lib/image";
import getYouTubeID from "get-youtube-id";
import Youtube from "react-youtube";
import slugify from "slugify";
import { toPlainText } from "@portabletext/react";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { PiCaretCircleLeftBold, PiCaretCircleRightBold } from "react-icons/pi";
import Link from "next/link";
import { cn } from "@/lib/utils"; // ✅ Helps with conditional class merging

const LinkableHeader = ({ children, value }) => {
    const slug = slugify(toPlainText(value).toLowerCase());
    return <h2 id={slug}>{children}</h2>;
};

// ✅ Icon mapping object (for dynamic icon rendering)
const iconMap = {
    phone: FaPhone,
    pin: FaMapMarkerAlt,
    envelope: FaEnvelope,
    rightCaret: PiCaretCircleRightBold,
    leftCaret: PiCaretCircleLeftBold,
};

const serializers = {
    types: {
        coding: ({ value }) => (
            <div className="mt-4 mb-14">
                <div dangerouslySetInnerHTML={{ __html: value?.codeEditor }} />
            </div>
        ),
        youtube: ({ value }) => {
            const opts = {
                height: value.height ?? "600",
                width: value.width ?? "400",
                playerVars: { autoplay: 0 },
            };

            const id = getYouTubeID(value.url);
            return <Youtube videoId={id} opts={opts} />;
        },
        image: ({ value }) => (
            <div className={cn("relative flex my-5", {
                "justify-start": value.imageAlign === "left",
                "justify-center": value.imageAlign === "center",
                "justify-end": value.imageAlign === "right",
            })}>
                {value.asset && (
                    <img
                        src={urlForImage(value).url()}
                        alt={value.altTag}
                        width={value.imageWidth}
                    />
                )}
            </div>
        ),
        iconTextLink: ({ value }) => {
            const IconComponent = iconMap[value.icon] || null;

            return (
                <div className="flex items-center mb-4 gap-4">
                    {IconComponent && <IconComponent className="text-2xl text-gray-700" />}
                    <Link
                        href={value.link}
                        className="text-black uppercase text-xl font-extrabold tracking-tighter hover:text-blue-600 transition-all"
                    >
                        {value.text}
                    </Link>
                </div>
            );
        },
    },
    block: {
        h2: LinkableHeader,
    },
    marks: {
        link: ({ value, children }) => (
            <a
                href={value.href}
                target={value.newTab ? "_blank" : "_self"}
                rel={value.newTab ? "noopener noreferrer" : ""}
                className="text-blue-600 hover:underline"
            >
                {children}
            </a>
        ),
        color: ({ value, children }) => (
            <span style={{ color: value?.hex }}>{children}</span>
        ),
        fontSize: ({ value, children }) => (
            <span style={{ fontSize: value.size }}>{children}</span>
        ),
    },
};

export default serializers;
