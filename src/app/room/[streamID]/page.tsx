import StreamingPage from '@/components/streaming/streaming-page'
import React, { use } from 'react'

export default async function Page({ params }: { params: Promise<{ streamID: string }> }) {
  const { streamID } = await params;
  return (
    <>
      <StreamingPage roomID={streamID} />
    </>
  );
}