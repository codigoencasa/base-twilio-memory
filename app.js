require('dotenv').config()
const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
} = require('@bot-whatsapp/bot')

const TwilioProvider = require('@bot-whatsapp/provider/twilio')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowDocs = addKeyword([
    'doc',
    'documentacion',
    'documentación',
]).addAnswer([
    '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
    'https://bot-whatsapp.netlify.app/',
])

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer([
    '🙌 Aquí encontras un ejemplo rapido',
    'https://bot-whatsapp.netlify.app/docs/example/',
])

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer([
    '🚀 Puedes aportar tu granito de arena a este proyecto',
    '[*opencollective*] https://opencollective.com/bot-whatsapp',
    '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
    '[*patreon*] https://www.patreon.com/leifermendez',
])

const flowDiscord = addKeyword(['discord']).addAnswer([
    '🤪 Únete al discord',
    'https://link.codigoencasa.com/DISCORD',
])

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *doc* para ver la documentación',
            '👉 *gracias*  para ver la lista de videos',
            '👉 *discord* unirte al discord',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowDocs, flowGracias, flowTuto, flowDiscord])

    const adapterProvider = createProvider(TwilioProvider, {
        accountSid: process.env.ACC_SID,
        authToken: process.env.ACC_TOKEN,
        vendorNumber: process.env.ACC_VENDOR,
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()
