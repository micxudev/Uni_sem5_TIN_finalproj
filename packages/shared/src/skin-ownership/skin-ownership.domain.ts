import {SkinOwnershipSource} from "./skin-ownership-source";
import {Skin} from "../skins/skin.domain";

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