import { QuickLink } from '@/components/QuickLinks'

const Home = () => {
  return (
    <div className="m-auto flex flex-col gap-8">
      {/* <div>
        The Metaplex Developer Hub is a comprehensive resource for developers
        working with the Metaplex Protocol on Solana. It offers extensive
        documentation, tutorials, and tools to facilitate the creation and
        management of decentralized applications and NFTs on Solana. The website
        features API references, SDKs, best practice guidelines, and a community
        forum for collaboration and troubleshooting. Whether you&aposre new tos
        blockchain development or an experienced developer, the Metaplex
        Developer Hub provides the essential resources needed to leverage the
        Metaplex Protocol effectively.
      </div> */}
      {/* <div className="text-4xl">I want to...</div> */}
      <div className="h-[15rem] w-full rounded-xl bg-neutral-800"></div>
      <div className="flex gap-16">
        <div className="w-1/2">
          <div className="text-2xl text-white">LEARN</div>

          <div className="flex flex-col gap-8">
            <QuickLink
              title={'Create an Nft'}
              href={'/guides/create-an-nft'}
              description={
                'Learn how to create and manage NFTs on the Solana blockchain with Metaplex Protocols.'
              }
            />
            <QuickLink
              title={'Create a Token'}
              href={'/guides/create-an-nft'}
              description={
                'Learn how to create and manage NFTs on the Solana blockchain with Metaplex Protocols.'
              }
            />
            <QuickLink
              title={'Integrate Metaplex Programs into My Project'}
              href={'/guides/create-an-nft'}
              description={
                'Learn how to create and manage NFTs on the Solana blockchain with Metaplex Protocols.'
              }
            />
            {/* <div className="flex w-full flex-col gap-4 rounded-xl border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800">
              <div className="flex justify-between">
                <div className="text-xl">Create an NFT</div>
                <ChevronRightIcon className="h-8 w-8" />
              </div>
              <div className="text-sm">
                Learn how to create and manage NFTs on the Solana blockchain
                with Metaplex Protocols.
              </div>
            </div> */}
            {/* <div className="flex w-full flex-col gap-4 rounded-xl border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800">
              <div className="flex justify-between">
                <div className="text-xl">Create a Token</div>
                <ChevronRightIcon className="h-8 w-8" />
              </div>
              <div className="text-sm">
                Learn how to create and manage Solana SPL tokens on the Solana
                blockchain with Metaplex Protocols.
              </div>
            </div> */}
            {/* <div className="flex w-full flex-col gap-4 rounded-xl border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800">
              <div className="flex justify-between">
                <div className="text-xl">
                  Integrate Metaplex Progams into my project
                </div>
                <ChevronRightIcon className="h-8 w-8" />
              </div>
              <div className="text-sm">
                Learn how to create and manage Solana SPL tokens on the Solana
                blockchain with Metaplex Protocols.
              </div>
            </div> */}
          </div>
        </div>

        <div className="w-1/2">
          <div className="text-2xl text-neutral-800 dark:text-white">
            CONNECT
          </div>
          <div className="flex flex-col gap-8">
            <QuickLink
              title={'Join the Metaplex Developer Community'}
              href={'/guides/create-an-nft'}
              description={
                'Come and connect with our Community Developers and interact with other Solana developers.'
              }
            />
            <QuickLink
              title={'Collaborate with other developers'}
              href={'/guides/create-an-nft'}
              description={
                'Come and connect with our Community Developers and interact with other Solana developers.'
              }
            />
            <QuickLink
              title={'Get help and Support from the Community'}
              href={'/guides/create-an-nft'}
              description={
                'Come and connect with our Community Developers and interact with other Solana developers.'
              }
            />
            {/* <div className="flex w-full flex-col gap-4 rounded-xl border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800">
              <div className="flex justify-between">
                <div className="text-xl">
                  Join the Metaplex Developer community
                </div>
                <ChevronRightIcon className="h-8 w-8" />
              </div>
              <div className="text-sm">
              Come and connect with our Community Developers and interact with other Solana developers.
              </div>
            </div> */}
            {/* <div className="flex w-full flex-col gap-4 rounded-xl border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800">
              <div className="flex justify-between">
                <div className="text-xl">Collaborate with other developers</div>
                <ChevronRightIcon className="h-8 w-8" />
              </div>
              <div className="text-sm text-neutral-500">
                Learn how to create and manage NFTs on the Solana blockchain
                with Metaplex Protocols.
              </div>
            </div> */}
            {/* <div className="flex w-full flex-col gap-4 rounded-xl border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800">
              <div className="flex justify-between">
                <div className="text-xl">
                  Get help and support from the community
                </div>
                <ChevronRightIcon className="h-8 w-8" />
              </div>
              <div className="text-sm">
                Learn how to create and manage NFTs on the Solana blockchain
                with Metaplex Protocols.
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
