// src/pages/Portfolio.jsx

import ProjectCard from "../components/ProjectCard";
import portfolioImg from "../assets/images/portfolio.png"; // Gambar lokal, ganti sesuai file kamu
// import videoThumb from "../assets/images/video-project.jpg"; 

function Portfolio() {
  const projects = [
    {
      title: "Website Portofolio",
      date: "Mei 2025",
      description: "Sebuah website pribadi untuk menampilkan karya dan projek saya menggunakan React dan ASP.NET Core.",
      mediaType: "image",
      mediaUrl: portfolioImg,
      projectUrl: "https://www.youtube.com/@dandirayo",
    },
    {
      title: "Video Promosi Produk",
      date: "April 2025",
      description: "Video promosi berdurasi 1 menit untuk media sosial menggunakan After Effects.",
      mediaType: "video",
      mediaUrl: "https://www.youtube.com/watch?v=BgdbVdX4MNU",
      projectUrl: "https://www.youtube.com/@dandirayo",
    },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
        Portofolio Proyek
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
