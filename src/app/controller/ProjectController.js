import CreateProjectService from '../services/projects/CreateProjectService';

class ProjectController {
  async create(request, response) {
    const { user_id } = request.params;
    const { title, tech_ids } = request.body;

    const createProjectService = new CreateProjectService();

    const project = await createProjectService.execute({
      user_id,
      title,
      tech_ids,
    });

    return response.status(201).json(project);
  }
}

export default ProjectController;
