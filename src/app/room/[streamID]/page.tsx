import StreamingPage from '@/components/streaming/streaming-page'
import React, { use } from 'react'

export default async function Page({ params }: { params: Promise<{ streamID: string }> }) {
  const { streamID } = await params; // Await the params to access streamID
  return (
    <>
      <StreamingPage roomID={streamID} />
    </>
  );
}