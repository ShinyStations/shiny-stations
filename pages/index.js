import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ethers } from 'ethers'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import ReactPlayer from 'react-player'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'



const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Enter the Station', href: '#' },
  { name: 'Roadmap', href: '#' },
  { name: 'About', href: '#' },
]

const myLoader = () => {
  return `https://cdna.artstation.com/p/assets/images/images/014/196/564/large/maxence-rouillet-2018-11-22-15-42-56-spacestation-cartoon-haircut-3d-model-by-maxence-rouillet-maxencerouillet.jpg`
}

const INFURA_PROJECT_ID = '460f40a260564ac4a4f4b3fffb032dad'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_PROJECT_ID, // required
    },
  },
  'custom-walletlink': {
    display: {
      logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
      name: 'Coinbase',
      description: 'Connect to Coinbase Wallet (not Coinbase App)',
    },
    options: {
      appName: 'Coinbase', // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options
      const walletLink = new WalletLink({
        appName,
      })
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
      await provider.enable()
      return provider
    },
  },
}

export default function Example() {
  const connectWallet = async () => {
    console.log('connecting wallet')
    const web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true,
      providerOptions, // required
    })
    const connection = await web3Modal.connect()
    console.log('Await completed!')
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    console.log(signer)
    console.log('Wallet connected!')
  }
  return (
    <div className="bg-white">
      <Head>
        <title>Shiny Stations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative overflow-hidden">
        <Popover as="header" className="relative">
          <div className="pt-6 bg-gray-900">
            <nav
              className="relative flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-6"
              aria-label="Global"
            >
              <div className="flex items-center flex-1">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <a href="#">
                    <span className="sr-only">Workflow</span>
                    <img
                      className="w-auto h-8 sm:h-10"
                      src="https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg"
                      alt=""
                    />
                  </a>
                  <div className="flex items-center -mr-2 md:hidden">
                    <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      <MenuIcon className="w-6 h-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden space-x-8 md:flex md:ml-10">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium text-white hover:text-gray-300"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-6">
                <a
                  onClick={() => connectWallet()}
                  className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-gray-600 border border-transparent rounded-md cursor-pointer hover:bg-gray-700"
                >
                  Connect Wallet
                </a>
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 p-2 transition origin-top transform md:hidden"
            >
              <div className="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
                <div className="flex items-center justify-between px-5 pt-4">
                  <div>
                    <img
                      className="w-auto h-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-teal-500-cyan-600.svg"
                      alt=""
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="w-6 h-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="pt-5 pb-6">
                  <div className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="px-5 mt-6">
                    <a
                      onClick={() => connectWallet()}
                      className="block w-full px-4 py-3 font-medium text-center text-white rounded-md shadow cursor-pointer bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                    >
                      Connect Wallet
                    </a>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <main>
          <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">Welcome to the</span>
                      <span className="block pb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-400 sm:pb-5">
                        Shiny Stations
                      </span>
                    </h1>
                    <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                      Our goal is simple, we want to create a place that
                      everyone in the Metaverse can join, while maintaining a
                      project that grows in size and utility for years to come.
                    </p>
                    <div className="mt-10 sm:mt-12">
                      <div className="sm:max-w-xl sm:mx-auto lg:mx-0">
                        <div className="sm:flex">
                          <div className="mt-3 sm:mt-0">
                            <Link href="https://app.unlock-protocol.com/checkout?redirectUri=https%3A%2F%2Fholy-wind-5049.on.fleek.co%2F&paywallConfig=%7B%22locks%22%3A%7B%220x1A68bbBC936473b0c0474FBA0B520A098E642239%22%3A%7B%22network%22%3A4%7D%7D%2C%22pessimistic%22%3Atrue%2C%22persistentCheckout%22%3Atrue%2C%22icon%22%3A%22https%3A%2F%2Flocksmith.unlock-protocol.com%2Flock%2F0x1A68bbBC936473b0c0474FBA0B520A098E642239%2Ficon%22%7D" passHref>
                              <a className="block w-full px-4 py-3 font-medium text-white rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900">
                                Enter Public Station (Rinkeby)
                              </a>
                            </Link>
                          </div>
                        </div>
                    <div className="mt-10 sm:mt-12">
                      <div className="sm:max-w-xl sm:mx-auto lg:mx-0">
                        <div className="sm:flex">
                          <div className="mt-3 sm:mt-0">
                              <Link href="https://app.unlock-protocol.com/checkout?redirectUri=https%3A%2F%2Fshiny-stations-001.on.fleek.co%2Fshiny-holder-station.html&paywallConfig=%7B%22locks%22%3A%7B%220x0240eBaCA15628D86e72DB13F4B49cA87Fb4f1Ab%22%3A%7B%22network%22%3A137%7D%7D%2C%22pessimistic%22%3Atrue%2C%22persistentCheckout%22%3Atrue%2C%22icon%22%3A%22https%3A%2F%2Flocksmith.unlock-protocol.com%2Flock%2F0x0240eBaCA15628D86e72DB13F4B49cA87Fb4f1Ab%2Ficon%22%7D" passHref>
                                <a className="block w-full px-4 py-3 font-medium text-white rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"> 
                              Mint Exclusive NFT Pass (Polygon)
                                </a> 
                              </Link>
                          </div> 
                        </div>
                      </div>
                    </div> 
                

                        <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                        Stored on IPSF - the Shiny Station can never be taken down.  Visit the preview installation until the end of 2021.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                    <Image
                      loader={myLoader}
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://cdna.artstation.com/p/assets/images/images/014/196/564/large/maxence-rouillet-2018-11-22-15-42-56-spacestation-cartoon-haircut-3d-model-by-maxence-rouillet-maxencerouillet.jpg"
                      alt="Hero Image"
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          {/* Section */}
          <div className="relative py-16 bg-gray-50 sm:py-24 lg:py-32">
            <div className="max-w-md px-4 mx-auto text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
              <div>
                <h2 className="text-base font-semibold tracking-wider uppercase text-cyan-600">
                  Our Vision
                </h2>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Explore the Stations
                </p>
                <p className="mx-auto mt-5 text-xl text-gray-500 max-w-prose">
                  Phasellus lorem quam molestie id quisque diam aenean nulla in.
                  Accumsan in quis quis nunc, ullamcorper malesuada. Eleifend
                  condimentum id viverra nulla.
                </p>
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-gray-50" aria-labelledby="footer-heading">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="max-w-md px-4 mx-auto sm:max-w-7xl sm:px-6 lg:px-8">
            <div className="py-8 mt-12 border-t border-gray-200">
              <p className="text-base text-gray-400 xl:text-center">
                &copy; 2021 Shiny Stations, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
