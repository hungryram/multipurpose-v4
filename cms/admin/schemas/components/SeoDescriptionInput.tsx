import React, {useState, useCallback} from 'react'
import {TextInputProps, set, unset} from 'sanity'
import {Stack, Text, TextArea} from '@sanity/ui'

export default function SeoDescriptionInput(props: TextInputProps) {
  const {onChange, value = '', ...restProps} = props
  const [focused, setFocused] = useState(false)
  
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.currentTarget.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange]
  )

  const characterCount = value.length
  const isOptimal = characterCount >= 70 && characterCount <= 155
  const isWarning = characterCount > 155 && characterCount <= 200
  const isError = characterCount > 200

  const getCountColor = () => {
    if (isError) return '#f03e2f'
    if (isWarning) return '#f59e0b'
    if (isOptimal) return '#10b981'
    return '#6b7280'
  }

  const getHelpText = () => {
    if (characterCount === 0) return 'Recommended: 70-155 characters for optimal Google display'
    if (characterCount < 70) return `Add ${70 - characterCount} more characters for optimal length`
    if (isOptimal) return 'Perfect length for Google search results'
    if (isWarning) return 'May be truncated in Google search results'
    if (isError) return 'Too long - will likely be truncated in search results'
    return ''
  }

  return (
    <Stack space={2}>
      <TextArea
        {...restProps}
        onChange={handleChange}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Enter meta description (70-155 characters recommended)"
        rows={3}
      />
      <Stack space={1}>
        <Text size={1} style={{color: getCountColor(), fontWeight: '500'}}>
          {characterCount}/200 characters
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
