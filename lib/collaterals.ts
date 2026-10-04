/**
 * Brand collateral copied from /images_collateral → /public/collaterals (renamed to URL-safe slugs).
 * `focus` is the object-position that keeps the subject in frame when cropped.
 */
export type Collateral = {
  src: string;
  width: number;
  height: number;
  alt: string;
  focus: string;
};

const img = (file: string, width: number, height: number, alt: string, focus = "50% 50%"): Collateral => ({
  src: `/collaterals/${file}`,
  width,
  height,
  alt,
  focus,
});

export const collaterals = {
  // cedersuff.png
  truck: img("cedersuff.png", 1672, 941, "CEDERSUFF Movers truck parked on a Toronto street at sunset with the CN Tower behind", "58% 50%"),
  // cedersuff_cleaner.png
  cleaning: img("cedersuff_cleaner.png", 1672, 941, "CEDERSUFF team cleaning a downtown Toronto office with skyline views", "22% 40%"),
  // cedersuff_staff.png
  team: img("cedersuff_staff.png", 1122, 1402, "CEDERSUFF team member in a branded polo standing beside the moving truck", "45% 30%"),
  // Team—group_shot.png
  teamGroup: img("team-group.png", 1672, 941, "The CEDERSUFF moving team standing in front of the branded truck in Toronto", "50% 40%"),
  // Residential move — interior.png
  residential: img("residential-move-interior.png", 1536, 1024, "Two CEDERSUFF movers carrying a sofa through a Toronto condo", "45% 45%"),
  // Packing_service.png
  packing: img("packing-service.png", 1536, 1024, "A CEDERSUFF team member wrapping a ceramic vase in bubble wrap", "50% 50%"),
  // Commercial_office_move.png
  officeMove: img("commercial-office-move.png", 2048, 768, "CEDERSUFF movers moving boxes and office chairs through a corporate lobby", "50% 50%"),
  // Long-distance_move—truck_on_highway.png
  longDistance: img("long-distance-truck.png", 1916, 821, "CEDERSUFF Movers truck driving on an Ontario highway at sunrise", "55% 50%"),
  // Storage.png
  storage: img("storage.png", 1672, 941, "CEDERSUFF branded box on a dolly in a clean storage warehouse", "35% 55%"),
  // Commercial_cleaning—office.png
  cleaningOffice: img("cleaning-office.png", 1916, 821, "CEDERSUFF cleaning team working in a bright open-plan Toronto office", "30% 45%"),
  // Commercial_cleaning—church_interior.png
  cleaningChurch: img("cleaning-church.png", 1916, 821, "CEDERSUFF cleaning team cleaning pews and floors in a church sanctuary", "50% 50%"),
  // Cleaned_space—before:after_style.png
  beforeAfter: img("cleaned-space-before-after.png", 1672, 941, "Before and after: a messy office floor next to the same space after a CEDERSUFF clean", "50% 50%"),
} satisfies Record<string, Collateral>;

/** Every collateral that shows real work — used by the homepage showcase gallery. */
export const galleryImages: Collateral[] = [
  collaterals.truck,
  collaterals.teamGroup,
  collaterals.residential,
  collaterals.packing,
  collaterals.officeMove,
  collaterals.longDistance,
  collaterals.storage,
  collaterals.cleaningOffice,
  collaterals.cleaningChurch,
  collaterals.beforeAfter,
  collaterals.team,
  collaterals.cleaning,
];
