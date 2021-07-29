import dotEnv from 'dotenv'
import Normal from './channel/normal'
import getConnection from './connection'

dotEnv.config()

let clients = {}

const setClients = (tempClients) => {
    clients = tempClients;
}

const getClients = () => {
    return clients;
}

const initMq = async () => {
    const conn = await getConnection();

    const NormalClient = new Normal();
    await NormalClient.init(conn);

    return {
        NormalClient
    }
}

if (Boolean(process.env.RABBIT_MQ_STATUS)) {
    initMq().then(res => {
        setClients(res);
    });
}

export {
    initMq,
    getClients
}

