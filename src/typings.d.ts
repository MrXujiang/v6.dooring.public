declare module '*.css'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.less'

declare module 'keymaster'

// eslint-disable-next-line no-unused-vars
interface Window {
  currentCates: null | Array<string>;
  opera: string; // note (@livs-ops): fix property 'opera' does not exist on type 'Window & typeof globalThis'
}
