import {SkinOwnershipSource} from "@modules/skin-ownership";
import {Skin} from "@modules/skins";

/**
 * Domain level skin ownership.
 *
 * Used in services, controllers, business logic.
 */
export interface SkinOwnership {
    ownershipId: number;
    source: SkinOwnershipSource;
    obtainedAt: Date;
    skin: Skin;
}