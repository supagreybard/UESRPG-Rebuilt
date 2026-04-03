import { buildStandardTest } from '../dice';

export class UesrpgItem extends Item {
  buildTest(formula = '1d100'): Roll {
    return buildStandardTest(formula);
  }
}
