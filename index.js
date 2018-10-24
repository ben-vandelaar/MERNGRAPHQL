const { ApolloServer, gql}= require('apollo-server')

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
        {id: '3', userId: '1', body: 'Good Man, You?', createdAt: Date.now() },
    ]
}
    
const typeDefs = gql`
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
`

const resolvers = {

    Query: {
        users: () => db.users,
        user: (root, { id }) => db.users.find(user => user.id === id),
        messages: () => db.messages,
    },
    Mutation: {
        addUser: (root, { email, name }) => {
            const user ={
                id: crypto.randomBytes(10).toString('hex'),
                name,
                email
            }
            db.users.push(user)
            
            return user
        }
    },
    User: {
        messages: user => db.messages.filter(message => message.userId === user.id)
        }
    }

const server = new ApolloServer({ typeDefs, mocks: true })

server.listen().then(({ url }) => console.log(url))



