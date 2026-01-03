const ImageBox = ({ imageUrls, pattern, altText }) => {
  // Pattern 0: 2 small left + 1 big right
  if (pattern === 0) {
    return (
      <div className="w-full h-72 flex gap-2">
        <div className="w-2/5 flex flex-col gap-2">
          <div className="h-1/2">
            <img src={imageUrls[0]} alt={`${altText} - Detail 1`} className="w-full h-full object-cover" />
          </div>
          <div className="h-1/2">
            <img src={imageUrls[1]} alt={`${altText} - Detail 2`} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="w-3/5">
          <img src={imageUrls[2]} alt={`${altText} - Overview`} className="w-full h-full object-cover" />
        </div>
      </div>
    );
  }

  // Pattern 1: 1 big top + 2 small bottom
  if (pattern === 1) {
    return (
      <div className="w-full h-72 flex flex-col gap-2">
        <div className="h-2/3">
          <img src={imageUrls[0]} alt={`${altText} - Overview`} className="w-full h-full object-cover" />
        </div>
        <div className="h-1/3 flex gap-2">
          <div className="w-1/2">
            <img src={imageUrls[1]} alt={`${altText} - Detail 1`} className="w-full h-full object-cover" />
          </div>
          <div className="w-1/2">
            <img src={imageUrls[2]} alt={`${altText} - Detail 2`} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    );
  }

  // Pattern 2: 1 big left + 2 small right
  if (pattern === 2) {
    return (
      <div className="w-full h-72 flex gap-2">
        <div className="w-3/5">
          <img src={imageUrls[0]} alt={`${altText} - Overview`} className="w-full h-full object-cover" />
        </div>
        <div className="w-2/5 flex flex-col gap-2">
          <div className="h-1/2">
            <img src={imageUrls[1]} alt={`${altText} - Detail 1`} className="w-full h-full object-cover" />
          </div>
          <div className="h-1/2">
            <img src={imageUrls[2]} alt={`${altText} - Detail 2`} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ImageBox;