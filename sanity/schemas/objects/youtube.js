import { defineType } from "sanity";
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import React from 'react'

const Preview = ({value}) => {
	const { url } = value
	const id = getYouTubeId(url)
	return (<YouTube videoId={id} />)
}

export default defineType({
    title: 'YouTube Embed',
    name: 'youtube',
    type: 'object',
    fields: [
      {
        title: 'YouTube video URL',
        name: 'url',
        type: 'url',
      },
      {
        title: 'Width',
        name: 'width',
        type: 'number',
        description: 'Defaults to 600'
      },
      {
        title: 'Height',
        name: 'height',
        type: 'number',
        description: 'Defaults to 400'
      },
    ],
    preview: {
      select: {
        url: 'url'
      },
      prepare(selection) {
        const {url} = selection
        return {
          title: `Youtube Frame: ${url}`
        }
      }
    }
})