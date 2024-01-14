import {
  FromKeyCode,
  ifInputSource,
  layer,
  map,
  NumberKeyValue,
  rule,
  ToKeyParam,
  withMapper,
  withModifier,
  writeToProfile,
} from 'karabiner.ts'

const colemakToQuertyMap = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'g',
  e: 'k',

  f: 'e',

  g: 't',
  h: 'h',
  i: 'l',
  j: 'y',
  k: 'n',
  l: 'u',
  m: 'm',
  n: 'j',
  o: ';',
  p: 'r',
  q: 'q',
  r: 's',
  s: 'd',
  t: 'f',
  u: 'i',
  v: 'v',
  w: 'w',
  x: 'x',
  y: 'o',
  z: 'z',
  '.': '.',
  ',': ','
}

writeToProfile('SK', [
  // It is not required, but recommended to put symbol alias to layers,
  // (If you type fast, use simlayer instead, see https://evan-liu.github.io/karabiner.ts/rules/simlayer)
  // to make it easier to write '←' instead of 'left_arrow'.
  // Supported alias: https://github.com/evan-liu/karabiner.ts/blob/main/src/utils/key-alias.ts
  layer('/', 'symbol-mode').manipulators([
    //     / + [ 1    2    3    4    5 ] =>
    withMapper(['⌘', '⌥', '⌃', '⇧', '⇪'])((k, i) =>
      map((i + 1) as NumberKeyValue).toPaste(k),
    ),
    withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⇥', '⎋', '⌫', '⌦', '⇪', '↖︎', '↘︎'])((k) =>
      map(k).toPaste(k),
    ),
  ]),

  rule('Caps Lock → Backspace').manipulators([
    map('⇪').to('⌫')
  ]),

  rule('Home, End & text jumping').manipulators([
    map('↖︎').to('←', '⌘'),
    map('↘︎').to('→', '⌘'),
    map('←', '⌃').to('←', '⌥'),
    map('→', '⌃').to('→', '⌥'),
    map('↖︎', '⌃').to('↑', '⌘'),
    map('↘︎', '⌃').to('↓', '⌘')
  ]),

  rule('⌃ → ⌘ and Colemak → Qwerty').condition(ifInputSource({ input_source_id: 'Colemak' })).manipulators([
    withModifier('?any')([
      withModifier('⌃')([
        withMapper(colemakToQuertyMap)((k, v) => map(k).to(v as ToKeyParam, '⌘'))
      ])
    ])
  ]),

  rule('⌃ → ⌘ if not Colemak').condition(ifInputSource({ input_source_id: 'Colemak' }).unless()).manipulators([
    withModifier('?any')([
      withModifier('⌃')([
        withMapper(colemakToQuertyMap)((k, v) => map(k).to(k as ToKeyParam, '⌘'))
      ])
    ])
  ])
])
