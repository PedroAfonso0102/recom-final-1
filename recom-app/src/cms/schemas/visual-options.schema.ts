import { z } from "zod";

export const layoutPresetSchema = z.enum(["default", "compact", "split", "feature", "dense"]);

export const backgroundPresetSchema = z.enum([
  "none",
  "solid-dark",
  "solid-light",
  "industrial-gradient",
  "image-dark-overlay",
  "image-red-overlay",
  "split-dark-image",
  "texture-dark",
  "technical-grid",
]);

export const backgroundPositionSchema = z.enum(["center", "top", "bottom", "left", "right"]);
export const overlayStrengthSchema = z.union([z.literal(20), z.literal(40), z.literal(60), z.literal(80)]);
export const overlayToneSchema = z.enum(["black", "red", "steel", "neutral"]);

export const gridPresetSchema = z.enum([
  "auto",
  "two-columns",
  "three-columns",
  "four-columns",
  "featured-left",
  "featured-first",
  "dense",
  "editorial",
]);

export const gridGapSchema = z.enum(["compact", "normal", "relaxed"]);
export const alignItemsSchema = z.enum(["start", "stretch"]);
export const mobileBehaviorSchema = z.enum(["stack", "carousel", "compact"]);

export const mediaModeSchema = z.enum(["none", "logo", "thumbnail", "cover", "background", "split"]);
export const cardVariantSchema = z.enum(["default", "industrial", "technical", "catalog", "promotion"]);
export const cardDensitySchema = z.enum(["compact", "normal", "relaxed"]);
export const ctaStyleSchema = z.enum(["primary", "secondary", "quiet"]);

export const visualSectionFields = {
  layoutPreset: layoutPresetSchema.default("default").optional(),
  backgroundPreset: backgroundPresetSchema.default("none").optional(),
  backgroundImageUrl: z.string().trim().optional().nullable(),
  backgroundPosition: backgroundPositionSchema.default("center").optional(),
  overlayStrength: overlayStrengthSchema.default(60).optional(),
  overlayTone: overlayToneSchema.default("black").optional(),
  textureEnabled: z.boolean().default(false).optional(),
};

export const visualGridFields = {
  gridPreset: gridPresetSchema.default("auto").optional(),
  gridGap: gridGapSchema.default("normal").optional(),
  alignItems: alignItemsSchema.default("stretch").optional(),
  mobileBehavior: mobileBehaviorSchema.default("stack").optional(),
};

export const visualCardFields = {
  mediaMode: mediaModeSchema.default("none").optional(),
  imagePosition: backgroundPositionSchema.default("center").optional(),
  cardVariant: cardVariantSchema.default("default").optional(),
  cardDensity: cardDensitySchema.default("normal").optional(),
  ctaStyle: ctaStyleSchema.default("primary").optional(),
};

