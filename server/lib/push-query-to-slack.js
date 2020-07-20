const appLog = require('./app-log');
const request = require('request');

/**
 * TODO: Deprecated. Remove in v6. Replaced with webhooks
 * @param {*} config
 * @param {*} query
 * @param {*} user
 */
function pushQueryToSlack(config, query, user) {
  const SLACK_WEBHOOK = config.get('slackWebhook');
  if (SLACK_WEBHOOK) {
    const PUBLIC_URL = config.get('publicUrl');
    const BASE_URL = config.get('baseUrl');

    const options = {
      method: 'post',
      body: {
        text: `New Query <${PUBLIC_URL}${BASE_URL}/queries/${query.id}|${
          query.name
        }> 
saved by ${user.name || user.email} on SQLPad 
${'```sql'}
${query.queryText}
${'```'}`,
      },
      json: true,
      url: SLACK_WEBHOOK,
    };
    request(options, function (err) {
      if (err) {
        appLog.error(err, 'Problem sending query to slack');
      }
    });
  }
}

module.exports = pushQueryToSlack;
