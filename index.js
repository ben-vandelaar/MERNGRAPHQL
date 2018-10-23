const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')


// const { graphql, buildSchema } = require('graphql'
// )

const db = {
    users: [
        { id: '1', email: 'ben@gmail.com', name: 'Ben', avatarUrl: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-260nw-221431012.jpg'},
        { id: '2', email: 'rae@gmail.com', name: 'Rae', avatarUrl: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-260nw-221431012.jpg'},
        { id: '3', email: 'fred@gmail.com', name: 'Fred', avatarUrl: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-260nw-221431012.jpg'},
    ]
}

const schema = buildSchema(`
    type Query {
        users: [User!]!
    }

    type User {
        id: ID!
        email: String!
        name: String
        avatarUrl: String
    }
`)

const rootValue = {
    users: () => db.users
}


const app = express()

app.listen(3001, () => console.log('Listening on 3001'))

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

// graphql(
//     schema,
//     `
//     {
//         users {
//             name,
//             email
//         }
//     }
//     `,
//     rootValue
// ).then(
//     res => console.dir(res, {
//         depth: null
//     })
// ).catch(
//     console.error
// )

