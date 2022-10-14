/* everything happens at the cssItemReducer */
let cssPositionKeys = ['relative', 'fixed', 'absolute']

var cssMapAliases = {
    newlines: {
        name: 'marginBottom',
        transform(s) {
            return toPixels(s, (x) => x * 10)
        },
    },
}

function cssEvaluator(s) {
    if (!exists(s)) return {}
    if (isObject(s)) {
        return reduce(s, (k, v) => {
            if (k in cssMapAliases) {
                const ref = cssMapAliases[k]
                return [ref.name, ref.transform(v)]
            }
            if (k in cssAliases) return [cssAliases[k], v]
            if (isNumber(v) && !isUnitLess(k)) {
                v = toPixels(v)
            }
            return [k, v]
        })
    }
    if (test(/^;/, s)) {
        return toDictionary(
            cssSingletonParser(removeStartingSymbols(s))
        )
    }

    const [a, b] = splitonce(s)
    if (a in cssFunctions) return cssFunctions[a](b)

    const items = isArray(s)
        ? s
        : hasColon(s)
        ? split(s, /: ? +|;/)
        : splitOptionalComma(s).reduce(cssItemReducer, [])
    //console.log(items, 'h')

    const value = toDictionary(items)
    return value
}
function cssParser(name, value) {
    if (!value) return
    if (isStandardCss(value)) {
        console.log('return')
        return value
    }

    if (name == 'import') return assets.css[value] || ''
    return toCssFinalProduct(name, cssEvaluator(value))
}

const cssWordKeys = [
    'justify-content',
    'linear-gradient',
    'text-align',
    'transform',
    'position',
    'background',
    'color',
]
const cssNumberKeys = [
    'z-index',
    'border',
    'border-bottom',
    'border-color',
    'bottom',
    'border-weight',
    'border-top',
    'border-left',
    'border-radius',
    'column-gap',
    'font-size',
    'font-weight',
    'gap',
    'grid-gap',
    'height',
    'left',
    'line-height',
    'letter-spacing',
    'margin-right',
    'margin-left',
    'margin-top',
    'margin-bottom',
    'margin',
    'max-height',
    'min-width',
    'min-height',
    'max-width',
    'opacity',
    'padding',
    'padding-right',
    'padding-bottom',
    'padding-top',
    'padding-left',
    'right',
    'row-gap',
    'scale',
    'top',
    'width',
]
const googleFonts = [
    'Megrim',
    'Sans',
    'Roboto Slab',
    'Open Sans',
    'Gentium Basic',
    'Questrial',
    'Old Standard TT',
    'Ovo',
    'Muli',
    'Playfair Display',
    'Vast Shadow',
    'Oswald',
    'Playfair Display SC',
    'Neuton',
    'Quattrocento',
    'Fanwood Text',
    'Exo',
    'Inknut Antiqua',
    'Quando',
    'Judson',
    'Montserrat',
    'Vollkorn',
    'Stint Ultra Expanded',
    'Slabo',
    'Ultra',
    'Alfa Slab One',
    'Gentium Book Basic',
    'Nixie One',
    'Libre Baskerville',
    'Julius Sans One',
    'Crimson Text',
    'Almendra Display',
    'Cardo',
    'Philosopher',
    'Cinzel Decorative',
    'Amiri',
    'Yeseva One',
    'Merriweather Sans',
    'Merriweather',
    'Mr De Haviland',
    'Scope One',
    'Shrikhand',
    'Sansita One',
    'Chonburi',
    'Fjord One',
    'BioRhyme',
    'Lemon',
    'Poppins',
    'Halant',
]

var varvw = 'var(--root-width)'
var varvh = 'var(--root-height)'

const colorPairs = [
    ['#69d2e7', '#f38630'],
    ['#fe4365', '#83af9b'],
    ['#ff6b6b', '#4ecdc4'],
    ['#ece5ce', '#c5e0dc'],
    ['#031634', '#e8ddcb'],
    ['#45ada8', '#9de0ad'],
    ['#c6e5d9', '#e94e77'],
    ['#ff9e9d', '#ff3d7f'],
    ['#00dffc', '#008c9e'],
    ['#f0b49e', '#f7e4be'],
    ['#ff847c', '#f6f7bd'],
]
function cssDecompose(s) {
    const regex = /^(.*?) {\n([^]+?)\n}/m
    const fn = compose(runner, trim, dedent)

    function runner(s) {
        const regex = test(/;/, s) ? /;\s*$/m : /\s*$/m
        const items = split(s, regex)
        const value = items
            .filter(exists)
            .map((x) => split(x, / *: */))
        return value
    }
    const m = s.trim().match(regex)
    if (m) {
        let [_, a, b] = m
        let properties = runner(b)
        if (properties.length == 0) {
            return
        }
        return {
            name: a,
            properties,
        }
    }
}
function aggregateCSS(s, mode = String, ignoreRE = null) {
    const regex = /^(.*?)\s*{([^]+?)}/gm
    storage = new Storage()
    const fn = compose(runner, trim, dedent)

    findall(regex, s).forEach(([a, b]) => {
        a = a.trim()
        const pairs = fn(b)
        for (let [c, d] of pairs) {
            if (!c || !d) continue
            storage.add(a, c, d)
        }
    })

    function runner(s) {
        const regex = test(/;/, s)
            ? /;\s*(?:\/\*.*)?$/m
            : /\s*$/m
        const items = split(s, regex)
        const value = items
            .filter(exists)
            .map((x) => split(x, / *: *(?!['"])/))
        return value
    }

    if (mode == Array) {
        return Object.entries(storage.entries[0][1])
    }

    if (mode == Storage) {
        return storage
    }

    if (mode == String) {
        return cssToString(storage, ignoreRE)
    }
    if (mode == Object) {
        return reduce(storage.entries, (k, v) => {
            const obj = reduce(v, (k, v) => [toCamelCase(k), v])
            return [k, obj]
        })
    }
    if (mode == 'css-variables') {
        let variables = []
        let store = reduce(storage.entries, (parentName, v) => {
            parentName = toCamelCase(parentName)
            const obj = reduce(v, (k, v) => {
                let attrKey = toCamelCase(k)
                let suffix = parentName.replace(/^\W+/g, '')
                let attrVar = suffix + capitalize(attrKey)
                const cssQuantifierRE = /\d+[a-zA-Z]+|blue/g
                v = v.replace(cssQuantifierRE, (x) => {
                    variables.push([attrVar, x])
                    return dollarify(attrVar)
                })
                v = quotify(v)
                return [attrKey, v]
            })
            console.log(obj)
            throw ''
            return [parentName, obj]
        })
    }

    return reduce(storage.entries, (k, v) => {
        return [k.replace(/^\W/, ''), toCssFinalProduct(k, v)]
    })
}

function toCssFinalProduct(a, b) {
    if (!exists(b)) {
        return ''
    }
    const name = fixSelector(a)
    const value = cssReduce(b)
    return brackify(name, value)
}

function imageGetter(s) {
    const value = ImageLibrary[s] || s
    return addExtension(value, 'jpeg')
}

function cssImgParser(s) {
    return [
        ['background-image', `url("${imageGetter(s)}")`],
        ['background-size', 'cover'],
        ['background-position', 'center center'],
    ]
}
function backgroundPositionParser(s) {
    const dict = {
        t: 'top',
        l: 'left',
        r: 'right',
        b: 'bottom',
        c: 'center',
    }
    let [a, b] =
        s.length == 4
            ? [s.slice(0, 2), s.slice(2)]
            : [s[0], s[1]]
    const value = a + '%' + ' ' + b + '%'
    return [['background-position', value]]
}
function cssBox() {
    return [
        ['width', '50px'],
        ['height', '50px'],
        ['background', randomColor()],
    ]
}
const cssFunctions = {
    box: cssBox,
    bgp: backgroundPositionParser,
    bgg: backgroundGradient,
    img: cssImgParser,
}
let lastCssKey
let lastCssValue
function cssValueParser(a, b) {
    let initialKey = a
    let key = cssattrmap[a]
    const noUnits = ['line-height', 'z-index']
    if (noUnits.includes(key)) return [key, b]
    if (isFunction(key)) {
        return key(b)
    }
    /** cvp **/

    if (!b) return [key, 0]
    b = cssToVar(b)
    const initials = [
        'none',
        'transparent',
        'unset',
        'initial',
        'auto',
    ]

    if (b == 'cc') {
        return [key, 'currentColor']
    }
    if (b == 'u' || b == 'n') {
        if (key == 'border' && a != 'border') key = 'bottom'
        return [key, 'unset']
    }
    if (initials.includes(b)) return [key, b]
    if (b.startsWith('calc')) return [key, cssCalc(b.slice(4))]
    if (test(/^-?\d{1,2}$/, a)) return cssPosition(a, b)

    switch (a) {
        case 'o':
            if (b.length < 2 || isNumber(b)) {
                if (Number(b) > 1) b = b / 10
                return [key, b]
            }
            key = 'outline'
            return cssBorder(b, key)
        case 'br':
            if (b.length < 2 || isNumber(b)) break
            key = 'border-right'

        case 'b':
            if (b.length < 2 || isNumber(b)) {
                return ['bottom', b + '%']
            }
        case 'bl':
        case 'bt':
        case 'bb':
        case 'border':
            return cssBorder(b, key)
        case 'z':
        case 'zi':
        case 'offset':
        case 'scale':
        case 'fw':
            return [key, Number(b) < 10 ? b * 100 : b]
        case 'pos':
            let translateX
            let translateY

            let [posX, posY] =
                b.length == 2
                    ? b.split('').map((x) => Number(x) * 10)
                    : b.split(/(?=\w\w$)/).map(Number)

            return [
                ['position', 'absolute'],
                ['top', posX + '%'],
                ['left', posY + '%'],
            ]
    }

    if (test(/color|background/, key)) {
        return [key, cssColor(b)]
    }

    //console.log([b, key, 'hi', a])
    b = cssUnit(b, key || initialKey)

    switch (a) {
        case 't':
            return [
                ['bottom', 'unset'],
                ['top', b],
            ]
        case 'l':
            return [
                ['right', 'unset'],
                ['left', b],
            ]
        case 'b':
            return [
                ['top', 'unset'],
                ['bottom', b],
            ]
        case 'r':
            return [
                ['left', 'unset'],
                ['right', b],
            ]
        case 'tx':
        case 'ty':
        case 'r':
            return ['transform', key + parens(doublequote(b))]
        case 'wh':
            return [
                ['width', b],
                ['height', b],
            ]
        case 'px':
        case 'py':
        case 'mx':
        case 'my':
            let $key = cssattrmap[a[0]]
            let $dirs =
                a[1] == 'x'
                    ? ['left', 'right']
                    : ['top', 'bottom']
            return $dirs.map(($dir) => [$key + '-' + $dir, b])
    }

    return [key, b]
}

const cssAliases = {
    kf: 'keyframes',
    grid: 'grid',
    gr: 'grid-template-rows',
    gc: 'grid-template-columns',
    thickness: 'border-top-width',
}
const cssRef = {
    gr(s) {},
}
function cssFoobar(s) {
    return
    if (/^f\d+$/.test(s)) {
        let [a, b, c] = search(/(\d)(\d)(.+)/, s)
        let flexString = [a, b, c].join(' ')
        return [
            ['display', 'flex'],
            ['flex', flexString],
        ]
    }

    if (/^b(?!s)[a-z]\d$/.test(s)) {
        return ['border', cssColor(s.slice(1))]
    }
}
function cssItemReducer(acc, item) {
    let result
    function cssPush(item) {
        if (!item) return
        if (isString(item)) {
            if (hasNewline(item)) {
                item = cssParseStableToArray(item)
            } else {
                item = cssParseStableToArray(item)
            }
        } else if (isFunction(item[1])) {
            item = [item[0], item[1]()]
            /* cant edit it because it gets locked in */
        }
        let nested = isNestedArray(item)
        ;[lastCssKey, lastCssValue] = nested ? item[0] : item

        if (nested) {
            acc.push(...item)
        } else {
            acc.push(item)
        }
    }

    /** cir **/
    if (/^\d+(?:px|em)?$/.test(item)) {
        cssPush(cssWrapper('font-size', toPixels(item)))
    } else if (isDecimal(item)) {
        cssPush(['font-size', item + 'rem'])
    } else if (item in cabalias) {
        cssPush(cabmap[cabalias[item]])
    } else if (item in cabmap) {
        cssPush(cabmap[item])
    } else if ((result = cssFoobar(item))) {
        cssPush(result)
    } else {
        let match = search(cssParserGlobalREGEX, item)
        if (match) {
            cssPush(cssValueParser(...match))
        }
    }

    return acc
}

function cssParseStableToArray(item) {
    item = item.replace(/\n/g, '')
    item = item.replace(/.*?(\S+:)/s, '$1').replace(/}$/, '')
    const items = item.split(/: *|; */).filter(exists)
    return partition(items)
}

function cssMargin(b) {
    b = cssUnit(b)
    return [
        ['width', `calc(100% - ${b})`],
        ['height', `calc(100% - ${b})`],
        ['margin', b],
    ]
    /* a surrounding wrap around all of it */
}

function cssTextShadow(b) {
    let color = '#000'
    return b
        .split(/, */)
        .map((item, i) => {
            let [sign, d1, d2] = search(/(-)*(\d)(\d*)/, item)
            if (!sign) sign = ''
            return `${sign}${d1}px ${sign}${
                d2 || d1
            }px ${color}`
        })
        .join(', ')
}

function cssReduce(css, mode) {
    if (mode == Object) {
        return reduce(css, (a, b) => [toCamelCase(a), b])
    }
    return reduceToString(css, cssEntry)
}

function cssEntry(a, b, mode) {
    if (!isDefined(b)) return
    if (mode == Array) return [a, b]
    return a + ': ' + b + ';'
}

function cssCalc(b) {
    const expr = b
        .replace(/\dp/g, (x) => x[0] + '%')
        .replace(/\d(?=$|[ -])/g, (x) => x + 'px')
    return stringcall('calc', expr)
}

function cssAnimation(b) {
    let items = b.split(/(\d)/)
    let animation
    let duration = '1s'
    let easing = 'ease-in-out'
    let iterations = 1
    let delay = 0
    switch (items.length) {
        case 1:
            animation = items[0]

        case 2:
            animation = items[0]
            duration = items[1] + 's'

        case 3:
            animation = items[0]
            duration = items[1] + 's'
            iterations = 'infinite'
    }
    return joined(
        animation,
        duration,
        easing,
        delay,
        iterations,
        ' '
    )
}

const FontLibrary = {
    sans: '-apple-system, BlinkMacSystemFont',
}

function _cssMargin(b, mode) {
    let value = b + (/[a-zA-Z]$/.test(b) ? '' : 'px')
    let [dir1, dir2] =
        mode == 'y' ? ['top', 'bottom'] : ['left', 'right']

    return [
        ['margin-' + dir1, value],
        ['margin-' + dir2, value],
    ]
}

const cssMx = curryEnd(_cssMargin, 'x')
const cssMy = curryEnd(_cssMargin, 'y')

function cssColorMatch(b) {
    let [color, fontNumber] = hasNumber(b)
        ? splitNumberBoundary(b)
        : [b, 5]

    let bgNumber = 9 - fontNumber || 1

    let fontColor = cssColor(color, fontNumber)
    let bgColor = cssColor(color, bgNumber)

    return [
        ['color', fontColor],
        ['background', bgColor],
    ]
}

function cssToString(x, ignoreRE) {
    let iterable =
        getConstructorName(x) == 'Storage'
            ? storage.entries
            : stop()

    function removePaddingAndMargin(v, ...args) {
        const keys = Object.keys(v)
        for (let arg of args) {
            let _keys = keys.filter((x) => x.startsWith(arg))
            let k = getLast(_keys)
            if (k == arg && v[k] == 0) {
                _keys.forEach((x) => pop(v, x))
            }
        }
        return v
    }

    //console.log(iterable); throw '';
    return cssCleanupFinalString(
        reduceToString(iterable, (k, v) => {
            if (ignoreRE && ignoreRE.test(k.slice(1))) {
                console.log(k)
                return
            }
            console.log(k, 'okay')
            removePaddingAndMargin(v, 'margin', 'padding')
            const p = toCssFinalProduct(k, v)
            return p
        })
    )
}

function cssAddPeriod(s) {
    return startsWithPeriod(s) ? s : '.' + s
}

const ImageLibrary = {}

function backgroundGradient(s) {
    /* never know what it will be */
    //-?\d+(?:[a-z]\d+)
    const items = split(s, /(?=[a-z])/)
    let extra = ''
    const values = items.map((item, i) => {
        if (i == 0) {
            if (isNumber(item)) {
                return i + 'deg'
            } else {
                extra = 'to right, '
            }
        }

        let [a, b] = [item.slice(0, 2), item.slice(2)]
        //console.log([a,b])
        let color = cssColor(a)
        let offset = b ? b + '%' : ''
        return color + ' ' + offset
    })
    const arg = extra + values.join(', ')
    const output = `linear-gradient(${arg})`
    return [['background', output]]
}

function cssPcal(s) {
    let options
    ;[s, options] = getOptions(s)
    let ref = ['bl', 'br', 'b', 'tl', 'tr', 't']
    let [A, B] = argsplit(s, ref)
    let k = 1
    let margin = 50
    let bottomMargin = margin
    let rightMargin = margin

    if (options.bottom) bottomMargin += Number(options.bottom)
    if (options.right) rightMargin += Number(options.right)

    margin += 'px'
    bottomMargin += 'px'
    rightMargin += 'px'

    switch (A) {
        case 'bl':
        case 'br':
            return [
                ['width', B + '%'],
                ['right', rightMargin],
                ['bottom', bottomMargin],
            ]
        case 'b':
        case 'tl':
        case 'b':
        case 'b':
            return
    }

    throw ''

    if (options.half) {
        k = 0.5
        return [['width', `calc(${k} * (100% - 2 * ${b})`]]
    } else {
        return [
            ['width', `calc(100% - 2 * ${b})`],
            ['height', `calc(100% - 2 * ${b})`],
            ['margin', b],
        ]
    }
}

const cssSelectorSuffixes = {
    a: '::after',
    b: '::before',
    h: ':hover',
    f: ':focus',
}

const cabalias = {
    whitespace: 'pre',
    ws: 'pre',
    centered: 'center',
    c: 'center',
    flexc: 'flexcol',
    fw: 'flexwrap',
    fcol: 'flexcol',
    thickness: 'bt',
}

//function cssCleanupFinalString(s) {
//return lineFilter(s, (x) => !cssHasStringError(x))
//}
function cssCleanupFinalString(s) {
    return lineFilter(s, (x) => {
        return !cssHasStringError(x)
    })
    let margin = match(/((?:margin)(?:-\w+)?): (\w+)/g, s)
    let lastMargin = getLast(margin)
    let filterMargin
    let filterPadding
    if (
        lastMargin &&
        lastMargin[0] == 'margin' &&
        lastMargin[1] == 0
    ) {
        filterMargin = true
    }
    let padding = match(/((?:padding)(?:-\w+)?): (\w+)/g, s)
    let lastPadding = getLast(padding)
    if (
        lastPadding &&
        lastPadding[0] == 'padding' &&
        lastPadding[1] == 0
    ) {
        filterPadding = true
    }
    let absolute = search(/absolute:/, s)

    return lineFilter(s, (x) => {
        if (filterPadding && x.includes('padding')) {
            return false
        }
        if (absolute && x.includes('float')) {
            return false
        }

        if (filterMargin && x.includes('margin')) {
            return false
        }
        return !cssHasStringError(x)
    })
}

function cssHasStringError(s) {
    return (
        s &&
        /outline|unset|none|null|undefined|: (?:[=]|[a-zA-Z]{1,2};)/.test(
            s
        )
    )
}

function cssBoxShadow(s) {
    const shadows = [
        '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
        '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    ]
    if (isNumber(s)) return shadows[Number(s)]

    const dict = {
        light: [0, 0.5, 5, 0.3],
    }
    const [a, b, c, d] = dict[s]
    return `${a}px ${b}px ${c}px rgba(0,0,0,${d})`
}

function cssBorder(s, key) {
    let match = search(/(-?[\d.]+(?:px)?)(\w+)/, s)
    if (!match) {
        if (isNumber(s)) {
            return [key + '-' + 'width', s + 'px']
        } else {
            return [key + '-color', cssColor(s)]
        }
    }

    let [a, b] = match

    let dashed = ' solid '
    if (isNumber(a)) a += 'px'
    b = cssColor(b)
    const value = a + dashed + b
    if (!key) return value
    return [key, value]
}

function cssColor(b, comment = true) {
    if (!isBoolean(comment)) {
        b = arguments[0] + arguments[1]
        comment = true
    }
    switch (b) {
        case 'bl':
            return 'black'
        case 'bl':
            return 'black'
        case 'bl':
            return 'black'
    }
    if (b.length < 3)
        b = b.replace(/\w/, (x) =>
            roygbiv.find((y) => x == y[0])
        )
    if (!test(/\d$/, b)) b += 5
    return tailwind[b] + (comment ? ' ' + blockComment(b) : '')
}

function hasUnit(s) {
    return test(/\D+$/, s)
}

function cssUnit(b, key = 'width') {
    if (b.endsWith('p')) {
        return b.replace(/p$/, '%')
    } else if (b != 0 && test(/\d$/, b)) {
        //console.log([b, key])
        let unit = cssunitmap[search(/\w+/, key)] || 'px'
        return b + unit
    }
    return b
}

function cssShorthand(s) {
    const ref = [
        [/^([odt])(\d+\.?\d*)/, csho], // opacity  and delay
        [/^(\d+)[,-](\d+)(pex)?/, cshpos], // position
        [/^([bu]?)([pwroygbiv])(\d*)([st])?/, cshcolor], // color
    ]

    const items = s.trim().split(/ +/)
    const store = {}
    //console.log(items)
    for (let item of items) {
        for (let [k, v] of ref) {
            if (test(k, item)) {
                Object.assign(store, v(...search(k, item)))
                break
            }
        }
    }
    return store
}

function cssGridArea(
    parent,
    children,
    s,
    {
        col = 0,
        row = 0,
        columnWidth = '1fr',
        rowHeight = '100px',
    } = {}
) {
    const gridItems = cssGridItems(s, children)
    const columns = gridItems[0].length

    const obj = {
        display: 'grid',
        'grid-template-areas': newlineIndent(
            gridItems.map((x) => doublequote(x.join(' ')))
        ),
    }

    if (row) {
        const value = split(row, /[-\/]/)
            .map(addf('%'))
            .join(' ')
        obj['grid-template-rows'] = value
    }

    if (col) {
        const value = split(col, /[-\/]/)
            .map(addf('%'))
            .join(' ')
        obj['grid-template-columns'] = value
    } else {
        obj['grid-template-columns'] = `repeat(${columns}, 1fr)`
    }

    const parentString = cssParser(parent, obj)
    const childrenString = children.map(cssGridAreaChild)
    return parentString + '\n\n' + join(childrenString)
}

//
function cssColumns(parent, children, s, options = {}) {
    const template = children
        .map((item, i) => {
            return n2char(i)
        })
        .join('')
    const extraProps = options.center
        ? cssEvaluator('center wh100')
        : {}
    return join([
        cssGridArea(parent, children, template),
        ...children.map((name) =>
            cssParser(name, {
                //width: removeDecimals(100 / children.length) + '%',
                ...extraProps,
            })
        ),
    ])
}

function toPositive(x) {
    return Math.abs(toNumber(x))
}
function isNegative(x) {
    return x.toString().startsWith('-')
}

function cssPosition(a, b, unit = '%') {
    //if (a == 0)
    //console.log([a, b], 'vv')
    let x = 'left'
    let y = 'top'
    if (hasUnit(b)) {
        ;[b, unit] = mreplace(/\D+$/, b)
    }

    if (isNegative(a)) {
        a = toPositive(a)
        x = 'right'
    }

    if (isNegative(b)) {
        b = toPositive(b)
        y = 'bottom'
    }

    //if (a == 0) {
    //return [x, b + unit]
    //}

    //if (b == 0) {
    //return [x, a + unit]
    //}
    return [
        //['position', 'absolute'],
        [x, a + unit],
        [y, b + unit],
    ]
}
class Partitions {
    constructor() {
        this.store = []
        this.count = 0
        this.index = 0
    }

    add(item) {
        //console.log(this.sizes)
        if (
            this.count == this.sizes &&
            this.index < this.sizes - 1
        ) {
            this.index += 1
            this.count = 0
        }

        if (this.store.length <= this.index) {
            this.store.push([])
        }

        this.store[this.index].push(item)
        this.count++
    }
}
function cssPartition(sa, n = 2) {
    const sizes = Math.ceil(sa.length / n)
    console.log(sizes)
    const items = Array.from(sa)
    const partitions = new Partitions()
    partitions.sizes = sizes
    for (let item of items) {
        partitions.add(item)
    }
    return partitions.store
}

function oldpartition(sa, n = 2, frontHeavy = false) {
    const length = sa.length
    const size = (frontHeavy ? Math.ceil : Math.floor)(
        length / n
    )
    const items = Array.from(sa)
    const store = [[]]
    let count = 0
    let index = 0
    for (let i = 0; i < items.length; i++) {
        count++
        let item = items[i]
        store[index].push(item)
        if (i == items.length - 1) {
            return store
        } else if (count == size) {
            index += 1
            store.push([])
            count = 0
        }
    }
    return store
}
function cutInHalf(sa) {
    return cssPartition(sa, 2)
}

function cssGetDynamicIncrement(value, min, max) {
    if (max) {
        let delta = max - min
        return delta > 10 ? parseInt(delta / 10) : delta
    }
    if (value == 0) return 1
    if (value < 10) return 1
    return Math.ceil(value / 10)
}

var tailwindStorage = {
    black: ['#111'],
    gray: [
        '#f7fafc',
        '#edf2f7',
        '#e2e8f0',
        '#cbd5e0',
        '#a0aec0',
        '#a0aec0',
        '#718096',
        '#4a5568',
        '#2d3748',
        '#1a202c',
    ],
    red: [
        '#fff5f5',
        '#fed7d7',
        '#feb2b2',
        '#fc8181',
        '#f56565',
        '#e53e3e',
        '#c53030',
        '#9b2c2c',
        '#742a2a',
    ],
    orange: [
        '#fffaf0',
        '#feebc8',
        '#fbd38d',
        '#f6ad55',
        '#ed8936',
        '#ed8936',
        '#dd6b20',
        '#c05621',
        '#9c4221',
        '#7b341e',
    ],
    yellow: [
        '#fffff0',
        '#fefcbf',
        '#faf089',
        '#f6e05e',
        '#ecc94b',
        '#ecc94b',
        '#d69e2e',
        '#b7791f',
        '#975a16',
        '#744210',
    ],
    green: [
        '#f0fff4',
        '#c6f6d5',
        '#9ae6b4',
        '#68d391',
        '#48bb78',
        '#48bb78',
        '#38a169',
        '#2f855a',
        '#276749',
        '#22543d',
    ],
    teal: [
        '#e6fffa',
        '#b2f5ea',
        '#81e6d9',
        '#4fd1c5',
        '#38b2ac',
        '#38b2ac',
        '#319795',
        '#2c7a7b',
        '#285e61',
        '#234e52',
    ],
    blue: [
        '#ebf8ff',
        '#bee3f8',
        '#90cdf4',
        '#63b3ed',
        '#4299e1',
        '#4299e1',
        '#3182ce',
        '#2b6cb0',
        '#2c5282',
        '#2a4365',
    ],
    indigo: [
        '#ebf4ff',
        '#c3dafe',
        '#a3bffa',
        '#7f9cf5',
        '#667eea',
        '#667eea',
        '#5a67d8',
        '#4c51bf',
        '#434190',
        '#3c366b',
    ],
    purple: [
        '#faf5ff',
        '#e9d8fd',
        '#d6bcfa',
        '#b794f4',
        '#9f7aea',
        '#9f7aea',
        '#805ad5',
        '#6b46c1',
        '#553c9a',
        '#44337a',
    ],
    violet: [
        '#fff5f7',
        '#fed7e2',
        '#fbb6ce',
        '#f687b3',
        '#ed64a6',
        '#ed64a6',
        '#d53f8c',
        '#b83280',
        '#97266d',
        '#702459',
    ],
    pink: [
        '#fff5f7',
        '#fed7e2',
        '#fbb6ce',
        '#f687b3',
        '#ed64a6',
        '#ed64a6',
        '#d53f8c',
        '#b83280',
        '#97266d',
        '#702459',
    ],
}

//prettier-ignore
const cabmap = {
    box35: `
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
    `,
    'rc': ['background', randomColor],
    'fc': ['background', randomColor],
    'fitc': ['width', 'fit-content'],
    'bgw': ['background', 'white'],
    'green': ['color', 'green'],
    'bgb': ['background', 'black'],
    'wfc': 'width: fit-content;',
    'striped':  "background-image: linear-gradient(136deg, #0d0d0d 4.55%, #ffffff 4.55%, #ffffff 50%, #0d0d0d 50%, #0d0d0d 54.55%, #ffffff 54.55%, #ffffff 100%);",
    'mirror': [
  [
    "display",
    "inline-block"
  ],
  [
    "transform",
    "scaleX(-1)"
  ],
  [
    "filter",
    "FlipH"
  ]
  ],

    'vh': [
        ['width', varvw],
        ['width', varvh],
    ],

    'smoothfont': [
    ['text-rendering', 'optimizeLegibility'],
  ['text-rendering', 'geometricPrecision'],
  ['font-smooth', 'always'],
  ['font-smoothing', 'antialiased'],
    ],
    /* marked */

    gtext: [
      //["background-clip", "text"],
      //["color", "transparent"],
      ["-webkit-background-clip", "text"],
      ["-webkit-text-fill-color", "transparent"],
    ],
    '100vh': [['height', varvh]],
    'bgt': [['background', 'transparent']],
    '100vw': [['width', varvw]],
    'wrap': [['flex-wrap', 'wrap']],
    'flexwrap': [['display', 'flex'], ['flex-wrap', 'wrap']],
    'fg0': [['flex-grow', '0']],
    'jsc': [['justify-self', 'center']],
    'asc': [['align-self', 'center']],
    //'dfg': [['align-self', '']],
    'fg0': [['flex-grow', '0']],
    jis: [['justify-items', 'start']],
    jie: [['justify-items', 'end']],
    jic: [['justify-items', 'center']],

    lr: [
        ['justify-content', 'space-between'],
        ['display', 'flex'],
        ['width', '100%'],
    ],
    jcsb: [['justify-content', 'space-between'], ['display', 'flex']],
    jcsa: [['justify-content', 'space-around']],
    jcse: [['justify-content', 'space-evenly']],
    jist: [['justify-items', 'stretch']],

    ais: [['align-items', 'start']],
    aistr: [['align-items', 'stretch']],
    acstr: [['align-content', 'stretch']],
    aie: [['align-items', 'end']],
    aic: [['align-items', 'center']],
    aist: [['align-items', 'stretch']],

    jis: [['justify-items', 'start']],
    jie: [['justify-items', 'end']],
    jic: [['justify-items', 'center']],
    jist: [['justify-items', 'stretch']],

    jcs: [['justify-content', 'start']],
    jce: [['justify-content', 'end']],
    jcc: [['justify-content', 'center']],
    jcst: [['justify-content', 'stretch']],

    acs: [['align-content', 'start']],
    ace: [['align-content', 'end']],
    acc: [['align-content', 'center']],
    acst: [['align-content', 'stretch']],
    ored: [['outline', '1px solid red']],
    ou: [['outline', 'unset']],
    outline: [['outline', '1px solid red']],
    arrow: [['list-style', 'none']],
    //nls: [['list-style', 'none']],
    nls: [['list-style-type', 'none']],
    a: [['position', 'absolute']],
    gradient: [
        ['-webkit-background-clip', 'text'],
        ['-webkit-text-fill-color', 'transparent'],
        //['display', 'inline-block'],
        ['background-image', 'linear-gradient(to right, #1de9b6, #2979ff)'],
    ],

    content: [['content', '']],
    pseudo: [['content', '']],
    ilb: [['display', 'inline-block']],
    inline: [['display', 'inline']],
    span: [['display', 'inline']],
    block: [['display', 'block']],
    ofh: [['overflow', 'hidden']],
    fr: [['float', 'right']],
    float: [['float', 'right']],
    upper: [['text-transform', 'uppercase']],
    cap: [['text-transform', 'capitalize']],
    lower: [['text-transform', 'lowercase']],
    ofs: [
        ['overflow', 'scroll'],
        ['overflow-x', 'hidden'],
    ],
    ofx: [['overflow-x', 'hidden']],
    ofy: [['overflow-y', 'hidden']],
    bebas: [['font-family', 'bebas']],
    pre: [
        //['font-family', "'Courier New', monospace"],
        ['white-space', 'pre-wrap'],
    ],

"bsd":[["box-shadow","0 1px 1px rgba(0,0,0,0.08), \n            0 2px 2px rgba(0,0,0,0.12), \n            0 4px 4px rgba(0,0,0,0.16), \n            0 8px 8px rgba(0,0,0,0.20)"]],"bss":[["box-shadow","0 1px 1px rgba(0,0,0,0.11), \n            0 2px 2px rgba(0,0,0,0.11), \n            0 4px 4px rgba(0,0,0,0.11), \n            0 6px 8px rgba(0,0,0,0.11),\n            0 8px 16px rgba(0,0,0,0.11)"]],"bsl":[["box-shadow","0 2px 1px rgba(0,0,0,0.09), \n            0 4px 2px rgba(0,0,0,0.09), \n            0 8px 4px rgba(0,0,0,0.09), \n            0 16px 8px rgba(0,0,0,0.09),\n            0 32px 16px rgba(0,0,0,0.09)"]],"s4":[["box-shadow","0 1px 1px rgba(0,0,0,0.15), \n            0 2px 2px rgba(0,0,0,0.15), \n            0 4px 4px rgba(0,0,0,0.15), \n            0 8px 8px rgba(0,0,0,0.15)"]],"s6":[["box-shadow","0 1px 1px rgba(0,0,0,0.11), \n            0 2px 2px rgba(0,0,0,0.11), \n            0 4px 4px rgba(0,0,0,0.11), \n            0 8px 8px rgba(0,0,0,0.11), \n            0 16px 16px rgba(0,0,0,0.11), \n            0 32px 32px rgba(0,0,0,0.11)"]],"s5":[["box-shadow","0 1px 1px rgba(0,0,0,0.12), \n            0 2px 2px rgba(0,0,0,0.12), \n            0 4px 4px rgba(0,0,0,0.12), \n            0 8px 8px rgba(0,0,0,0.12),\n            0 16px 16px rgba(0,0,0,0.12)"]],"bss":[["box-shadow","0 1px 1px rgba(0,0,0,0.25), \n            0 2px 2px rgba(0,0,0,0.20), \n            0 4px 4px rgba(0,0,0,0.15), \n            0 8px 8px rgba(0,0,0,0.10),\n            0 16px 16px rgba(0,0,0,0.05)"]],
    perspective: [
        ['perspective', '50%'],
        ['transform', 'translate(-50%, -50%)'],
    ],
    card: [
        ['backface-visibility', 'hidden'],
        ['transform', 'translate(-50%, -50%)'],
    ],
    '3d': [
        ['left', '50%'],
        ['transform', 'translate(-50%, -50%)'],
    ],

    absu: [
        ['left', 'unset'],
        ['right', 'unset'],
        ['bottom', 'unset'],
        ['top', 'unset'],
        ['position', 'unset'],
        ['transform', 'unset'],
    ],

    origin: [
        ['left', '50%'],
        ['position', 'absolute'],
        ['top', '50%'],
        ['transform', 'translate(-50%, -50%)'],
    ],
    east: [
        ['left', 'unset'],
        ['right', '0'],
        ['top', '50%'],
        ['transform', 'translateY(-50%)'],
    ],
    b0: [
        ['bottom', '0'],
        ['position', 'absolute'],
    ],
    l0: [
        ['left', '0'],
        ['position', 'absolute'],
    ],
    t0: [
        ['top', '0'],
        ['position', 'absolute'],
    ],
    r0: [
        ['right', '0'],
        ['position', 'absolute'],
    ],

    right: [['right', '0']],
    top: [['top', '0']],
    left: [['left', '0']],
    bottom: [['bottom', '0']],
    se: [
        ['bottom', '0'],
        ['right', '0'],
    ],
    south: [
        ['bottom', '0'],
        ['left', '50%'],
        ['transform', 'translateX(-50%)'],
    ],
    sw: [
        ['bottom', '0'],
        ['left', '0'],
    ],

    mid: [
        ['top', '50%'],
        ['transform', 'translateY(-50%)'],
        ['right', 'unset'],
        ['left', '0'],
    ],

    west: [
        ['top', '50%'],
        ['transform', 'translateY(-50%)'],
        ['right', 'unset'],
        ['left', '0'],
    ],
    northwest: [
        ['left', '0'],
        ['top', '0'],
    ],

    nw: [
        ['left', '0'],
        ['top', '0'],
    ],
    north: [
        ['top', '0'],
        ['left', '50%'],
        ['transform', 'translateX(-50%)'],
    ],

    code: [
        [
            'font-family',
            "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
        ],
    ],

    middleright: [
        //[ "position", "absolute" ], [ "top", "50%" ], ["right", "-50%"],
        //[ "transform", "translateY(50%)"],
    ],

    topleft: [
        ['position', 'absolute'],
        ['top', '0'],
        ['left', '0'],
    ],

    reset: [
        ['box-sizing', 'border-box'],
        [
            'font-family',
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\nsans-serif",
        ],
        ['-webkit-font-smoothing', 'antialiased'],
        ['-moz-osx-font-smoothing', 'grayscale'],

        ['padding', '0'],

        ['margin', '0'],
    ],

    cabtac: [['text-align', 'center']],
    serrat: [
        ['font-family', '"Montserrat Alternates"'],
        ['font-weight', '700'],
    ],
    flexu: [
        ['display', 'unset'],
        ['align-items', 'unset'],
        ['justify-content', 'unset'],
    ],

    center: [
        ['display', 'flex'],
        ['align-items', 'center'],
        ['justify-content', 'center'],
    ],
    jcse: [['justify-content', 'space-evenly']],
    spacebetween: [['justify-content', 'space-between']],

    se: [['justify-content', 'space-evenly']],
    sa: [['justify-content', 'space-between']],
    sb: [['justify-content', 'space-between']],

    jcc: [['justify-content', 'center']],
    shadow: [
        [
            'box-shadow',
            'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
        ],
    ],
    shadow1: [['0px 4px 10px rgba(0, 0, 0, 0.25)']],
    shadow2: [['0px 4px 10px rgba(0, 0, 0, 0.1)']],
    tall: [['transition', 'all 1s ease-out']],
    portrait: [
        ['width', varvw],
        ['height', varvh],
        ['padding', '50px'],
    ],


    hs: [
        ['width', '50%'],
        ['height', '100%'],
    ],

    fs: [
        ['width', '100%'],
        ['height', '100%'],
    ],

    halfscreen: [
        ['position', 'absolute'],
        ['width', '35%'],
        ['right', '0'],
        ['height', '90%'],
    ],
    xcenter: [
        ['position', 'absolute'],
        ['transform', 'translateX(-50%)'],
        ['left', '50%'],
    ],
    ycenter: [
        ['position', 'absolute'],
        ['transform', 'translateY(-50%)'],
        ['top', '50%'],
    ],
    'space-between': [['justify-content', 'space-between']],
    jcbtwn: [['justify-content', 'space-between']],
    jcspc: [['justify-content', 'space-evenly']],
    abscenter: [
        ['position', 'absolute'],
        ['top', '0'],
        ['left', '0'],
        ['right', '0'],
        ['bottom', '0'],
        ['margin', 'auto'],
    ],
    'shadow-lg': [['box-shadow', 'rgba(0, 0, 0, 0.1) 0px 4px 12px']],
    'shadow-sm': [['box-shadow', 'rgba(0, 0, 0, 0.08) 0px 4px 12px']],
    rounded: [['border-radius', '5px']],
    times: [['font-family', 'Times']],
    georgia: [['font-family', 'Georgia']],
    cp: [['font-family', 'Crimson Text']],
    crim: [['font-family', 'Crimson Text']],
    ct: [['font-family', 'Crimson Text']],
    cp: [['font-family', 'Crimson Pro']],
    cp: [['font-family', 'Crimson Pro']],
    noto: [['font-family', 'Noto Emoji']],
    mhauto: [['margin', '0 auto']],
    mauto: [['margin', '0 auto']],
    caps: [['text-transform', 'uppercase']],
    underline: [['border-bottom', '1px solid currentColor']],
    ul: [['border-bottom', '1px solid black']],
    lh: [['line-height', '1.4']],
    bold: [['font-weight', '700']],
    superbold: [['font-weight', '900']],
    flex: [['display', 'flex']],
    flexrow: [
        ['display', 'flex'],
        ['flex-direction', 'row'],
    ],

    flexcol: [
        ['display', 'flex'],
        ['flex-direction', 'column'],
        ['flex-wrap', 'wrap'],
    ],
    unflex: [
        ['display', 'unset'],
        ['flex-direction', 'unset'],
        ['align-items', 'unset'],
        ['justify-content', 'unset'],
    ],

    gmail: [['font', 'small/ 1.5 Arial,Helvetica,sans-serif']],
    geist: [
        ['flex', '1'],
        ['justify-content', 'flex-start'],
        ['align-items', 'stretch'],
    ],
    antialiased: [
        ['text-rendering', 'optimizeLegibility'],
        ['-webkit-font-smoothing', 'asdflxxanzztzzizzzaliased'],
    ],
    ol: [
        ['text-rendering', 'optimizeLegibility'],
        ['-webkit-font-smoothing', 'antialiased'],
    ],
    round: [['border-radius', '50%']],
    transparent: [['background', 'transparent']],
    tac: [['text-align', 'center']],
    ta: [['text-align', 'center']],
    ilb: [['display', 'inline-block']],
    block: [['display', 'block']],
    radial: [['border-radius', '50%']],
    absolute: [['position', 'absolute']],

    //cg1: [['color', '']],
    blue: [['color', 'tailwind-blue']],

    white: [['color', 'white']],
    outline: [['outline', '0.5 px solid black']],
    libre: [['font-family', 'Libre BaskerVille']],
    textstroke: [['color', 'white'],['-webkit-text-color', 'white'], ['-webkit-text-stroke', '1px solid black'], ['text-stroke', "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"]],
    white: [['color', 'white']],
    letter: [['width', '8.5in'], ['height', '11in']],
    page: [['width', '8.5in'], ['height', '11in']],
    smallcaps: [['font-variant', 'small-caps']],
    bgblack: [['background', 'black']],
    bgb: [['background', 'black']],
    minion: [['font-family', 'minion']],
    ch1: [['font-family', 'Long Cang']],
    ch2: [['font-family', 'Ma Shan Zheng']],
    ch3: [['font-family', 'Noto Sans SC']],
    cormorant: [['font-family', 'Cormorant']],
    inconsolata: [['font-family', 'Inconsolata']],
    va: [['vertical-align', 'middle']],
    fixed: [['position', 'fixed']],
    black: [['color', '#333']],
    green: [['color', 'tailwind-green']],


    ilf: [['display', 'inline-flex']],
    ilg: [ ['display', 'inline-grid'], ],


    border1: [
        ['border', '1px solid black'],
    ],

    bblack: [
        ['border', '1px solid black'],
    ],

    lbe: [
        ['border-bottom', '0.5px solid black'],
        ['padding-bottom', '5px'],
    ],


    lab: [
        ['border-top', '0.5px solid black'],
        ['padding-top', '5px'],
    ],

    f16: [
        ['font-size', '24px'],
        ['font-weight', '600'],
    ],

    smf: [
        ['font-size', '24px'],
        ['font-weight', '500'],
    ],

    sm: [
        ['font-size', '24px'],
        ['font-weight', '500'],
    ],

    medf: [
        ['font-size', '36px'],
        ['font-weight', '650'],
    ],

    med: [
        ['font-size', '36px'],
        ['font-weight', '650'],
    ],

    lgf: [
        ['font-size', '48px'],
        ['font-weight', '650'],
    ],

    lg: [
        ['font-size', '48px'],
        ['font-weight', '650'],
    ],

    vlg: [
        ['font-size', '72px'],
        ['font-weight', '800'],
    ],

    abs: [['position', 'absolute']],
    rel: [['position', 'relative']],
    sans: [
        [
            'font-family',
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
        ],
        ['-webkit-font-smoothing', 'antialiased'],
        ['-moz-osx-font-smoothing', 'grayscale'],
    ],
    serif: [['font-family', 'Georgia']],
    garamond: [['font-family', 'Garamond']],
    monospace: [['font-family', 'monospace']],
    codestack: [
        [
            'font-family',
            '"Source Code Pro", Consolas, Monaco, Menlo, Consolas, monospace',
        ],
    ],
    mono: [
        [
            'font-family',
            'Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace',
        ],
    ],
    code: [['font-family', 'monospace']],
    hidden: [['overflow', 'hidden']],
    cursive: [['font-family', 'relative']],
    w1: [['color', '#EAEAEA']],
    bl: [['color', '#333']],
    bl3: [['color', '#555']],
    bl1: [['color', '#2d2d2d']],
    bl2: [['color', '#242424']],
}

function cssKeyWrap(fn, wrapFn) {
    let key = toDashCase(fn.name.slice(3))

    return (b) => {
        let value = fn(b)
        if (value) {
            if (wrapFn) {
                value = wrapFn(value)
            }
        } else {
            return
        }
        return isArray(value) ? value : [key, value]
    }
}

const cssReplacementDictionary = {
    gtc: 'grid-template-columns',
    gtr: 'grid-template-rows',
    gac: 'grid-auto-columns',
    gar: 'grid-auto-rows',
    gg: 'grid-gap',
    dg: 'display: grid;',
    df: 'display: flex;',
}

const cssGridDict = {
    gtc: 'grid-template-columns',
    gtr: 'grid-template-rows',
    gac: 'grid-auto-columns',
    gar: 'grid-auto-rows',
    gg: 'grid-gap',
}

function cssGrid(b) {
    const unitdict = {
        gtc: 'fr',
        gtr: 'fr',
        gac: '%',
        gar: '%',
        gg: 'px',
    }
    const regex = ncg('($1)', cssGridDict)
    const store = [['display', 'grid']]
    const items = split(b, regex).filter(exists)
    for (let [a, b, unit] of paired(items)) {
        if (!unit) unit = unitdict[a]
        if (a == 'gtc' || a == 'gtr')
            b = `repeat(${b}, 1${unit})`
        else if (a == 'gar' || a == 'gac') b = `${b}${unit}`
        else if (a == 'gg') b = `${b}${unit}`
        a = dict[a] || a
        store.push([a, b])
    }
    return store
}
function cssBackgroundPosition(s) {
    const value = isNumber(s)
        ? [s.slice(0, 2), s.slice(2)].map(addf('%'))
        : [s]
    return [['background-position', value.join(' ')]]
}

function cssFontFamily(s) {
    let font = FontLibrary[s] || font
    return [['font-family', font]]
}

function cssGtr(s) {
    return cssGtc(s, 'rows')
}
function cssGtc(s, mode = 'columns') {
    let gtc, a, b, c, d, e
    if (s == 1 || s == 2 || s == 3 || s == 4) {
        s = Number(s)
        return [
            ['display', 'grid'],
            ['grid-template-' + mode, `repeat(${s}, 1fr)`],
        ]
    }
    if (isNumber(s)) {
        switch (s.length) {
            case 1:
                switch (Number(s)) {
                    case 2:
                        a = 1
                        b = 1
                        break

                    case 3:
                        a = 1
                        b = 1
                        c = 1
                        break
                    case 4:
                        a = 1
                        b = 1
                        c = 1
                        d = 1
                        break
                }
                break

            case 2:
                a = Number(s.slice(0, 2))
                b = 100 - a
                break
            case 4:
                a = Number(s.slice(0, 2))
                b = Number(s.slice(2, 4))
                if (a + b != 100) c = 100 - (a + b)
                break
        }
        let numbers = [a, b, c, d, e]
            .map(divide10)
            .filter(exists)
        //console.log(numbers)
        gtc = numbers.map(addf('fr')).join(' ')
    } else if (s == 'auto' || s == 'min') {
        gtc = 'auto 1fr'
    }

    return [
        ['display', 'grid'],
        ['grid-template-' + mode, gtc],
    ]
}
function cssMockup(s) {
    let a = s[0] || 2
    let b = s[1] || 1
    return [
        ['width', a + '00px'],
        ['height', b + '00px'],
        ['background', randomColor()],
    ]
}
const cssattrmap = {
    /* marked */ con: 'content',
    '-?\\d{1,2}': '',
    bs: cssKeyWrap(cssAnimation),
    mar: cssMargin,
    //cols: cssKeyWrap(cssCols),
    ts: cssKeyWrap(cssTextShadow),
    cm: cssColorMatch,
    ff: cssKeyWrap(cssFontFamily),
    mu: cssMockup,
    gtc: cssGtc,
    col: cssGtc,
    gtr: cssGtr,
    grid: cssGrid,
    grad: cssGradient,
    //bgp: cssBackgroundPosition,
    ul: cssUnderline,
    bs: cssKeyWrap(cssBoxShadow),
    //ff: cssFontFamily,
    // \d = positioning
    bblr: 'border-bottom-left-radius',
    bbrr: 'border-bottom-right-radius',
    btrr: 'border-top-right-radius',
    btlr: 'border-top-left-radius',
    wh: '',
    calc: '',
    px: '',
    py: '',
    mx: cssMx,
    my: cssMy,
    offset: 'offset',
    border: '',
    ls: 'letter-spacing',
    hsla: 'hsla',
    kf: '',
    bottom: 'bottom',
    bot: 'bottom',
    top: 'top',
    left: 'left',
    right: 'right',
    pos: 'position',
    cgap: 'column-gap',
    rgap: 'row-gap',
    gapy: 'column-gap',
    gapx: 'row-gap',
    gap: 'gap',
    ggap: 'grid-gap',
    //bs: 'box-shadow',
    ai: 'align-items',
    jc: 'justify-content',
    //gc: 'grid-column',
    //gr: 'grid-row',
    b: 'border',
    bb: 'border-bottom',
    bl: 'border-left',
    br: 'border-right',
    bt: 'border-top',
    z: 'z-index',
    zi: 'z-index',
    o: 'opacity',
    fw: 'font-weight',
    br: 'border-radius',
    bw: 'border-weight',
    lh: 'line-height',
    gg: 'grid-gap',
    ggx: 'row-gap',
    border: 'border',
    ggy: 'column-gap',
    lg: 'linear-gradient',
    bg: 'background',
    bc: 'border-color',
    bb: 'border-bottom',
    fc: 'color',
    fs: 'font-size',
    mw: 'min-width',
    mh: 'min-height',
    minw: 'min-width',
    minh: 'min-height',
    maxw: 'max-width',
    maxh: 'max-height',
    //gtc: 'grid-template-columns',
    //gtr: 'grid-template-rows',
    w: 'width',
    h: 'height',
    p: 'padding',
    m: 'margin',
    pb: 'padding-bottom',
    pt: 'padding-top',
    pl: 'padding-left',
    pr: 'padding-right',
    mb: 'margin-bottom',
    mt: 'margin-top',
    ml: 'margin-left',
    mr: 'margin-right',
    l: 'left',
    t: 'top',
    right: 'right',
    r: 'right',
    //r: 'rotate',
    ta: 'text-align',
    s: 'scale',
    tx: 'transform',
    ty: 'transform',
    tr: 'transform',
}

const cssunitmap = {
    right: '%',
    left: '%',
    top: '%',
    bottom: '%',
    font: 'rem',
    wh: 'px',
    rotate: 'deg',
    scale: '',
    translate: '%',
}

const tailwind = {
    charcoal: '#36454f',
    none: 'transparent',
    olive: '',
    strawberry: '',
    tomato: '',
    //black1: 'asd',
    //black2: 'asd',
    //black3: 'asd',
    //black4: 'asd',
    //black5: 'asd',
    //black: '#111',
    //black6: 'asd',
    //black7: 'asd',
    //black8: '#111',
    //black9: 'asd',

    black1: 'rgba(0, 0, 0, .1)',
    white1: 'rgba(255, 255, 255, .1)',
    black2: 'rgba(0, 0, 0, .2)',
    white2: 'rgba(255, 255, 255, .2)',
    black3: 'rgba(0, 0, 0, .3)',
    white3: 'rgba(255, 255, 255, .3)',
    black4: 'rgba(0, 0, 0, .4)',
    white4: 'rgba(255, 255, 255, .4)',
    black5: 'rgba(0, 0, 0, .5)',
    white5: 'rgba(255, 255, 255, .5)',
    black6: 'rgba(0, 0, 0, .6)',
    white6: 'rgba(255, 255, 255, .6)',
    black7: 'rgba(0, 0, 0, .7)',
    white7: 'rgba(255, 255, 255, .7)',
    black8: 'rgba(0, 0, 0, .8)',
    white8: 'rgba(255, 255, 255, .8)',
    black9: 'rgba(0, 0, 0, .9)',
    white9: 'rgba(255, 255, 255, .9)',
    gray1: '#f7fafc',
    gray2: '#edf2f7',
    gray3: '#e2e8f0',
    gray4: '#cbd5e0',
    gray5: '#a0aec0',
    gray: '#a0aec0',
    gray6: '#718096',
    gray7: '#4a5568',
    gray8: '#2d3748',
    gray9: '#1a202c',
    red1: '#fff5f5',
    red2: '#fed7d7',
    red3: '#feb2b2',
    red4: '#fc8181',
    red5: '#f56565',
    red6: '#e53e3e',
    red7: '#c53030',
    red8: '#9b2c2c',
    red9: '#742a2a',
    orange1: '#fffaf0',
    orange2: '#feebc8',
    orange3: '#fbd38d',
    orange4: '#f6ad55',
    orange5: '#ed8936',
    orange: '#ed8936',
    orange6: '#dd6b20',
    orange7: '#c05621',
    orange8: '#9c4221',
    orange9: '#7b341e',
    yellow1: '#fffff0',
    yellow2: '#fefcbf',
    yellow3: '#faf089',
    yellow4: '#f6e05e',
    yellow5: '#ecc94b',
    yellow: '#ecc94b',
    yellow6: '#d69e2e',
    yellow7: '#b7791f',
    yellow8: '#975a16',
    yellow9: '#744210',
    green1: '#f0fff4',
    green2: '#c6f6d5',
    green3: '#9ae6b4',
    green4: '#68d391',
    green5: '#48bb78',
    green: '#48bb78',
    green6: '#38a169',
    green7: '#2f855a',
    green8: '#276749',
    green9: '#22543d',
    teal1: '#e6fffa',
    teal2: '#b2f5ea',
    teal3: '#81e6d9',
    teal4: '#4fd1c5',
    teal5: '#38b2ac',
    teal: '#38b2ac',
    teal6: '#319795',
    teal7: '#2c7a7b',
    teal8: '#285e61',
    teal9: '#234e52',
    blue1: '#ebf8ff',
    blue2: '#bee3f8',
    blue3: '#90cdf4',
    blue4: '#63b3ed',
    blue5: '#4299e1',
    blue: '#4299e1',
    blue6: '#3182ce',
    blue7: '#2b6cb0',
    blue8: '#2c5282',
    blue9: '#2a4365',
    indigo1: '#ebf4ff',
    indigo2: '#c3dafe',
    indigo3: '#a3bffa',
    indigo4: '#7f9cf5',
    indigo5: '#667eea',
    indigo: '#667eea',
    indigo6: '#5a67d8',
    indigo7: '#4c51bf',
    indigo8: '#434190',
    indigo9: '#3c366b',
    purple1: '#faf5ff',
    purple2: '#e9d8fd',
    purple3: '#d6bcfa',
    purple4: '#b794f4',
    purple5: '#9f7aea',
    purple: '#9f7aea',
    purple6: '#805ad5',
    purple7: '#6b46c1',
    purple8: '#553c9a',
    purple9: '#44337a',
    violet1: '#fff5f7',
    violet2: '#fed7e2',
    violet3: '#fbb6ce',
    violet4: '#f687b3',
    violet5: '#ed64a6',
    violet: '#ed64a6',
    violet6: '#d53f8c',
    violet7: '#b83280',
    violet8: '#97266d',
    violet9: '#702459',

    pink1: '#fff5f7',
    pink2: '#fed7e2',
    pink3: '#fbb6ce',
    pink4: '#f687b3',
    pink5: '#ed64a6',
    pink: '#ed64a6',
    pink6: '#d53f8c',
    pink7: '#b83280',
    pink8: '#97266d',
    pink9: '#702459',
}

function aggregateRegexFromHashmap(
    map,
    regexTemplate = '^($1)(\\S+)'
) {
    const storage = new Storage()
    const store = []

    for (let item of sorted(Object.keys(map))) {
        storage.add(item[0], item)
    }

    storage.forEach((k, v) => {
        storage.store[k] = sorted(v, len, true)
    })

    storage.forEach((k, v) => {
        v.length == 1
            ? store.push(v[0])
            : store.push(
                  k +
                      oldNcg(
                          '(?:$1)',
                          v.map((x) => x.slice(1))
                      )
              )
    })
    //console.log(store)

    return oldNcg(regexTemplate, store)
}

function cssIncrementColor(value, direction) {
    const commentCaptureRE = /\/\* *(.*?) *\*\//
    const colorKey = search(commentCaptureRE, value)
    const [color, index] = splitNumberBoundary(colorKey)
    const ref = tailwindStorage[color]
    const newIndex = modularIncrement(
        index,
        direction,
        0,
        ref.length - 1
    )
    return ref[newIndex] + ' ' + blockComment(color + newIndex)
}
function isCssColorKey(key) {
    const colors = ['color', 'background', 'border-color']
    return colors.includes(key)
}
function cssIncrement(key, value, direction = 1) {
    let ref = cssPresets[key]
    if (ref) return modularIncrement(ref, value, direction)
    if (!cssNumberKeys.includes(key)) return

    let [number, unit] = splitNumberBoundary(value)
    let increment = getIncrement(key, number)
    return number + direction * increment + unit

    function getIncrement(key, n) {
        const decimals = ['line-height', 'opacity']
        if (decimals.includes(key)) return 0.1
        if (n < 1) return 1
        if (n < 10) return 1
        if (n < 50) return 5
        if (n < 100) return 20
        if (n < 1000) return 100
        return 500
    }
}

const cssIncrementTable = {
    opacity: { min: 0, max: 1, increment: 0.1, unit: '' },
    'line-height': { min: 1, max: 2, increment: 0.1, unit: '' },
    'border-width': {
        min: 1,
        max: 2,
        increment: 0.1,
        unit: '',
    },
    'border-radius': {
        min: 0,
        max: 10,
        increment: 1,
        unit: 'px',
    },
    'font-weight': {
        min: 500,
        max: 900,
        increment: 100,
        unit: '',
    },
    // ----------------------------------------------------,
    top: { min: 0, max: 100, increment: 5, unit: '%' },
    left: { min: 0, max: 100, increment: 5, unit: '%' },
    right: { min: 0, max: 100, increment: 5, unit: '%' },
    bottom: { min: 0, max: 100, increment: 5, unit: '%' },
    //bottom: { min: 0, max: 100, increment: 'dynamic', unit: 'px' },
    // ----------------------------------------------------,
    padding: {
        min: 0,
        max: 100,
        increment: 'dynamic',
        unit: 'px',
    },
    margin: {
        min: 0,
        max: 100,
        increment: 'dynamic',
        unit: 'px',
    },
    width: {
        min: 0,
        max: 100,
        increment: 'dynamic',
        unit: 'px',
    },
    height: {
        min: 0,
        max: 100,
        increment: 'dynamic',
        unit: 'px',
    },
    'min-height': {
        min: 0,
        max: 100,
        increment: 'dynamic',
        unit: 'px',
    },
    'min-width': {
        min: 0,
        max: 100,
        increment: 'dynamic',
        unit: 'px',
    },

    'font-size': { min: 16, max: 96, increment: 8, unit: 'px' },
    'border-radius': {
        min: 0,
        max: 10,
        increment: 1,
        unit: 'px',
    },
}

// the temperature

//cshpos
//csho
//cshcolor
//cshkf
//cshclasses
//cshtimelinecoerceToNumber
//splitOptionalComma
//brackify
//hasColon
//curryEnd
//curryStart
//hasDash
//

const cssPresets = {
    display: [
        'inline-block',
        'inline',
        'block',
        'grid',
        'flex',
    ],
    overflow: ['hidden', 'scroll', 'auto'],
    'text-transform': ['capitalize', 'uppercase', 'lowercase'],
    'font-family': [
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen',
        //'Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue',
        //'sans-serif',
        //'bebas',
        //'Times',
        //'Georgia',
        //'Garamond',
        //'Source Code Pro, Consolas, Monaco, Menlo, Consolas, monospace',
    ],
    'font-family': googleFonts,
    position: ['absolute', 'relative', 'unset'],
    'justify-content': [
        'space-evenly',
        'center',
        'space-between',
        'unset',
        'flex-start',
    ],
    'text-align': ['center', 'unset'],
    'align-items': ['center', 'unset', 'stretch'],
    'flex-direction': ['column', 'row'],
}

//console.log(coerceToNumber('7px'))
//console.log(cssIncrement('margin', 0, 1))
//console.log(cssIncrement('margin', 5, 1))
//console.log(cssIncrement('margin', 15, 1))
//console.log(cssIncrement('margin', 35, 1))

//console.log(cssIncrement('margin', '5%', -1))
//console.log(cssIncrement('margin', 5, -1))
//console.log(cssIncrement('margin', 15, -1))
// value of the updated.

function cssGridItems(s, nameRef) {
    const items = split(s, /, *|  +|\/ */)
    const uniqueLetters = getUniqueLetters(s)
    const longest = getLongest(items, (x) => x.length, Number)
    console.log({ nameRef, uniqueLetters })
    assert(nameRef && uniqueLetters.length == nameRef.length)
    const ref = zip(uniqueLetters, nameRef)
    return items.map(runner).map((x) => x.map((y) => ref[y]))

    function runner(s) {
        let letters = split(s, '')
        let length = letters.length
        if (length == longest) {
            return letters
        } else {
            return fillTo(letters, longest)
        }
    }
}

function cssGridAreaChild(name) {
    return `.${name} { grid-area: ${name}; height: 100%; }`
}

//display({cssParserGlobalREGEX})
//console.log(cssIncrement('border-radius', '5px', -1))
//console.log(cssIncrement('background', '/* blue3 */', -1))
//console.log(cssParser('body', 'cmblue4'))
//console.log(cssParser('body', 'cmblue4'))
//console.log(cssParser('body', 'cmblue4'))
//console.log(cssParser('body', 'cmblue4'))
//console.log(cssParser('body', 'cmblue4'))
//console.log(cssParser('body', 'sans'))
//l p
//console.log(cssPartition(alist ['a', 'b', 'c', 'd', 'e']))
//console.log(cssPartition(['a', 'b', 'c', 'd'], 2))
//console.log(ecCol('fo', ['gg', 'hh', 'mjh'], '', {center: 1}))
//
//
//
//
//

//console.log(aggregateCSS(cssParser('body', 'cmblue4') + '\n'+  cssColumns('fo', ['ggbo', 'bo'], 'ab', {center: 1}), Object))
//console.log(aggregateCSS(s, String))
//s='-40-40'
//s='bot50'
//s='-400px rel'

function combineSimilarCssPropertiesIntoNewClass(s) {
    const storage = aggregateCSS(s, Storage)
    //console.log(storage)
    for (let [k, v] of Object.entries(storage.entries)) {
        //inprogress
    }
}

//console.log(combineSimilarCssPropertiesIntoNewClass(s))

function cssUnderline(b) {
    const thickness = 1
    const color = b ? cssColor(b) : 'black'
    return [
        ['border-bottom', `${thickness}px solid ${color}`],
        ['padding-bottom', `${thickness * 3}px`],
    ]
}

function gradientColor(b) {
    return match(/\w\w/g, b)
        .map(partial(cssColor, false))
        .join(', ')
}

function cssGradient(b) {
    const value = `linear-gradient(to right, ${gradientColor(
        b
    )})`
    return [
        ['-webkit-background-clip', 'text'],
        ['-webkit-text-fill-color', 'transparent'],
        ['background-image', value],
    ]
}

function cssList() {
    s = `

    nlsol {
  counter-reset: orderedlist;
}

ol li::before {
  'counter-increment': orderedlist;
  'content': counter(orderedlist);
}
li::before {
    font-family: "Indie Flower";
    font-size: 1.25em;
    line-height: 0.75;
    width: 1.5rem;
    padding-top: 0.25rem;
    text-align: center;
    color: #fff;
    background-color: purple;
    border-radius: 0.25em;
}
`
}

function cssFontFamily(b) {
    console.log(b)
    return fuzzyMatch(b, ['sans'])
}

function formatCssAsHtml(s) {
    const x = cssDecompose(s)
    if (!x) return
    let { properties, name } = x
    return divify('div', 'css-text', [
        divify('h4', 'css-selector-name', name),
        divify(
            'ul',
            'css-prop-list',
            properties.map(([k, v]) => {
                return divify('div', '', [
                    divify('span', 'css-prop-key', k),
                    divify('span', 'css-prop-value', v),
                ])
            })
        ),
    ])
}

function cssSingletonParser(s) {
    return cssSpellcheck(s).split(/ *[=:;] */)
}

const cssSpellcheck = spellcheckf(cssReplacementDictionary)
const cssParserGlobalREGEX =
    aggregateRegexFromHashmap(cssattrmap)
//console.log(cssParserGlobalREGEX)
//console.log(cssParserGlobalREGEX)

function hasDashedLine(s) {
    return test(/^--+$/m, s)
}
function mixedHtmlCssParser(s) {
    let [a, b] = hasDashedLine(s)
        ? splitThePage(s)
        : splitHtmlCss(s)
    let html
    let css
    if (a) {
        html = toVueHtml(a)
        html = prettifyHtml(html)
    }
    if (b) {
        css = cssValueGetter(b, Object)
    }
    return [html, css]
}

function isRawBracketCss(s) {
    return test(/^\w+ {/, s)
}
function cssValueGetter(s, mode) {
    if (mode == String) {
        return reduceToString(linegetter(s), (item) => {
            let [a, b] = splitCssNameAndValue(item)
            let name = cssNameParser(a)
            return cssParser(name, b)
        })
    }

    if (mode == Object) {
        return reduce(linegetter(s), (item, i) => {
            let [a, b] = splitCssNameAndValue(item)
            let name = cssNameParser(a)
            return [
                removeStartingSymbols(name),
                cssParser(name, b),
            ]
        })
    }
}

function inferLanguage(s) {
    if (hasDashedLine(s)) {
        return 'html'
    }
    return 'js'
}

function splitCssNameAndValue(s) {
    if (test(/: /, s)) {
        return splitonce(s, ': ')
    }
    return splitonce(s)
}

function prettifyHtml(s) {
    return s.replace(/ *[{}]+ */g, '')
}

function cssNameParser(s) {
    const dict1 = {
        nt: 'nth-of-type',
        nc: 'nth-child',
    }
    const dict2 = {
        foo: 'boo',
    }

    const dicts = [dict1, dict2, cssSelectorSuffixes]
    const regex = ncg('($1)(\\d+)|:($3)', dicts, 'g')
    s = s.replace(/^\w+/, cssAddPeriod)
    s = s.replace(regex, (_, a, b, c, d) => {
        if (a) {
            return `:${dict1[a]}(${b})`
        }
        if (c) {
            return `:${cssSelectorSuffixes[a]}(${b})`
        }
    })
    return s
}

function cssParseFromString(s) {
    if (hasBracket(s) || /^@/.test(s)) {
        return s
    }
    if (isRawBracketCss(s)) {
        const chunks = schemaMatch(
            '^.?$word {$symbols}',
            s,
            'gm'
        )
        return reduceToString(chunks, (name, items) => {
            name = cssNameParser(name)
            let values = items.reduce(cssItemReducer, [])
            return toCssFinalProduct(name, values)
        })
    }

    return reduceToString(linegetter(s), (item) => {
        let [a, b] = splitCssNameAndValue(item)
        let name = cssNameParser(a)
        return cssParser(name, b)
    })
}

function gridify(n, key = 'rows') {
    const opposites = {
        rows: 'column',
        columns: 'row',
    }
    const oppositeKey = opposites[key]
    const verticalColumnGridTemplate = `
      display: grid;
      grid-template-${key}: repeat(${n}, 1fr)
      grid-auto-flow: ${oppositeKey};
    `
    return verticalColumnGridTemplate
}

//console.log(cssParser('bbb3', 'bgr1'))
//console.log(toCssFinalProduct('a', cssEvaluator('bbb3 bgr1')))

//console.log(fixSelector('.sdf'))
//text = 'wh40 jic'
//const dict = cssEvaluator(text)
//const cssValue = cssReduce(dict)
//console.log({cssValue})

//console.log(cssParser(null, 'bgp 1010'))
//console.log(cssParser(null, 'bgg v3v7'))
//console.log(cssParser(null, 'fflato'))
//console.log(cssEvaluator('2020'))
//console.log(cssGridArea('tom', ['a', 'b', 'c'], 'ab/cc'))
//cssIncrement('font-family', 1, 1)
//console.log(cssIncrement('font-family', null, 1))
//console.log(cssEvaluator('2020'))
//console.log(cssEvaluator('2020'))
//console.log(cssEvaluator('2020'))
//console.log(cssEvaluator('2020'))
//console.log(cssEvaluator('2020'))
//console.log(cssEvaluator('2020'))
//console.log(cssEvaluator('2020'))
//console.log(cssEvaluator('bb1b3'))
//console.log(cssEvaluator('btlr5'))
//console.log(cssEvaluator('bru'))
//console.log(cssEvaluator('o5'))
//console.log(cssEvaluator('o5'))
//console.log(cssEvaluator('o5'))
//console.log(cssEvaluator('fcb5'))
//console.log(cssEvaluator('bot10 top10 left10 right10 l20 r20p t30em'))
//console.log(cssParser('vim-modes', 'p5 aic flex jcs a b0 r0 cmb7 fs18 h60px w240px fw600 sans z1000'))
//console.log(cssEvaluator('fccc'))

function transitionTransformer(parent, args) {
    const transitions = []
    const values = {}
    const dict = {
        rotateY: 'transform',
        rotateX: 'transform',
    }

    args.forEach(([a, b]) => {
        let first = getFirstWord(a)
        let key = dict[first] || first
        if (!b) b = '1s'
        transitions.push(key + ' ' + b)
        a = a.replace(RegExp('^' + key + ' *', ''), '')
        values[key] = a
    })
    let s = ''

    s += toCssFinalProduct(parent + '-active', {
        transition: transitions.join(', '),
    })
    s += '\n'
    if (parent.endsWith('leave')) parent += '-to'
    s += toCssFinalProduct(parent, values)
    return s
}
function aggregator(
    s,
    parser,
    {
        splitRE = / +\.\.\. +/,
        chunkRE = /\n\n+/,
        join = true,
    } = {}
) {
    const store = []
    split(s, chunkRE).forEach((item, i) => {
        let [parent, b] = splitonce(linegetter(item))
        let temp = b.map((x) => splitonce(x, splitRE))
        store.push(parser(parent, temp))
    })
    return join ? store.join('\n\n') : store
}
//console.log(foo(s, parser))
ts = `

.spin-enter-active { transition: opacity 1s, transform 0.75s    }
.spin-leave-active { transition: opacity 0.75s; } 

.spin-enter {
    transform: rotateY(540deg);
    opacity: 0;
}
.spin-leave-to { opacity: 0;       }
`

// perhaps it caches the css.

//

t4 = `
feeling tired ...
write a letter a day ... do what you can do

img:hover {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.5s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}



@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
`

function cssQuery(breakpoint, css, minOrMax = 'max') {
    const breakpoints = {
        small: 480,
        medium: 768,
    }

    breakpoint = breakpoints[breakpoint] || 1600

    if (isNumber(breakpoint) || !breakpoint.endsWith('px'))
        breakpoint += 'px'

    let top = `@media only screen and (${minOrMax}-width: ${breakpoint})`
    return brackify(top, css)
}
//console.log(cssQuery(230, "foo\ngoo"))
function setCssBreakPoint() {}

function cssDefineAlias(s) {}

function divide10(x) {
    if (x % 10 == 0) return x / 10
    return x
}

/* record audio clips */
/* get the css pretty */
/* be on this page when u do it */

function cssImport(s) {
    return `@import url(${s});`
}

function cssVar(s) {
    return `var(--${s})`
}

function cssTransformVariables() {
    let storage = aggregateCSS(read('_utils.css'), Storage)

    editStorage(storage, (k, v, parent) => {
        if (/^(?!0)\d+/.test(v)) {
            let name = getFirstWord(parent) + '-' + k
            storage.add(':root', '--' + name, v)
            return cssVar(name)
        }
    })

    return cssToString(storage)
}

//console.log(cssTransformVariables())
//console.log(cssEvaluator('pl10 pt20 pb30 pr50'))
//console.log(cssEvaluator('bot0%'))

//t=['.active-element {\n    background: #63b3ed /* blue4 */;\n}', '', '.wrapper {\n    font-size: 30rem;\n}\n.wrapper {\n    font-size: 2rem;\n}', '.input-item {\n    border-color: #63b3ed /* blue4 */;\n}\n.input-item {\n    font-size: 0.3rem;\n}']
s = `
.abc {
    top: unset;   
    top: 20,
}

.abc {
    top: 200,
    top: unset;   
}

.abc {
    top: 20,
    top: unset;   
}

.abc {
    top: 20444,
}
`

//console.log(aggregateCSS(s))
/* need to draw in some lines */
/*  */

s = `

.blog-shadow-dreamy {
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
}

.shadow-shorter {
  box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
              0 2px 2px rgba(0,0,0,0.11), 
              0 4px 4px rgba(0,0,0,0.11), 
              0 6px 8px rgba(0,0,0,0.11),
              0 8px 16px rgba(0,0,0,0.11);
}

.shadow-longer {
  box-shadow: 0 2px 1px rgba(0,0,0,0.09), 
              0 4px 2px rgba(0,0,0,0.09), 
              0 8px 4px rgba(0,0,0,0.09), 
              0 16px 8px rgba(0,0,0,0.09),
              0 32px 16px rgba(0,0,0,0.09);
}

.shadow-4 {
  box-shadow: 0 1px 1px rgba(0,0,0,0.15), 
              0 2px 2px rgba(0,0,0,0.15), 
              0 4px 4px rgba(0,0,0,0.15), 
              0 8px 8px rgba(0,0,0,0.15);
}

.shadow-6 {
  box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
              0 2px 2px rgba(0,0,0,0.11), 
              0 4px 4px rgba(0,0,0,0.11), 
              0 8px 8px rgba(0,0,0,0.11), 
              0 16px 16px rgba(0,0,0,0.11), 
              0 32px 32px rgba(0,0,0,0.11);
}

.shadow-5 {
  box-shadow: 0 1px 1px rgba(0,0,0,0.12), 
              0 2px 2px rgba(0,0,0,0.12), 
              0 4px 4px rgba(0,0,0,0.12), 
              0 8px 8px rgba(0,0,0,0.12),
              0 16px 16px rgba(0,0,0,0.12);
}

.blog-shadow-sharp {
  box-shadow: 0 1px 1px rgba(0,0,0,0.25), 
              0 2px 2px rgba(0,0,0,0.20), 
              0 4px 4px rgba(0,0,0,0.15), 
              0 8px 8px rgba(0,0,0,0.10),
              0 16px 16px rgba(0,0,0,0.05);
}

.blog-shadow-diffuse {
    box-shadow: 0 1px 1px rgba(0,0,0,0.08), 
                0 2px 2px rgba(0,0,0,0.12), 
                0 4px 4px rgba(0,0,0,0.16), 
                0 8px 8px rgba(0,0,0,0.20);
}


`

function cabify(s) {
    s = aggregateCSS(s, Storage)
    let obj = {}
    for (let [a, b] of s) {
        let name = abbreviate(a)
        obj[name] = Object.entries(b)
    }
    e.appendVar('cabmap2', obj)
}
//console.log(cabify(s))
//Object.assign(cabmap, cabmap2)

//console.log(cssEvaluator('m50'))

s = `
<link>

@import
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@1,300&family=Long+Cang&family=Ma+Shan+Zheng&family=Noto+Sans+SC:wght@100;300;400;500;700&family=Noto+Serif+SC:wght@500&display=swap" rel="stylesheet">

font-family: 'Cormorant', serif;
font-family: 'Long Cang', cursive;
font-family: 'Ma Shan Zheng', cursive;
font-family: 'Noto Sans SC', sans-serif;
font-family: 'Noto Serif SC', serif;
`

//console.log(cssEvaluator('gradb3r7'))
//console.log(cssEvaluator('gapx30'))
//console.log(cssEvaluator('bgw1'))
//console.log(cssEvaluator('br0.5b7'))
//
//

s = `

.a {
    margin-top: 23;
}

.a {
    margin: 0;
}
`

//console.log(cssEvaluator('ml0%'))
//console.log(cssEvaluator('fixed'))
//console.log(cssEvaluator('fixed'))

s = `

.my-stuff-app-container {
    display: grid;
    grid-template-columns: auto 1fr;
    row-gap: 40px;
    column-gap: 10px;
    width: calc(100% - $40px);
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    border-top: 3px solid #2b6cb0 /* blue7 */;
    padding: 0;
}
.xfobob {
    border-top: 3px solid #2b6cb0 /* blue7 */;
    padding: 10;
}

`

//console.log(aggregateCSS(s, String))

function cssFontFace(url) {
    let fontName = `${toDashCase(removeExtension(tail(url)))}`
    //url = `/home/kdog3682/CWF/public/fonts/${url}`
    url = `./fonts/${url}`
    let ext = getExtension(url)
    let format = ext == 'ttf' ? " format('truetype')" : ''
    return `
    @font-face {
      font-family: "${fontName}";
      src: local("${url}")${format};
    }
    `
    //font-weight: bold;
}
//console.log(cssEvaluator('bgblack'))

function isCssSymbol(s) {
    return test(/^[:#.*]/, s)
}
function fixSelector(s) {
    if (isCssSymbol(s)) return s
    return '.' + s
    if (isStandardHtml(s)) return s
}
//console.log(cssEvaluator('ffsans'))
//console.log(cssEvaluator('ffsans'))
//console.log(fuzzyMatch('sans', ['sans']), 'd')
//console.log(cssEvaluator('ts33,-3'))
function addCssToCabmap(s) {
    self(stringify(aggregateCSS(removeComments(s), Array)), 1)
}
//console.log(cssEvaluator('rc'))
//console.log(cssEvaluator('letter'))
//console.log(cssEvaluator('cols4')) /* not in use */
//console.log(cssEvaluator('striped'))

function cssName(name, pseudo, child, suffix = 'child') {
    if (!name) return
    if (child == '*') name += ` > *`
    else if (child) name += ` > *:nth-${suffix}(${child})`
    if (pseudo) name += ` :: ${getAlias(pseudo, 'pseudo')}`
    return name
}

//let regex = /(\S+) *: *([^\s;]+)(?: \/\*(.+?)\*\/)? *;/
//console.log(cssParser('hi', cssEvaluator('mb60')))
//console.log(cssEntry('a', 'b'))

s = `

line-height 1
line-height 1 -1
foo 23 
foo 233
foo 2334 

foo 23 -1
foo 233 -1
foo 2334 -1
`
//testsuite(cssIncrement, s)

//s = cssParser('a', ['gg', 'x'])
//console.log(s)
//
//console.log(cssGtc(3))
//

//console.log(cssEvaluator('col2'))

function randomColor(s) {
    return randomPick(roygbiv)
}

//console.log(cssParser('hi', {border: '1px'}))
//
// Not everyone had the opportunities and time that I had.
// With only 1 month to live:
// I would go all out.
// I would absolutely go all out.
// I would have absolutely told Ryan about the opportunity.
// With only one-month left.

function cshpos(a, b, mode) {
    const ref = {
        p: '%',
        e: 'em',
        x: 'px',
    }

    const unit = ref[mode] || 'px'

    return {
        top: a + unit,
        left: b + unit,
    }
}

function csho(a, n) {
    const ref = {
        o: 'opacity',
        d: 'delayAfter',
        d: 'delay',
        db: 'delayBefore',
        t: 'duration',
    }
    const key = ref[a]
    return {
        [key]: n,
    }
}

function cshcolor(mode, color, shade, thickness) {
    const colorName = roygbiv.find((x) => color == x[0])
    const colorValue = tailwind[colorName + (shade || 5)]
    const ref = {
        t: 10,
        s: 3,
    }
    const stroke = ref[thickness] || 5

    if (mode == 'b') return { background: colorValue }
    if (mode == 'u')
        return {
            borderBottom: stroke + ' px solid ' + colorValue,
        }
    return { color: colorValue }
}

function cshkf(s) {
    const keyframes = s
        .trim()
        .split(/\n\n+/)
        .map((item, i) => {
            return item.split('\n').map(cssShorthand)
        })

    return keyframes
}

function cshclasses() {
    const classStyles = s
        .trim()
        .split(/\n+/)
        .map((item, i) => {
            let [a, b] = splitonce(item)
            return cssParser(a, b)
        })
    const s = joined(classStyles)
    return s
}

function cshtimeline() {
    const p = cshkf(kf)
    return p
}
//console.log(cssParser('hi', 'cg1'))

s = `

.arrow {
  width: 120px;
}

.line {
  margin-top: 14px;
  width: 90px;
  background: blue;
  height: 10px;
  float: left;
}

.point {
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 30px solid blue;
  float: right;
}

`
//console.log = display
//console.log(aggregateCSS(s, 'css-variables'))
//console.log(cssParser('hi', '18 bold center 23 thickness4'))
//console.log(cssEvaluator({'thickness': 4}))
//console.log(cssEvaluator('bt4'))

function cssToVar(b) {
    return b.replace(
        /\$[a-zA-Z]+/,
        (x) => 'var' + parens('--' + x.slice(1))
    )
}
function cssWrapper(k, v) {
    return [k, v]
}

function zooper(s) {
    console.log(
        write(
            file,
            aggregateCSS(
                read('/home/kdog3682/CWF/public/' + file),
                String,
                /^(?:v)/
            )
        )
    )
}
function toPixels(s, f = identity) {
    let px = /\d$/.test(s) ? 'px' : ''
    return f(s) + px
}
//console.log(cssEvaluator({background: 'red'}))
function isUnitLess(k) {
    const a = ['lineHeight', 'line-height', 'z-index']
    return a.includes(k)
}
//console.log(cssEvaluator('rc'))
//console.log(cssEvaluator('rc'))
//console.log(cssEvaluator('rc'))
function isDecimal(s) {
    return /^\d+\.\d+$/.test(s.toString())
}
//console.log(cssReduce(cssEvaluator('w40')))
//console.log(cssEvaluator('underline h50 fc'))

class HTMLWriter {
    wrap(tag = 'div') {
        this.s = divify(tag, '', this.s)
        return this
    }
    constructor() {
        this.reset()
    }
    toString() {
        return this.s
    }
    create() {
        return new HTMLWriter()
    }
    reset() {
        this.s = ''
        this.count = 0
    }
    combine(...args) {
        let s = []
        for (let arg of args) {
            let name = getConstructorName(arg)
            if (name == 'HTMLWriter') {
                s.push(arg.toString())
            }
            else if (name == 'Array') {
                s.push(join(arg.map(String)))
            } else {
                s.push(arg)
            }
        }
        return s.join('\n\n')
    }

    p(a, b) {
        return this.divify(a, b, 'p')
    }

    span(...args) {
        return this.divify(...args)
    }

    divify(s, style, tag = 'span', options = null) {
        if (!options) {
            options = {style: cssReduce(cssEvaluator(style))}
        }
        this.s += divify(tag, options, s)
        return this
    }
    bold(s, style = '') {
        return this.divify(s, 'bold ' + style)
    }
    ol(s, count) {
        return this.bold((count + 1) + '.', 'mr5').span(s).wrap('div')
    }
    colon(s = 'mr5') {
        return this.divify(': ', s)
    }
    url(link, name) {
        let options = {
            href: fixUrl(link) 
        }
        return this.divify(name || link, null, 'a', options)
    }
}

function divify(tag, attrs, x) {
    if (!x) x = ''
    if (!attrs) attrs = ''

    let s = toOpeningTag(tag, attrs)

    if (tag == 'input' || tag == 'hr') {
    } else if (
        isArray(x) ||
        (isString(x) && (hasNewline(x) || hasHtml(x)))
    ) {
        s += newlineIndent(x)
    } else {
        s += x
    }

    return s + toClosingTag(tag)
}
function toOpeningTag(tag, attrs) {
    let s = ''
    let spaces = ' '

    const suffix = hasHtmlSuffix(tag) ? '>' : '/>'
    if (isString(attrs)) {
        if (/^[\w-]+$/.test(attrs)) {
            attrs = attrEntry('class', attrs)
        }
        return '<' + tag + ' ' + attrs + suffix
    }

    for (let [k, v] of prepareIterable(attrs, 'entries')) {
        if (!exists(v)) {
            continue
        }
        s += spaces
        if (k == 'classNames') {
            s += attrEntry('class', v.join(' '))
        } else if (k == 'class' || k == 'className') {
            if (/^[A-Z]/.test(v)) {
                v = toDashCase(v)
            }
            s += attrEntry('class', v)
        } else if (k == 'dataAttributes') {
            s += v.join(' ')
        } else {
            s += attrEntry(k, v)
        }
    }

    return '<' + tag + s + suffix
}
function hasHtmlSuffix(el, force) {
    if (force) return true
    const closers = [
        'style',
        'footer',
        'header',
        'p',
        'pre',
        'script',
        'body',
        'ul',
        'li',
        'p',
        'textarea',
        'button',
        'section',
        'div',
        'h1',
        'h2',
        'h3',
        'main',
        'blockquote',
        'span',
        'article',
        'body',
        'html',
        'head',
        'template',
        'h4',
        'h5',
        'h6',
    ]
    return closers.includes(el)
}
function attrEntry(a, b, newline) {
    if (b == null || b == '') return ''
    if (isArray(a)) {
        newline = b
        b = a[1]
        a = a[0]
    }
    return `${a}=${addQuotes(b)}${newline ? '\n' : ''}`
}
function addQuotes(s) {
    let quoteRE = /^(?:".*?"|'.*?')/
    if (test(quoteRE, s)) {
        return s
    }
    return quotify(s, '"')
}
function hasHtml(s) {
    return test(/<\/?[a-z\/]/, s)
}
function toClosingTag(el) {
    const noclosers = ['input', 'hr', 'br', 'link', 'img']
    if (noclosers.includes(el)) return ''
    if (looksLikeComponent(el)) return ''
    return '</' + el + '>'
}
function looksLikeComponent(s) {
    return /-/.test(s) || /^[A-Z]/.test(s)
}
function fixUrl(s) {
    if (s.includes('kdog3682')) return 'file:///' + s
    s = s.replace(/view-source:/, '')
    if (!test('^http', s)) s = 'https://' + s
    if (!s.includes('.')) s += '.com'
    return s
}

function upcomingDate(day = 'sunday', mode = String) {
const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]
    const index = isNumber(day)
        ? day
        : weekdays.indexOf(capitalize(day))

    const date = new Date()
    while (true) {
        if (date.getDay() == index) {
            return mode == String ? datestamp(date, '/') : date
        }
        date.setTime(date.getTime() + 86400000)
    }
}

function cwtEmailCoursework(data) {
    const html = new HTMLWriter()
    const online = []
    const attachmentIds = []
    const body = []

    data.forEach(({ name, id, link }, i) => {
        name = removeExtension(name)
        online.push(parseOnline(name, link))
        body.push(parseBody(name, i))
        attachmentIds.push(id)
    })

    function parseOnline(name, link) {
        return `<li><div><a href="${link}">${name} link</a></div></li>`
        //return html.create().bold(name).colon().url(link).wrap('ul')
    }
    function parseBody(name, i) {
        return html.create().ol(name, i)
    }

    const onlineStatement = html.bold(
        'Google Classroom Links:',
        'mb5'
    )
    const bodyPayload = html.create().combine(
        '<br/>',
        body,
        '<br/>',
        onlineStatement,
        online,

    )
    return {
        value: bodyPayload
    }
}

//console.log(cwtEmailCoursework(read('clip.js')))
//console.log(upcomingDate('saturday'))
