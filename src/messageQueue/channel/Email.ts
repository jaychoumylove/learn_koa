import Base from './Base';
import nodemailer from 'nodemailer';
import { ConsumeMessage } from "amqplib/properties";

export default class Normal extends Base {
    routes = {
        exceptions: {
            name: 'exceptions',
            type: 'topic',
            option: {
                durable: false,
            },
        },
    };

    queues = {
        exceptions: {
            name: undefined,
            createOption: {
                exclusive: true,
            },
            bindExchange: 'exceptions',
            bindKey: ['exception'],
            consume: this.consumeException,
            consumeOption: {
                noAck: true,
            },
        },
    };

    async consumeException(msg: ConsumeMessage | null) {
        try {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport(process.env.MAILER_DSN);

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: {
                    name: '[Learn Koa] 👻',
                    address: process.env.FROM_EMAIL,
                }, // sender address
                to: [
                    {
                        name: 'developer',
                        address: process.env.DEV_EMAIL,
                    },
                ], // list of receivers
                subject: "Bug is coming, let's fix it.", // Subject line
                text: msg.content.toString(), // plain text body
                // html: "<b>Hello world?</b>", // html body
            });

            console.log('[Mailer]');
            console.log(info);
        } catch (e) {
            console.error('[Mailer]');
            console.error(e);
            throw e;
        }
    }
}
