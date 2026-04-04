import { SYSTEM_PATH } from '../config/constants';
import type { StandardTestResult } from '../dice';
import { localize } from '../utils/localization';

type CreateStandardTestMessageOptions = {
  document: Actor | Item;
  result: StandardTestResult;
};

const STANDARD_TEST_TEMPLATE_PATH = `${SYSTEM_PATH}/templates/chat/simple-roll.hbs`;

export async function createStandardTestMessage({
  document,
  result,
}: CreateStandardTestMessageOptions): Promise<
  ChatMessage.Implementation | undefined
> {
  const outcomeState = result.success ? 'success' : 'failure';
  const outcomeKey = result.success
    ? 'UESRPG.Chat.success'
    : 'UESRPG.Chat.failure';
  const content = await foundry.applications.handlebars.renderTemplate(
    STANDARD_TEST_TEMPLATE_PATH,
    {
      title: localize('UESRPG.Chat.standardTest'),
      documentName: document.name,
      result,
      outcomeState,
      outcomeLabel: localize(outcomeKey),
    },
  );

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({
      actor: document instanceof Actor ? document : null,
    }),
    content,
  });
}
