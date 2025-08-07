
import { projects } from "./project_data";
import { ProjectCard } from './projectcard';
import Footer from '@/components/shared/Footer';

const Projects = () => {
    

  return (
    <>
    <section className="text-white px-3 md:px-20 py-10 md:py-40 md:pt-20 z-10 select-none max-h-full w-full" id="projects">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
          Featured Projects
        </h1>
        <p className="hidden sm:block text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
          Innovative solutions that solve real problems. From SIH 2024 finalist project to interactive web experiences.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 pb-30 gap-6 md:gap-10 ">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            image={project.image}
            title={project.title}
            description={project.description}
            liveLink={project.liveLink}
            repoLink={project.repoLink}
            techStack={project.techStack} // Pass tech stack here
          />
        ))}
      </div>

      {/* Footer */}
    </section>
      <Footer />
      </>
  );
};

export default Projects;
