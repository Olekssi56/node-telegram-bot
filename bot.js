const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token from BotFather
const token = '7440938848:AAGsvGlTTR8-zLUWOD1Zdataje2SA55fOKs';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const hamsters = {}; // This object will store user hamsters

bot.onText(/\/myhamster/, (msg) => {
    const chatId = msg.chat.id;
    if (!hamsters[chatId]) {
        hamsters[chatId] = { name: 'Fluffy', level: 1 };
    }
    bot.sendMessage(chatId, `Your hamster: ${hamsters[chatId].name}, Level: ${hamsters[chatId].level}`);
});

bot.onText(/\/train/, (msg) => {
    const chatId = msg.chat.id;
    if (!hamsters[chatId]) {
        hamsters[chatId] = { name: 'Fluffy', level: 1 };
    } else {
        hamsters[chatId].level += 1;
    }
    bot.sendMessage(chatId, `Your hamster has trained! New level: ${hamsters[chatId].level}`);
});

bot.onText(/\/battle/, (msg) => {
    const chatId = msg.chat.id;
    if (!hamsters[chatId]) {
        hamsters[chatId] = { name: 'Fluffy', level: 1 };
    }
    const opponentLevel = Math.floor(Math.random() * 10) + 1;
    const result = hamsters[chatId].level >= opponentLevel ? 'won' : 'lost';
    bot.sendMessage(chatId, `You battled an opponent of level ${opponentLevel} and ${result}!`);
});

// Inline keyboard for actions
bot.onText(/\/actions/, (msg) => {
  const chatId = msg.chat.id;
  const options = {
      reply_markup: {
          inline_keyboard: [
              [{ text: 'Train Hamster', callback_data: 'train' }],
              [{ text: 'Battle', callback_data: 'battle' }],
              [{ text: 'View Hamster', callback_data: 'view' }]
          ]
      }
  };
  bot.sendMessage(chatId, 'Choose an action:', options);
});

// Handle inline keyboard callbacks
bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  const action = callbackQuery.data;

  if (action === 'train') {
      if (!hamsters[chatId]) {
          hamsters[chatId] = { name: 'Fluffy', level: 1 };
      } else {
          hamsters[chatId].level += 1;
      }
      bot.sendMessage(chatId, `Your hamster has trained! New level: ${hamsters[chatId].level}`);
  } else if (action === 'battle') {
      if (!hamsters[chatId]) {
          hamsters[chatId] = { name: 'Fluffy', level: 1 };
      }
      const opponentLevel = Math.floor(Math.random() * 10) + 1;
      const result = hamsters[chatId].level >= opponentLevel ? 'won' : 'lost';
      bot.sendMessage(chatId, `You battled an opponent of level ${opponentLevel} and ${result}!`);
  } else if (action === 'view') {
      if (!hamsters[chatId]) {
          hamsters[chatId] = { name: 'Fluffy', level: 1 };
      }
      bot.sendMessage(chatId, `Your hamster: ${hamsters[chatId].name}, Level: ${hamsters[chatId].level}`);
  }
});