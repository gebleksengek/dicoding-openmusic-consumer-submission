// @ts-check

const { Pool } = require('pg');

class PlaylistsService {
  /**
   * @readonly
   * @private
   */
  _pool;

  /**
   * @readonly
   * @private
   */
  _tableName = 'playlists';

  constructor() {
    this._pool = new Pool();
  }

  /**
   * @param {{id: string}} param0
   */
  async getPlaylistById({ id }) {
    const query = {
      text: `
        SELECT p.id, p.name, COALESCE(
          json_agg(
            json_build_object(
              'id', s.id,
              'title', s.title,
              'performer', s.performer
            )
          ) FILTER (
            WHERE s."deletedAt" IS NULL
            AND s.id IS NOT NULL
            ),
        '[]') as songs
        FROM ${this._tableName} p
        LEFT JOIN playlist_songs ps ON ps.playlist_id = p.id
        LEFT JOIN songs s ON s.id = ps.song_id
        WHERE p.id = $1 
        GROUP BY p.id
      `,
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }
}

module.exports = PlaylistsService;
