import { Favorite } from "../entities/favorite.entity";

export class CreateFavoriteDto extends Favorite {
    city: string;
    country: string;
    userId: string;
}
