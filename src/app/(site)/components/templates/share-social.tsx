import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn, FaEnvelope} from 'react-icons/fa'

export default function ShareSocial({ url }: any) {
    return (
        <div className="text-sm">
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 text-white bg-[#243C85] flex items-center float-left m-1"
            >
                <FaFacebookF />
                <span className="mx-2">Share on Facebook</span>
            </a>
            <a
                href={`https://twitter.com/share?url=${url}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 text-white bg-[#1B95E0] flex items-center float-left m-1"
            >
                <FaTwitter />
                <span className="mx-2">Tweet This</span>
            </a>
            <a
                href={`https://www.linkedin.com/shareArticle?url=${url}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 text-white bg-[#0077B5] flex items-center float-left m-1"
            >
                <FaLinkedinIn />
                <span className="mx-2">Share on Linkedin</span>

            </a>
            <a
                href={`https://pinterest.com/pin/create/bookmarklet/?url=${url}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 text-white bg-[#c92228] flex items-center float-left m-1"
            >
                <FaPinterestP />
                <span className="mx-2">Pin it</span>

            </a>
            <a
                href={`mailto:?subject= Interesting Blog Post &amp;body= Hi there, Check out this blog post: ${url}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 text-white bg-[#ccc] flex items-center float-left m-1"
            >
                <FaEnvelope />
                <span className="mx-2">Email</span>

            </a>
            <div className="clear-both"></div>
        </div>
    )
}