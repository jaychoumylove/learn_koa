import { connect, Connection } from 'amqplib'

let connection: Connection = null;

const getConnection: () => Promise<Connection>  = async () => {
    if (!connection) {
        connection = await connect({
            hostname: process.env.RABBIT_MQ_HOST || 'localhost',
            port: parseInt(process.env.RABBIT_MQ_PORT) || 5672,
            username: process.env.RABBIT_MQ_USER || undefined,
            password: process.env.RABBIT_MQ_PASS || undefined,
        });
    }

    return connection;
}

export default getConnection;