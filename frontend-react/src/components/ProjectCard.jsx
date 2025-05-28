// src/components/ProjectCard.jsx

function ProjectCard({ project }) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
      <p className="text-sm text-gray-500">{project.date}</p>
      <p className="my-2 text-gray-700">{project.description}</p>

      {project.mediaType === "image" ? (
        <img
          src={project.mediaUrl}
          alt={project.title}
          className="w-full mt-2 rounded"
        />
      ) : (
      <div className="ratio ratio-16x9 mt-2">
      <iframe
        src="https://www.youtube.com/embed/BgdbVdX4MNU"
        title="Clean.id Videos"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>


      )}

      {project.projectUrl && (
        <a
          href={project.projectUrl}
          className="text-blue-600 mt-2 inline-block"
          target="_blank"
          rel="noreferrer"
        >
          🔗 Lihat Proyek
        </a>
      )}
    </div>
  );
}

export default ProjectCard;
