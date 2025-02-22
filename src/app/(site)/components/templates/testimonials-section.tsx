"use client"

import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { FaStar } from "react-icons/fa6"
import ContentEditor from "../util/content-editor"
import HeaderSection from "./header-section"
import { Testimonial, TestimonialSectionProps } from "@/lib/types"



export default function TestimonialSection({
    testimonials,
    content,
    textAlign,
    backgroundStyles,
    paddingTop,
    paddingBottom,
    layout,
    primaryButton,
    textColor,
    secondaryButton,
    slidesToShow
}: TestimonialSectionProps) {
    const styles = {
        paddingTop: paddingTop ?? "5rem",
        paddingBottom: paddingBottom ?? "5rem",
        ...backgroundStyles,
    }

    const renderContent = (
        <div className="mb-16 content" style={{ color: textColor }}>
            <HeaderSection
                content={content}
                textAlign={textAlign}
                primaryButton={primaryButton}
                secondaryButton={secondaryButton}
            />
        </div>
    )

    const renderTestimonials = () => {
        switch (layout) {
            case "slider":
                return (
                    <Carousel
                        className="w-full mx-auto"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent>
                            {testimonials.map((testimonial) => (
                                <CarouselItem key={testimonial._id} className={`md:basis-1/${slidesToShow}`}>
                                    <div className="p-1">
                                        <Card>
                                            <TestimonialCard testimonial={testimonial} />
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                )
            case "column":
                return (
                    <div className="space-y-8 max-w-2xl mx-auto">
                        {testimonials.map((testimonial) => (
                            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
                        ))}
                    </div>
                )
            case "grid":
            default:
                return (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
                        ))}
                    </div>
                )
        }
    }

    return (
        <section style={styles}>
            <div className="container">
                {renderContent}
                <div className={cn("mx-auto", content && "mt-10")}>{renderTestimonials()}</div>
            </div>
        </section>
    )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="mb-4">
                    <StarRating rating={testimonial.stars} />
                </div>
                <blockquote className="text-gray-900">
                    {testimonial.testimonial && (
                        <div className="content">
                            <ContentEditor content={testimonial.testimonial} />
                        </div>
                    )}
                </blockquote>
            </CardContent>
            <CardFooter className="flex items-center gap-x-4 p-6 pt-0">
                {testimonial?.image && (
                    <div className="relative w-10 h-10">
                        <Image
                            className="rounded-full object-cover"
                            src={testimonial.image.asset.url || "/placeholder.svg"}
                            alt={testimonial?.image?.asset?.altText || testimonial?.name}
                            placeholder={testimonial?.image?.asset?.lqip ? "blur" : "empty"}
                            blurDataURL={testimonial?.image?.asset?.lqip}
                            fill={true}
                        />
                    </div>
                )}
                <div>
                    {testimonial?.name && <div className="font-semibold text-gray-900">{testimonial.name}</div>}
                    {testimonial?.position && <div className="text-gray-600">{testimonial?.position}</div>}
                </div>
            </CardFooter>
        </Card>
    )
}

function StarRating({ rating }: { rating: number }) {
    const stars = Array.from({ length: rating || 5 }, (_, i) => (
        <FaStar key={i} className="inline text-yellow-500 text-lg" />
    ))

    return <div>{stars}</div>
}


