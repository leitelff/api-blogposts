'use strict'

const { post } = require("@adonisjs/framework/src/Route/Manager")

const { validate } = use('Validator')
const User = use('App/Models/User')
const Post = use('App/Models/Post')

class PostController {
    async store ({ auth, request, response }) {
        const data = request.only(['title', 'content'])

        const rules = {
            title: 'required',
            content: 'required'
        }

        const messages = {
            'title.required': "campo 'title' é obrigatório",
            'content.required': "campo 'content' é obrigatório"
        }

        const validation = await validate(data, rules, messages)

        if (validation.fails()) {
            const err = validation.messages()

            return response.status(400).json({message: err[0].message})
        }

        const user = await auth.getUser()

        const post = await user.posts().create(data)

        return response.status(201).json({
            'title': post.title,
            'content': post.content,
            'userId': post.user_id
        })

    }

    async index ({ response }) {
        const posts = await Post.query().setHidden(['user_id']).with('user').fetch()

        return response.status(200).json(posts)
    }

    async show ({ params, response }) {
        const id = params.id

        const post = await Post.query().where('id', '=', id).setHidden(['user_id'])
            .with('user').first()

        if (!post) {
            return response.status(404).json({message: 'post não existe'})
        }

        return response.status(200).json(post)
    }

    async edit ({ auth, request, params, response }) {
        const id = params.id
        let post
        try {
            post = await Post.findOrFail(id)
        } catch (err) {
            return response.status(404).json({message: 'post não existe'})
        }
        
        const user = await auth.getUser()
        const user_id = user.id

        const data = request.only(['title', 'content'])

        const rules = {
            title: 'required',
            content: 'required'
        }

        const messages = {
            'title.required': "campo 'title' é obrigatório",
            'content.required': "campo 'content' é obrigatório"
        }

        const validation = await validate(data, rules, messages)

        if (validation.fails()) {
            const err = validation.messages()
            return response.status(400).json({message: err[0].message})
        }

        if (post.user_id == user_id) {
            post.title = data.title
            post.content = data.content

            await post.save()

            return response.status(200).json({
                'title': post.title,
                'content': post.content,
                'userId': post.user_id
            })
        } else {
            return response.status(401).json({message: 'usuário não autorizado'})
        }
    }

    async search ({ request, response }) {
        const q = request.input('q')

        const posts = await Post.query().where(function () {
            this
                .where('title', 'like', `%${q}%`)
                .orWhere('content', 'like', `%${q}%`)
        }).setHidden(['user_id']).with('user').fetch()

        return response.status(200).json(posts)
    }

    async destroy ({ params, auth, response }) {
        const user = await auth.getUser()
        const user_id = user.id;

        const id = params.id
        let post

        try {
            post = await Post.findOrFail(id)
        } catch (err) {
            return response.status(404).json({message: 'post não existe'})
        }

        if (post.user_id == user_id) {
            await post.delete()
            return response.status(204).json()
        } else {
            return response.status(401).json({message: 'usuário não autorizado'})
        }

    }
}

module.exports = PostController
