// @ts-check

const nodemailer = require('nodemailer');

const config = require('./config');

/**
 * @typedef {import('nodemailer').SendMailOptions} SendMailOptions
 * @typedef {import('nodemailer').SentMessageInfo} SentMessageInfo
 */

class MailSender {
  /**
   * @readonly
   * @private
   */
  _transporter;

  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      auth: {
        user: config.mail.address,
        pass: config.mail.password,
      },
    });
  }

  /**
   * @param {{targetEmail: string, content: string}} param0
   * @returns {Promise<SentMessageInfo>}
   */
  sendMail({ targetEmail, content }) {
    /** @type {SendMailOptions} */
    const message = {
      from: 'OpenMusic',
      to: targetEmail,
      subject: 'Export Playlist',
      text: 'Terlampir dari hasil export playlist',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
