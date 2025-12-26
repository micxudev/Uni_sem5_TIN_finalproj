import {db} from "@db";
import {lootboxesRepository} from "@modules/lootboxes";
import {User} from "@modules/users";
import {SkinOwnership, toDomain} from "@modules/skin-ownership";
import {LootboxCooldownError, UnexpectedError} from "@errors";

const LOOTBOX_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour in ms

async function open(opener: User): Promise<SkinOwnership> {
    const now = Date.now();

    return db.transaction<SkinOwnership>(async () => {
        // 1. Cooldown
        const lastOpenedAt = await lootboxesRepository.getLastLootboxOpenedAt(opener.id);
        if (lastOpenedAt) {
            const lastOpen = new Date(lastOpenedAt).getTime();
            const passedMs = now - lastOpen;

            if (passedMs < LOOTBOX_COOLDOWN_MS)
                throw new LootboxCooldownError(LOOTBOX_COOLDOWN_MS - passedMs);
        }

        // 2. Pick random skin
        const skin = await lootboxesRepository.getRandomSkin();
        if (!skin) throw new UnexpectedError("DB is empty, cannot get random skin");

        // 3. Grant ownership
        const skinOwnership = await lootboxesRepository.grantSkin(opener.id, skin.id);

        // 4. Update last open time
        const updated = await lootboxesRepository.updateLastLootboxOpenedAt(opener.id);
        if (!updated) throw new UnexpectedError("Cannot update last open time");

        return toDomain(skinOwnership);
    });
}

export const lootboxesService = {
    open
};