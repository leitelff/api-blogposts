'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')

class UserController {
    async index ({ response }) {
        const users = await User.all()

        response.status(200).json(users)
    }

    async store ({ auth, request, response }) {
        const data = request.only(['displayName', 'email', 'password', 'image'])

        const rules = {
            displayName: 'min:8',
            email: 'required|email|unique:users',
            password: 'required|min:6',
            image: 'url'
        }

        const messages = {
            'displayName.min': "'displayName' deve ter no mínimo 8 caracteres",
            'email.required': "campo 'email' é obrigatório",
            'email.email': "'email' deve ser um endereço de email válido",
            'email.unique': 'usuário já existe',
            'password.required': "campo 'password' é obrigatório",
            'password.min': "'password' deve ter no mínimo 6 caracteres",
            'image.url': "'image' deve ser uma url válida"
        }

        const validation = await validate(data, rules, messages)

        if (validation.fails()) {
            const err = validation.messages()

            if (err[0].field === 'email' && err[0].validation === 'unique') {
                return response.status(409).json({'message': err[0].message})
            } else {
                return response.status(400).json({'message': err[0].message})
            }
            
        }

        const user = await User.create(data);

        const token = await auth.generate(user)

        return response.status(201).json({'token': `Bearer ${token.token}`})
    }

    async login ({ auth, request, response }) {
        const data = request.only(['email', 'password'])

        const rules = {
            email: 'required',
            password: 'required'
        }

        const messages = {
            'email.required': "campo 'email' não pode ser vazio",
            'password.required': "campo 'password' não pode ser vazio"
        }

        const validation = await validate(data, rules, messages)

        if (validation.fails()) {
            const err = validation.messages()[0]
            
            if (data[err.field] === undefined) {
                return response.status(400).json({message: `campo '${err.field}' é obrigatório`})
            }
            return response.status(400).json({message: err.message})
        }

        try {
            const token = await auth.attempt(data.email, data.password)

            return response.status(200).json({'token': `Bearer ${token.token}` })
        } catch(err) {
            return response.status(400).json({message: 'campos inválidos'})
        }
    }

    async show ({ params, response }) {
        const id = params.id

        try {
            const user = await User.findOrFail(id)
            return response.status(200).json(user)
        } catch(err) {
            return response.status(404).json({message: 'usuário não existe'})
        }
    }

    async destroy ({ auth, response }) {
        const user = await auth.getUser()
        await user.delete()
        return response.status(204).json()
    }
}

module.exports = UserController
