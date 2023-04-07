import Urbit from "@uqbar/react-native-api/index";
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
    const formBody = `${encodeURIComponent("password")}=${encodeURIComponent(
      cred.code
    )}`;

    const response = await fetch(`${cred.url}/~/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    });
    const authCookieHeader = response.headers.get("set-cookie") || "";

    const api = new Urbit(cred.url, "", "", cred.ship);
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
