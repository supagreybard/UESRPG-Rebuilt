import { createStandardTestMessage } from '../chat';
import { buildStandardTest, performStandardTest } from '../dice';
import {
    getResolvedTraits,
    getTraitInstances,
    getTraitValue,
    hasTrait,
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

    hasTrait(slug: string, qualifier?: string): boolean {
        return hasTrait(this, slug, qualifier);
    }

    getTraitInstances(slug: string) {
        return getTraitInstances(this, slug);
    }

    getTraitValue(slug: string, qualifier?: string): number | null {
        return getTraitValue(this, slug, qualifier);
    }

    getResolvedTraits() {
        return getResolvedTraits(this);
    }
}
