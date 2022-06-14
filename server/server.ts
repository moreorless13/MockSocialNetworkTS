import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import sanitizedConfig from './config';
import connectToDatabase from './config/connection';
import typeDefs from './schemas/typeDefs';
import resolvers from './schemas/resolvers';
import { authMiddleware } from './utils/auth';

const PORT = sanitizedConfig.PORT || 3001;

async function startApolloServer() {
    console.log("Ignition... ")
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        csrfPrevention: true
    })

    await server.start()
    await connectToDatabase()
    server.applyMiddleware({
        app,
        path: '/graphql'
    });

    app.use(express.json())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    if (sanitizedConfig.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
    }

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));
        console.log(`API server running on port http://localhost:${PORT}`)
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
}
startApolloServer()