import { CourtStatus, LOCATION, TimeTableId } from './types/klspef';

type Config = {
  EMAIL_AUTH: { USER: string; PASSWORD: string };
  MAIN_RECIPIENT: string;
  CC_RECIPIENTS: string[];
  KLSPEF: {
    LOCATIONS: readonly LOCATION[];
    LOCATION_IDS: Record<number, LOCATION>;
    TIME_IDS: Record<LOCATION, number>;
    TIME_TABLE_IDS: TimeTableId;
    COURT_STATUS: CourtStatus;
  };
};

export const config: Config = {
  EMAIL_AUTH: {
    USER: 'jeffdevslife@gmail.com',
    PASSWORD: process.env.GMAIL_APP_PASSWORD,
  },
  MAIN_RECIPIENT: 'jeffdevslife@gmail.com',
  CC_RECIPIENTS: ['jasonyeep97@gmail.com'],
  KLSPEF: {
    LOCATIONS: ['IBU_KOTA', 'PUSAT_KOMUNITI_GOMBAK', 'TAMAN_MELATI_IMPIAN', 'DESA_REJANG', 'AIR_PANAS', 'SEMARAK'],
    LOCATION_IDS: {
      4: 'IBU_KOTA',
      17: 'PUSAT_KOMUNITI_GOMBAK',
      19: 'TAMAN_MELATI_IMPIAN',
      57: 'DESA_REJANG',
      62: 'AIR_PANAS',
      75: 'SEMARAK',
    },
    TIME_IDS: {
      IBU_KOTA: 97,
      PUSAT_KOMUNITI_GOMBAK: 626,
      TAMAN_MELATI_IMPIAN: 652,
      DESA_REJANG: 2009,
      AIR_PANAS: 2269,
      SEMARAK: 2714,
    },
    TIME_TABLE_IDS: {
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
    },
    COURT_STATUS: {
      BOOKED: '3',
      NOT_AVAILABLE: 0,
      AVAILABLE_LABEL_1: '',
      AVAILABLE_LABEL_2: null,
    },
  },
};
