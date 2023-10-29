'use strict'

const Project = use('App/Models/Project');

class ProjectController {

    async index({ auth }) {
        const user = await auth.getUser();        
        return await user.projects().fetch()
    }

    async create({ auth, request }) {
        // debe tomar el usuario y los daots necesarios para crear un proyecto
        const user = await auth.getUser();  
        const { name } = request.all();

        const project = new Project();
        project.fill({
            name
        });
        await user.projects().save(project);
        return project;
    }

    async destroy({ auth, response, params }) {
        const user = await auth.getUser();
        const { project_id } = params;

        const project = await Project.find(project_id)
        console.log(project)
        console.log(user)
        if (project.user_id !== user.id) {
            return response.status(401).json({message:'No tiene autorización para eliminar este proyecto'})
        }
        await project.delete();
        return project
    }
}

module.exports = ProjectController
