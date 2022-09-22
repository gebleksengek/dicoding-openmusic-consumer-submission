// @ts-check

require('dotenv').config();

const amqp = require('amqplib');

const config = require('./config');
const Listener = require('./Listener');
const MailSender = require('./MailSender');
const PlaylistsService = require('./PlaylistsService');

const init = async () => {
  const mailSender = new MailSender();
  const playlistsService = new PlaylistsService();

  const listener = new Listener(playlistsService, mailSender);

  const connection = await amqp.connect(config.rabbitMq.server);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlist', {
    durable: true,
  });

  channel.consume('export:playlist', listener.listen, { noAck: true });
};

init();
