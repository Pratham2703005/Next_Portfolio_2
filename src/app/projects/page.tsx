
import { projects } from "./project_data";
import { ProjectCard } from './projectcard';
import Footer from '@/components/shared/Footer';
import PageHeading from '@/components/ui/PageHeading';

const Projects = () => {
    

  return (
    <>
    <section className="text-white px-3 md:px-20 py-10 md:py-40 md:pt-20 z-10 select-none max-h-full w-full" id="projects">
      <PageHeading title="PROJECT GALLERY" shadowColor="rgba(59, 130, 246, 0.5)" />
      <div className="grid grid-cols-1 md:grid-cols-2 pb-30 gap-6 md:gap-10 ">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            image={project.image}
            title={project.title}
            description={project.description}
            liveLink={project.liveLink}
            repoLink={project.repoLink}
            techStack={project.techStack}
            priority={index < 2}
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
