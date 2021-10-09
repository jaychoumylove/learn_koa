import { config } from 'dotenv';
import Normal from './channel/Normal';
import Email from './channel/Email';
import getConnection from './Connection';
import Base from './channel/Base';

config();

interface ClientDictionary {
    [key: string]: Base
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

if (parseInt(process.env.RABBIT_MQ_STATUS)) {
    initMq().then((res) => {
        console.log('RABBIT connection is ready!')
        setClients(res);
    }).catch(e => {
        console.log('RABBIT connection failed!')
    });
}

export { initMq, getClients };
