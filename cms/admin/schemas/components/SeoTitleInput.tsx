import React, {useState, useCallback} from 'react'
import {StringInputProps, set, unset} from 'sanity'
import {Stack, Text, TextInput} from '@sanity/ui'

export default function SeoTitleInput(props: StringInputProps) {
  const {onChange, value = '', ...restProps} = props
  const [focused, setFocused] = useState(false)
  
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange]
  )

  const characterCount = value.length
  const isOptimal = characterCount >= 50 && characterCount <= 60
  const isWarning = characterCount > 60 && characterCount <= 70
  const isError = characterCount > 70

  const getCountColor = () => {
    if (isError) return '#f03e2f'
    if (isWarning) return '#f59e0b'
    if (isOptimal) return '#10b981'
    return '#6b7280'
  }

  const getHelpText = () => {
    if (characterCount === 0) return 'Recommended: 50-60 characters for optimal Google display'
    if (characterCount < 50) return `Add ${50 - characterCount} more characters for optimal length`
    if (isOptimal) return 'Perfect length for Google search results'
    if (isWarning) return 'May be truncated in Google search results'
    if (isError) return 'Too long - will likely be truncated in search results'
    return ''
  }

  return (
    <Stack space={2}>
      <TextInput
        {...restProps}
        onChange={handleChange}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Enter SEO title (50-60 characters recommended)"
      />
      <Stack space={1}>
        <Text size={1} style={{color: getCountColor(), fontWeight: '500'}}>
          {characterCount}/70 characters
        </Text>
        {(focused || characterCount > 0) && (
          <Text size={1} style={{color: getCountColor()}}>
            {getHelpText()}
          </Text>
        )}
      </Stack>
    </Stack>
  )
}
