const { Webhook } = require('./Webhook.js');

/** @class MessageCard */
const MessageCard = (function() {
    /** @constructor*/
    function MessageCard() {
        /** @type {string} */
        this['@type'] = 'MessageCard';

        /** @type {string} */
        this['@context'] = 'http://schema.org/extensions';

        /** @type {Array<{activityTitle: string, activitySubtitle: string, markdown: boolean, text: string}>} */
        this.sections = [];
    }

    /**
     * @param {{activityTitle: string, activitySubtitle: string, markdown: boolean, text: string}} section
     * @returns {MessageCard}
     */
    MessageCard.prototype.addSection = function(section) {
        this.sections.push(section);
        return this;
    }

    /** @param {string} color @returns {MessageCard}*/
    MessageCard.prototype.addThemeColor = function(color) {
        /** @type {string} */
        this.themeColor = color;

        return this;
    }

    /** @param {string} summary @returns {MessageCard}*/
    MessageCard.prototype.addSummary = function(summary) {
        /** @type {string} */
        this.Summary = summary;

        return this;
    }

    return MessageCard;
})();

function start() {
    const TEAMS_WEBHOOK_URL = 'https://informaplc.webhook.office.com/webhookb2/3dbdebbf-b126-429b-8e53-0726234ed1b3@2567d566-604c-408a-8a60-55d0dc9d9d6b/IncomingWebhook/1ef0b98c3d124559943ab702e778ce1f/17bcb205-48b2-4dea-9ae0-ba41154cbab6';
    const dataUri = `https://informaplc.sharepoint.com/:t:/r/teams/deployment-notification/Shared%20Documents/3-7-2023_to_10-7-2023.csv?csf=1&web=1&e=kIcdhh`
    // const dataUri = `data:text/plain;base64,SGkgVGhlcmUgVGhpcyBmaWxlIHdpbGwgYmUgY29udmVydGVkIHRvIGRhdGEgdXJpIGFuZCBzZW50IHRvIHRlYW1zLg==`
    const webhook = new Webhook(TEAMS_WEBHOOK_URL);
    const msgCard = new MessageCard().addThemeColor('0072C6').addSummary('Teams Message Alert');
    msgCard.addSection({
        activityTitle: 'Teams Message Testing',
        activitySubtitle: `Sent from Akshay's local System`,
        markdown: true,
        text: `<div><h2><a href="${dataUri}" download="abc.txt">3-7-2023_to_10-7-2023.csv(uploaded on sharepoint)</a></h2></div>`
    });
    webhook.send(msgCard).then(console.log).catch(console.error)
}
start();