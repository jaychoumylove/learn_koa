import { connect } from 'amqplib'

let connection = null;

/**
 * @returns {Promise<ChannelModel>}
 */
const getConnection = async () => {
    if (!connection) {
        connection = await connect({
            hostname: process.env.RABBIT_MQ_HOST || 'localhost',
            port: process.env.RABBIT_MQ_PORT || 5672,
            username: process.env.RABBIT_MQ_USER || undefined,
            password: process.env.RABBIT_MQ_PASS || undefined,
        });
    }

    return connection;
}

export default getConnection;