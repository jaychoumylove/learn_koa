import Base from './base'

export default class Normal extends Base {
    routes = {
        'exceptions': {
            name: 'exceptions',
            type: 'topic',
            option: {
                durable: false
            }
        }
    }

    queues = {
        'exceptions': {
            name: undefined,
            createOption: {
                exclusive: true
            },
            bindExchange: 'exceptions',
            bindKey: [
                'exception'
            ],
            consume: this.consumeException,
            consumeOption: {
                noAck: true
            }
        }
    }

    consumeException (msg) {

    }
}