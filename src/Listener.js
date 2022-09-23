// @ts-check

class Listener {
  /**
   * @readonly
   * @private
   */
  _playlistsService;

  /**
   * @readonly
   * @private
   */
  _mailSender;

  /**
   * @param {import('./PlaylistsService')} playlistsService
   * @param {import('./MailSender')} mailSender
   */
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  /**
   * @param {import('amqplib').ConsumeMessage | null} message
   */
  async listen(message) {
    try {
      if (!message) {
        return;
      }

      /**
       * @type {{playlistId: string, targetEmail: string}}
       */
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString()
      );

      const playlist = await this._playlistsService.getPlaylistById({
        id: playlistId,
      });

      const result = await this._mailSender.sendMail({
        targetEmail,
        content: JSON.stringify({ playlist }),
      });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
