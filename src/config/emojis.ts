/**
 * A collection of emojis used for various statuses and symbols.
 * Each property represents a string value corresponding to an emoji symbol in Discord format,
 * for example, the emoji ⭐ is :star:
 */
export const Emojis = {
  success: ':white_check_mark:',
  error: ':x:',
  loading: ':hourglass:',
  info: ':bulb:',
  ghost: ':ghost:',
  star: ':star:',
  statics: ':bar_chart:',
  map: ':map:',
  package: ':package:',
  envelope_with_arrow: ':envelope_with_arrow:',
  speech_balloon: ':speech_balloon:',
  link: ':link:',
  ping_pong: ':ping_pong:',
  robot: ':robot:',
  globe: ':globe_with_meridians:',
  satellite: ':satellite:',
  flash: ':zap:',
  crossed_flags: ':crossed_flags:',
  tv: ':tv:',
  clapper: ':clapper:',
  frame_photo: ':frame_photo:',
  white_sun_small_cloud: ':white_sun_small_cloud:',
  date: ':date:',
  book: ':book:',
  books: ':books:',
  busts_in_silhouette: ':busts_in_silhouette:',
  crown: ':crown:',
  desktop: ':desktop:',
  bust_in_silhouette: ':bust_in_silhouette:',
  id: ':id:',
  label: ':label:',
  performing_arts: ':performing_arts:',
  inbox_tray: ':inbox_tray:',
  rocket: ':rocket:',
  tools: ':tools:',
  handshake: ':handshake:',
  tada: ':tada:',
  lady_beetle: ':lady_beetle:',
  bug: ':bug:',
  hammer: ':hammer:',
  shield: ':shield:',
  broom: ':broom:',
  boot: ':boot:',
  recycle: ':recycle:',
  bulb: ':bulb:',
  thumbsup: '👍',
  thumbsdown: '👎',
};

/**
 * The object contains nested categories as keys, with each key mapping to subcategories or specific emoji definitions.
 * Each emoji definition includes a string representing the corresponding emoji identifier.
 */
export const CustomEmojis = {
  badges: {
    ActiveDeveloper: '<:ActiveDeveloper:1424515925641793546>',
    BotHTTPInteractions: '<:BotHTTPInteractions:1424515923313692825>',
    BugHunterLevel1: '<:BugHunterLevel1:1424515910055497728>',
    BugHunterLevel2: '<:BugHunterLevel2:1424515932318990516>',
    CertifiedModerator: '<:CertifiedModerator:1424515907916533851>',
    Collaborator: '<:Collaborator:1424515921103290461>',
    DisablePremium: '<:DisablePremium:1424515902933827735>',
    HasUnreadUrgentMessages: '<:HasUnreadUrgentMessages:1424516390471209000>',
    Hypesquad: '<:Hypesquad:1424515935477301268>',
    HypeSquadOnlineHouse1: '<:HypeSquadOnlineHouse1:1424515917546651869>',
    HypeSquadOnlineHouse2: '<:HypeSquadOnlineHouse2:1424515919413248101>',
    HypeSquadOnlineHouse3: '<:HypeSquadOnlineHouse3:1424515912551239741>',
    MFASMS: '<:MFASMS:1424516741710614739>',
    Partner: '<:Partner:1424515915009232977>',
    PremiumEarlySupporter: '<:PremiumEarlySupporter:1424515938535084083>',
    PremiumPromoDismissed: '<:PremiumPromoDismissed:1424516871159287808>',
    Quarantined: '<:Quarantined:1424515905332707369>',
    RestrictedCollaborator: '<:RestrictedCollaborator:1424516949802619061>',
    Spammer: '<:Spammer:1424515928317624330>',
    Staff: '<:Staff:1424515930083430450>',
    TeamPseudoUser: '<:TeamPseudoUser:1424517048326951056>',
    VerifiedBot: '<:VerifiedBot:1424515942913671248>',
    VerifiedDeveloper: '<:VerifiedDeveloper:1424516021607465013>',
  },
  status: {
    online: '<:online:1424523379368656896>',
    idle: '<:idle:1424523371974099015>',
    dnd: '<:dnd:1424523376512335996>',
    offline: '<:offline:1424523374276640838>',
  },
};

/**
 * A mapping of user badge identifiers to their corresponding custom emoji representations.
 *
 * This object is used to associate predefined badge types with custom emojis, allowing for dynamic
 * and easy badge management and display.
 *
 * Key-Value Structure:
 * - Key: A string identifier representing a specific user badge.
 * - Value: A string containing the custom emoji associated with the badge.
 */
export const userBadgesMap: Record<string, string> = {
  // User is an Active Developer.
  ActiveDeveloper: CustomEmojis.badges.ActiveDeveloper,
  // Bot uses only HTTP interactions.
  BotHTTPInteractions: CustomEmojis.badges.BotHTTPInteractions,
  // Bug Hunter Level 1.
  BugHunterLevel1: CustomEmojis.badges.BugHunterLevel1,
  // Bug Hunter Level 2.
  BugHunterLevel2: CustomEmojis.badges.BugHunterLevel2,
  // Moderator Programs Alumni.
  CertifiedModerator: CustomEmojis.badges.CertifiedModerator,
  // Discord does not document this user flag.
  Collaborator: CustomEmojis.badges.Collaborator,
  // Discord does not document this user flag.
  DisablePremium: CustomEmojis.badges.DisablePremium,
  // Discord does not document this user flag.
  HasUnreadUrgentMessages: CustomEmojis.badges.HasUnreadUrgentMessages,
  // HypeSquad Events Member.
  Hypesquad: CustomEmojis.badges.Hypesquad,
  // House Bravery Member.
  HypeSquadOnlineHouse1: CustomEmojis.badges.HypeSquadOnlineHouse1,
  // House Brilliance Member.
  HypeSquadOnlineHouse2: CustomEmojis.badges.HypeSquadOnlineHouse2,
  // House Balance Member.
  HypeSquadOnlineHouse3: CustomEmojis.badges.HypeSquadOnlineHouse3,
  // Discord does not document this user flag.
  MFASMS: CustomEmojis.badges.MFASMS,
  // Partnered Server Owner.
  Partner: CustomEmojis.badges.Partner,
  // Early Nitro Supporter.
  PremiumEarlySupporter: CustomEmojis.badges.PremiumEarlySupporter,
  // Discord does not document this user flag.
  PremiumPromoDismissed: CustomEmojis.badges.PremiumPromoDismissed,
  // The user's account has been quarantined due to recent activity.
  Quarantined: CustomEmojis.badges.Quarantined,
  // Discord does not document this user flag.
  RestrictedCollaborator: CustomEmojis.badges.RestrictedCollaborator,
  // User has been identified as spammer.
  Spammer: CustomEmojis.badges.Spammer,
  // Discord Employee.
  Staff: CustomEmojis.badges.Staff,
  // User is a team.
  TeamPseudoUser: CustomEmojis.badges.TeamPseudoUser,
  // Verified Bot.
  VerifiedBot: CustomEmojis.badges.VerifiedBot,
  // Early Verified Bot Developer.
  VerifiedDeveloper: CustomEmojis.badges.VerifiedDeveloper,
};

/**
 * An object representing the status of users with corresponding custom emoji values.
 * Each key represents a user status, and its value is the respective custom emoji.
 *
 * Keys:
 * - `online`: Represents the online status.
 * - `idle`: Represents the idle status.
 * - `dnd`: Represents the "do not disturb" status.
 * - `offline`: Represents the offline status.
 *
 * Values:
 * The values are custom emojis defined in the `CustomEmojis` object.
 */
export const statusMap: Record<string, string> = {
  online: CustomEmojis.status.online,
  idle: CustomEmojis.status.idle,
  dnd: CustomEmojis.status.dnd,
  offline: CustomEmojis.status.offline,
};
