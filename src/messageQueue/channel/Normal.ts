import Base from './Base'

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

    consumeReport(msg) {
        console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
    }
}