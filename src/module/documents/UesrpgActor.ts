import { createStandardTestMessage } from '../chat';
import { buildStandardTest, performStandardTest } from '../dice';
import {
  dispatchTraitEvent,
  getResolvedTraitEvents,
  getResolvedTraits,
  getTraitsForEvent,
  getTraitInstances,
  hasTrait,
  hasTraitForEvent,
} from '../utils/traits';

export class UesrpgActor extends Actor {
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

  hasTrait(slug: string): boolean {
    return hasTrait(this, slug);
  }

  getTraitInstances(slug?: string) {
    return getTraitInstances(this, slug);
  }

  getTraitsForEvent(event: string) {
    return getTraitsForEvent(this, event);
  }

  hasTraitForEvent(event: string): boolean {
    return hasTraitForEvent(this, event);
  }

  getResolvedTraits() {
    return getResolvedTraits(this);
  }

  getResolvedTraitEvents() {
    return getResolvedTraitEvents(this);
  }

  dispatchTraitEvent<TContext extends Record<string, unknown>>(
    event: string,
    context: TContext,
  ) {
    return dispatchTraitEvent(this, event, context);
  }
}
