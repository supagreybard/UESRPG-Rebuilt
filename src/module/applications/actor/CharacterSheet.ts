import { SYSTEM_PATH } from '../../config/constants';
import { localize } from '../../utils/localization';
import { BaseActorSheet } from './BaseActorSheet';

const DEFAULT_PORTRAIT = 'icons/svg/mystery-man.svg';

export class CharacterSheet extends BaseActorSheet {
  static PARTS = {
    sheet: {
      template: `${SYSTEM_PATH}/templates/actor/character-sheet.hbs`,
      root: true,
    },
  };

  override async _prepareContext(
    options: any,
  ): Promise<Record<string, unknown>> {
    const context = await super._prepareContext(options);
    const system = context.system as Record<string, any>;
    const prose = (system.prose ?? {}) as Record<string, any>;
    const name = String(this.actor.name ?? '').trim();
    const actorImage = String(this.actor.img ?? '').trim();

    return {
      ...context,
      experience: Number(system.experience ?? 0),
      sheetTitle: localize('UESRPG.Sheets.character'),
      identity: {
        displayName: name || localize('UESRPG.Empty.unnamedCharacter'),
        image: actorImage || DEFAULT_PORTRAIT,
        missingMessages: [
          ...(name ? [] : [localize('UESRPG.Messages.missingCharacterName')]),
          ...(actorImage
            ? []
            : [localize('UESRPG.Messages.missingCharacterImage')]),
        ],
      },
      notes: {
        value: String(prose.notes ?? ''),
      },
    };
  }

  protected _processFormData(
    event: SubmitEvent | null,
    form: HTMLFormElement,
    formData: any,
  ): object {
    const submitData = super._processFormData(event, form, formData) as Record<
      string,
      unknown
    >;

    if ('name' in submitData && !String(submitData.name ?? '').trim()) {
      submitData.name = localize('UESRPG.Empty.unnamedCharacter');
    }

    return submitData;
  }
}
