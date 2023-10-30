'use strict'

const Project = use('App/Models/Project');
const Task = use('App/Models/Task');
const AuthService = use('App/Services/AuthService')

class TaskController {

    async index({ auth, params }) {
        const user = await auth.getUser();
        const { project_id } = params;
        const project = await Project.find(project_id);
        AuthService.permissionsCheck(project, user);
        
        return await project.tasks().fetch()
    }

    async create({ auth, request, params }) {
        const user = await auth.getUser(); 
        const { description } = request.all();
        const { project_id } = params;
        const project = await Project.find(project_id);
        AuthService.permissionsCheck(project, user);

        const task = new Task();
        task.fill({
            description
        });
        await project.tasks().save(task);
        return task;
    }    

}

module.exports = TaskController
