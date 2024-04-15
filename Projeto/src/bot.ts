import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

// Importe a biblioteca 'moment' para lidar com as datas e horas
import moment from 'moment';

require('dotenv').config();

const prisma = new PrismaClient();

config();

// Verifica se TELEGRAM_TOKEN está definido
if (!process.env.TELEGRAM_TOKEN) {
  console.error("TELEGRAM_TOKEN não está definido nas variáveis de ambiente.");
  process.exit(1);
}

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;

  if (match) {
    const resp = match[1];
    bot.sendMessage(chatId, resp);
  }
});


// Função para verificar se a hora atual está dentro do intervalo desejado (9:00 às 18:00)
function isWithinBusinessHours() {
  const now = moment(); // Obtenha a hora atual
  const businessStart = moment().hour(9).minute(0).second(0); // 9:00
  const businessEnd = moment().hour(18).minute(0).second(0); // 18:00

  // Verifique se a hora atual está entre 9:00 e 18:00
  return now.isBetween(businessStart, businessEnd);
}



// Função para enviar o link do site se estiver dentro do horário comercial
function sendWebsiteLink(chatId: TelegramBot.ChatId) {
  const websiteUrl = "https://uvv.br";

  bot.sendMessage(chatId, `Olá! Você pode visitar nosso site em: ${websiteUrl}`);
}

// Verifica se a mensagem foi recebida dentro do horário comercial e envia o link do site se for o caso
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  // Verifica se a hora atual está dentro do horário comercial
  if (isWithinBusinessHours()) {
    sendWebsiteLink(chatId);
  }else{
    bot.sendMessage(chatId, `Estamos fechados, funcionamos somente de 09:00 as 18:00`)
  }
});
