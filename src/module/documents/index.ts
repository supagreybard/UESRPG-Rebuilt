import { UesrpgActor } from './UesrpgActor';
import { UesrpgItem } from './UesrpgItem';

export function registerDocumentClasses(): void {
  CONFIG.Actor.documentClass = UesrpgActor as typeof Actor;
  CONFIG.Item.documentClass = UesrpgItem as typeof Item;

  Object.assign(Actor.prototype, {
    buildTest: UesrpgActor.prototype.buildTest,
    getResolvedTraits: UesrpgActor.prototype.getResolvedTraits,
    getTraitInstances: UesrpgActor.prototype.getTraitInstances,
    getTraitValue: UesrpgActor.prototype.getTraitValue,
    hasTrait: UesrpgActor.prototype.hasTrait,
    test: UesrpgActor.prototype.test,
  });

  Object.assign(Item.prototype, {
    buildTest: UesrpgItem.prototype.buildTest,
  });
}
