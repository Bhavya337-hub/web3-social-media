import { http, createConfig } from '@wagmi/core'
import { localhost } from '@wagmi/core/chains'

// const projectId = "6083a3130b777c8b1a007c01b8205a2d";

export const config = createConfig({
  chains: [localhost],
  transports: {
    [localhost.id] : http("http://localhost:8545")
  }
})