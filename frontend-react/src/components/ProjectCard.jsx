function ProjectCard({ project }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{project.title}</h2>
      <p className="text-sm text-gray-600">{project.date}</p>
      <p className="my-2">{project.description}</p>

      {project.mediaType === "image" ? (
        <img src={project.mediaUrl} alt={project.title} className="w-full mt-2" />
      ) : (
        <iframe
          className="w-full aspect-video mt-2"
          src={project.mediaUrl}
          title={project.title}
          allowFullScreen
        ></iframe>
      )}

      {project.projectUrl && (
        <a href={project.projectUrl} className="text-blue-600 mt-2 block" target="_blank" rel="noreferrer">
          Lihat Proyek
        </a>
      )}
    </div>
  );
}

export default ProjectCard;
