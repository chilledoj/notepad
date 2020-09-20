import React, { FC } from 'react';
import MarkdownIt from 'markdown-it';
import MTodo from 'markdown-it-todo';

// Initialize a markdown parser
const mdParser = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
}).use(MTodo);

interface MdRenderProps {
  src: string;
}

export const Viewer: FC<MdRenderProps> = ({ src }: MdRenderProps) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: mdParser.render(src) }} className="custom-html-style" />
  );
};

export const format = (text: string): string => mdParser.render(text);
