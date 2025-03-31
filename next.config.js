/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    ppr: true,
  },
  images: {
    //unoptimized: true,
    minimumCacheTTL: 60,
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "**.allfreechips.com" },
      { protocol: "https", hostname: "radiumpowered.com" },
      { protocol: "http", hostname: "localhost", port: "3000" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/image/slots/sw/sweetie-land4128831.jpg",
        destination: "/image/slots/sw%2Fsweetie-land4128831.jpg",
      },
      {
        source: "/news/:slug/:path",
        destination: "/news/:slug",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/casino-banks/bitcoin",
        destination: "/bitcoin-casinos",
        statusCode: 301,
      },
      {
        source: "/casino-bonus-news/:id(\\d+)/:path*",
        destination: "/article/:id",
        statusCode: 301,
      },
      {
        source: "/casino-bonus-news/:path*",
        destination: "/latest-casino-bonuses/:path*",
        statusCode: 301,
      },
      {
        source: "/phpBB2/",
        destination: "/chat",
        statusCode: 301,
      },
      {
        source: "/phpBB2/:path*",
        destination: "/chat",
        statusCode: 301,
      },

      {
        source: "/casino_guide/usa-online-casinos.html",
        destination: "/usa-casinos",
        statusCode: 301,
      },
      {
        source: "/bitcoin-casinos-usa.html",
        destination: "/bitcoin-casinos",
        statusCode: 301,
      },
      {
        source: "/casinos-by-software",
        destination: "/software",
        statusCode: 301,
      },
      {
        source: "/slots/microgaming-slots.html",
        destination: "/software/microgaming",
        statusCode: 301,
      },
      {
        source: "/casinos-by-software/:slug",
        destination: "/software/:slug",
        statusCode: 301,
      },
      {
        source: "/slot-machines-by-software",
        destination: "/software",
        statusCode: 301,
      },
      {
        source: "/slot-machines-by-software/:slug",
        destination: "/software/:slug",
        statusCode: 301,
      },
      {
        source: "/new-online-casinos.html",
        destination: "/new-casinos",
        statusCode: 301,
      },
      {
        source: "/best-online-casinos.html",
        destination: "/best-online-casinos",
        statusCode: 301,
      },
      {
        source: "/casino_guide/no-deposit-casinos.html",
        destination: "/no-deposit-casinos",
        statusCode: 301,
      },
      {
        source: "/casino_guide/free-spin-casinos.html",
        destination: "/free-spin-casinos",
        statusCode: 301,
      },
      {
        source: "/afc_contests/dice.html",
        destination: "/free-dice-game",
        statusCode: 301,
      },
      {
        source: "/afc_contests/scratchcards.html",
        destination: "/scratch-cards",
        statusCode: 301,
      },
      {
        source: "/casino-banking/online-casino-banking.html",
        destination: "/casino-banks",
        statusCode: 301,
      },
      {
        source: "/casino-banks/:id(\\d+)/:slug.html",
        destination: "/casino-banks/:slug",
        statusCode: 301,
      },
      {
        source: "/termsandconditions.html",
        destination: "/terms",
        statusCode: 301,
      },
      {
        source: "/problem-gambling-help.html",
        destination: "/problem-gaming-help",
        statusCode: 301,
      },
      {
        source: "/casino_guide/rogue-casinos.html",
        destination: "/rogue-casino-list",
        statusCode: 301,
      },

      // {
      //   source: "/play-:slug",
      //   destination: "/redirect/play-casino?slug=:slug",
      //   statusCode: 301
      // },
      {
        source: "/slots/:id(\\d+)/:slug-slots-slots.html",
        destination: "/slots/:slug-slots",
        statusCode: 301,
      },
      {
        source: "/slots/:id(\\d+)/:slug-slots.html",
        destination: "/slots/:slug",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/party-casino.html",
        destination: "/casinos/party-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/vip-casino.html",
        destination: "/casinos/vip-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/windows-casino.html",
        destination: "/casinos/windows-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/imperial-casino.html",
        destination: "/casinos/imperial-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/depositwin-casino.html",
        destination: "/casinos/depositwin-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/zoome-casino.html",
        destination: "/casinos/zoome-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/vegaz-casino.html",
        destination: "/casinos/vegaz-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/haz-casino.html",
        destination: "/casinos/haz-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/horus-casino.html",
        destination: "/casinos/horus-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/sportuna-casino.html",
        destination: "/casinos/sportuna-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/club-usa-casino.html",
        destination: "/casinos/club-usa-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/city-club-casino.html",
        destination: "/casinos/city-club-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/ty-club-casino.html",
        destination: "/casinos/ty-club-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/joyland-casino.html",
        destination: "/casinos/joyland-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/ac-casino.html",
        destination: "/casinos/ac-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/class-1-casino.html",
        destination: "/casinos/class-1-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/21-prive-casino.html",
        destination: "/casinos/21-prive-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/circus-casino.html",
        destination: "/casinos/circus-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/swiss-casino.html",
        destination: "/casinos/swiss-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/play-club-casino.html",
        destination: "/casinos/play-club-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/dux-casino.html",
        destination: "/casinos/dux-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/lesa-casino.html",
        destination: "/casinos/lesa-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/eu-casino.html",
        destination: "/casinos/eu-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/888-casino.html",
        destination: "/casinos/888-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/castle-casino.html",
        destination: "/casinos/castle-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/planet-casino.html",
        destination: "/casinos/planet-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/fly-casino.html",
        destination: "/casinos/fly-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/mega-casino.html",
        destination: "/casinos/mega-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/next-casino.html",
        destination: "/casinos/next-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/stay-casino.html",
        destination: "/casinos/stay-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/butlers-bingo-casino.html",
        destination: "/casinos/butlers-bingo-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/energy-casino.html",
        destination: "/casinos/energy-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/1xbit-casino.html",
        destination: "/casinos/1xbit-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/pure-casino.html",
        destination: "/casinos/pure-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/supercasino.html",
        destination: "/casinos/supercasino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/bet-at-casino.html",
        destination: "/casinos/bet-at-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/llama-casino.html",
        destination: "/casinos/llama-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/max-casino.html",
        destination: "/casinos/max-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/carbon-casino.html",
        destination: "/casinos/carbon-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/joy-casino.html",
        destination: "/casinos/joy-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/instacasino.html",
        destination: "/casinos/instacasino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/amsterdam-casino.html",
        destination: "/casinos/amsterdam-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/vbet-casino.html",
        destination: "/casinos/vbet-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/dasistcasino.html",
        destination: "/casinos/dasistcasino-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/enzo-casino.html",
        destination: "/casinos/enzo-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/joker-casino.html",
        destination: "/casinos/joker-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/ckcasino.html",
        destination: "/casinos/ckcasino-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/lev-casino.html",
        destination: "/casinos/lev-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/fika-casino.html",
        destination: "/casinos/fika-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/unique-casino.html",
        destination: "/casinos/unique-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/norske-casino.html",
        destination: "/casinos/norske-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/jellybean-casino.html",
        destination: "/casinos/jellybean-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/kingbit-casino.html",
        destination: "/casinos/kingbit-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/boo-casino.html",
        destination: "/casinos/boo-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/clover-casino.html",
        destination: "/casinos/clover-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/vive-mon-casino.html",
        destination: "/casinos/vive-mon-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/mybcasino.html",
        destination: "/casinos/mybcasino-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/africa-casino.html",
        destination: "/casinos/africa-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/nordicasino.html",
        destination: "/casinos/nordicasino-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/karl-casino.html",
        destination: "/casinos/karl-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/7-gods-casino.html",
        destination: "/casinos/7-gods-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/rich-casino.html",
        destination: "/casinos/rich-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/thebescasino.html",
        destination: "/casinos/thebescasino-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/yeti-casino.html",
        destination: "/casinos/yeti-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/yako-casino.html",
        destination: "/casinos/yako-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/fun-casino.html",
        destination: "/casinos/fun-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/casinocasino.html",
        destination: "/casinos/casinocasino-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/no-bonus-casino.html",
        destination: "/casinos/no-bonus--casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/emu-casino.html",
        destination: "/casinos/emu-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/mongoose-casino.html",
        destination: "/casinos/mongoose-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/all-wins-casino.html",
        destination: "/casinos/all-wins-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/true-blue-casino.html",
        destination: "/casinos/true-blue-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/zet-casino.html",
        destination: "/casinos/zet-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/zar-casino.html",
        destination: "/casinos/zar-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/bitkingz-casino.html",
        destination: "/casinos/bitkingz-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/14-red-casino.html",
        destination: "/casinos/14-red-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/jaak-casino.html",
        destination: "/casinos/jaak-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/slots-and-casino.html",
        destination: "/casinos/slots-and-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/24k-casino.html",
        destination: "/casinos/24k-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/goodwin-casino.html",
        destination: "/casinos/goodwin-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/genesis-casino.html",
        destination: "/casinos/genesis-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/loki-casino.html",
        destination: "/casinos/loki-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/hyper-casino.html",
        destination: "/casinos/hyper-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/ivicasino.html",
        destination: "/casinos/ivicasino-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/ego-casino.html",
        destination: "/casinos/ego-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/betflip-casino.html",
        destination: "/casinos/betflip-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/wildz-casino.html",
        destination: "/casinos/wildz-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/slotozen-casino.html",
        destination: "/casinos/slotozen-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/surf-casino.html",
        destination: "/casinos/surf-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/oxi-casino.html",
        destination: "/casinos/oxi-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/olympia-casino.html",
        destination: "/casinos/olympia-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/big5-casino.html",
        destination: "/casinos/big5-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/mozzart-casino.html",
        destination: "/casinos/mozzart-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/win-own-casino.html",
        destination: "/casinos/win-own-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/mango-casino.html",
        destination: "/casinos/mango-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/harrys-casino.html",
        destination: "/casinos/harrys-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/abo-casino.html",
        destination: "/casinos/abo-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/sg-casino.html",
        destination: "/casinos/sg-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/cash-cabin-casino.html",
        destination: "/casinos/cash-cabin-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/arlekin-casino.html",
        destination: "/casinos/arlekin-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/highway-casino.html",
        destination: "/casinos/highway-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/casitsu-casino.html",
        destination: "/casinos/casitsu-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/sandbox-casino.html",
        destination: "/casinos/sandbox-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/planetspin-casino.html",
        destination: "/casinos/planetspin-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/blazzio-casino.html",
        destination: "/casinos/blazzio-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/thorcasino.html",
        destination: "/casinos/thorcasino-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/crocoslots-casino.html",
        destination: "/casinos/crocoslots-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/slotwolf-casino.html",
        destination: "/casinos/slotwolf-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/art-casino.html",
        destination: "/casinos/art-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/avantgarde-casino.html",
        destination: "/casinos/avantgarde-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/evolve-casino.html",
        destination: "/casinos/evolve-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/betanysports-casino.html",
        destination: "/casinos/betanysports-casino",
        statusCode: 301,
      },
      // {
      //   source: "/slots/:id(\\d+)/:slug.html",
      //   destination: "/slots/:slug",
      //   statusCode: 301,
      // },
      {
        source: "/casino_review/:id(\\d+)/emu-casino.html",
        destination: "/casinos/emu-casino",
        statusCode: 301,
      },
      {
        source: "/casino_review/:id(\\d+)/:slug-casino.html",
        destination: "/casinos/:slug",
        statusCode: 301,
      },
    ];
  },
};

module.exports = nextConfig;
