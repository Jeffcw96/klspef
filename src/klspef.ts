type LOCATION =
  | "IBU_KOTA"
  | "PUSAT_KOMUNITI_GOMBAK"
  | "TAMAN_MELATI_IMPIAN"
  | "DESA_REJANG"
  | "AIR_PANAS"
  | "SEMARAK";

type TimeTableId = {
  [key in LOCATION]: {
    COURT_1: number;
    COURT_2: number;
    COURT_3: number;
  };
};

const LOCATIONS: readonly LOCATION[] = [
  "IBU_KOTA",
  "PUSAT_KOMUNITI_GOMBAK",
  "TAMAN_MELATI_IMPIAN",
  "DESA_REJANG",
  "AIR_PANAS",
  "SEMARAK",
] as const;

// Get the location id, 6-8pm ids
const LOCATION_ID: Record<LOCATION, number> = {
  IBU_KOTA: 4,
  PUSAT_KOMUNITI_GOMBAK: 17,
  TAMAN_MELATI_IMPIAN: 19,
  DESA_REJANG: 57,
  AIR_PANAS: 62,
  SEMARAK: 75,
};

/**
 * Note: The Time id will be same per location, for example: time id in 6-8pm for court 1 and 2 will be the same
 */

// These variable stores all 6-8pm time id per location
const TIME_ID: Record<LOCATION, number> = {
  IBU_KOTA: 97,
  PUSAT_KOMUNITI_GOMBAK: 626,
  TAMAN_MELATI_IMPIAN: 652,
  DESA_REJANG: 2009,
  AIR_PANAS: 2269,
  SEMARAK: 2714,
};

// This object store all court id from court 1 to 3
const TIME_TABLE_ID: TimeTableId = {
  IBU_KOTA: {
    COURT_1: 27,
    COURT_2: 28,
    COURT_3: 29,
  },
  PUSAT_KOMUNITI_GOMBAK: {
    COURT_1: 97,
    COURT_2: 98,
    COURT_3: 99,
  },
  TAMAN_MELATI_IMPIAN: {
    COURT_1: 103,
    COURT_2: 104,
    COURT_3: 105,
  },
  DESA_REJANG: {
    COURT_1: 250,
    COURT_2: 253,
    COURT_3: 254,
  },
  AIR_PANAS: {
    COURT_1: 282,
    COURT_2: 283,
    COURT_3: 284,
  },
  SEMARAK: {
    COURT_1: 346,
    COURT_2: 359,
    COURT_3: 360,
  },
};

const COURT_STATUS = {
  BOOKED: "3",
  AVAILABLE: null,
  NOT_AVAILABLE: 0,
};