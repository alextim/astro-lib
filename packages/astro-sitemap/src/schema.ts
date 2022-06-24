import { z } from 'zod';
import { EnumChangefreq as ChangeFreq, EnumYesNo, EnumAllowDeny } from 'sitemap';
import { SITEMAP_CONFIG_DEFAULTS } from './config-defaults';

const priceValues = ['rent', 'purchase', 'RENT', 'PURCHASE'] as const;
const resolutionValues = ['HD', 'hd', 'sd', 'SD'] as const;

const localeKeySchema = z.string().min(1);

const changefreqSchema = z.nativeEnum(ChangeFreq).optional();
const lastmodSchema = z.date().optional();
const prioritySchema = z.number().min(0).max(1).optional();

const yesNoSchema = z.nativeEnum(EnumYesNo);

/**
 * https://support.google.com/webmasters/answer/74288?hl=en&ref_topic=4581190
 */
const newsItemSchema = z.object({
  access: z.enum(['Registration', 'Subscription']).optional(),
  publication: z.object({
    name: z.string().min(1),
    /**
     * The `<language>` is the language of your publication. Use an ISO 639
     * language code (2 or 3 letters).
     */
    language: z.string().min(2),
  }),
  /**
   * @example 'PressRelease, Blog'
   */
  genres: z.string().optional(),
  /**
   * Article publication date in W3C format, using either the "complete date" (YYYY-MM-DD) format or the "complete date
   * plus hours, minutes, and seconds"
   */
  publication_date: z.string().length(10),
  /**
   * The title of the news article
   * @example 'Companies A, B in Merger Talks'
   */
  title: z.string().min(1),
  /**
   * @example 'business, merger, acquisition'
   */
  keywords: z.string().optional(),
  /**
   * @example 'NASDAQ:A, NASDAQ:B'
   */
  stock_tickers: z.string().optional(),
});

/**
 * Sitemap Image
 * https://support.google.com/webmasters/answer/178636?hl=en&ref_topic=4581190
 */
const imgSchema = z.object({
  /**
   * The URL of the image
   * @example 'https://example.com/image.jpg'
   */
  url: z.string().min(1),
  /**
   * The caption of the image
   * @example 'Thanksgiving dinner'
   */
  caption: z.string().optional(),
  /**
   * The title of the image
   * @example 'Star Wars EP IV'
   */ title: z.string().optional(),
  /**
   * The geographic location of the image.
   * @example 'Limerick, Ireland'
   */
  geoLocation: z.string().optional(),
  /**
   * A URL to the license of the image.
   * @example 'https://example.com/license.txt'
   */
  license: z.string().optional(),
});

/**
 * Sitemap video. <https://support.google.com/webmasters/answer/80471?hl=en&ref_topic=4581190>
 */
const videoItemSchema = z.object({
  /**
   * A URL pointing to the video thumbnail image file
   * @example "https://rtv3-img-roosterteeth.akamaized.net/store/0e841100-289b-4184-ae30-b6a16736960a.jpg/sm/thumb3.jpg"
   */
  thumbnail_loc: z.string().url(),
  /**
   * The title of the video
   * @example '2018:E6 - GoldenEye: Source'
   */
  title: z.string().min(1),
  /**
   * A description of the video. Maximum 2048 characters.
   * @example 'We play gun game in GoldenEye: Source with a good friend of ours. His name is Gruchy. Dan Gruchy.'
   */
  description: z.string().min(1),
  /**
   * A URL pointing to the actual video media file. Should be one of the supported formats. HTML is not a supported
   * format. Flash is allowed, but no longer supported on most mobile platforms, and so may be indexed less well. Must
   * not be the same as the `<loc>` URL.
   * @example "http://streamserver.example.com/video123.mp4"
   */
  content_loc: z.string().url().optional(),
  /**
   * A URL pointing to a player for a specific video. Usually this is the information in the src element of an `<embed>`
   * tag. Must not be the same as the `<loc>` URL
   * @example "https://roosterteeth.com/embed/rouletsplay-2018-goldeneye-source"
   */
  player_loc: z.string().url().optional(),
  /**
   * A string the search engine can append as a query param to enable automatic
   * playback. Equivilant to auto play attr on player_loc tag.
   * @example 'ap=1'
   */
  'player_loc:autoplay': z.string().optional(),
  /**
   * Whether the search engine can embed the video in search results. Allowed values are yes or no.
   */
  'player_loc:allow_embed': yesNoSchema.optional(),
  /**
   * The length of the video in seconds
   * @example 600
   */
  duration: z.number().nonnegative().int().optional(),
  /**
   * The date after which the video will no longer be available.
   * @example "2012-07-16T19:20:30+08:00"
   */
  expiration_date: z.string().optional(),
  /**
   * The number of times the video has been viewed
   */
  view_count: z.number().nonnegative().int().optional(),
  /**
   * The date the video was first published, in W3C format.
   * @example "2012-07-16T19:20:30+08:00"
   */
  publication_date: z.string().optional(),
  /**
   * A short description of the broad category that the video belongs to. This is a string no longer than 256 characters.
   * @example Baking
   */
  category: z.string().optional(),
  /**
   * Whether to show or hide your video in search results from specific countries.
   * @example "IE GB US CA"
   */
  restriction: z.string().min(2).optional(),
  /**
   * Whether the countries in restriction are allowed or denied
   * @example 'deny'
   */
  'restriction:relationship': z.nativeEnum(EnumAllowDeny).optional(),
  gallery_loc: z.string().optional(),
  /**
   * [Optional] Specifies the URL of a webpage with additional information about this uploader. This URL must be in the same domain as the <loc> tag.
   * @see https://developers.google.com/search/docs/advanced/sitemaps/video-sitemaps
   * @example http://www.example.com/users/grillymcgrillerson
   */
  'uploader:info': z.string().url().optional(),
  'gallery_loc:title': z.string().optional(),
  /**
   * The price to download or view the video. Omit this tag for free videos.
   * @example "1.99"
   */
  price: z.string().optional(),
  /**
   * Specifies the resolution of the purchased version. Supported values are hd and sd.
   * @example "HD"
   */
  'price:resolution': z.enum(resolutionValues).optional(),
  /**
   * Specifies the currency in ISO4217 format.
   * @example "USD"
   */
  'price:currency': z.string().length(3).optional(),
  /**
   * Specifies the purchase option. Supported values are rend and own.
   * @example "rent"
   */
  'price:type': z.enum(priceValues).optional(),
  /**
   * The video uploader's name. Only one <video:uploader> is allowed per video. String value, max 255 characters.
   * @example "GrillyMcGrillerson"
   */
  uploader: z.string().optional(),
  /**
   * Whether to show or hide your video in search results on specified platform types. This is a list of space-delimited
   * platform types. See <https://support.google.com/webmasters/answer/80471?hl=en&ref_topic=4581190> for more detail
   * @example "tv"
   */
  platform: z.string().optional(),
  id: z.string().optional(),
  'platform:relationship': z.nativeEnum(EnumAllowDeny).optional(),

  /**
   * An arbitrary string tag describing the video. Tags are generally very short descriptions of key concepts associated
   * with a video or piece of content.
   * @example ['Baking']
   */
  tag: z.string().or(z.string().array()).optional(),
  /**
   * The rating of the video. Supported values are float numbers.
   * @example 2.5
   */
  rating: z.string().or(z.number().nonnegative()).optional(),
  family_friendly: z.boolean().or(yesNoSchema).optional(),
  /**
   * Indicates whether a subscription (either paid or free) is required to view
   * the video. Allowed values are yes or no.
   */
  requires_subscription: z.boolean().or(yesNoSchema).optional(),
  /**
   * Indicates whether the video is a live stream. Supported values are yes or no.
   */
  live: z.boolean().or(yesNoSchema).optional(),
});

export const SitemapOptionsSchema = z
  .object({
    canonicalURL: z.string().url().optional(),

    filter: z.function().args(z.string()).returns(z.boolean()).optional(),

    exclude: z.string().min(1).array().optional(),

    customPages: z.string().url().array().optional(),

    i18n: z
      .object({
        defaultLocale: localeKeySchema,
        locales: z.record(
          localeKeySchema,
          z
            .string()
            .min(2)
            .regex(/^[a-zA-Z\-]+$/gm, {
              message: 'Only English alphabet symbols and hyphen allowed',
            }),
        ),
      })
      .refine((val) => !val || val.locales[val.defaultLocale], {
        message: '`defaultLocale` must exist in `locales` keys',
      })
      .optional(),

    entryLimit: z.number().nonnegative().optional().default(SITEMAP_CONFIG_DEFAULTS.entryLimit),

    lastmodDateOnly: z.boolean().optional().default(SITEMAP_CONFIG_DEFAULTS.xmlns.lastmodDateOnly),

    xslUrl: z.string().url().optional(),

    xmlns: z
      .object({
        xhtml: z.boolean().optional().default(SITEMAP_CONFIG_DEFAULTS.xmlns.xhtml),
        news: z.boolean().optional().default(SITEMAP_CONFIG_DEFAULTS.xmlns.news),
        image: z.boolean().optional().default(SITEMAP_CONFIG_DEFAULTS.xmlns.image),
        video: z.boolean().optional().default(SITEMAP_CONFIG_DEFAULTS.xmlns.video),
        custom: z.string().min(1).array().nonempty().optional(),
      })
      .optional()
      .default(SITEMAP_CONFIG_DEFAULTS.xmlns),

    customItems: z
      .object({
        url: z.string().url(),
        changefreq: changefreqSchema,
        lastmod: lastmodSchema,
        priority: prioritySchema,
        links: z
          .object({
            url: z.string().url(),
            lang: z.string().min(2),
            hreflang: z.string().min(2).optional(),
          })
          .array()
          .optional(),
        img: z.string().min(1).or(z.string().min(1).array()).or(imgSchema).or(imgSchema.array()).optional(),
        news: newsItemSchema.optional(),
        video: videoItemSchema.or(videoItemSchema.array()).optional(),
      })
      .array()
      .optional(),

    serialize: z.function().args(z.any()).returns(z.any()).optional(),

    changefreq: changefreqSchema,
    lastmod: lastmodSchema,
    priority: prioritySchema,

    createLinkInHead: z.boolean().optional().default(SITEMAP_CONFIG_DEFAULTS.createLinkInHead),
  })
  .strict()
  .default(SITEMAP_CONFIG_DEFAULTS);
