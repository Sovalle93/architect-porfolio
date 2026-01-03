'use client'
// This will be a client component if you want interactivity like a lightbox for images.
// If it's purely static, you could make it a server component by removing 'use client'

export default function ProjectDetail({ project }) {
  return (
    <main className="min-h-screen bg-[#f6f6f2] py-12 px-8 sm:px-16 lg:px-32 xl:px-48">
      <div className="container mx-auto">
        {/* New Layout: Flex on large screens, column on small ones */}
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column - Textual Description */}
          <div className="w-full lg:w-2/5">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
            <h2 className="text-2xl text-gray-700 mb-2">{project.place}</h2>
            <p className="text-xl text-gray-600 mb-8">{project.year}</p>
            
            {/* Add more descriptive text here in the future */}
            <div className="prose prose-lg"> 
              {/* You can add a 'description' field to your PROJECTS_DATA later */}
              <p>Client description and project details would go here. This is a detailed view for {project.title}.</p>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="w-full lg:w-3/5">
            {/* Simple stack of images for now. You can add a gallery here later. */}
            <div className="space-y-8">
              {project.images.flat().map((imageUrl, index) => ( // .flat() combines all slides into one array of images
                <img
                  key={index}
                  src={imageUrl}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}