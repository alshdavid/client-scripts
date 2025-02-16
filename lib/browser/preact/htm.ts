import { h } from 'preact'
import htm from 'htm'

// @ts-expect-error
export const html = htm.bind(h);
