export type Req<T, K extends keyof T> = {
  [Key in K]: Exclude<T[Key], null>;
};

//  side taken and stake offered
export interface BetPick {
  //  true if "for", false if against
  side: boolean;
  //  maximum stakes offered
  max: number;
}

// odds given
export interface Odds {
  favor: number;
  against: number;
}

// payment receipt
export interface Paid {
  //  timestamp of payment
  when: number;
  // what platform the user paid on
  rail: string;
}

export interface Score {
  won: boolean;
  foul: boolean;
  tab: Paid | null;
}

export interface Wager {
  id: number;
  //  counterparty of bet, @p
  who: string;
  //  description of bet's object/conditions
  race: string;
  //  timestamp of acceptance
  when: number;
  //  side taken
  toss: BetPick | null;
  //  odds
  heat: Odds | null;
  //  outcome, if decided
  game: Score | null;
}

export const fixtures: Wager[] = [
  {
    id: 1,
    who: '~tondes-sitrym',
    race: "Team A vs Team B",
    when: 1648598400,
    toss: { side: true, max: 100 },
    heat: { favor: 2, against: 3 },
    game: { won: true, foul: false, tab: { when: 1648602000, rail: "Stripe" } },
  },

  {
    id: 2,
    who: '~sarpen-laplux',
    race: "Player A vs Player B",
    when: 1648602100,
    toss: { side: false, max: 150 },
    heat: { favor: 1.5, against: 2.5 },
    game: {
      won: false,
      foul: false,
      tab: { when: 1648605700, rail: "PayPal" },
    },
  },

  {
    id: 3,
    race: "Horse A vs Horse B",
    who: '~rovnys-ricfer',
    when: 1648605800,
    toss: { side: true, max: 50 },
    heat: { favor: 1.2, against: 4 },
    game: { won: true, foul: false, tab: { when: 1648609400, rail: "Venmo" } },
  },

  {
    id: 4,
    who: '~dachus-tiprel',
    race: "Car A vs Car B",
    when: 1648609500,
    toss: { side: false, max: 75 },
    heat: { favor: 3, against: 3 },
    game: {
      won: false,
      foul: false,
      tab: { when: 1648613100, rail: "CashApp" },
    },
  },

  {
    id: 5,
    race: "Team C vs Team D",
    who: '~doplyr-harbur',
    when: 1648613200,
    toss: { side: true, max: 200 },
    heat: { favor: 2.5, against: 1.5 },
    game: { won: true, foul: false, tab: { when: 1648616800, rail: "Zelle" } },
  },
];
