import dotEnv from 'dotenv'
import Normal from './channel/normal'
import getConnection from './connection'

dotEnv.config()

let clients = {}

const initMq = async () => {
    const conn = await getConnection();

    const NormalClient = new Normal();
    await NormalClient.init(conn);

    return {
        NormalClient
    }
}

const getClients = () => {
    return clients;
}

if (Boolean(process.env.RABBIT_MQ_STATUS)) {
    initMq().then(res => {
        clients = res;
    });
}

export default {
    initMq,
    getClients
}

