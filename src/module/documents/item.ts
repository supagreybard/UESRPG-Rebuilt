import { buildStandardTest } from '../dice';

export class UESRPGItem extends Item {
  buildTest(formula = '1d100'): Roll {
    return buildStandardTest(formula);
  }
}
