import { UesrpgActor } from './UesrpgActor';
import { UesrpgItem } from './UesrpgItem';

export function registerDocumentClasses(): void {
  CONFIG.Actor.documentClass = UesrpgActor as typeof Actor;
  CONFIG.Item.documentClass = UesrpgItem as typeof Item;

  Object.assign(Actor.prototype, {
    buildTest: UesrpgActor.prototype.buildTest,
    dispatchTraitEvent: UesrpgActor.prototype.dispatchTraitEvent,
    getResolvedTraitEvents: UesrpgActor.prototype.getResolvedTraitEvents,
    getResolvedTraits: UesrpgActor.prototype.getResolvedTraits,
    getTraitsForEvent: UesrpgActor.prototype.getTraitsForEvent,
    getTraitInstances: UesrpgActor.prototype.getTraitInstances,
    hasTrait: UesrpgActor.prototype.hasTrait,
    hasTraitForEvent: UesrpgActor.prototype.hasTraitForEvent,
    test: UesrpgActor.prototype.test,
  });

  Object.assign(Item.prototype, {
    buildTest: UesrpgItem.prototype.buildTest,
  });
}
