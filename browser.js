const popularFonts = [
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

function dl(s) {
    download(datestamp() + '.json', s)
}

function ecFilterFactory() {
    const elementFilterIgnoreRE =
        /null|fade|^cm-|lego|v-?list|hidden|\"/
    const elementFilterIgnore = [
        'mtable',
        'centered',
        'arraycolsep',
        'col-align-r',
        'hline',
        'msupsub',
        'pstrut',
        'mq-textarea',
        'mq-root-block',
        'mclose',
        'element-controller-component',
        'main',
        'div',
        'katex-mathml',
        'katex-html',
        'katex',
        'mord',
        'strut',
        'mspace',
        'mrel',
        'base',
        'mbin',
        'console-panel',
        'active-element',
        'display',
        'console',
        'center',
        'message-list',
        'intro',
        'list',
        'list-child',
        'code-mirror',
        'cm-editor',
        'message-item',
        'btn',
        'vlist-s',
        'mfrac',
        'mopen',
        'mpunct',
        'sizing',
        'frac-line',
    ]

    const elementFilterAllow = [
        'code-mirror',
        'v-list-container',
        'v-listicle',
        'v-listicle-item',
        'v-list-item',
    ]

    return allowIgnoreFilterFactory(
        elementFilterAllow,
        elementFilterIgnore,
        elementFilterIgnoreRE
    )
}

function fontLoader() {
    const obj = {
        'Crimson Text': [400, 500, 600],
        Inconsolata: [400, 500, 600],
        'Noto Emoji': [300, 500, 500],
    }
    let base = 'https://fonts.googleapis.com/css?family='
    let s = reduceToString(obj, (fontFamily, weights) => {
        return (
            '@import url("' +
            base +
            unCamelCase(fontFamily).replace(/ /g, '+') +
            //unCamelCase(fontFamily).replace(/\+/g, ' ') +
            ':' +
            //weights ?
            //numberRangeFromDash(weights).join(',') :
            '400,500,600' +
            '");'
        )
    })
    cssLoader(s)
}

const animationAliasKeys = {
    translate: 'transform',
    translateX: 'transform',
    translateY: 'transform',
    rotate: 'transform',
}
function postMessage(data) {
    window.parent.postMessage(stringify(data))
}
function iframeParentListener(callback) {
    if (!callback)
        callback = (x) => {
            console.log(x, 'was got from the child iframe')
        }
    window.addEventListener('message', (e) => {
        const data = JSON.parse(e.data)
        callback(data)
    })
}

function downloadLocalStorage(key) {
    const value = key ? getStorage(key) : runner()
    download('local-storage.json', value)
    function runner() {
        return JSON.stringify(localStorage)
    }
}

function download(file, content) {
    if (!exists(content)) {
        return
    }

    const element = createElement(
        'a',
        {
            href:
                'data:text/plain;charset=utf-8,' +
                encodeURIComponent(stringify(content)),
            download: file,
        },
        document.body
    )

    element.click()
    element.remove()
}

function setStorage(key, value = '', birth = null) {
    if (!exists(value)) return
    localStorage.setItem(key, stringify(value, birth))
}

function getStorage(key, fallback = {}, revive = null) {
    let item = localStorage.getItem(key)
    return item
        ? parseJSON(item, revive)
        : getFallback(fallback)

    function getFallback(x) {
        if (x == null) {
            return ''
        }

        if (x == Array) {
            return []
        }

        if (x == Object) {
            return {}
        }

        if (x == String) {
            return ''
        }

        if (x == Number) {
            return 0
        }
        return x
    }
}

function getBoundingClientRect(element) {
    let { height, width, top, left } =
        element.getBoundingClientRect()

    left += window.scrollX
    top += window.scrollY

    return {
        height: height + 'px',
        width: width + 'px',
        left: left + 'px',
        top: top + 'px',
    }
}

function isTypable(e) {
    if (e.altKey || e.ctrlKey) return
    let s = e.key || e
    return s.length == 1 || s == ''
}

function clearStorage(key) {
    key ? delete localStorage[key] : localStorage.clear()
}

function getClipboard(s) {
    return navigator.clipboard.readText()
}

function setClipboard(s) {
    if (!exists(s)) {
        return
    }
    console.log('setting clipboard')
    const value = stringify(s)
    console.log(value)
    return navigator.clipboard.writeText(value)
}

function scrollToTop(element) {
    if (!element) {
        window.scrollTo(0, 0)
        return
    }
    element.scrollTop = 0
}

function scrollToBottom(element) {
    if (!element) {
        //window.scrollTo(0, document.body.scrollHeight);
        window.scrollTo({ bottom: 0, behavior: 'smooth' })
        return
    }
    //setTimeout(() => (element.scrollTop = element.scrollHeight), 100)
    element.scrollIntoView({ behavior: 'smooth', block: 'end' })
}

function getStylesheets() {
    function runner(sheet) {
        try {
            //if (sheet.rules.length > 100) return
            return Array.from(sheet.cssRules).map(
                (x) => x.cssText
            )
        } catch (e) {
            return null
        }
    }
    return Array.from(document.styleSheets)
        .map(runner)
        .filter(exists)
}

function removeStylesheets() {
    Array.from(document.styleSheets).forEach((sheet) => {
        sheet.disabled = true
        sheet.parentNode.removeChild(sheet)
    })
}

function speak(input, rate = 1) {
    if (!exists(input)) {
        return
    }

    if (rate < 0.1 || rate > 1 || !isNumber(rate)) rate = 1
    isArray(input) ? (input = input.join(' ')) : input
    const speech = new SpeechSynthesisUtterance()
    speech.rate = rate
    speech.pitch = 0.9
    speech.text = input.toString().trimStart()
    window.speechSynthesis.speak(speech)
    console.log({ speech: speech.text })
}

//speec

function pretty(s, lang = 'js') {
    const prettierRef = {
        js: {
            parser: 'babel',
            plugins: prettierPlugins,
            arrowParens: 'always',
            bracketSpacing: true,
            printWidth: 70,
            tabWidth: 4,
            semi: false,
            singleQuote: true,
        },
        html: {
            parser: 'html',
            plugins: prettierPlugins,
        },
    }

    return prettier.format(s, prettierRef[lang || inferlang(s)])
}

function getFirstClassName(s) {
    if (isElement(s)) {
        s = s.className
    }
    return search(/[\w-]+/, s)
}
//function getClassName(s) {
//return getFirstClassName(s.className)
//}
function getClassNames(x, mode) {
    const known = ['katex-item', 'prose-item']
    function fn(name) {
        if (mode == 'all') return name
        if (name.includes(' ')) {
            let names = name.split(' ')
            let x
            while (names.length) {
                x = names.shift()
                if (known.includes(x)) continue
                return x
            }
        }
        return name
    }

    function runner(s) {
        const value = match(/class=" *(.*?) *"/g, s)
        return unique(flat(value.map(fn)))
    }

    if (x && isElement(x)) {
        return unique(split(x.className))
    } else {
        return runner(htmlgetter(x))
    }
}
function allClassNames(s) {
    let runner = (s) => match(/class=" *(.*?) *"/g, s)
    let items = runner(s || htmlgetter())
    items = map(items, (x) => split(x, ' '))
    return unique(flat(items))
}

function autoScroll(e) {
    e.scrollTop = e.scrollHeight
}

function elementgetter(el) {
    if (!el) {
        return
    }
    if (isVueNode(el)) {
        return el.$el
    }

    if (isElement(el)) {
        return el
    }

    if (isString(el)) {
        if (el.includes('#')) {
            return document.getElementById(el.slice(1))
        }
        const selector = fixSelector(el)
        const value = document.querySelector(selector)
        return value
    }
}
function assignStyle(el, ...args) {
    args.map(runner)

    function runner(style) {
        if (isCssWord(style)) {
            el.classList.add(style)
        } else if (isString(style)) {
            let styles = cssEvaluator(style)
            Object.assign(el.style, styles)
        } else if (isObject(style)) {
            let s = reduceObjectToString(style, sum, ' ')
            let styles = cssEvaluator(s)
            pprint(styles)
            Object.assign(el.style, styles)
        }
    }
}

class StorageSystem {
    constructor(key) {
        if (!key) key = toDashCase(getCaller(-1))
        this.key = key
        this._store = getStorage(this.key, {})
        this.config = {
            automaticUpload: false,
        }

        window.addEventListener('beforeunload', () => {
            if (this.touched) return
            if (this.config.automaticUpload) this.upload()
        })
    }

    get() {
        return this._store
    }

    upload() {
        this.touched = true
        const value = this._upload
            ? this._upload()
            : this._store
        console.log('uploading', this.key, this._store)
        setStorage(this.key, _this.store)
    }
}

class StorageSystem2 {
    constructor(options = {}) {
        this.key = options.key
        const [transformer, reviver] = options.revive
            ? [functionStringBirth, functionStringRevive]
            : [null, null]

        this.store = getStorage(this.key, {}, reviver)

        window.addEventListener('beforeunload', () => {
            if (options.exit) {
                const store = isFunction(options.exit)
                    ? options.exit(this.store)
                    : this.store
                setStorage(this.key, store, transformer)
            }
        })

        if (options.enter) {
            options.enter(this.store)
        }
    }

    get(key) {
        return this.store[key] || ''
    }

    set(key, value) {
        if (value == null) return
        this.store[key] = value
    }

    reset() {
        this.store = {}
    }

    static normalizeDateKey(key) {
        if (isDate(key && !isToday(key))) {
            return datestamp()
        }
        return key
    }

    static dateKey() {
        let n = 0
        let base = datestamp()
        while (Math.abs(n) < 3) {
            let date = changeDate(base, n--)
            if (date in localStorage) {
                return date
            }
        }
        return base
    }
    static normalizeData(key, data) {
        if (!exists(data)) {
            return { [key]: '' }
        } else if (isString(data)) {
            return { [key]: data }
        } else {
            return data
        }
    }
}

function raf(fn) {
    ;(
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (x) {
            setInterval(x, 1000 / 60)
        }
    )(fn)
}

function isTablet() {
    const userAgent = navigator.userAgent.toLowerCase()
    const isTablet =
        /(phone|ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
            userAgent
        )
    return isTablet
}

function scroll(y) {
    window.scrollTo(0, y)
}

const animationConfigKeys = {
    duration: 1,
    easing: 1,
    fill: 1,
    direction: 1,
}

function scrollDown() {
    scroll(1000)
}

function scrollUp() {
    scroll(0)
}

function animateObject(el, obj, options = {}) {
    const keyframe = {}
    const keyframes = [keyframe]
    //const options = {}
    for (let [k, v] of Object.entries(obj)) {
        if (k in animationAliasKeys) {
            if (isNumber(v)) {
                v += 'px'
            }
            v = k + parens(v)
            k = animationAliasKeys[k]
            keyframe[k] = v
        } else if (k in animationConfigKeys) {
            options[k] = v
        } else {
            keyframe[k] = v
        }
    }
    return el.animate(keyframes, options).finished
}

function toggleStyle(el, key) {
    let value = el.style[key]
    el.style[key] = opposite(value)
}
function highlight(el) {
    const inOutOptions = {
        duration: 500,
        iterations: 1,
        easing: 'ease-in-out',
        direction: 'alternate',
        fill: 'forwards',
    }

    el.animate(
        [
            {
                opacity: 0.3,
                offset: 0.5,
            },
        ],
        inOutOptions
    )
}
function highlightElement(base, other) {
    const element = elementgetter(other)
    //console.log(element, 'xxxxxxxxxxxxxxxxxxxxx')
    assignStyle(
        base,
        boundingTransform(getBoundingClientRect(element))
    )
    toggle(base.style, 'opacity', 0, 0.5)
}
function logJsonBinResult(x) {
    console.log(x)
}

function boundingTransform(x) {
    return x
}

function isNode() {
    return (
        typeof window === 'undefined' ||
        typeof navigator === 'undefined'
    )
}
function speakChinese(s) {
    const utterThis = new SpeechSynthesisUtterance(s)
    utterThis.voice = getVoice()
    synth.speak(utterThis)
}

function getVoice() {
    if (typeof __voice__ != 'undefined') return __voice__
    var synth = window.speechSynthesis
    var voices = synth.getVoices()
    __voice__ = voices.filter(
        (voice) => voice.lang.indexOf('zh') === 0
    )[3]
    return __voice__
}

function isBrowser() {
    return (
        exists(localStorage) && Object.keys(localStorage).length
    )
}

function fullScreenFactory() {
    let count = 0
    let element = document.documentElement

    function openFullscreen() {
        if (element.requestFullscreen) {
            element.requestFullscreen()
        } else if (element.webkitRequestFullscreen) {
            /* Safari */
            element.webkitRequestFullscreen()
        } else if (element.msRequestFullscreen) {
            /* IE11 */
            element.msRequestFullscreen()
        }
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen()
        }
    }

    return function toggleFullScreen() {
        isEven(count++) ? openFullscreen() : closeFullscreen()
    }
}

function htmlgetter(s) {
    if (!s) {
        return document.body.innerHTML
    }
    if (isElement(s)) {
        return s.innerHTML
    }
    if (isHtml(s)) {
        return s.trim()
    }

    return elementgetter(s).innerHTML
}

function stylegetter(element, ...args) {
    const ref = window.getComputedStyle(element)
    return reduce(args, (arg) => {
        const key = toDashCase(arg)
        return ref.getPropertyValue(key)
        return [key, ref.getPropertyValue(key)]
    })
}
function findElementByText(query, tag = 'div') {
    var xpath = `//${tag}[text()='${query}']`
    var element = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue
    return element
}

function initWindowErrorListener() {
    function onError(error, url, lineNumber) {
        console.log(
            stringify({
                error: error.toString(),
                url,
                lineNumber,
            })
        )
    }
    window.onerror = onError
}

class WindowManager extends StorageSystem {
    constructor() {
        super()
        this.originalWindow = {}
        for (let [k, v] of Object.entries(super.get())) {
            this.originalWindow[k] = window[k]
            this.defineVariable(k, v)
        }
    }
    remove(key) {
        delete this.store[key]
        window[key] = this.originalWindow[key]
    }
    defineVariable(k, v) {
        if (isNull(v)) {
            announce(-1, k)
            return
        }
        this.store[k] = v
        const value = bringToLife(v)
        mergeState(window, k, value)
    }
}

function onWindowUnload(...args) {
    const [key, value] = argumentFiller(args, datestamp())
    window.addEventListener('beforeunload', () => {
        setStorage(key, value())
    })
}
function staticExit(key, value) {
    window.addEventListener('beforeunload', () => {
        setStorage(key, fparse(value))
    })
}

function scrollIntoView(el) {
    //return el.scrollIntoViewIfNeeded()
    if (!elementInWindow(el)) {
        el.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
        })
    }
}
function elementInWindow(el) {
    if (
        el.getBoundingClientRect().bottom > window.innerHeight
    ) {
        return false
    }

    if (el.getBoundingClientRect().top < 0) {
        return true
    }
}
function getElementName(el) {
    return el.className || el.tagName
}

function isHtmlElement(x) {
    return (
        x &&
        x.constructor &&
        test(/^HTML.*?Element$/, x.constructor.name)
    )
}

function animationFactory(key, start, end) {
    return function animationRunner(el, options = {}) {
        el = toElement(el)
        const delay = pop(options, 'delay')
        if (pop(options, 'invisible')) toInvisibleElement(el)
        if (!options.duration) options.duration = 1000

        if (delay) {
            return setTimeout(() => {
                return animationRunner(el, options)
            }, delay)
        }

        const frames = [{ [key]: start }, { [key]: end }]
        //console.log('appearing an element', el)

        if (el.style.display == 'none') {
            el.style.display = 'block'
        }

        if (el.style.visibility == 'hidden') {
            el.style.visibility = 'visible'
        }

        el.style[key] = start
        scrollIntoView(el)

        const animation = el.animate(frames, options)
        //console.log(animation)
        //console.log(frames)
        return animation.finished.then(() => {
            el.style[key] = end
            return true
        })
    }
}

function elt(html) {
    const element = document.createElement('div')
    element.innerHTML = html
    return element
}
function createElementFromObject(o) {
    const parent = o.parent || document.body
    const tag = o.tag || 'div'
    const element = document.createElement(tag)
    const value = addProps(element, o)
    /* a jxgboard for example */
    parent.append(element)
    return value || element
}
function createElement(
    tag = 'div',
    options = null,
    parent = document.body
) {
    if (isObject(arguments[0])) {
        return createElementFromObject(arguments[0])
    }
    if (arguments.length == 2 && isElement(arguments[1])) {
        parent = options
    }
    if (tag == 'style' || tag == 'link' || tag == 'script') {
        parent = document.head
    } else if (isHtmlElement(tag)) {
        parent = tag
        tag = 'div'
        options = null
    }

    const element = document.createElement(tag)
    setAttributes(element, options)
    parent.appendChild(element)
    return element
}

function setAttributes(element, options) {
    const properties = ['textContent', 'innerHTML', 'innerText']
    if (options) {
        for (let [k, v] of Object.entries(options)) {
            if (k in properties) {
                element[k] = v
            }
            if (v) element.setAttribute(k, v)
        }
    }
}

function cssLoader(s) {
    try {
        sleep(250).then(() => _cssLoader(s))
    }
    catch(e) {
        globalErrorHandler(e)
        //console.log('error', String)
    }
}
function _cssLoader(s) {
    if (!s) return
    if (isCssFile(s)) {
        return cssFileLoader(s)
    }
    const value = /^\s*<style/.test(s)
        ? search(/<style>([^]+?)<\/style>/, s)
        : s

    if (!/^@|}$/m.test(value)) return
    return createElement({ tag: 'style', html: value, parent: document.head })
}

function addKeyListenerFactory(keypress, gn) {
    return function listener(fn) {
        return window.addEventListener(keypress, (e) => {
            if (gn) gn(e)
            fn(e.key)
        })
    }
}

const toggleFullScreen = fullScreenFactory()
const appear = animationFactory('opacity', 0, 1, 1000)
const disappear = animationFactory('opacity', 1, 0, 1000)

function isMac() {
    return typeof navigator != 'undefined'
        ? /Mac/.test(navigator.platform)
        : false
}
function toElement(el) {
    const name = el.constructor.name
    if (name == 'VNode') {
        return el.elm
    }

    if (name == 'HtmlElement') {
        return el
    }
    if (el.$el) return el.$el
    return el
}

function toInvisibleElement(el) {
    el = toElement(el)
    if (el.dataset.invisible) return
    el.style.display = 'none'
    el.style.opacity = 0
    el.dataset.invisible = '1'
}

function checkExistingScripts() {
    return Array.from(
        document.getElementsByTagName('script'),
        (x) => tail(x.src)
    ).filter(exists)
}

function checkExistingCss() {
    return Array.from(
        document.getElementsByTagName('link'),
        (x) => tail(x.href)
    ).filter(exists)
}

function webLoader(...dependencies) {
    const [scriptDependencies, cssDependencies] = partition(
        gatherArgs(dependencies),
        isJavascriptFile
    )

    const existingCss = checkExistingCss()
    const existingJs = checkExistingScripts()
    const js = unique(scriptDependencies, existingJs)
    const css = unique(cssDependencies, existingCss)
    css.forEach(cssFileLoader)
    return waterfall2(js.map(scriptFileLoader))
}
function fileLoader(dependencies, vueComponentKey) {
    const [scriptDependencies, cssDependencies] = partitioned(
        dependencies,
        isJavascriptFile
    )
    const existingCss = checkExistingCss()
    //console.log(existingCss)
    const existingJs = checkExistingScripts()
    //console.log(existingJs)
    //console.log(); throw ''

    const css = unique(cssDependencies, existingCss)
    css.forEach(cssFileLoader)

    const scripts = unique(scriptDependencies, existingJs)

    scripts.forEach((item, i, arr) => {
        setTimeout(() => {
            scriptFileLoader2(item)
        }, 500 * i)
        if (i == arr.length - 1) {
            setTimeout(() => {
                loadVue(vueComponentKey)
            }, 500 * i * 2)
        }
    })

    //return waterfall(scripts.map(scriptFileLoader)).then(() => {
    //loadVue(vueComponentKey)
    //})
}

function scriptFileLoader(url, i) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        const delay = 250 * i
        script.src = url
        script.defer = true
        script.async = false
        script.charset = 'utf8'
        script.addEventListener('load', () => {
            //console.log('loading file', url)
            setTimeout(resolve, delay, true)
        })
        document.head.appendChild(script)
    })
}

function loadVue(component, parent) {
    if (!component) return
    console.log('loading the vue')

    let name = 'app2'
    //let key = 'app1'
    //while (variableExists(key)) {
    //key = incrementName(key)
    //}

    const options = { id: name }
    if (!parent) parent = document.body
    else parent = elementgetter(parent)
    const div = createElement('div', options, parent)
    setTimeout(() => {
        let code = `new Vue(${component}Component).$mount('#${name}')`
        console.log(code)
        eval(`${name} = ${code}\nconsole.log(${name})`)
    }, 500)
}
function loadScripts(...s) {
    return webLoader(s.map((x) => addExtension(x, 'js')))
}
function loadStylesheets(...stylesheets) {
    stylesheets.forEach(cssFileLoader)
}
function cssFileLoader(file) {
    return createElement(
        'link',
        {
            rel: 'stylesheet',
            href: file,
        },
        document.head
    )
}
function scriptLoader(scripts) {
    return waterfall(scripts.map(scriptFileLoader))
}

function loadEc(key = 'element-controller.js') {
    const componentKey = toPascal(removeExtension(key))
    let dependencies
    scriptFileLoader2('filebins.js')

    setTimeout(() => {
        dependencies = find(filebins, (bins) =>
            bins.includes(key)
        )
    }, 100)

    setTimeout(() => {
        fileLoader(dependencies, componentKey)
    }, 200)
}
// add this to removeCallables

function scriptFileLoader2(url) {
    console.log('loading script', url)
    return createElement('script', {
        defer: true,
        charset: 'utf8',
        src: url,
    })
}

function toggleAnimationFactory(key, value, duration = 1000) {
    return function animationRunner(
        el,
        options = {
            duration,
        }
    ) {
        el = el ? toElement(el) : document.body

        const start = el.style[key]
        const frames = [
            { [key]: start },
            { [key]: value },
            { [key]: start },
        ]

        el.animate(frames, options)
        //console.log('animating element', getElementName(el))
    }
}
const flash = toggleAnimationFactory(
    'background',
    'yellow',
    2000
)
const appearDisappear = toggleAnimationFactory('opacity', 1)

const Modals = {
    FullScreen() {},
}
function modal(value) {
    if (typeof __el__ == 'undefined') {
        __el__ = createElement()
        enforce('document.body.style.position == relative')

        const style = {
            zIndex: '999',
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            background: 'yellow',
            fontSize: '24px',
            border: '2px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px',
            opacity: 0,
        }

        __caller__ = createElement(__el__)
        __value__ = createElement(__el__)

        assignStyle(__el__, style)
        assignStyle(__caller__, 'fw600')
        assignStyle(__value__, 'fw600 cmb7')
    }
    let caller = getCaller(2)
    __caller__.textContent = caller
    __value__.textContent = stringify(value)
    console.log('MODAL: ' + value)
    appearDisappear(__el__, 2000)
}

function jsonbin(data) {
    let id = '5f30add71823333f8f20b1bb'
    let apikey =
        '$2b$10$RpyRq6D2g4SIaVl.vix5W.vq33VVnyQgzeCev0fLf2pJo2LUVf8DC'

    let req = new XMLHttpRequest()

    req.open(
        data ? 'GET' : 'PUT',
        `https://api.jsonbin.io/v3/b/${id}`,
        true
    )
    req.setRequestHeader('X-Master-Key', apikey)
    req.send()
    return new Promise((resolve) => {
        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                const responseValue = data
                    ? req.responseText
                    : JSON.parse(req.responseText).record.value

                resolve(responseValue)
            }
        }
    })
}

function toIframe(el, s) {
    if (!s || s.length < 10) return
    const iframe = el.contentWindow
    try {
        iframe.document.open()
        iframe.document.writeln(s)
        //iframe.document.close()
    } catch (e) {
        return e.toString()
    }
}
function jsonbin(data) {
    let id = '5f30add71823333f8f20b1bb'
    let apikey =
        '$2b$10$RpyRq6D2g4SIaVl.vix5W.vq33VVnyQgzeCev0fLf2pJo2LUVf8DC'

    let req = new XMLHttpRequest()

    req.open(
        data ? 'PUT' : 'GET',
        `https://api.jsonbin.io/v3/b/${id}`,
        true
    )
    req.setRequestHeader('X-Master-Key', apikey)
    req.setRequestHeader('Content-Type', 'application/json')
    data
        ? req.send(JSON.stringify({ value: data }))
        : req.send()
    return new Promise((resolve) => {
        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                const responseValue = data
                    ? req.responseText
                    : JSON.parse(req.responseText).record.value

                console.log(responseValue)
                resolve(responseValue)
            }
        }
    })
}

function popupPre(s) {
    const win = window.open('', 'myWindow')
    const html = divify('pre', '', htmlEscape(s))
    win.document.write(html)
}
function htmlEscape(str) {
    const dict = {
        '<': 'lt',
        '>': 'gt',
    }
    return str.replace(/[<>]/g, (x) => {
        return `&${dict[x]};`
    })
}

function popup(html) {
    const attrString = 'status=0, width=700, height=700'
    const myWindow = window.open('', 'myWindow', attrString)
    myWindow.document.write(html)
}

function _request(url, data, options) {
    const mode = data ? 'post' : 'get'
    if (!data && options) data = options
    return typeof axios != 'undefined'
        ? axios[mode](url, data).then((x) => x.data)
        : fetch(url, data).then((x) => x.data)
}
function post(url, data) {
    return _request(url, data)
}
function postLocalHost(data) {
    const url = 'https://localhost:8000'
    return post(url, data)
}

async function requestGithub(user, repo, file) {
    const url = `https://api.github.com/repos/${user}/${repo}/contents`
    const filepath = `https://raw.githubusercontent.com/${user}/${repo}/master/${file}`
    //console.log(url)
    //console.log(filepath)
    const value = await request(filepath)
    console.log(value)
}

async function request(url) {
    function isJsonResponse(response) {
        const type = response.headers.get('content-type')
        return type && type.indexOf('application/json') !== -1
    }

    const response = await fetch(fixUrl(url))
    return isJsonResponse(response)
        ? response.json()
        : response.text()
}

function storageSystemThis(state, key, fallback, callback) {
    const fn = (x) => state[key]
    const [data, upload] = storageSystem(key, fn, fallback)
    state[key] = data
    state['upload'] = upload
    if (callback) callback(data)
}
function storageSystem(key, fn, fallback) {
    let data = getStorage(key, fallback)

    let uploader = (e) => {
        window.removeEventListener('beforeunload', uploader)
        setStorage(key, fn())
    }

    window.addEventListener('beforeunload', uploader)

    return [data, uploader]
}

function announce(statusCode, message) {
    const caller = getCaller(-1)
    const statusMessage = statusCode > 0 ? 'success' : 'failure'
    console.log(['announcing', caller, statusMessage, message])
}
function prettierErrorInfo(s) {
    try {
        pretty(s)
    } catch (e) {
        z = e.toString()
        console.log({ z })
        let [name, message, line, ch] = search(
            /(\w+): (.*?) \((\d+):(\d+)\)/,
            e.toString()
        )
        ch = Number(ch)
        line = Number(line)
        return {
            name,
            message,
            line,
            ch,
        }
    }
}

function transformGist(name, value) {
    /* do it later */
    return { name, value }

    let ext = getExtension(name)
    const ignore = ['html', 'js', 'css']
    if (ignore.includes(ext)) {
        return { name, value }
    }
    switch (ext) {
        case 'scss':
            name = changeExtension(name, 'css')
            //value = convertToCss(value)
            //value = convertToHtml(value)
            break
        case 'babel':
            name = changeExtension(name, 'js')
            break
        case 'pug':
            name = changeExtension(name, 'html')
            break
    }
    return { name, value }
}

async function fetchGists(user = 'kdog3682') {
    const url = `https://api.github.com/users/${user}/gists`
    const gists = await request(url)
    return gists
}

async function chooseGists() {
    const gists = await fetchGists()

    const runner = async (item) => {
        const text = await request(item.raw_url)
        return transformGist(item.filename, text)
    }

    const filter = (x) => {
        const keep = [
            'html',
            'js',
            'css',
            'scss',
            'script',
            'babel',
            'pug',
        ]
        if (keep.includes(getExtension(x.filename))) {
            return true
        }
    }

    /* once u lose a domain ... u may lose it forever */
    /* it was a good name */
    const gist = await vueAsk(null, gists, displayGists)
    const files = Object.values(gist.files).filter(filter)
    const output = await Promise.all(files.map(runner))
    const final = transformGist(output)
    return final
}

async function vueAsk(vue, items, display) {
    vue.vtc.activate()
    announce('activating vtc')
    vue.vtc.override = (s) => {
        console.log('running the voice callback')
        if (isNumber(s)) {
            vue.answerInput = s
            console.log('setting an answer input', s)
        }
    }
    vue.displayables = display ? display(items) : items
    return await Clock.input((x) => {
        if (vue.answerInput) {
            const answerInput = vue.answerInput
            vue.answerInput = ''
            vue.vtc.deactivate()
            announce('deactivating vtc')
            const value = items[Number(answerInput) - 1]
            return value
            //return get ? get(value) : value
        }
    })
}

function displayGists(gists) {
    return gists.map((item, i) => {
        /* returns a hydrated but non-parsed component */
        return gistDisplayComponent(item)
    })
}

function findWidthOffenders() {
    ;[].forEach.call(
        document.querySelectorAll('*'),
        function (el) {
            if (el.offsetWidth > docWidth) {
                console.log(el, 'OFFENDER')
                //nex outline @ch
            }
        }
    )
}

function getKeyArg(e) {
    let key = e.key || e
    let arg = ''
    if (e.ctrlKey) arg += 'Ctrl-'
    if (e.altKey) arg += 'Alt-'
    if (e.shiftKey && (e.key == 'Tab' || e.key == 'Enter')) {
        arg += 'Shift-'
    }
    arg += key
    return arg
}

function preventDefaultFactory(config) {
    if (config == null) {
        config = {
            ctrlKey: true,
        }
    }

    if (!config.hasOwnProperty('ctrlKey')) {
        config.ctrlKey = true
    }

    let { ctrlKey, arrowKeys } = config
    let arrowKeyRE = /^Arrow/
    let ctrlKeyRE = /[ir\-\+ ]/i

    return function lambdaPreventDefault(e) {
        if (
            (ctrlKey && e.ctrlKey && !test(ctrlKeyRE, e.key)) ||
            (arrowKeys && test(arrowKeyRE, e.key))
        ) {
            e.preventDefault()
        }
    }
}

function preventDefault(e, ...args) {
    if (e.ctrlKey && !test(/[ir\-\+ ]/i, e.key)) {
        e.preventDefault()
    } else if (args.includes(e.key)) {
        e.preventDefault()
    }
}

function classNameGetter() {
    const elements = document.getElementsByTagName('*')
    const names = Array.from(elements, (x) => x.className)
    //console.log(names)
    //let foo = names.find((x) => x == 'FOO')
    //console.log(foo, 'yes')
    //console.log(type(document.querySelector('.FOO')))
    //throw ''
    return names
}

function windowListener(state, event = 'keydown') {
    let vueState

    /* needs to prevent default strange ...*/
    function embeddedStateObjectCallback(e) {
        if (!vueState) {
            vueState = state.state
            preventDefault = preventDefaultFactory(
                vueState.preventDefault
            )
        }
        preventDefault(e)
        let key = getKeyArg(e)

        if (key in keyboardAliases) {
            let f = state[keyboardAliases[key]]
            if (f) f.call(vueState)
            else console.log('not in state', key)
        } else if (key.length < 2 && state.fallback) {
            state.fallback.call(vueState, key)
        }
    }

    const keyboardAliases = {
        ':': 'colon',
        'Ctrl-0': 'zero',
        'Ctrl-s': 'save',
        'Ctrl-d': 'downloar',
        'Ctrl-u': 'undo',
        'Ctrl-r': 'redo',
        'Ctrl-q': 'quit',
        ArrowRight: 'right',
        ArrowLeft: 'left',
        ArrowDown: 'down',
        ArrowUp: 'up',
        Enter: 'enter',
        Backspace: 'backspace',
        Escape: 'escape',
        '': 'space',
    }

    function functionCallback(e) {
        /* the most common */
        preventDefault(e)
        state(getKeyArg(e))
    }
    function objectCallback(e) {
        preventDefault(e)
        let key = getKeyArg(e)
        if (key in state) {
            return runObjectCallback(key)
        }

        if (key in aliases) {
            return runObjectCallback(aliases[key])
        }
    }
    function runObjectCallback(key) {
        let fn = state[key]
        if (isFunction(fn)) {
            fn()
        }
    }

    const callback = isFunction(state)
        ? functionCallback
        : state.callback
        ? state.callback.bind(state)
        : state.state
        ? embeddedStateObjectCallback
        : objectCallback

    window.addEventListener(event, callback)

    function typist(s) {
        const items = split(s, ' ').map((key) => ({ key }))

        items.forEach((keystrokeObject, i) => {
            callback(keystrokeObject)
        })
    }
    return typist
    function removeListener() {
        console.log('removing event listener')
        window.removeEventListener(event, callback)
    }
    return removeListener
}

function autoFocus(x, delay = 250) {
    setTimeout(() => x.focus(), delay)
}

function isVue(x) {
    if (x._Ctor) return true
    let name = x.constructor.name
    return (
        name == 'Vue' ||
        name == 'VNode' ||
        name == 'VueComponent'
    )
    return x._isVue
}

function isVueNode(x) {
    return x._isVue || x.$el
}

async function popOpen(
    url = 'reddit.com',
    { windowName = 'foo', delay = 10000 } = {}
) {
    if (hasNewline(url)) {
        const win = window.open('', windowName)
        const html = divify('pre', '', url)
        win.document.write(html)
    } else {
        const win = window.open(url, windowName)
        await sleep(delay)
        win.close()
    }
}

const SVGPaths = {
    star: '<path d="M8 .2l4.9 15.2L0 6h16L3.1 15.4z"/>',
}
function svgPath(key, { width = 20, height = 20 } = {}) {
    const template = `
      <svg xmlns="http://www.w3.org/2000/svg"
         width="${width}"
         height="${height}"
      >
        <g class="${key}"> 
            ${SVGPaths[key]}
        </g>
      </svg>
    `
    return { template }
}
function vueSvg(key) {
    return {
        template: SVGPaths[key],
        //mounted() {
        //},
    }
}
function createSvg(key, size = 20, color = 'blue') {
    let path = SVGPaths[key]
    let a = 0
    let b = 0
    let width = size
    let height = size
    viewBox = `${a} ${b} ${width} ${height}`
    let fill = color
    let template = `
      <svg xmlns="http://www.w3.org/2000/svg" 
        width="${width}" 
        height="${height}" 
        viewBox="${viewBox}" 
        aria-labelledby="${name}" 
        role="presentation"
      >
        <g fill="${fill}">
          ${path}
        </g>
      </svg>
    `
    return template
    return {
        template,
    }
}
function findDescendant(parent, regex, key = 'tagName') {
    for (let child of parent.children) {
        if (test(regex, child[key], 'i')) {
            return child
        }
        return findDescendant(child, regex)
    }
}

function getScriptContext(script) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', script.src)
    xhr.onreadystatechange = function () {
        if (
            xhr.readyState === XMLHttpRequest.DONE &&
            xhr.status === 200
        ) {
            console.log(
                'the script text content is',
                xhr.responseText
            )
        }
    }
    xhr.send()
}
function arrowListener(state, ref, init) {
    state.$sayhi()
    if (isString(ref)) {
        ref = createArrowRefFromString(ref)
    }
    const prevent = [
        'ArrowRight',
        'ArrowUp',
        'ArrowLeft',
        'ArrowDown',
        'Enter',
    ]

    if (init) {
        isFunction(init)
            ? init(state)
            : Object.assign(state, init)
    }

    const listener = (e) => {
        if (e.key in ref) {
            const value = ref[e.key](state)
            if (value || prevent.includes(e.key)) {
                e.preventDefault()
            }
        }
    }

    window.addEventListener('keydown', listener)
    return (key) => {
        if (key == null) {
            modal('removing arrow listener')
            window.removeEventListener('keydown', listener)
            return
        }
        try {
            ref[key](state)
        } catch (e) {
            console.log(e.toString(), 'ERRRRRRRRRRRr')
        }
    }
}

function motion(el, positions) {
    const options = {
        duration,
        easing,
        fill: 'forwards',
    }
    let unit = 'px'

    const keyframes = positions.map(([x, y], i) => {
        return {
            transform: `translate(${x}${unit}, ${y}${unit})`,
        }
    })
    return el.animate(keyframes, options).finished
}

function setBackgroundImage(el, url) {
    el.style.backgroundImage = `url(${addExtension(
        url,
        'jpg'
    )})`
}
function setOpacity(el, opacity) {
    el.style.opacity = opacity || 0
}

/* ou can create animations in advance with keyframefec */

const TransitionHooks = {
    GameOver: {
        beforeEnter(el) {
            assignStyle(e, {
                backgroundImage: 'foobar',
                opacity: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '0% 0%',
            })
        },
        enter(el, done) {
            animate(el, {
                backgroundPosition: '100% 0',
                duration: 1000,
            }).then(done)
        },
        leave(el, done) {
            animate(el, {
                opacity: 0,
                duration: 500,
            }).then(done)
        },
    },

    slidedown: {
        beforeEnter(el) {
            el.style.transform = 'translate(0, -50px)'
            setOpacity(el)
        },
        enter(el, done) {
            el.animate(
                [
                    {
                        opacity: 0,
                        transform: 'translate(0, -50px)',
                    },
                    {
                        opacity: 1,
                        transform: 'translate(0, 0px)',
                    },
                ],
                { fill: 'forwards', duration: 250 }
            ).finished.then(done)
        },
        leave(el, done) {
            el.animate(
                [
                    {
                        opacity: 1,
                        transform: 'translate(0, 0px)',
                    },
                    {
                        opacity: 0,
                        transform: 'translate(0, 100px)',
                    },
                ],
                { fill: 'forwards', duration: 1000 }
            ).finished.then(done)
        },
    },
    spin: {
        enter: spinOnEnter,
        leave: spinOnLeave,
        beforeEnter: spinOnBeforeEnter,
    },
}
function spinOnBeforeEnter(el) {
    el.style.opacity = 0
}

function spinOnEnter(el, done) {
    el.animate(
        [
            {
                transform: 'rotateY(540deg)',
                opacity: 1,
            },
        ],
        {
            fill: 'forwards',
            duration: 500,
            easing: 'ease-in',
        }
    )
}
function spinOnLeave(el) {
    el.animate(
        [
            {
                opacity: 0,
            },
        ],
        {
            fill: 'forwards',
            duration: 500,
        }
    )
}
function loadPrettier(mode) {
    if (variableExists('prettierPlugins')) {
        return Promise.resolve()
    }

    const prettierScripts = ['standalone.min.js']
    if (mode == 'html') {
        prettierScripts.push('parser-html.min.js')
    } else if (mode == 'js') {
        prettierScripts.push('parser-babel.min.js')
    } else {
        prettierScripts.push('parser-html.min.js')
        prettierScripts.push('parser-babel.min.js')
    }
    return webLoader(prettierScripts)
}
function htmlSkeleton(el) {
    if (!__viewPretty) return
    let key = 'html'
    let s = el ? el.outerHTML : document.body.outerHTML
    s = s.replace(/<script>vueLoader.+\n+/, '')
    if (s.length < 50) return console.log(s)

    try {
        return loadPrettier(key).then((x) => {
            const value = pretty(s, key)
            if (__viewPretty) {
                console.log(value)
            } else {
                console.log(value)
            }
            return value
        })
    } catch (e) {
        console.log(e.toString())
    }
}
function delayedHtmlSkeleton(el) {
    setTimeout(() => {
        if (typeof __stop__ == 'undefined') return
        if (__stop__) {
            console.log('stopping html skeelton')
            return
        }
        htmlSkeleton(el)
    }, 250)
}
function takeMeasurements(parent) {
    parent = vueElementGetter(praent)
    const data = iterateOverElements(parent, elementData)
    return data
    return partitionByHeights(data)
}
function iterateOverElements(
    root,
    fn = identity,
    {
        ignoreRE = null,
        ignorePush = ['page-container', 'doc-container'],
        ignoreElements = ['katex', 'console'],
        includeRoot = false,
        limit = 2,
    } = {}
) {
    const store = []
    function push(el) {
        const value = fn(el)
        store.push(value)
    }
    function ignore(r, el) {
        if (isArray(r)) {
            return r.includes(el.className)
        }
        return r && el.className && test(r, el.className)
    }

    function runner(el, depth = 0) {
        if (ignore(ignoreElements, el)) {
            return
        }

        if (depth == limit) {
            return push(el)
        }
        if (!exists(el.children)) {
            return push(el)
        }

        depth++

        if (includeRoot && !ignore(ignorePush, el)) {
            push(el)
        }

        for (let child of el.children) {
            runner(child, depth)
        }
    }

    runner(root)
    return store
}

function _legoLoader() {
    const legoScripts = [
        //'utils.js',
        //'browser.js',
        'assets.js',
        'stylesheet.js',
        'color-utils.js',
        'css-utils.js',
        'ec.js',
        'lego.js',
        'ec2.css',
    ]

    webLoader(legoScripts)

    if (window.parent.app) {
        let arrowListener = window.parent.app.arrowListener
        arrowListener && arrowListener(null)
    }
    setTimeout(() => {
        let el = document.activeElement
        if (el) el.blur()
        ec()
    }, 100)
}

function backdoor(fn, trigger) {
    return
    /* dont need a backdoor */
    const listener = function listener(e) {
        if (getKeyArg(e) == trigger) {
            document.activeElement.blur()
            window.removeEventListener('keydown', listener)
            fn()
            modal('backdoor activated')
        }
    }
    window.addEventListener('keydown', listener)
}

tstring = `

mt-enter
opacity 0 ... ease-in 0.5s

mt-leave
opacity 0 ... ease-out 0.3s

twirl-enter
transform-origin center
opacity 0 ... ease-in 1s
rotateY(960deg) ... 0.75s

twirl-leave
opacity 0 ... ease-out 1s
`

const legoBackdoor = backdoor(legoLoader, '\\')
//cssLoader(aggregator(tstring, transitionTransformer))
const shakeMotionArray = partition(
    findall(
        /-?\d/g,
        '1 1 0 -1 -2 -1 -3 01 3 2 0 1 -1 1 -1 2 -1 -3 1 03 1 -1 -1 -1 1 1 2 0 1 -2 -1 000    '
    ).map(Number),
    3
)
const shakeMotion = animationMotion(shakeMotionArray)

var AnimationLibrary = {
    onCorrect: {
        keyframes: [{ background: 'green', color: 'white' }],
        options: {
            duration: 1500,
            fill: 'forwards',
        },
    },

    answerIt: {
        keyframes: [
            { background: 'blue', color: 'white', offset: 0.3 },
            { background: 'blue', color: 'white', offset: 0.8 },
        ],
        options: {
            duration: 3000,
            iterations: 1,
            easing: 'ease-in-out',
            //direction: 'alternate',
            //fill: 'forwards',
        },
    },
    shakeIt: {
        keyframes: shakeMotion,
        options: {
            duration: 250,
            easing: 'ease-in-out',
        },
    },
}
function keyReduce(keyframes, el) {
    let array
    if (isArray(keyframes)) {
        keyframes = keyframes[0]
        array = true
    }
    let keys = Object.keys(keyframes)
    let a = reduce(keys, (key) => el.style[key])
    return [a, keyframes, a]
    /* change it up */
}
function animate(el, key) {
    if (isObject(key)) {
        return animateObject(el, key)
    }
    let { keyframes, options } = AnimationLibrary[key]

    if (!isArray(keyframes)) {
        let a = keyReduce(keyframes, el)
    } else if (keyframes[0].offset > 0) {
        let a = keyReduce(keyframes, el)
    }
    return el.animate(keyframes, options).finished
}

function getVars() {
    const rocklee = tryf((x) => JSON.stringify(x, null, 2))
    const value = Object.entries(window).reduce(
        (acc, [a, b]) => {
            try {
                const yes =
                    !isFunction(b) &&
                    /^[{\[]/.test(b.toString())
                if (yes) {
                    let value = rocklee(b)
                    if (value) acc[a] = value
                }
            } catch (e) {
                console.log([a])
            }
            return acc
        },
        {}
    )
}

function keyFramesToWebAnimationAPI(s) {}

function animationMotion(a) {
    return a.map(([a, b, c], i) => {
        let s = `translate(${a}px, ${b}px)`
        if (c != null) s += ` rotate(${c}deg)`
        return {
            transform: s,
        }
    })
}

function animateStay(el, values, from, ending) {
    const start = { opacity: 0, offset: 0 }
    const end = { opacity: 0, offset: 1 }
    const middle1 = { opacity: 1 }
    const middle2 = { opacity: 1 }
    for (let [k, v] of Object.entries(values)) {
        if (k in animationAliasKeys) {
            k = animationAliasKeys[k]
            v = k + parens(v)
        }
        start[k] = el.style[k] || defaults[k]
        end[k] = el.style[k] || defaults[k]
        middle1[k] = v
        middle2[k] = v
    }
    if (ending) {
        Object.assign(end, ending)
    }

    if (from) {
        middle1.offset = from[0]
        middle2.offset = from[1]
        keyframes = [start, middle1, middle2, end]
    } else {
        keyframes = [start, middle1, end]
    }
    return el.animate(keyframes, {
        duration: 1000,
    })
}

function fixVH() {
    const { innerHeight, innerWidth } = window
    const height = innerHeight + 'px'
    const width = innerWidth + 'px'
    const root = document.documentElement
    root.style.setProperty('--root-height', height)
    root.style.setProperty('--root-width', width)
}
function setRoot(obj) {
    const root = document.documentElement
    for (let [key, value] of Object.entries(obj)) {
        if (!key.startsWith('--')) key = '--' + key
        root.style.setProperty(key, value)
    }
}

function createFontUrl(href) {
    return createElement('link', {
        rel: 'stylesheet',
        type: 'text/css',
        href,
    })
}

/* to be stubborn about it */

function animateTo(el, value, csskey, options = {}) {
    //if (isObject(value)) {
    //return animateObject(el, value, options)
    //}

    let prev = el.style[csskey]
    let keyframes = [
        { [csskey]: prev },
        { [csskey]: value },
        { [csskey]: prev },
    ]
    return el.animate(keyframes, {
        //fill: 'forwards',
        duration: 1000,
        ...options,
    }).finished
}

function findElement(key) {
    const el = document.querySelector(fixSelector(key))
    if (el) return console.log('found the element!!')
    console.log('didnt find it')
}

//webLoader("https://unpkg.com/vue-draggable@2.0.6/lib/vue-draggable.min.js")
//

function ensureInView(element, container = document.body) {
    //Determine container top and bottom
    let cTop = container.scrollTop
    let cBottom = cTop + container.clientHeight

    //Determine element top and bottom
    let eTop = element.offsetTop
    let eBottom = eTop + element.clientHeight

    //Check if out of view
    if (eTop < cTop) {
        container.scrollTop -= cTop - eTop
    } else if (eBottom > cBottom) {
        container.scrollTop += eBottom - cBottom
    }
}
function setStyle(el, obj) {
    for (let [k, v] of Object.entries(obj)) {
        if (isNumber(v)) v += 'px'
        el.style[k] = v
    }
}

function loadWindow(fn, delay = 10) {
    window.addEventListener('load', () => {
        fixVH()
        setTimeout(() => {
            fn && fn()
        }, delay)
    })
}

async function asyncActions(n, fn, delay = 1000, state) {
    for (let i = 0; i < n; i++) {
        await sleep(delay)
        state ? fn.call(state) : fn()
    }
}

function launch(c) {
    if (!c) {
        if (ln) {
            c = window[ln]
        } else {
            c = Launchc
        }
    }
    app = new Vue(c).$mount('#app')
    console.log('app has been launched')
}

function addProps(el, options) {
    if (!options) return
    if (isString(options)) {
        if (isCssWord(options)) {
            el.classList.add(options)
            return
        }
        const styles = cssEvaluator(options)
        Object.assign(el.style, styles)
        return styles
    }

    const unit = 'px'
    const excludeUnits = ['lineHeight', 'zIndex', 'text']

    if (options.x || options.y || options.pos) {
        el.style.position = 'absolute'
    }
    const aliasRef = { board: ['box', 'axis'] }
    for (let [k, v] of Object.entries(aliasRef)) {
        for (let item of v) {
            if (item in options) {
                options = { [k]: options }
                break
            }
        }
    }

    const ignore = ['parent', 'tag', '']
    for (let [k, v] of Object.entries(options)) {
        if (ignore.includes(k)) {
            continue
        }
        if (k == null || v == null) {
            continue
        }
        if (v && isNumber(v) && !excludeUnits.includes(k)) {
            v += unit
        }

        if (false) {
        } else if (false) {
            console.log('never happens')
        } else if (k == 'id') {
            el.setAttribute('id', v)
        } else if (k == 'chiiiiart') {
            el.setAttribute('id', v)
        } else if (k == 'board') {
            const board = plainBoard(v)
            return board
        } else if (k == 'chart') {
            const context = el.getContext('2d')
            el.chart = new Chart(context, v)
        } else if (k == 'graph') {
            el.setAttribute('id', v.id)
            const board = JSXInit(v)
            switch (v.type) {
                case 'triangle':
                    jTriangle(board, v)
                    break
            }
        } else if (k == 'input') {
            el.addEventListener('input', v)
        } else if (k == 'keydown' || k == 'keypress') {
            el.addEventListener('keydown', v)
        } else if (k == 'keydown' || k == 'keypress') {
            el.addEventListener('keydown', v)
        } else if (k == 's') {
            addProps(el, v)
        } else if (k == 'container') {
            const container = toSnakeCase(v) + '-container'
            blue(container)
            return
            el.classList.add(container)
        } else if (k == 's') {
            addProps(el, v)
        } else if (k == 'bg' || k == 'background') {
            el.style.background =
                v === true ? randomColor({ vibrant: true }) : v
        } else if (k == 'fs') {
            el.style.width = '100%'
            el.style.height = '100%'
        } else if (k == 'span') {
            el.style.display = 'inline'
        } else if (k == 'abs') {
            el.style.position = 'abs'
        } else if (k == 'rel') {
            el.style.position = 'rel'
        } else if (k == 'italic') {
            el.style.fontStyle = 'italic'
        } else if (k == 'bold') {
            el.style.fontWeight = '600'
        } else if (k == 'size') {
            el.style.fontSize = v
        } else if (k == 'font') {
            el.style.fontFamily = v
        } else if (k == 'circle') {
            el.style.borderRadius = '50%'
        } else if (k == 'radius') {
            el.style.width = v
            el.style.height = v
            el.style.borderRadius = '50%'
        } else if (k == 'left' || k == 'x') {
            el.style.left = v
        } else if (k == 'y' || k == 'top') {
            el.style.top = v
        } else if (k == 'pos') {
            const [x, y] = v
            el.style.left = x + 'px'
            el.style.top = y + 'px'
        } else if (k == 'text' && v) {
            el.innerText = v.toString()
        } else if (k == 'html' || k == 'innerHTML') {
            if (v) el.innerHTML = v.toString()
        } else if (
            k == 'class' ||
            k == 'name' ||
            k == 'className'
        ) {
            if (k == 'name') {
                el.dataset.name = v
            }
            el.classList.add(v)
        } else if (k == 'data') {
            Object.assign(el.dataset, v)
        } else if (k == 'w' || k == 'width') {
            el.style.width = v
        } else if (k == 'h' || k == 'height') {
            el.style.height = v
        }
    }
    return options
}

_store = {}
function calc(el, value) {
    //const computed = window.getComputedStyle(el)
    //let w = computed.getPropertyValue('width')
    let { width } = getBoundingClientRect(el)
    _store[value] = width
    width = parseFloat(width)
    //console.log({value, width})
    //console.log(width)
    //console.log(width / value.length)
}

//setTimeout(() => {
//download('temp.js', createVariable('fontLengths', _store))
//}, 800)

function setPos(el, pos) {
    setAbsolute(el)
    let [width, height, left, top] = pos
    return setStyle(el, { height, left, top })
    //setStyle(el, {width, height, left, top})
}
function setAbsolute(el) {
    if (el.parentNode.style.position != 'relative') {
        el.parentNode.style.position = 'relative'
    }
    el.style.position = 'absolute'
}
function getWH(parent) {
    var w = parent.clientWidth
    var h = parent.clientHeight
    return [w, h]
}
function getWidthFrom(value, fontSize = 16) {
    let length = value.length
    return length * 10
}
//loadWindow(createsome)

const anime = {
    shimmer(el) {
        el.animate([{ transform: 'rotateY(180deg)' }], {
            fill: 'forwards',
            duration: 1000,
            //delay: 2000,
        })
    },
}

function fireworks(options = {}) {
    const container = createElement()
    const fireworks = new Fireworks(container, options)
    fireworks.start()
    setTimeout(() => {
        fireworks.clear()
        fireworks.stop()
        container.remove()
    }, 2500)
}

function ctrl0LegoLoader(autoload) {
    if (autoload) {
        setTimeout(legoLoader, 1000)
    } else {
        //console.log('ctrl0legoloader')
        windowListener((key) => {
            if (key == 'Ctrl-0') {
                legoLoader()
                return true
            }
        })
    }
}
function caller() {
    let s = toDashCase(getCaller(-1)).replace(/-/, ' ')
    speak(s)
}

function vueLoader(c, autoload) {
    window.addEventListener('load', () => {
        fixVH()
        ctrl0LegoLoader(autoload)
        app = new Vue(c).$mount('#app')
    })
}

function _skel() {
    const ignore = [
        'HTMLScriptElement',
        'HTMLStyleElement',
        'HTMLLinkElement',
    ]
    const el = Array.from(document.body.children).find((x) => {
        if (ignore.includes(type(x))) {
            return 0
        }
        return 1
    })
    return el && el.innerHTML
}

function legoLoader() {
    setTimeout(() => _legoLoader(), 1000)
}

function stampf(fn) {
    let name = fn.name
    return (...args) => {
        stamp('Before Enter: ' + name)
        replaceArrayItem(args, isFunction, (x) => {
            return (...bargs) => {
                stamp('Entered: ' + name)
                x(...bargs)
            }
        })
        return fn(...args)
    }
}
function replaceArrayItem(items, a, b) {
    var index = isFunction(a)
        ? items.findIndex(a)
        : items.indexOf(a)

    if (~index) {
        items[index] = isFunction(b) ? b(items[index]) : b
    }
    return items
}
function runMain(f) {
    if (!f) f = main
    stamp('Waiting for window to load')
    window.addEventListener(
        'load',
        () => {
            stamp('Window Loaded')
            fixVH()
            ctrl0LegoLoader()
            f()
            skel()
        },
        500
    )
}

/* divify.js */

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
/* end */
var skel = timeoutf(logf(_skel), 250)
function elementData(el) {
    const data = getBoundingClientRect(el)
    const name = el.className
    data.name = name
    return data
}

function proliferateClassName(root, parentName) {
    const f = (el) => {
        let name = el.className
        if (!name || test(/[ -]/, name)) {
            return
        }
        const newName = toDashCase(parentName, name)
        el.classList.remove(name)
        el.classList.add(newName)
    }

    iterateOverElements(root, f, { includeRoot: 1 })
    /* it proliferates  */
}

function fetchJson(url) {
    const axios = require('axios')
    return axios.get(url).then((result) => {
        return result.data
    })
}

async function getWeather(mode = 'current') {
    const ipinfo = 'https://ipinfo.io/json'
    const data = await fetchJson(ipinfo)
    var api = 'https://api.darksky.net/forecast/'
    var key = '5bbe61fe6db548e66b39e5a49663eba2/'
    var location = data.loc
    var darksky = api + key + location
    const weather = await fetchJson(darksky)
    return parseWeatherInfo(weather, mode)
}
function parseWeatherInfo(data, mode) {
    let timeRange = ''
    temperature = data.currently.temperature
    rain = data.currently.precipProbability
    summary = data.currently.summary
    hourly = data.hourly.data
    const items = hourly
        .filter((item) => {
            return withinTimeRange(item.time, timeRange)
        })
        .map((item) => {
            const temperature = item.temperature
            const summary = item.summary
            return {
                [datestamp('time', item.time)]: item.summary,
            }
        })
    return items
}

function initVueStore(s) {
    const store = new Vuex.Store({
        state: {
            count: 0,
        },
        mutations: {
            increment(state, value = 1) {
                state.count += value
            },
        },
    })
    return store
}

function fadeToBlack(parent) {
    const children = parent.children
    return waterfall3(children, (x) => {
        return animateTo(x, 'black', 'background')
    })
}

function animateToNextLevel(parent) {
    const children = parent.children
    return waterfall3(children, (x) => {
        return animateTo(x, 'green', 'background')
    })
}

function isLastLevel(state) {
    return state.levelIndex == state.levels.length - 1
}

async function sleepAlphabet(s) {
    for (let i = 0; i < 5; i++) {
        console.log(i, 'hi')
        await sleep(1000)
    }
}
function vueElementGetter(el, key) {
    if (isHtmlElement(el)) {
        return el
    }
    if (isVue(el)) {
        return (key && el.$refs[key]) || el.$el
    }
    return el
}

function getElementText(el) {
    return el.textContext
}

function getElementBottom(el) {
    let rect = el.getBoundingClientRect()
    return rect.bottom
}

function getElementHeight(el) {
    let rect = el.getBoundingClientRect()
    return [parseInt(rect.height), parseInt(rect.y)]
    let h = rect.height
    console.log(rect)
    let marginBottom = parseInt(el.style.marginBottom || 0, 0)
    return h + marginBottom
}

function getElementPartitions1Recursive(
    el,
    max = 1000,
    ref = null
) {
    let height =
        el.children.length == 1 &&
        getElementHeight(el.children[0]) < max
    if (height) return
    let bufferHeight = 0

    const store = runner(el)
    return store

    function push(store, x) {
        if (exists(x)) {
            store.push(x)
        }
    }
    function runner(el) {
        let buffer = 50
        let children = el.children
        let current = 0
        let store = []
        let temp = []

        for (let i = 0; i < children.length; i++) {
            let childElement = children[i]
            let [height, y] = getElementHeight(childElement)
            height += bufferHeight
            if (height > max) {
                let childHeights = runner(childElement)
                temp.push(childHeights)
            } else if (current + height < max) {
                current += height
                temp.push(i)
            } else {
                current = height
                push(store, temp)
                temp = [i]
            }
        }
        push(store, temp)
        return store
    }
}

function getWindowString(key) {
    if (window.hasOwnProperty('s' + key)) {
        return eval('s' + key)
    }
    return ''
}

function takeMeasurements(parent) {
    const filter = (x) => {
        return x.className
    }

    const children = Array.from(parent.children)
    //const measurements =
    return children.filter(filter).map(getElementHeight)
    //return measurements
}

function fixPageHeight(el) {
    //console.log('mutative')
    console.log('fixing page height')
    let height = getElementHeight(el)
    console.log(height)
    if (height < magicVuePrintDocumentHeight) {
        console.log('no fix needed')
    }
    let delta = magicVuePrintDocumentHeight - height
    let children = el.children
    let marginBottoms = children.map(getComputedMarginBottom)
    let total = sum(marginBottoms)
    let decrease = 0
    while (total > delta) {
        decrease += 10
        for (let i = 0; i < children.length; i++) {
            let amount = marginBottoms[i] - decrease
            if (amount < 20) continue
            let child = children[i]
            child.style.marginBottom = amount + 'px'
        }
    }
}

function getComputedMarginBottom(el) {
    const ref = window.getComputedStyle(el)
    return parseInt(ref.getPropertyValue('marginBottom'))
}
function getWH(element) {
    let { height, width, top, left } =
        element.getBoundingClientRect()

    //left += window.scrollX
    //top += window.scrollY

    return {
        height: parseInt(height),
        width: parseInt(width),
        //left: left
        //top: top
    }
}
function getElementHeight(el) {
    //console.log(stringify(el.getBoundingClientRect()))
    return parseInt(el.getBoundingClientRect().height)
}

function getElementWidth(el) {
    return el.getBoundingClientRect().width
}

async function doGoogle(s) {
    //return {google: 'howdy howdy', payload: s || 'fake payload'}
    let appscripturl =
        'https://script.google.com/macros/s/AKfycbx3VFYdpdvIOMu6g5WFs4965dcYf7rTfF3YKDZ-Hr-KmUVut9My7qcOeqpeSJuMGbY3/exec'

    appscripturl = 'https://script.google.com/macros/s/AKfycbxDYwg6jDUrQo_0Jq4YbOfrgDw_fcLYb8TgCQesoDBTfXkSpqarcq7WteeiMX20LOsd/exec'
    appscripturl = 'https://script.google.com/macros/s/AKfycby2RnUadXGdlfBdM-rr8i2KJ01T85ZbNKNHecn2o2fHXGqKP2wd6sTRc89t2eTe9cQA/exec'
    appscripturl = `
    
    https://script.google.com/macros/s/AKfycbwfoJCPsLIFtLjrEZAt2MkgegYk3FxjIYGTKr3L6cKirO1Tw6gsr5hbUo4RL80F9BMj/exec
    https://script.google.com/macros/s/AKfycbwkrnHzZ5AjTmrE9Ro0lPf3ujJNfpyAT3RyI60BAVnWT6CxCSwBYHcKd0z6EjkZtWU-/exec


    https://script.google.com/macros/s/AKfycbzwg5MCHpv2a3yZkVUxN2KIL8i0moCsvWz1B3_LtktkYigGEymharNaSxEW8gDUk1_0/exec


    `.trim().match(/\S+$/)[0]
    return await request(appscripturl, s)
}

async function request(url, data) {

    const localhosturl = 'http://localhost:3000/'
    function getOptions(data) {
        const options = {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data),
        }
        return data ? options : {}
    }

    function getUrl(url) {
        return url.startsWith('http') ? url : localhosturl + url
    }

    async function getPayload(response) {
        const text = await response.text()
        try {
            return JSON.parse(text)
        } catch {
            return text
        }
    }

    const response = await fetch(
        getUrl(url),
        getOptions(data)
    )

    const payload = await getPayload(response)
    pprint(payload)
    return payload
}
