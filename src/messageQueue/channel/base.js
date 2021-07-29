export default class Base {
    /**
     * @type {ChannelModel|null}
     */
    connection = null
    /**
     * @type {Channel|null}
     */
    channelInstance = null

    /**
     * @type {Object|Array}
     */
    routes = {}

    exampleRoutes = {
        'topic_logs': {
            name: 'topic_logs',
            type: 'topic',
            option: {
                durable: false
            }
        }
    }

    /**
     * @type {Object|Array}
     */
    queues = {}

    exampleQueues = {
        'report': {
            name: undefined,
            createOption: {
                exclusive: true
            },
            bindExchange: 'topic_logs',
            bindKey: [
                '#'
            ],
            consume: console.log,
            consumeOption: {
                noAck: true
            }
        }
    }

    /**
     * @param {ChannelModel|null} connection
     */
    constructor (connection = null) {
        if (connection) {
            this.init(connection)
        }
    }

    async init (connection) {
        this.connection = connection
        await this.initChannel()
        this.initRouter()
        await this.initQueue()
    }

    async initChannel () {
        this.channelInstance = await this.connection.createChannel()
    }

    initRouter () {
        if (this.routes instanceof Array) {
            this.routes.map(({ name, type, option }) => {
                this.channelInstance.assertExchange(name, type, option)
            })
        } else {
            if (this.routes instanceof Object) {
                Object.keys(this.routes).map(key => {
                    const { name, type, option } = this.routes[key]
                    const tempName = name ? name : key
                    this.channelInstance.assertExchange(tempName, type, option)
                })
            } else {
                throw new Error('Router should be Array or Object!')
            }
        }
    }

    async initQueue () {
        if (this.queues instanceof Object) {
            for (const key in this.queues) {
                await this.assertSingleQueue(this.queues[key])
            }
        } else {
            throw new Error('Queues should be Array or Object!')
        }
    }

    async assertSingleQueue ({ name, createOption, bindExchange, bindKey, consume, consumeOption }) {
        const tempName = name ? name : ''
        const queue = await this.channelInstance.assertQueue(tempName, createOption)
        if (bindKey instanceof Array && bindKey.length) {
            bindKey.map(key => {
                this.channelInstance.bindQueue(queue.queue, bindExchange, key)
            })
        } else if (typeof bindKey === 'string') {
            this.channelInstance.bindQueue(queue.queue, bindExchange, bindKey)
        } else {
            this.channelInstance.bindQueue(queue.queue, bindExchange, '')
        }

        this.channelInstance.consume(queue.queue, consume, consumeOption)

        return queue
    }

    publish (exchange, key, msg) {
        const dict = this.getQueueDict()
        if (dict.hasOwnProperty(exchange)) {
            this.channelInstance.publish(exchange, key, Buffer.from(msg))
        } else {
            throw new Error('wrong exchange!')
        }
    }

    getQueueDict () {
        let dict = {}
        for (const key in this.queues) {
            const { bindExchange, bindKey } = this.queues[key]
            dict[bindExchange] = []
            if (!bindKey) {
                continue
            }
            if (typeof bindKey === 'string') {
                dict[bindExchange] = [bindKey]
                continue
            }
            if (bindKey instanceof Array) {
                dict[bindExchange] = bindKey
            }
        }

        return dict
    }
}
