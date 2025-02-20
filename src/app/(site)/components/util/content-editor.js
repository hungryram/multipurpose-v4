'use client'
import { PortableText } from "@portabletext/react";
import serializers from "./serializers"


export default function ContentEditor({ content }) {
    return (
        <div className="content">
            <PortableText
                components={serializers}
                value={content}
            />
        </div>
    )
}