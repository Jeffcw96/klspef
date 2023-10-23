import { config } from "../config";

export type KlspefRawPayload = {
  IDTIME: number;
  TIMEPLAYTABLE: string;
  IDCOURT: number;
  NAMECOURT: string;
  CHARGE: number | null;
  REFERRENCENUM: number | null;
  IDACTV: number;
  TYPEACTV: number | null;
  IDLOCATION: number;
  NAMELOCATION: string;
  USEPLAYDATE: null;
  IDPLAYTIME: null;
  PLAYTIME: null;
  BOOKDATE: null;
  BOOKTIME: null;
  PAIDSTATUS: "";
  STATUS: "";
  PAIDAMOUNT: null;
  COURTRATE: 8;
};

export type KlspefMappedPayload = Record<
  number,
  Array<{
    name: string;
    timeId: number;
    locationId: number;
    courtId: number;
    courtLabel: string;
    statusId: string;
    statusLabel: string;
  }>
>;

export type LOCATION =
  | "IBU_KOTA"
  | "PUSAT_KOMUNITI_GOMBAK"
  | "TAMAN_MELATI_IMPIAN"
  | "DESA_REJANG"
  | "AIR_PANAS"
  | "SEMARAK";

export type TimeTableId = {
  [key in LOCATION]: {
    COURT_1: number;
    COURT_2: number;
    COURT_3: number;
  };
};

export type CourtStatus = {
  BOOKED: "3";
  AVAILABLE: null;
  NOT_AVAILABLE: 0;
  LOCATION_NOT_AVAILABLE: "";
};
