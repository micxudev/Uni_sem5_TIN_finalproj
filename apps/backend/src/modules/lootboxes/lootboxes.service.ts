import {db} from "@db/db.connection";
import {lootboxesRepository} from "@modules/lootboxes/lootboxes.repository";
import {User} from "@modules/users/user.domain";
import {SkinOwnership} from "@modules/skin-ownership/skin-ownership.domain";
import * as skinOwnershipMapper from "@modules/skin-ownership/skin-ownership.mapper";
import {LootboxCooldownError} from "@errors/errors.lootbox-cooldown";
import {UnexpectedError} from "@errors/errors.general";

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

        return skinOwnershipMapper.toDomain(skinOwnership);
    });
}

export const lootboxesService = {
    open
};