import type {
    SanityReference,
    SanityKeyedReference,
    SanityAsset,
    SanityImage,
    SanityFile,
    SanityGeoPoint,
    SanityBlock,
    SanityDocument,
    SanityImageCrop,
    SanityImageHotspot,
    SanityKeyed,
    SanityImageAsset,
    SanityImageMetadata,
    SanityImageDimensions,
    SanityImagePalette,
    SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
    SanityReference,
    SanityKeyedReference,
    SanityAsset,
    SanityImage,
    SanityFile,
    SanityGeoPoint,
    SanityBlock,
    SanityDocument,
    SanityImageCrop,
    SanityImageHotspot,
    SanityKeyed,
    SanityImageAsset,
    SanityImageMetadata,
    SanityImageDimensions,
    SanityImagePalette,
    SanityImagePaletteSwatch,
};

/**
 * Property
 *
 *
 */
export interface Property extends SanityDocument {
    _type: "property";

    /**
     * Title — `string`
     *
     *
     */
    title: string;

    /**
     * Description — `string`
     *
     *
     */
    description: string;

    /**
     * Property type — `string`
     *
     *
     */
    propertyType: "house" | "flat";

    /**
     * Beds — `number`
     *
     *
     */
    beds: number;

    /**
     * Bedrooms — `number`
     *
     *
     */
    bedrooms: number;

    /**
     * Price per night — `number`
     *
     *
     */
    pricePerNight: number;

    /**
     * Main Image — `image`
     *
     *
     */
    mainImage: {
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
    };

    /**
     * Images — `array`
     *
     *
     */
    images: Array<SanityKeyed<PropertyImage>>;

    /**
     * Location — `geopoint`
     *
     *
     */
    location: SanityGeoPoint;

    /**
     * Slug — `slug`
     *
     *
     */
    slug: { _type: "slug"; current: string };

    /**
     * ID — `number`
     *
     *
     */
    id: number;

    /**
     * Host — `host`
     *
     *
     */
    host: Person;

    /**
     * Review — `array`
     *
     *
     */
    review: Array<SanityKeyed<Review>>;
}

/**
 * Person
 *
 *
 */
export interface Person extends SanityDocument {
    _type: "person";

    /**
     * Full name — `string`
     *
     * Please follow FirstName lastName format
     */
    fullName?: string;

    /**
     * Photo — `image`
     *
     *
     */
    photo?: {
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
    };

    /**
     * Slug — `slug`
     *
     *
     */
    slug?: { _type: "slug"; current: string };

    /**
     * ID — `number`
     *
     *
     */
    id?: number;
}

export type PropertyImage = {
    _type: "propertyImage";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Caption — `string`
     *
     *
     */
    caption?: string;
};

export type Review = {
    _type: "review";
    /**
     * Review description — `string`
     *
     *
     */
    reviewDescription: string;

    /**
     * Traveller — `traveller`
     *
     *
     */
    traveller: Person;

    /**
     * Rating — `number`
     *
     *
     */
    rating: number;
};

export type Documents = Property | Person;
