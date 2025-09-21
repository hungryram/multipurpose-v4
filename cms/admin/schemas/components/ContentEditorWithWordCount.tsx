import React, {useState, useCallback, useEffect} from 'react'
import {ArrayOfObjectsInputProps} from 'sanity'
import {Stack, Text, Card, Flex} from '@sanity/ui'

// Function to count words in portable text content
function countWordsInPortableText(blocks: any[]): number {
  if (!blocks || !Array.isArray(blocks)) return 0
  
  let wordCount = 0
  
  blocks.forEach(block => {
    if (block._type === 'block' && block.children) {
      block.children.forEach((child: any) => {
        if (child.text && typeof child.text === 'string') {
          // Split by whitespace and filter out empty strings
          const words = child.text.trim().split(/\s+/).filter((word: string) => word.length > 0)
          wordCount += words.length
        }
      })
    }
  })
  
  return wordCount
}

// Function to estimate reading time (average 200 words per minute)
function calculateReadingTime(wordCount: number): string {
  const wordsPerMinute = 200
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  
  if (minutes < 1) return 'Less than 1 min read'
  if (minutes === 1) return '1 min read'
  return `${minutes} min read`
}

// Function to get content quality indicator
function getContentQualityIndicator(wordCount: number): {
  color: string
  text: string
  description: string
} {
  if (wordCount === 0) {
    return {
      color: '#6b7280',
      text: 'No content',
      description: 'Start writing your article'
    }
  } else if (wordCount < 500) {
    return {
      color: '#f59e0b',
      text: 'Short article',
      description: 'Consider adding more content (500+ words recommended)'
    }
  } else if (wordCount >= 500 && wordCount < 1500) {
    return {
      color: '#f59e0b',
      text: 'Moderate length',
      description: 'Good start, but 1500+ words are ideal for SEO and engagement'
    }
  } else if (wordCount >= 1500 && wordCount <= 3000) {
    return {
      color: '#10b981',
      text: 'Great for blog posts',
      description: 'Perfect length for comprehensive and SEO-friendly content'
    }
  } else {
    return {
      color: '#8b5cf6',
      text: 'Long-form content',
      description: 'Excellent for detailed guides and authority building'
    }
  }
}

export default function ContentEditorWithWordCount(props: ArrayOfObjectsInputProps) {
  const {onChange, value = [], ...restProps} = props
  const [wordCount, setWordCount] = useState(0)

  // Calculate word count whenever content changes
  useEffect(() => {
    const count = countWordsInPortableText(Array.isArray(value) ? value : [])
    setWordCount(count)
  }, [value])

  const handleChange = useCallback(
    (event: any) => {
      onChange(event)
    },
    [onChange]
  )

  const readingTime = calculateReadingTime(wordCount)
  const qualityIndicator = getContentQualityIndicator(wordCount)

  return (
    <Stack space={3}>
      {/* Content Statistics Card */}
      <Card padding={3} radius={2} shadow={1}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
          <Stack space={2}>
            <Text size={1} weight="semibold" style={{color: '#374151'}}>
              Content Statistics
            </Text>
            <Flex gap={4} wrap="wrap">
              <Stack space={1}>
                <Text size={1} style={{color: '#6b7280'}}>Word Count</Text>
                <Text size={2} weight="bold" style={{color: qualityIndicator.color}}>
                  {wordCount.toLocaleString()}
                </Text>
              </Stack>
              <Stack space={1}>
                <Text size={1} style={{color: '#6b7280'}}>Reading Time</Text>
                <Text size={1} style={{color: '#374151'}}>
                  {readingTime}
                </Text>
              </Stack>
              <Stack space={1}>
                <Text size={1} style={{color: '#6b7280'}}>Content Quality</Text>
                <Text size={1} weight="medium" style={{color: qualityIndicator.color}}>
                  {qualityIndicator.text}
                </Text>
              </Stack>
            </Flex>
          </Stack>
          {wordCount > 0 && (
            <Stack space={1}>
              <Text size={1} style={{color: qualityIndicator.color}}>
                {qualityIndicator.description}
              </Text>
            </Stack>
          )}
        </Flex>
      </Card>

      {/* Original Content Editor */}
      <Stack space={2}>
        {props.renderDefault({
          ...restProps,
          onChange: handleChange,
          value
        })}
      </Stack>
    </Stack>
  )
}
