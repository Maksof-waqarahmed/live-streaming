import StreamingPage from '@/components/streaming/streaming-page';
import React from 'react';

export default async function Page({ params }: { params: { streamID: string } }) {
  const { streamID } = await params;
  return <StreamingPage room={streamID} />;
}
