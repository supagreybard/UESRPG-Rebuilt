import { UESRPGActor } from './actor';
import { UESRPGItem } from './item';

export function registerDocumentClasses(): void {
  CONFIG.Actor.documentClass = UESRPGActor as typeof Actor;
  CONFIG.Item.documentClass = UESRPGItem as typeof Item;

  Object.assign(Actor.prototype, {
    buildTest: UESRPGActor.prototype.buildTest,
    test: UESRPGActor.prototype.test,
  });

  Object.assign(Item.prototype, {
    buildTest: UESRPGItem.prototype.buildTest,
  });
}
