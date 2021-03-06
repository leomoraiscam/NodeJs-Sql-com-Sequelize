import UsersRepository from '../../repositories/UsersRepository';
import ProjectsRepository from '../../repositories/ProjectsRepository';
import ProjectTechsRepository from '../../repositories/ProjectTechsRepository';
import GlobalError from '../../../errors/GlobalError';

class CreateProjectService {
  async execute({ user_id, title, tech_ids }) {
    const usersRepository = new UsersRepository();
    const projectsRepository = new ProjectsRepository();
    const projectTechsRepository = new ProjectTechsRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new GlobalError('this specif user not found', 404);
    }

    const [project] = await projectsRepository.create({
      title,
    });

    user.addProject(project);

    const items = tech_ids.map((tech) => {
      return {
        project_id: project.id,
        tech_id: tech,
      };
    });

    const allItems = await Promise.all(items);

    await projectTechsRepository.createAll(allItems);

    return project;
  }
}

export default CreateProjectService;
