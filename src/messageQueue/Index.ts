import { config } from 'dotenv';
import Normal from './channel/normal';
import Email from './channel/email';
import getConnection from './connection';
import Base from './channel/base';

config();

interface ClientDictionary {
    [id: string]: Base
}

let clients: ClientDictionary = {};

const setClients = (tempClients) => {
    clients = tempClients;
};

const getClients = () => {
    return clients;
};

const initMq = async () => {
    const conn = await getConnection();

    const NormalClient = new Normal();
    await NormalClient.init(conn);

    const EmailClient = new Email();
    await EmailClient.init(conn);

    return {
        NormalClient,
        EmailClient,
    };
};

if (Boolean(process.env.RABBIT_MQ_STATUS)) {
    initMq().then((res) => {
        setClients(res);
    });
}

export { initMq, getClients };
