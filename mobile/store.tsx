import Urbit from "@urbit/http-api";
import { create } from "zustand";
import { Offer, Wager, Credentials, getId } from "./types";
import produce from "immer";

interface StoreState {
  wagers: {
    [id: string]: Wager;
  };
  offers: {
    [id: string]: Offer;
  };
  api: Urbit | null;
  login: (cred: Credentials) => Promise<void>;
  initialize: () => Promise<void>;
}

const useStore = create<StoreState>((set, get) => ({
  wagers: {},
  offers: {},
  api: undefined,
  login: async (cred) => {
    const api = await Urbit.authenticate({ ...cred, verbose: true });
    set(() => ({ api }));
  },
  initialize: async () => {
    const { api } = get();
    let promise = api.subscribe({
      app: "bet",
      path: "/updates",
      event: (data) => {
        if ("wager" in data) {
          set(
            produce((draft) => {
              draft.wagers[getId(data.wager)] = data.wager;
            })
          );
        } else if ("offer" in data) {
          set(
            produce((draft) => {
              draft.offers[getId(data.offer)] = data.offer;
            })
          );
        }
      },
    });
    const state = await api.scry({
      app: "bet",
      path: "/all",
    });
    set(() => state);
    await promise;
  },
}));

export default useStore;
