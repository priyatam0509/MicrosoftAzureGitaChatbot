const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { QuizBot } = require('./bot');

// Read environment variables
require('dotenv').config();

// Create adapter
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId || '',
    appPassword: process.env.MicrosoftAppPassword || ''
});

// Catch-all for errors
adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError] unhandled error: ${ error }`);
    console.error(error);
    
    // Send a trace activity, which will be displayed in Bot Framework Emulator
    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );
    
    // Send a message to the user
    await context.sendActivity('The bot encountered an error or bug.');
};

// Create the bot
const bot = new QuizBot();

// Create HTTP server
const server = restify.createServer();

// Enable CORS
server.use(restify.plugins.bodyParser());

server.listen(process.env.PORT || 3978, () => {
    console.log(`\n${ server.name } listening to ${ server.url }`);
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo test your bot, connect to: http://localhost:3978/api/messages');
});

// Listen for incoming activities and route them to your bot main dialog.
server.post('/api/messages', async (req, res) => {
    // Route received a request to adapter for processing
    await adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        await bot.run(context);
    });
});

// Listen for Upgrade requests for Streaming.
server.on('upgrade', async (req, socket, head) => {
    // Create an adapter scoped to this WebSocket connection to allow storing session data.
    const streamingAdapter = new BotFrameworkAdapter({
        appId: process.env.MicrosoftAppId || '',
        appPassword: process.env.MicrosoftAppPassword || ''
    });

    // Set onTurnError for the BotFrameworkAdapter created for each connection.
    streamingAdapter.onTurnError = adapter.onTurnError;

    await streamingAdapter.processActivityDirect(req, socket, head, async (context) => {
        // After connecting via WebSocket, run this logic for every request sent over
        // the WebSocket connection.
        await bot.run(context);
    });
});
