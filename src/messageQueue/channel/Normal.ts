import Base from './Base'
import { ConsumeMessage } from "amqplib/properties";

export default class Normal extends Base {
    routes = {
        'topic_logs': {
            name: 'topic_logs',
            type: 'topic',
            option: {
                durable: false,
            },
        },
    }

    queues = {
        'report': {
            name: undefined,
            createOption: {
                exclusive: true,
            },
            bindExchange: 'topic_logs',
            bindKey: [
                '#',
            ],
            consume: this.consumeReport,
            consumeOption: {
                noAck: true,
            },
        },
    }

    consumeReport(msg: ConsumeMessage | null) {
        console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
    }
}