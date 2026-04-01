import { createStandardTestMessage } from '../chat';
import { buildStandardTest, performStandardTest } from '../dice';

export class UESRPGActor extends Actor {
  buildTest(): Roll {
    return buildStandardTest();
  }

  async test(targetNumber: number) {
    const result = await performStandardTest({
      targetNumber,
      test: this.buildTest(),
    });

    await createStandardTestMessage({
      document: this,
      result,
    });

    return result;
  }

  buildInitiativeRoll(): Roll {
    return new Roll('1d100');
  }
}
