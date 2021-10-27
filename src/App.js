import React, { useRef, useState, useEffect } from 'react';
import { usePhotos } from './usePhotos';

function App() {
  const { photos, loading, setPage } = usePhotos();
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        console.log(first)
        if (first.isIntersecting) {
          setPage((no) => no + 1);
        }
      })
  );

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <div className="App">
      {loading ? 'loading ...' : photos.map((p, i) => <div key={p.id} ref={i === photos.length - 1 ? setLastElement : null} ><img src={p.url} alt={p.title} /></div>)}
    </div>
  );
}

export default App;
