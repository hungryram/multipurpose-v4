import ContentEditor from "../util/content-editor"

interface Props {
    content: any,
    layoutType: string,
    heading: string,
    backgroundStyles: any,
    paddingTop?: string,
    paddingBottom?: string
}

export default function ContentSimple({
    content,
    layoutType,
    heading,
    backgroundStyles,
    paddingTop,
    paddingBottom,
}: Props) {

    const styles = {
        paddingTop: paddingTop ?? '5rem',
        paddingBottom: paddingBottom ?? '5rem',
    }

    const allStyles = {...backgroundStyles, ...styles}

    return (
        <div className="content" style={allStyles}>
            <div className={`${layoutType === 'twoColumn' && 'container'}`}>
                {layoutType === 'twoColumn' &&
                    <h2>{heading}</h2>
                }
                <div className={`mx-auto 
                ${layoutType === 'simpleFullWidth' && 'container'}
                ${layoutType === 'narrowContainer' && 'max-w-3xl'}
                ${layoutType === 'twoColumn' && 'md:columns-2'}
            `}>
                    <ContentEditor
                        content={content}
                    />
                </div>
            </div>
        </div>
    )
}
