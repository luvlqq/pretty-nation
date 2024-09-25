export const BOT_MESSAGES = {
  START:
    'Привет! 👋 Я бот, который позволяет манипулировать и управлять ссылками. \n \n Выберите одно из действий ниже:',
  HELP: `
    ❔ Доступные команды:
    /start - запуск бота
    /help - список доступных команд
    Добавить ссылку - добавляет новую ссылку
    Вывести все ссылки - выводит список всех ссылок
    Получить значение с ссылки по коду - возвращает ссылку по ее коду
  `,
  HOME: '❔ Что вы хотите сделать?',
  URL_FIND: '🔗 Ссылка по вашему коду:\n\n',
  URL_ERROR: '⚠️ Введен неверный URL. Пожалуйста, попробуйте еще раз.',
  URL_FIND_ERROR:
    '⚠️ Ссылка с таким кодом не найдена. Пожалуйста, проверьте введенный код.',
  URL_DELETE: '⚠️ Удалить ссылку',
  URL_DELETE_ERROR:
    '⚠️ Не удалось удалить ссылку. Возможно, ссылка не найдена.',
  INPUT_URL_ERROR:
    '🙏 Пожалуйста, введите в правильном формате: <b>ИМЯ_ДЛЯ_ССЫЛКИ ССЫЛКА.</b>',
  INPUT_URL_SUCCESS: `✅ Ссылка успешно добавлена! Уникальный код:\n`,
  INPUT_URL_DELETE: `✅ Ссылка была успешно удалена \n`,
  INPUT_URL_CODE: '🙏 Пожалуйста, введите уникальный код вашей ссылки:',
  INPUT_ADD_LINK:
    'Введите ссылку, которую хотите добавить.\n' +
    '⚠️ Ссылка должна быть формата:\n \n' +
    '<b>[ИМЯ_ДЛЯ_ССЫЛКИ] [ССЫЛКА]</b> \n \n' +
    '❔ (без [] скобок, они для повышения читабельности)',
  INPUT_NEXT_STEP: '❔ Что дальше?',
  USER_NO_LINKS: '🚫 Список ссылок пуст.',
  USER_LINKS: '📃 Вот список ваших ссылок:',
};
