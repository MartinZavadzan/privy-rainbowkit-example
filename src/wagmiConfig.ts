import { toPrivyWallet } from "@privy-io/cross-app-connect/rainbow-kit";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import {
  metaMaskWallet,
  walletConnectWallet,
  phantomWallet,
  rabbyWallet,
} from "@rainbow-me/rainbowkit/wallets";

const rainbowKitWallets = [
  metaMaskWallet,
  walletConnectWallet,
  rabbyWallet,
  phantomWallet,
];

const privyWallet = toPrivyWallet({
  id: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  name: "Privy Wallet",
  iconUrl: "",
});

const connectors = connectorsForWallets(
  [
    {
      groupName: "Wallets",
      wallets: [privyWallet, ...rainbowKitWallets],
    },
  ],
  { appName: "EMBR", projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_APP_ID! }
);

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  connectors,
  ssr: true,
});
