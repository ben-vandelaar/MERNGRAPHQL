const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const crypto = require('crypto')


const db = {
    users: [
        { id: '1', email: 'ben@gmail.com', name: 'Ben', avatarUrl: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-260nw-221431012.jpg'},
        { id: '2', email: 'rae@gmail.com', name: 'Rae', avatarUrl: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-260nw-221431012.jpg'},
        { id: '3', email: 'fred@gmail.com', name: 'Fred', avatarUrl: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-260nw-221431012.jpg'},
    ],
    messages: [
        {id: '1', userId: '1', body: 'Sup G how hang', createdAt: Date.now() },
        {id: '2', userId: '2', body: 'Good bro Good', createdAt: Date.now() },
        {id: '3', userId: '1', body: 'Hang Low.. Hand low', createdAt: Date.now() },
    ]
}

class User {
    constructor (user){
        Object.assign(this, user)
    }
    
    messages () {
        return db.messages.filter(message => message.userId === this.id)
    }
}
    
const schema = buildSchema(`
    type Query {
        users: [User!]!
        user(id: ID!): User
        messages: [Message!]!
    }

    type Mutation {
        addUser(email: String!, name: String): User
    }

    type User {
        id: ID!
        email: String!
        name: String
        avatarUrl: String
        messages: [Message!]!
    }

    type Message {
        id: ID!
        body: String!
        createdAt: String
    }
`)

const rootValue = {
    users: () => db.users.map(user => new User(user)),
    user: args => db.users.find(user => user.id === args.id),
    messages: () => db.messages,
    addUser: ({ email, name }) => {
        const user ={
            id: crypto.randomBytes(10).toString('hex'),
            name,
            email
        }
        db.users.push(user)
        
        return user
    }
}


const app = express()

app.listen(3001, () => console.log('Listening on 3001'))

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))


