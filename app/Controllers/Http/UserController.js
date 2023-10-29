'use strict'

const User = use('App/Models/User');

class UserController {
    /* Esto es solamente una clase que contiene los metodos para los usuarios */
    async login({ request, auth }) {
        const { email,  password } = request.all();
        const token = await auth.attempt(email, password);

        return token;
    }

    async store({request}) {
        const { email,  password } = request.all();
        const user = await User.create({
            email,
            password,
            username: email
        })
        return this.login(...arguments)
    }
}

module.exports = UserController
