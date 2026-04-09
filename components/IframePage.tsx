'use client';

interface IframePageProps {
  src: string;
  title: string;
}

export function IframePage({ src, title }: IframePageProps) {
  return (
    <iframe
      src={src}
      title={title}
      className="tool-frame"
      allow="camera; microphone; fullscreen; display-capture"
    />
  );
}
