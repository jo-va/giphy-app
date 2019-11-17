import React, { useCallback, useState, useEffect } from 'react';
import { getGif, Gif } from '../api';
import LazyImage from './LazyImage';
import Tooltip from './Tooltip';

const Selection: React.FC = () => {
  const [selectedString, setSelectedString] = useState('');
  const [range, setRange] = useState<Range | null>(null);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [gif, setGif] = useState<Gif | null>(null);

  // TODO: check if it works on mobile
  const onMouseUp = useCallback(() => {
    const selection = window.getSelection();
    setRange(selection ? selection.getRangeAt(0) : null);
    setSelectedString(selection ? selection.toString() : '');
  }, []);

  useEffect(() => {
    (async () => {
      const { meta, data, pagination } = await getGif(selectedString);
      if (meta.status === 200 && pagination.count === 1 && data) {
        setGif(data[0]);
      }
    })();
    if (range) {
      const $span = document.createElement('span');
      range.insertNode($span);
      const { x, y } = $span.getBoundingClientRect();
      setLeft(x);
      setTop(y);
    }
  }, [selectedString, range]);

  return (
    <>
      <p onMouseUp={onMouseUp}>
        In Wikipedia and other sites running on MediaWiki, Special:Random can be used to access a
        random article in the main namespace; this feature is useful as a tool to generate a random
        article. Depending on your browser, it's also possible to load a random page using a
        keyboard shortcut (in Firefox, Edge, and Chrome Alt-Shift+X). To create a link to a random
        page in a different namespace, use ... For example, Special:Random/Talk will take you to a
        random article's talk page.
      </p>
      <Tooltip show={!!gif} left={left} top={top}>
        {gif ? (
          <LazyImage
            src={gif.images.original.url}
            width={gif.images.original.width}
            height={gif.images.original.height}
            alt={gif.title}
          />
        ) : null}
      </Tooltip>
    </>
  );
};

export default Selection;
