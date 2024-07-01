import { Button } from './Button'
import { Logo as MetaplexLogo } from './products/global/Logo'
import DiscordLogo from '@/images/logos/discord-mark-white.png'
import GithubLogo from '@/images/logos/github-mark-white.png'
import XLogo from '@/images/logos/x-black.png'

const Footer = () => {
  return (
    <footer className="m-auto flex w-full justify-between border-t border-neutral-200 dark:border-neutral-800 py-8">
      <div className=" m-auto flex w-full max-w-[1200px] justify-between text-neutral-600">
        <div className="flex flex-col gap-2">
          <div className="flex">
            <MetaplexLogo className="h-8 w-8" />
            <div className="ml-4 flex flex-1 flex-col justify-center text-left">
              <div className="text-sm font-medium leading-none text-slate-800 dark:text-white">
                Metaplex
              </div>
              <div className="mt-1 text-sm leading-none text-slate-500 dark:text-slate-400">
                Developer Hub
              </div>
            </div>
          </div>
          <div>Programs and Tools</div>
          <div>Guides</div>
        </div>
        <div className="flex gap-4 h-10">
          <Button className="flex gap-4 bg-neutral-950 text-white transition-colors hover:bg-neutral-700">
            <img src={GithubLogo.src} alt="Github" className="h-6 w-6" />
            Github
          </Button>
          <Button className="flex gap-4  bg-indigo-600 text-white transition-colors hover:bg-indigo-700">
            <img src={DiscordLogo.src} alt="Discord" className="h-6" />
            Discord
          </Button>
          <Button className="flex gap-4  bg-neutral-950 text-white transition-colors hover:bg-neutral-700">
            <img src={XLogo.src} alt="X" className="h-6 invert" />
            @metaplex
          </Button>
        </div>
        <div>
          <div>
            <ul className="flex flex-col gap-2">
              <li>Security</li>
              <li>Official Links</li>
              <li>Protocol Fees</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
