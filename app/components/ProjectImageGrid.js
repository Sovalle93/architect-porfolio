const ProjectImageGrid = ({ images, title }) => {
  const allImages = images.flat();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {allImages.map((imageUrl, index) => (
        <div key={index} className="aspect-square">
          <img
            src={imageUrl}
            alt={`${title} - Image ${index + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectImageGrid;