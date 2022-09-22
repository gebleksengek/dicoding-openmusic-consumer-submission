// @ts-check

module.exports = {
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT, 10) : 0,
    address: process.env.MAIL_ADDRESS,
    password: process.env.MAIL_PASSWORD,
  },
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER
      ? process.env.RABBITMQ_SERVER
      : 'amqp://localhost',
  },
};
