var barker = 'barker'
let emDash = '—'
let __viewPretty = false
//__viewPretty = true
let __viewTransform = true
__viewTransform = false
var magicVuePrintDocumentHeight = 1122
let __indexNumber = 1
let __stop__ = false

function assignChartOptions() {
    Object.assign(Chart.defaults.font, {
        size: 16,
        family: 'Times',
        weight: 'bold',
    })
}
function voraciousVuetify() {
    vuetify('$pager', incrementf('1', { offset: 0 }))
    vuetify('$student', nihanStudent)
    vuetify('DocLetter')
    vuetify(DocPage)
    vuetify(EmDash)
    vuetify(LoremIpsum)
    vuetify(MathDocQuestion)
    vuetify(SayHi)
    vuetify(VEmoji)
    vuetify(VKatex)
    vuetify(VMathBoxElement)
    vuetify(VMathSequence)
    vuetify(VMultiplicationFactorTuples)
    vuetify(VPizzaFrac)
    vuetify(VTuple)
    vuetify(katexDirective)
}
var DocLine = {
    name: 'DocLine',
    render(h) {
        return h('hr', { staticClass: 'doc-line' })
    },
}

class VueRenderer {
    renderSymbol(key) {
        /* arrow or emoji similar to v-emoji */
    }
    renderStyle(style) {
        return this.renderWrapper({
            style,
            attrs: {
                id: 'vvvnn',
            },
            domProps: {
                abc: 'vvvbb',
                name: 'vvvanmae',
            },
        })
    }
    renderLinearGroup(o, propOptions) {
        const children = Object.entries(o).map(([a, b], i) => {
            if (b == null) return
            const ref = propOptions[a] || {}
            let name = toDashCase(a)
            if (ref.class) name += ' ' + ref.class
            let nameProp = nameIt(this, name)
            if (propOptions.parentStyle) {
                if (propOptions.parentStyle.gridTemplateAreas) {
                    nameProp.style = {
                        gridArea: toDashCase(a),
                    }
                }
            }
            if (ref.style) {
                Object.assign(nameProp.style, ref.style)
            }
            return this.h('div', nameProp, b)
        })
        if (propOptions.parentStyle) {
            return this.h(
                'div',
                {
                    style: propOptions.parentStyle,
                    staticClass: vueName(this),
                },
                children
            )
        }
        return renderWrapper(this.state, children)
    }
    /* start of externalities for Math*/

    MathDocQuestion() {
        const { question, answer, choices, options, type } =
            this.state.$props

        const ref = {
            mixed(s) {
                return
            },
            prose(s) {},
            default(s) {},
            arithmetic(s) {},

            verticalAarithmetic(s) {},
            object(s) {},
            array(s) {},
        }

        const fn = ref[type]
        const value = fn.call(this, question)
        //const kids =
        return this.renderWrapper(true, kids)
        //const Choices = this.renderWrapper('choices', choices)
    }

    /* start of externalities for general*/
    renderGrid(value) {
        return this.render({
            children: value,
            wrapperClass: 'grid',
        })
    }
    /*--------------------------------- */
    /* start of externalities for InteractiveApp*/

    renderSelected(selected) {
        if (!selected) return
    }
    renderPre(s) {
        return this.h('pre', stringify(s))
    }
    renderKeyboardInput() {
        let s = this.state.s
        return this.renderWrapper('keyboard-input', s)
        return this.renderPre(this.state.s)
    }
    renderItems(key, parentWrapper = 'items') {
        const aliasMap = {
            pre: 'renderPre',
        }
        const items = this.state.items.map((item, i) => {
            let el
            if (key in aliasMap) {
                el = this[aliasMap[key]](item)
            } else {
                el = this.renderWrapper(key, item)
            }
            return el
        })
        return this.renderWrapper(parentWrapper, items)
    }
    renderIndexItem() {
        /* used when the item is based off the index */
        const index = this.state.index
        const item = this.state.items[index]
        this.state.item = item
        return this.renderWrapper('index-item', item.value)
    }
    /* end externalities */

    renderMixed(items) {
        const partitions = partitionSplit(items, isVue)
        const children = partitions.map((a, i) => {
            if (isVue(a[0])) {
                if (a.length > 1) {
                    return this.h('div', a)
                    /* multiple vue components */
                } else {
                    return this.h(a[0])
                    /* single vue component */
                }
            } else {
                return this.h('span', joinString(...a))
                /* text */
            }
        })
        return this.renderWrapper(true, children)
    }
    constructor(state) {
        this.state = state
        this.h = state.$createElement
        this.config = {
            layout: 'default',
            alwaysUseDashCase: true,
            autoPrefixClasses: true,
        }
    }

    renderChildren(children, depth) {
        /** rc **/
        return children.map((item, i) => {
            console.log('rendering child')
            return this.render(item, null, depth, i)
        })
    }
    renderArray(x, className = true) {
        const kids = this.renderChildren(x)
        /** ra **/
        return this.renderWrapper(className, kids)
    }

    renderDiv(tag, attrs, value) {
        return renderDiv(this.h, tag, attrs, value)
    }
    renderSingleton({
        component,
        wrapperClass,
        tag,
        attrs,
        payload,
        value,
    }) {
        /** rs **/
        if (tag && attrs) {
            return this.renderDiv(tag, attrs, value)
        }

        if (component) {
            return this.renderComponent(component, payload)
            /* the payload is a standard vue propOption  */
        }

        if (wrapperClass) {
            console.log('wrapperclass')
            if (isString(payload)) {
                return this.renderWrapper(wrapperClass, payload)
            } else if (isObject(payload)) {
                payload.staticClass =
                    this.prefixer(wrapperClass)

                if (value) {
                    return this.renderWrapper(payload, value)
                }
                return this.renderWrapper(payload)
            } else if (isArray(payload)) {
                console.log(payload, 'hi nothing herei')
                return this.renderArray(payload, wrapperClass)
            }
        }
    }
    prefixer(className) {
        if (!this.config.autoPrefixClasses) {
            return className
        }
        let name = vueName(this)
        if (className.includes(name)) return className
        return name + '-' + className
    }
    render(obj = 0, depth, index = 0) {
        const componentValue = this._render(obj, depth, index)
        if (obj.pageContainer) {
            console.log('has a page containerrrrrrrrrr')
            const self = this
            return this.h(
                VPageContainer,
                {
                    props: obj.pageContainerProps,
                    on: {
                        measure(e) {
                            console.log('measure was emitted')
                            console.log(self.$data, 'self data')
                        },
                    },
                },
                [componentValue]
            )
        }
        return componentValue
    }
    _render(obj, depth = 0, index = 0) {
        if (isArray(obj)) {
            console.log('rendering array @vr')
            const kids = this.renderChildren(obj)
            return this.renderWrapper(true, kids)
        }
        const { children, component, wrapperClass, payload } =
            obj

        /** vr **/

        if (!children) {
            return this.renderSingleton(obj)
        }

        if (isObject(children)) {
            return this.renderScopedSlots(obj)
        }

        const newDepth = isDefined(depth) ? depth + 1 : null
        const kids = this.renderChildren(children, newDepth)

        return component
            ? this.renderComponent(component, payload, kids)
            : wrapperClass
            ? this.renderWrapper(wrapperClass, kids)
            : this.renderObject(payload, kids)
    }

    renderScopedSlotElement(items) {
        const defaultSlot = this.state.$slots.default
        const scopedSlots = this.state.$scopedSlots
        const children = items.map((item) => {
            return isString(item)
                ? runner(item)
                : runner(item.component, item.slotProps)
        })

        return this.renderWrapper(true, children)

        function runner(key, slotProps) {
            if (key == 'default') return defaultSlot
            if (key in scopedSlots) {
                return scopedSlots[key](slotProps)
            }
            /*
             * these scopedSlots are directly
             * the same slots as the ones listed in
             * the object that you write
             * {slotProps: {key1, key2}}
             *
             * */
            return null
        }
    }

    autoPrefixer(s, name) {
        if (!name) name = vueName(this)
        if (this.config.autoPrefixClasses) {
            if (!s) return name
            if (!s.includes(name)) {
                s = name + '-' + s
            }
        }

        if (this.config.alwaysUseDashCase) {
            s = toDashCase(s)
        }
        return s
    }
    renderWrapper(options, x) {
        let name = vueName(this)
        if (!options) {
            options = {}
        } else if (isString(options)) {
            options = this.autoPrefixer(options)
            options = { staticClass: options }
        } else if (options == true) {
            options = { staticClass: name }
        } else if (isVue(options)) {
            options = { staticClass: name }
            x = Array.from(arguments)
        } else if (isObject(options)) {
            const f = (x) => this.autoPrefixer(x)
            editObject0922(options, '!staticClass', f)
        }

        if (isArray(x) && x.some(isNull)) {
            x = filter(x, isDefined)
        }

        return x
            ? this.h('div', options, x)
            : this.h('div', options)
    }

    renderScopedSlots({ component, payload, children }) {
        console.log('noooooooooot rly in use renderscopedslots')
        let defaultSlot

        const Component = getComponent(component)
        const scopedSlots = reduceObject8(children, (k, v) => {
            if (k == 'default') {
                assert(isArray(v))
                defaultSlot = [this.renderChildren(v)]
                return null
            }

            if (isArray(v)) {
                return (slotProps) => {
                    const kids = this.renderChildren(v)
                    return this.renderWrapper(k, kids)
                }
            }

            return (slotProps) => {
                const { payload, component } = v
                if (slotProps) {
                    Object.assign(payload.props, slotProps)
                }
                return this.renderComponent(component, payload)
            }
        })

        return this.h(
            Component,
            {
                scopedSlots,
                ...payload,
            },
            defaultSlot
        )
    }
    fixClasses(payloadObject, key) {
        if (this.config.alwaysUseDashCase) {
            payloadObject.staticClass = toDashCase(key)
        }

        if (this.config.autoPrefixClasses) {
            payloadObject.staticClass = vueName(
                this,
                payloadObject.staticClass
            )
        }
    }
    renderComponent(key, payload, kids) {
        if (!payload) payload = {}
        this.fixClasses(payload, key)
        const Component = getComponent(key)
        return kids
            ? this.h(Component, payload, [kids])
            : this.h(Component, payload)
    }

    renderObject(obj, kids) {
        return this.h('div', obj, kids)
    }
}

function getComponent(key) {
    return window[key]
}

const DocLayouts = {
    'standard-multiple-choice': {},
    'multiple-choice-with-answer-box': {},
    'multiple-choice-jjjj': {},
}

sample0825 = {
    wrapperClass: 'sugar',
    children: [
        {
            component: 'DocTitlePage',
            payload: {
                props: {
                    layout: 'multiple-choice',
                },
            },
            children: {
                default: [gtr('zoop1'), gtr('zoop2')],
                footer: {
                    component: 'DocFooter',
                    payload: {
                        props: {
                            value: 'fsf""',
                        },
                    },
                },
            },
        },
        {
            component: 'DocPage',
            payload: {
                props: {
                    layout: 'multiple-choice',
                },
            },
            children: {
                default: [gtr('zoop1'), gtr('zoop2')],
                footer: {
                    component: 'DocFooter',
                    payload: {
                        props: {
                            value: 'fsf""',
                        },
                    },
                },
            },
        },
    ],
}
sample0824 = {
    wrapperClass: 'sugar',
    children: [
        {
            component: 'LoremIpsum',
            payload: {
                props: {
                    value: 5,
                    name: 'john',
                },
            },
        },

        {
            component: 'LoremIpsum',
            payload: {
                props: {
                    value: 3,
                    name: 'john2',
                },
            },
        },

        {
            component: 'DocPage',
            payload: {
                props: { value: 'sssssssslotdef' },
            },
            children: [
                {
                    component: 'LoremIpsum',
                    payload: {
                        props: {
                            value: 4,
                        },
                    },
                },

                {
                    component: 'LoremIpsum',
                    payload: {
                        props: {
                            value: 7,
                        },
                    },
                },
            ],
        },
    ],
}
var VLoremIpsum = {
    name: 'LoremIpsum',
    props: ['value', 'name'],
    render(h) {
        const s = loremIpsum(this.value)
        return h('div', s)
    },
}

var DocPage = {
    name: 'DocPage',
    props: ['layout'],
    render(h) {
        const r = new VueRenderer(this)
        return r.renderScopedSlotElement([
            {
                component: 'header',
                slotProps: {
                    title: true,
                    instructions: true,
                },
            },
            'default',
            {
                /** fsp **/
                component: 'footer',
                slotProps: {
                    labelStudentName: true,
                    labelPageNumber: true,
                    labelOrganization: true,
                    style: 'defaultFooterStyle',
                },
            },
        ])
    },
}

function renderTransformNestedArray(a, options = {}) {
    /* returns an array of items
     * the items ...
     * */

    return a.map((row, i) => {
        const wrapperClass = options.parentWrapperClass || 'row'
        const children = row.map((el, i) => {
            /* the object */
            const payload = {
                payload: {},
            }
            if (options.component) {
                payload.component = options.component
                payload.payload = {
                    props: {
                        value: el,
                    },
                }
            } else {
                payload.wrapperClass =
                    options.childWrapperClass || 'row-item'

                if (options.directive) {
                    /* xdir */
                    payload.payload.directives = [
                        {
                            name: options.directive.name,
                            modifiers:
                                options.directive.modifiers ||
                                {},
                            value: el,
                        },
                    ]
                } else {
                    payload.value = el
                }
            }
            console.log(payload)
            return payload
        })
        return {
            wrapperClass,
            children,
        }
    })
}

function renderAnything(state, items, transformKey) {
    if (!items) items = state.value

    const ref = {
        tfa: renderTransformNestedArray,
    }

    if (transformKey) {
        let f = ref[transformKey]
        items = f(items)
    }

    const r = new VueRenderer(state)
    return r.render(items)
    /*
     * a recursive renderer.
     * uses wrapperClass | component | children | value
     * items should be an object ...
     * but sometimes it can be an array
     * */
}

function editObject0922(obj, key, f, ...args) {
    let exclam = false
    if (key.startsWith('!')) {
        exclam = true
        key = key.slice(1)
    }
    if (obj.hasOwnProperty(key)) {
        obj[key] = f(obj[key], ...args)
    } else if (exclam) {
        obj[key] = f(...args)
    }
}
function addClassPrefix(s, name) {
    /*
     * the class must not have spaces
     * the class must start with a letter
     * the class must not be a dynamic class
     * */
    if (!name) return s
    let r = / class="(\w+(?:-\w+)?)"/g
    return s.replace(r, (_, x) => {
        return ` class="${name}-${x}"`
    })
}
function vuetify(x, y) {
    function createRender(f) {
        return function render(h) {
            if (this.renderCount != null) {
                console.log('increasing render count')
                this.renderCount++
            }
            const renderer = new VueRenderer(this)
            const value = f ? f(renderer) : null
            if (value == null) {
                return renderer.render(this.value)
            }
        }
    }

    if (y) {
        Vue.prototype[x] = y
    } else if (isString(x)) {
        let name = toDashCase(x)
        //if (x == 'mainapp')
        const component = {
            name: x,
            props: ['value'],
            render: createRender(),
            data() {
                return {
                    fooba: 'hi from main',
                    /** main **/
                }
            },
            created() {
                this.renderCount = 0
            },
        }
        Vue.component(name, component)
        window[name] = component
        return name
    } else if (x.name) {
        let name = x.name
        if (x.renderer) {
            x.render = createRender(x)
            let dashName = toDashCase(name)
            window[dashName] = x
            return Vue.component(dashName, x)
        }
        if (x.template || x.render) {
            name = toDashCase(name)
            editObject0922(x, 'template', removeComments)
            if (x.transform || x.t) {
                let A = (x) => divify('div', name, x)
                let B = addClassPrefix
                let C = removeHtmlStuff
                editObject0922(x, 'template', (x) =>
                    A(B(C(x), name))
                )

                if (__viewTransform) {
                    console.log(x.template)
                }
            }

            if (x.css) {
                cssLoader(x.css)
                console.log('loading css from vuetify')
            }
            return Vue.component(name, x)
        } else if (/directive/i.test(name)) {
            name = name.replace(/-?directive$/i, '')
            name = toDashCase(name)
            return Vue.directive(name, x)
        } else {
            Vue.prototype[name] = x
            console.log('setting vue function', name)
        }
    }
}

function csc(s) {
    console.log(stringify(s))
}
function stest(r, s) {
    return isString(s) && s.includes(r)
    return isString(s) && RegExp(r).test(s)
}

var SayHi = {
    name: 'SayHi',
    props: ['value'],
    render(h) {
        return h(
            'div',
            sayhi(this.value || 'defaultSayHiValue')
        )
    },
}
function gtc(component) {
    return {
        name: component,
        props: ['value'],
        template: `<div>gtccccc ${component} {{value || 'hi'}}</div>`,
    }
}

function gtr(s, component = 'SayHi') {
    component = capitalize(component)
    if (!window[component]) {
        const el = gtc(component)
        window[component] = el
        vuetify(el)
    }

    return {
        component: component,
        payload: {
            props: {
                value: s,
            },
        },
    }
}

var xDocFooter = {
    name: 'DocFooter',
    props: {
        labelStudentName: { default: true },
        labelDate: { default: 'season year' },
        labelSubject: { default: true },
        label: { default: null },
        assignmentType: { default: 'homework' },
        labelOrganization: { default: true },
        useLine: { default: true },
        usePageNumber: { default: true },
        layout: { default: 'defaultFooterLayout' },
    },

    render(h) {
        const Line = this.useLine && h(DocLine)
        const Label = h(DocFooterLabel, { props: this.$props })
        const PageNumber =
            this.usePageNumber && h(DocPageNumber)

        let layout = this.layout
        if (!Line) this.layout += 'NoLine'

        switch (layout) {
            case 'defaultFooterLayout':
                return renderWrapper(h, [
                    Line,
                    ['left-right', Label, PageNumber],
                ])

            case 'defaultFooterStyleNoLine':
                return
        }
    },
}

function initVueStore(key, data) {
    if (!key) key = 'math'

    if (!data)
        data = {
            studentName: 'nihan',
        }

    const stores = {
        math: {
            state: {
                pageNumber: 1,
            },
            mutations: {
                increment(state, value = 1) {
                    state.pageNumber += value
                },
                reset(state) {
                    state.pageNumber = 1
                },
            },
        },
    }

    const store = stores[key]
    Object.assign(store.state, data)
    return new Vuex.Store(store)
}

function renderWrapper(a, b) {
    if (arguments.length > 2) {
        b = Array.from(arguments).slice(1)
    }
    let name
    let h
    if (isVue(a)) {
        name = vueName(a)
        h = a.$createElement
    } else {
        h = a
    }

    if (isArray(b) && b.some(isArray)) {
        const children = b.map((child, i) => {
            if (isArray(child)) {
                if (isString(child[0])) {
                    let [className, items] = splitonce(child)
                    return h('div', nameIt(className), items)
                } else {
                    return h('div', {}, child)
                }
            } else if (isVue(child)) {
                return child
            } else {
                return h(child)
            }
        })

        return name
            ? h('div', nameIt(name), children)
            : h('div', children)
    } else {
        return name ? h('div', nameIt(name), b) : h('div', b)
    }
}

var DocPageNumber = {
    name: 'DocPageNumber',
    render(h) {
        return renderWrapper(this, this.$pager())
    },
}
var DocFooterLabel = {
    name: 'DocFooterLabel',
    props: {
        labelStudentName: { default: true },
        labelDate: { default: 'Autumn 2022' },
        labelSubject: { default: true },
        assignmentType: { default: 'homework' },
        label: { default: null },
        labelOrganization: { default: true },
    },
    render(h) {
        const store = []
        if (this.label) {
            const text = dreplace4(this.label, (x) => {
                switch (x) {
                    case 'emDash':
                        return '—'
                    case 'name':
                    case 'grade':
                    case 'class':
                        return capitalizeName(this.$student[x])
                    case 'date':
                        return seasonYear()
                    case 'season':
                        return getSeason()
                    case 'year':
                        return getYear()
                }
            })
            return renderWrapper(this, text)
        }
        if (this.labelStudentName) {
            store.push(capitalizeName(this.$student.name))
        } else if (this.labelOrganization) {
            store.push(capitalizeName(this.labelOrganization))
        }

        if (this.labelSubject) {
            store.push(capitalize(this.$student.subject))
            store.push(EmDash)
        }
        if (this.labelDate) {
            store.push(labelDate(this.labelDate))
        }

        return new VueRenderer(this).renderMixed(store)
    },
}
var nihanStudent = {
    name: 'nihan',
    fullName: 'nihan lobo',
    subject: 'shsat math',
    class: 'Grade 4 Math',
    grade: 7,
    assignmentType: 'homework',
}

function labelDate(s) {
    switch (s) {
        case 'season year':
            return seasonYear()
    }
}
function vueName(state, ...args) {
    let name = isString(state)
        ? state
        : getConstructorName(state) == 'VueRenderer'
        ? state.state.$options.name
        : state.$options
        ? state.$options.name
        : state.name
    const value = toDashCase(name, ...args)
    return value
}

var EmDash = {
    name: 'EmDash',
    render(h) {
        return h('span', nameIt(vueName(this)))
    },
}

function nameIt(className) {
    if (arguments.length > 1) {
        return { staticClass: vueName(...arguments) }
    }
    let options = { staticClass: className }
    return options
}

var MathDocTitlePage = {
    name: 'MathDocTitlePage',
    props: ['title', 'packetType', 'toc'],

    //title: 'Grade 4 Math',
    //packetType: config.packetType,
    //date: upcomingSaturday()
    //toc: getToc(items)
    template: `
        <div>
            <div class="title">{{title}}</div>
            <div class="packet">{{packetType}} Packet</div>
            <div class="date">{{date}}</div>
        </div>
    `,
    data() {
        return {
            goo: 'hhh',
            boo: 'hhhhh',
        }
    },
}
var MathDocAnswerSheet = {
    name: 'MathDocAnswerSheet',
    props: ['questions'],
    render(h) {
        const name = this.$student.fullName
        const date = getAssignmentDate()
        const length = this.questions.length
        const r = new VueRenderer(this)
        return renderWrapper(j, [
            [Name, Date],
            MathDocAnswerChoicesTemplate,
        ])
        /* Nihan Lobo Answersheet
         * Score 10/11
         * Hot streak:
         * (a) (b) (c) (d)
         * bubble your answer sheet.
         * */
    },
}

function getAssignmentDateFactory(startDate) {}
function filterObject2(state, options) {
    const store = {}
    if (options.ignore) {
        for (let [k, v] of Object.entries(state)) {
            if (options.ignore.includes(k)) continue
            store[k] = v
        }
    } else if (options.keep) {
        for (let [k, v] of Object.entries(state)) {
            if (options.keep.includes(k)) store[k] = v
        }
    }
    return store
}

var QuerySearch = {
    name: 'QuerySearch',
    props: ['value'] /* referenceData */,
    data() {
        return {
            s: '',
        }
    },
    mounted() {
        //this.$el.focus()
    },
    methods: {
        search(s) {
            const referenceData = this.value
            const value = searchQuery(s, referenceData)
            return value
        },
    },
    render(h) {
        const name = vueName(this)
        const self = this
        return h('input', {
            staticClass: name,
            on: {
                keydown(e) {
                    self.s = self.$el.value
                    if (e.key == 'Enter') {
                        return self.search(self.s)
                    }
                },
            },
        })
    },
}

function modular(index, obj) {
    let min = obj.min || 0
    let dir = obj.dir || 1

    console.log({ index, dir })
    if (isArray(obj.max)) {
        let max = obj.max.length - 1
        return modularNumber(index, min, max, dir)
    } else if (obj.mode == Number) {
        return modularNumber(index, min, max, dir)
    }

    function modularNumber(index, min, max, dir) {
        if (index + dir > max) {
            if (index == max) return min
            return max
        }
        if (index + dir < min) {
            if (index == min) return max
            return min
        }
        return index + dir
    }
}

var arrowKeyMixin = {
    mounted() {
        console.log('hello from ArrowKeyMixn')
        /* kt: downenter */
        windowListener({
            preventDefault: { arrowKeys: true },
            state: this,
            enter() {
                this.ref[this.pos].selected = opposite(
                    this.ref[this.pos].selected
                )
            },

            ctrlD() {
                speak('ctrl d')
                const f = (x) => {
                    return x.selected
                }
                const g = (x) => {
                    return x.page
                }
                const value = this.ref.filter(f).map(g)
                console.log(value)
                dl(value)
            },
            up() {
                this.pos = modular(this.pos, {
                    mode: Number,
                    max: this.ref,
                    dir: -1,
                })
            },

            down() {
                this.pos = modular(this.pos, {
                    max: this.ref,
                    dir: 1,
                    mode: Number,
                })
            },
        })
    },
    data() {
        return {
            pos: 0,
        }
    },
}
var HyunMath = {
    name: 'HyunMath',
    props: ['value'],
    data() {
        return {
            ref: null,
        }
    },
    //<query-search :value = "value"/>
    template: `
        <div>
            <div class="abc" v-for="item,i in ref">
                <p v-index-highlight="pos == i" class="item-title">{{item.title}}</p>
                <button v-GreenDirective = "item.selected" @click = "select(i)" class="selection-button">select</button>
            </div>
        </div>
    `,
    created() {
        this.ref = flat(
            outboundData.map((item, i) => {
                return item.children.map((child, j) => {
                    let index = i + 1 + '-' + (j + 1)
                    return {
                        title: index + ' ' + child.title,
                        page: child.pageNumber,
                        selected: false,
                    }
                })
            })
        )
    },
    mounted() {
        console.log('hello from HyunMath')
    },
    mixins: [arrowKeyMixin],
}

function searchQuery(query, ref, mode = 'parent') {
    query = splitMapJoin(query, (x) => x + '\\w*')
    const queryRegex = RegExp(query, 'i')
    /* index: 1-based indexes, title, children */
    if (mode == 'parent') {
        for (let item of ref) {
            if (test(queryRegex, item.title)) {
                console.log('found')
                return item
            }
            console.log(item.title, 'not found')
        }
    }

    if (mode == 'child') {
        for (let item of ref) {
            for (let el of item.children) {
                if (test(queryRegex, el.title)) {
                    return item
                }
            }
        }
    }
}

function IndexHighlight(el, binding) {
    if (binding.value) {
        console.log('highlight it', getElementText(el))
        el.style.background = 'yellow'
    } else {
        el.style.background = 'white'
    }
}
function GreenDirective(el, binding) {
    if (binding.value) {
        console.log('highlight it', getElementText(el))
        el.style.background = 'GreenDirective'
    } else {
        el.style.background = 'white'
    }
}
var MathDocCoverPage = {
    name: 'MathDocCoverPage',
    props: ['config', 'topics'],
    render(h) {
        const student = this.$student
        const statement = vueStatement(this, '')
        return renderWrapper(this, [])
    },
    template: `
    <div>
        
    </div>`,
    data() {
        return {
            date: upcomingDate('saturday'),
        }
    },
}

function renderer(state, items) {
    const r = new VueRenderer(state)
    if (!items) return r[vueName(state)]()
    return r.render(items)
}

function mathDocWrapper(data) {
    const ref = mathDocRef[data.key]
    let component
    if (ref.component) component = ref.component
    else if (data.key.endsWith('s')) {
        component = 'VMath' + capitalize(depluralize(data.key))
    }

    const body = {
        //wrapperClass: data.key,
        wrapperClass: 'v-question-container',
        children: component
            ? data.value.map((item, i) => {
                  return {
                      wrapperClass: 'v-question-item',
                      children: [
                          {
                              component: 'DocIndex',
                              payload: {
                                  props: { value: i },
                              },
                          },
                          {
                              component,
                              payload: {
                                  props: { value: item },
                              },
                          },
                      ],
                  }
              })
            : null,
    }
    //console.log(body); throw '';

    const header = {
        wrapperClass: 'DocHeader',
        payload: ref.title,
    }

    const instructions = ref.instructions && {
        wrapperClass: 'DocInstructions',
    }
    if (isString(ref.instructions)) {
        instructions.payload = ref.instructions
    } else {
        instructions.children = ref.instructions
    }

    const bar = { component: 'DocLine' }

    const top = {
        wrapperClass: 'DocTop',
        children: [header, bar, instructions],
    }
    const footer = {
        component: 'DocFooter',
        payload: {
            props: {
                label: '$date $emDash $class',
            },
        },
    }

    const value = {
        wrapperClass: 'MathDocument',
        children: [top, body, footer],
    }
    return value
}

var MathDocQuestion = {
    name: 'MathDocQuestion',
    props: ['question', 'answer', 'choices', 'type'],
    render(h) {
        return renderer(this)
    },
}
var DocIndex = {
    name: 'DocIndex',
    props: ['value', 'template', 'name'],
    props: {
        value: { default: '' },
        template: { default: 'i) ' },
        name: { default: 'default' },
    },
    render(h) {
        let className =
            this.name == ''
                ? vueName(this.$parent, 'index')
                : joinDashes(vueName(this), this.name)

        let text = indexTemplater(this.template, this.value)
        return h('span', classProp(className), text)
    },
}

function classProp(className) {
    return { class: className }
}
function clone(data, amount) {
    return map(amount, () => copy(data))
}

function propIt(value, asObject) {
    if (asObject && isObject(value)) {
        return { props: value }
    }
    if (value.value) return value
    return { props: { value } }
}

function colorDirective(el, binding) {
    let value
    let modifiers = binding.modifiers

    let key =
        binding.arg == 'background' ? 'background' : 'color'

    el.style[key] = binding.value
}

function katexDirective(element, binding) {
    if (!binding.value) return
    let value
    const modifiers = binding.modifiers
    const displayMode = modifiers.displayMode
    if (modifiers.operator) {
        value = latex.fixOperator(binding.value)
        return katex.render(value, element)
    }

    let operator = null
    let vertical = modifiers.vertical

    if (modifiers.addition) {
        operator = '+'
    } else if (modifiers.subtraction) {
        operator = '-'
    } else if (modifiers.multiplication) {
        operator = '*'
    } else if (modifiers.division) {
        operator = '/'
    }

    const options = {
        displayMode,
        throwOnError: true,
    }

    if (operator == '/') {
        value = katexDivision(binding.value)
    } else if (vertical) {
        value = katexVertical(binding.value, operator)
    } else if (modifiers.mixed) {
        value = katexMixed(binding.value)
    } else if (hasLatex(binding.value)) {
        value = binding.value
    } else {
        value = binding.value
    }

    if (modifiers.showAnswer) {
        value = appendMathAnswer(value)
    }
    if (isString(value) && value.length > 7) {
        value = addMathComma(value)
    }
    if (modifiers.bold) {
        value = katexBold(value)
    }

    if (modifiers.fontSize) {
        value = katexFontSize(value, modifiers.fontSize)
    }

    katex.render(value, element, options)
}

function getToc(items) {
    return items.map((item, i) => {
        return item.title || item.key
    })
}

var VMathBoxElement = {
    name: 'VMathBoxElement',
    props: ['value', 'index'],
    render(h) {
        const r = new VueRenderer(this)
        return r.renderLinearGroup(
            {
                questionMark: this.value ? null : '?',
                index: this.index,
                value: this.value,
            },
            {
                value: { class: 'katex' },
            }
        )
    },
}
var VMathSequence = {
    name: 'VMathSequence',
    props: ['value'],
    render(h) {
        //console.log(this.value)
        //return h('div')
        const kids = this.value.map((item, i) => {
            const options = item
                ? {
                      props: { value: item, index: i + 1 },
                      style: { outline: '1px solid black' },
                  }
                : {
                      props: { value: '', index: i + 1 },
                      style: { outline: '1.5px solid black' },
                      class: 'katex',
                  }

            return h(VMathBoxElement, options)
        })
        return renderWrapper(this, kids)
    },
}
var GuidedMultiplicationX = {
    name: 'GuidedMultiplication',
    props: ['value'],
    render(h) {
        const size = 30
        const gap = 5

        const {
            top,
            bottom,
            answer,
            topGridLength,
            bottomGridLength,
        } = this.value

        const defaultStyle = {
            width: size + 'px',
            height: size + 'px',
            textAlign: 'center',
        }
        const renderItem = (item, style) => {
            return h(
                'div',
                {
                    style: Object.assign(
                        {},
                        defaultStyle,
                        style
                    ),
                    class: item.class,
                },
                item.value || ''
            )
        }
        const topGridTemplateColumns = `repeat(${topGridLength}, ${size}px)`

        const lengthDifference =
            bottomGridLength - topGridLength
        const marginLeft = `${lengthDifference * size}px`

        const Top = h(
            'div',
            {
                class: vueName(this, 'top'),
                style: {
                    display: 'grid',
                    gridTemplateColumns: topGridTemplateColumns,
                    marginLeft,
                    gap,
                },
            },
            top.map((item) => {
                return renderItem(h, item)
            })
        )

        const bottomGridTemplateColumns = `repeat(${bottomGridLength}, ${size}px)`

        const Bottom = h(
            'div',
            {
                style: {
                    display: 'grid',
                    gridTemplateColumns:
                        bottomGridTemplateColumns,
                    gap,
                },
                class: vueName(this, 'bottom'),
            },
            bottom.map((item) => {
                return renderItem(h, item, {
                    fontSize: '0.9em',
                    paddingTop: '0.1em',
                })
            })
        )

        const Bar = renderClassAndValue(h, {
            class: vueName(this, 'bar'),
            style: {
                marginLeft: lengthDifference * (size + gap),
                width: topGridLength * (size + gap),
                border: '1px solid black',
            },
        })
        const BottomBar = renderClassAndValue(h, {
            class: vueName(this, 'bar'),
            style: {
                //marginLeft:
                width: topGridLength * (size + gap),
                border: '1px solid black',
            },
        })

        const BottomSum = h(
            'div',
            {
                style: {
                    display: 'flex',
                    gap,
                },
                class: vueName(this, 'answer-sum'),
            },
            answer.map((item) => {
                return renderItem(h, item, {
                    fontSize: '0.9em',
                    paddingTop: '0.1em',
                })
                /* perhaps a small letter in the corner [A] */
                /*  */
            })
        )

        return renderWrapper(
            this,
            Top,
            Bar,
            Bottom,
            BottomBar,
            Sum
        )
    },
}
function renderClassAndValue(h, item) {
    return h(
        'div',
        { staticClass: item.class },
        item.value || ''
    )
}

function getClipData() {
    return window['data' + monthDay()]
}
var VStudentInfo = {
    name: 'VStudentInfo',
    props: [''],
    render(h) {},
}

function coverPageFromData(dataset) {
    const tableOfContents = getToc(dataset)
    return {
        component: 'VMathCoverPage',
        children: [
            {
                component: 'VAssessmentRubric',
                payload: {},
            },

            {
                component: 'TitlePage',
                payload: {
                    props: {
                        value: {},
                    },
                },
            },

            {
                wrapperClass: 'table-of-contents',
                payload: {
                    props: {
                        tableOfContents,
                    },
                },
            },
        ],
    }
}
var VTable = {
    name: 'VTable',
    props: [
        'rowHeaders',
        'columnHeaders',
        'columns',
        'rows',
        'body',
        'value',
        'useIndexes',
        'divders',
        'outline',
        'borders',
        'vertical',
        'widthes',
    ],
    render(h) {
        let name = vueName(this.$parent, 'table')
        let columnCount = getTableColumns(this.value)

        let bottom = 20
        let extraBottomPadding = 0
        let count = 0

        const columns = this.value.map((cols, columnIndex) => {
            const items = cols.map((item, i) => {
                const Index =
                    this.useIndexes &&
                    h(DocIndex, { props: { value: ++count } })
                const Value = simpleWrapper(h, 'ff', Item)

                return Index
                    ? simpleWrapper(h, '', [Index, Value])
                    : Value
            })
            const name = names[columnIndex]
            return simpleWrapper(h, name, items)
        })

        let verticalTableStyle = {
            columntCount: 2,
        }

        return h(
            'div',
            {
                style: verticalTableStyle,
            },
            columns
        )

        let cellContainerStyle = {
            position: 'relative',
            marginBottom: bottom + 'px',
            borderBottom: '1px solid black',
            paddingBottom: extraBottomPadding + bottom + 'px',
            paddingTop: 0,
        }

        if (columns == 2) {
        }

        let f =
            columns == 1
                ? (item, i) => {
                      let Index =
                          this.useIndexes &&
                          h(DocIndex, { props: { value: i } })
                      let Value = h(
                          'div',
                          nameIt(name + '-item'),
                          item
                      )
                      let Kids = [Index, Value]

                      return Index
                          ? h(
                                'div',
                                nameIt(name + '-cell'),
                                Kids
                            )
                          : Value
                  }
                : (item, rowIndex) => {
                      let Index =
                          this.useIndexes &&
                          h(DocIndex, { props: { value: i } })

                      let Value = h(
                          'div',
                          nameIt(name + '-item'),
                          item
                      )
                      return Index
                          ? h(
                                'div',
                                nameIt(name + '-row'),
                                Value
                            )
                          : Value
                  }
        const children = this.value.map(f)
        return h('div', nameIt(name), children)
    },
}
function getTableColumns(value) {
    if (isNestedArray(value)) {
        let length = value[0].length
        return length
    } else {
        return 1
    }
}
var VAssessmentRubric = {
    name: 'VAssessmentRubric',
    props: ['value'],
    template: `
    <div>
        <v-table :value="value"/>
    </div>`,
    data() {
        return {}
    },
}

function simpleWrapper(h, name, value) {
    enforce(arguments, 3)
    let options = isObject(name) ? name : nameIt(name)
    let payload = isVue(value) ? [value] : value

    return h('div', options, payload)
}

var VMultiplicationTable = {
    name: 'VMultiplicationTable',
    props: ['columns', 'rows', 'body', 'width'],
    render(h) {
        const r = new VueRenderer(this)
        /* interesting ... */
        return r.renderLinearGroup(
            {
                columns: this.columns,
                rows: this.rows,
                body: this.body,
            },
            {
                parentStyle: {
                    ...gridStyle({
                        area: 'null rows|columns body',
                    }),
                },
                body: {
                    style: {
                        ...gridStyle({ width: this.width }),
                    },
                },
            }
        )
    },
}

function getAncestry(x) {
    let store = []
    let type

    while (x.$parent) {
        let name = x.constructor.name
        let options = x.$options
        if (options.name) {
            store.push(options.name)
        } else if (name == 'Vue') {
            console.log(x._uid, 'uid')
            store.push('root')
        } else if (name == 'VueComponent') {
            const r = /vue-component-?\d*/
            store.push(x.$vnode.tag.replace(r, ''))
        } else if (options.template) {
            store.push(options.template.trim())
        } else {
            store.push('noname')
        }
        x = x.$parent
    }
    return store
}

function gridStyle(options = {}) {
    const size = options.size + 'px' || '1fr'
    const width = options.width
    const style = {
        display: 'grid',
    }
    if (width) {
        style.gridTemplateColumns = `repeat(${width}, ${size})`
    } else if (options.areas) {
        style.gridTemplateAreas = areaParser(options.areas)
    }
    return style
}
function areaParser(s) {
    return split(s, /\n|\|/)
        .map(doublequote)
        .join('\n')
        .replace(/null/, '.')
}

function renderDirective(
    state,
    name,
    modifiers = {},
    value = null,
    className
) {
    if (value == null) value = state.value
    return state.$createElement('div', {
        staticClass: className || vueName(state),
        directives: [{ name: name, value, modifiers }],
    })
}

var VKatex = {
    name: 'VKatex',
    props: ['value', 'mixed', 'operator', 'type'],
    render(h) {
        let value
        let modifiers = {}
        switch (this.type) {
            case 'vm':
                modifiers.vertical = true
                modifiers.multiplication = true
                value = this.value
                break
            default:
                value = latex.toLatex(this.value, this.operator)
                if (this.mixed) modifiers.mixed = 1
        }
        return renderDirective(this, 'katex', modifiers, value)
    },
}

var VTuple = {
    name: 'VTuple',
    props: ['value'],
    render(h) {
        return renderDirective(this, 'katex')
    },
}
var VMultiplicationFactorTuples = {
    transform: true,
    name: 'VMultiplicationFactorTuples',
    props: ['value'],
    irender(h) {
        const options = {
            parentWrapperClass: 'row',
            childWrapperClass: 'row-item',
            directive: { name: 'katex', modifiers: {} },
        }
        const value = renderTransformNestedArray(
            this.value,
            options
        )
        return renderAnything(this, value)
    },
    template: `
    <div class="row" v-for="row in value">
      <div class="number-group">
          <div 
            class="number-item" 
            v-katex="item" 
            v-for="item in row.elements">
          </div>
      </div>

      <v-emoji value="arrowRight"/>
      <div class="answer">{{row.answer}}</div>
    </div>
    `,
}
var VSymbol = {
    /* in progress */
    functional: true,
    name: 'VSymbol',
    props: ['value'],
    render(h, context) {
        const value = context.props.value
        const r = new VueRenderer(this)
        return r.renderSymbol(value)

        if (value == 'arrow') {
            const children = [
                h('div', {
                    style: {},
                }),
                h('div', {
                    style: {},
                }),
            ]
            return h(
                'div',
                {
                    style: {
                        width: parentWidth,
                    },
                },
                children
            )
        }
    },
}
var VEmoji = {
    name: 'VEmoji',
    props: ['value'],
    template: `
    <div :class="computedClass">
        {{utf}}
    </div>`,
    computed: {
        utf() {
            ref = {
                arrowRight: '\u2794',
            }
            return ref[this.value]
        },
        computedClass(s) {
            return vueName(this, this.value)
        },
    },
}

var VMathCoverPage = {
    name: 'VMathCoverPage',
    props: ['tableOfContents', 'type'],
    template: `
    <div>
        <v-

    </div>`,
    data() {},
    created() {
        this.name = null
    },
    /* todo */
}

var geoGebraParameters = {
    //ggbase64: bigGGB
    id: 'ggbApplet',
    width: 800,
    height: 600,
    showToolBar: true,
    borderColor: null,
    showMenuBar: true,
    allowStyleBar: true,
    showAlgebraInput: true,
    enableLabelDrags: false,
    enableShiftDragZoom: true,
    capturingThreshold: null,
    showToolBarHelp: false,
    errorDialogsActive: true,
    showTutorialLink: true,
    showLogging: true,
    useBrowserForJS: false,
    perspective: 'AG',
}
async function loadGeoGebra(s) {
    const url = 'https://cdn.geogebra.org/apps/deployggb.js'
    scriptFileLoader2(url)
    await sleep(500)

    ggb = new GGBApplet(
        geoGebraParameters,
        '4.0',
        'applet_container'
    )
    ggb.inject('applet_container', 'preferhtml5')
    return ggb.getAppletObject()
}
function windowListenerMixin(controller, extraData) {
    if (!extraData) extraData = {}
    if (!controller) controller = defaultWindowListener()

    /** mixin **/

    async function mounted() {
        console.log('hi from mounted @ listener mixin')
        const typist = windowListener({
            state: this,
            ...controller,
        })

        typist('up up up')
        /* should work */
    }
    function data() {
        return {
            ...extraData,
            x: 0,
            y: 0,
            pos: 0,
            min: 0,
            max: 100,
        }
    }

    return {
        mounted,
        data,
    }
}
var geoGebraController = {
    /** ggc **/
    up() {
        console.log('up')
    },
    down() {},
    left() {},
    right() {},
    enter() {},
    space() {},
    save() {},
    backspace() {},
    escape() {},
}

var templateController = {
    up() {},
    down() {},
    left() {},
    right() {},
    enter() {
        console.log('enter')
    },
    space() {
        console.log(this.$data)
    },
    save() {
        console.log('hiiiiiii save')
    },
    backspace() {
        console.log('bs')
    },
    escape() {
        console.log('escape')
    },
    fallback(key) {
        console.log(key, 'fallbacker')
    },
}
var geoGebraMixin = {
    mounted() {
        console.log(this.$data, 'mounted geogebra')
    },
    created(s) {
        console.log(this, 'hi')
    },
    methods: {
        fov(s) {
            console.log('vv fovver')
            console.log(this.$data)
        },
    },
    data(s) {
        return {
            boo: 'hi',
        }
    },
}
function foobar(s) {
    console.log('foo')
}
var GeoGebra = {
    /** gg **/
    name: 'GeoGebra',
    mixins: [windowListenerMixin(geoGebraController)],
    async created(s) {
        await loadGeoGebra()
    },
    data() {
        return {
            zoo: 4,
        }
    },
    render(h) {
        return h('div', { attrs: { id: 'applet_container' } })
    },
}
function defaultWindowListener(s) {
    return {
        left() {
            console.log('hi from left')
        },
        right() {
            console.log('hi from right')
        },
    }
}

class VueHtmlObjectParser {
    constructor(state) {
        this.h = state.$createElement
        this.state = state

        this.refs = {
            tags: {
                body: 'div',
            },
            classes: {
                c12: 'c12',
                'doc-content': 'body',
            },
        }
    }
    run(obj) {
        return this.runner(obj)
    }

    renderParagraph(obj) {
        let classes =
            obj.attr.class &&
            toArray(obj.attr.class)
                .map((className) => {
                    return this.refs.classes[className]
                })
                .filter(exists)
                .join(' ')

        let child = obj.child
        let payload = child.node == 'text' ? child.text : child

        return this.render(tag, classes, payload)
    }

    runner(obj) {
        let tag = this.refs.tags[obj.tag]
        if (obj.tag == 'span') {
            return this.renderSpan(obj)
        }

        if (obj.tag == 'p') {
            return this.renderParagraph(obj)
        }
    }

    render(tag, className, payload) {
        if (isArray(payload)) {
            payload = payload.map((child) => this.runner(child))
        }
        return this.simple(tag, clalssName, payload)
    }

    simple(tag, className, payload) {
        return this.h(tag, { staticClass: className }, payload)
    }
}

var VPizzaFrac = {
    name: 'VPizzaFrac',
    props: ['value', 'label'],
    render(h) {
        const wrapperStyle = {
            style: {
                width: '100px',
                height: '100px',
            },
        }
        const fracValue = latex.frac(
            ...parseFraction(this.value)
        )
        const child = h('canvas', { ref: 'canvas' })
        const frac = h('div', wrapperStyle, [child])
        //const label = h(VKatex, {props: {value: fracValue}})
        const label = h(VKatex, {
            props: { mixed: 1, value: usef },
        })
        return renderWrapper(this, frac, label)
        //
        /* you need a wrapper in many cases */
    },
    mounted() {
        console.log('hello from fracer')
        const options = {
            type: 'pie',
            data: {
                datasets: createDataSets(this.value),
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        }

        this.chart = createChart(this.$refs.canvas, options)
    },
}

function createDiagonalPattern(color = 'black') {
    // create a 10x10 px canvas for the pattern's base shape
    let shape = document.createElement('canvas')
    shape.width = 10
    shape.height = 10
    // get the context for drawing
    let c = shape.getContext('2d')
    // draw 1st line of the shape
    c.strokeStyle = color
    c.lineWidth = 1
    c.beginPath()
    c.moveTo(2, 0)
    c.lineTo(10, 8)
    c.stroke()
    // draw 2nd line of the shape
    c.beginPath()
    c.moveTo(0, 8)
    c.lineTo(2, 10)
    c.stroke()
    // create the pattern from the shape
    console.log(
        type(c.createPattern(shape, 'repeat')),
        'foooooooo'
    )
    return c.createPattern(shape, 'repeat')
}

function createDataSets(value) {
    let [n, d] = parseFraction(value)
    let numbers = range(d)
    let data = numbers.map(() => 1)
    let backgroundColor = numbers.map((i) => {
        return i <= n ? 'lightgray' : 'white'
        return i <= n ? createDiagonalPattern() : 'white'
    })
    let borderColor = 'black'
    let borderWidth = 1
    return [{ backgroundColor, data, borderColor, borderWidth }]
}

var VTutorial = {
    name: 'VTutorial',
    props: ['component', 'value', 'vertical', 'horizontal'],
    template: `
    <div>
        <v-pizza-frac label="1" :value="frac" v-for="frac in fractions"/>
    </div>`,
    //render(h) {
    //let children
    //let component = getComponent(this.key)
    //return
    //return renderWrapper(this, children)
    //},
    data() {
        return {
            fractions: ['1/4', '2/5', '2/8'],
        }
    },
}

function shadesOf(colorKey, n) {
    return [
        'LightGray',
        'Silver',
        'DarkGray',
        'Gray',
        'DimGray',
    ].slice(0, n)
}
function charto({
    title = 'hohoho',
    data,
    yAxisLabel = 'goo',
    xAxisLabel = 'bbb',
    label,
    type = 'bar',
} = {}) {
    defaultOptions = {
        //responsive:true,
        //aspectRatio: null,
        //height: 200,
    }

    let labels = data.map((x, i) => i)
    //let labels = data.map((x) => x.label)
    let dataValues = data.map((x) => x.value)
    //let colors = shadesOf('grey', data.length)

    let colors = data.map((x) => {
        return createDiagonalPattern('black')
    })
    let myOptions = {
        type: type,
        data: {
            labels: labels,
            datasets: [
                {
                    backgroundColor: colors,
                    data: dataValues,
                    barThickness: 15,
                    borderColor: 'black',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: title,
                },
            },
            scales: {
                x: {
                    title: {
                        display: !!xAxisLabel,
                        text: xAxisLabel,
                    },
                    ticks: {
                        stepSize: 1,
                    },
                },

                y: {
                    type: 'linear',
                    title: {
                        display: !!yAxisLabel,
                        text: yAxisLabel,
                    },
                    //beginAtZero: true,
                    //min: 0,
                    //max: 10,
                    ticks: {
                        color: 'red',
                        font: {
                            size: 8,
                        },
                        stepSize: 1,
                    },
                },
            },
        },
    }
    //console.log(!!xAxisLabel)
    return Object.assign({}, defaultOptions, myOptions)
}
function createChart(el, options = {}, plugins = null) {
    el = vueElementGetter(el, 'canvas')
    let config = plugins
        ? Object.assign({}, options, [plugins])
        : options
    return new Chart(el, charto(config))
}

var VChart = {
    name: 'VChart',
    props: {
        width: { default: '200' },
        height: { default: '400' },
        value: {},
    },
    template: `
        <div class="v-chart">
        <canvas ref="canvas"></canvas>
            </div>
    `,
    data() {
        return {}
    },
    mounted() {
        console.log('hello from VChart')
        this.chart = createChart(this, this.value)
        this.resize()
    },
    methods: {
        resize() {
            setWidthHeight(
                this.chart.canvas.parentNode,
                this.width,
                this.height
            )
        },
    },
}
function setWidthHeight(el, width, height) {
    assignStyle(el, {
        width: width + 'px',
        height: height + 'px',
    })
}

function scatterCharto(s) {
    return {
        type: 'scatter',
        data: {
            labels: [
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
                '2020',
            ],
            datasets: [
                {
                    label: 'Cars',
                    data: [
                        { x: -10, y: 0 },
                        { x: 0, y: 10 },
                        { x: 10, y: 5 },
                        { x: 4, y: 8 },
                    ],
                    pointRadius: 10,
                },
                {
                    label: 'Bikes',
                    data: [
                        { x: 10, y: 3 },
                        { x: -2, y: 6 },
                        { x: 9, y: 3 },
                        { x: 11, y: 6 },
                    ],
                    pointRadius: 10,
                },
            ],
        },
    }
}

function renderComponentItem(state, item) {
    /** rci **/
    let h = state.$createElement
    let Component = getComponent(item.component || item.name)
    let props = !item.props
        ? propCreator(item.name, item.amount)
        : isObject(item.props)
        ? propFixer(item.props)
        : isFunction(item.props)
        ? item.props(item.arg, state)
        : isString(item.props)
        ? eval(item.props)
        : throwError()

    let style =
        state.style /* implicit getting of style state */
    let options = {
        props,
        style,
    }
    return h(Component, options)

    function propCreator(name, amount) {
        if (!amount) amount = 10
        const key = 'em' + capitalize(name)
        const argf = window[key + 'Arger']
        const value = emWrapper({ amount, argf, key })
        return { value }
    }

    function propFixer(obj) {
        return obj
        const parentData = state.$parent
        console.log(parentData)
        return transformObject(obj, (v) => {
            return v.replace(templaterRE, (_, x) => {
                return evalFromObject(x, parentData)
            })
        })
    }
}

var VMeasure = {
    transform: true,
    /** vm **/
    name: 'VMeasure',
    props: {
        value: { default: '' },
        marginBottom: { default: 0 },
        measured: { default: false },
        columns: { default: 0 },
        layout: { default: '' },
    },
    render(h) {
        if (!this.newValues) {
            /* handles the styles implicitly*/
            return renderComponentItem(this, this.value)
        }

        const children = this.newValues.map((item) => {
            return h(VMeasure, item)
        })

        return simpleWrapper(h, 'measure-container', children)
    },
    data() {
        return {
            mb: 0,
            newValues: null,
        }
    },
    computed: {
        style() {
            let mb = this.marginBottom + this.mb
            return {
                marginBottom: pixelate(mb),
            }
        },
    },
    mounted() {
        if (this.measured) return

        let data = vueHeights(this)
        if (data.safe) {
            this.mb = data.delta
        } else {
            this.newValues = vuePartitionElements(
                data.partitions,
                this.value
            )
        }
    },
}

var FullDocument = {
    name: 'FullDocument',
    //props: ['value'],
    template: `
        <div class="full-document">
            <template v-if="marginBottoms.length == 0">
                <v-measure 
                    @measure="onMeasure"
                    :value="value"
                    :marginBottom="0"
                    v-for="item,i in value"/>
            </template>

            <template v-else>
                <v-measure 
                    @measure="onMeasure"
                    :value="value" 
                    :marginBottom="marginBottoms[i] || 0"
                    v-for="item,i in value"/>
            </template>
        </div>
    `,
    data() {
        return {
            value: skip(boogaboogaArray),
            //value:
            fooba: 'hi',
            status: 0,
            marginBottoms: [],
            //measures: [],
            //measurements: []
        }
    },
    created(s) {
        this.measurements = []
        this.measures = this.value.map((x) => {
            return isArray(x.value) ? x.value.length : 1
        })
    },

    methods: {
        onMeasure(payload) {
            this.measurements.push(payload)
            if (sameLength(this.measurements, this.measures)) {
                this.reMeasure()
            }
        },
        reMeasure() {
            console.log('time to remeasure')
            let length = this.measurements.length
            let marginBottoms = []
            for (let i = 0; i < length; i++) {
                let height = this.measurements[i]
                let measure = this.measures[i]
                let diff = height - 1000
                if (diff > 0) {
                    /* then one or more of the items
                     * needs to be moved */

                    if (height > 34) {
                        //... expand to fill the page
                    }
                } else {
                    marginBottoms.push(diff)
                }
            }
            this.marginBottoms = marginBottoms
        },
    },
}
var DocPageContainer = {
    name: 'DocPageContainer',
    props: ['value', 'layout'],
    data() {
        return {
            measurements: null,
            renderCount: 1,
            height: magicVuePrintDocumentHeight,
            padding: 50,
            marginBottom: 0,
        }
    },
    render(h) {
        const makeStyles = () => {
            return {
                style: cssEvaluator({
                    height: this.height,
                    background: puppeteerBackground(),
                    padding: this.padding,
                    marginBottom: this.marginBottom,
                    position: 'relative',
                }),
                staticClass: 'document-page-container',
            }
        }

        const styles = makeStyles()

        /* rendering the main container */
        let finalParentWrapper = (Child, j, a) => {
            /** fp **/
            let label =
                j == 0
                    ? null
                    : 'Page 1 - Grade 4 Math Homework - Autumn 2022'
            let children = [
                h(VWaterMark),
                h(Child),
                h(DocFooter, {
                    props: {
                        label,
                    },
                }),
            ]
            return simpleWrapper(h, styles, children)
        }

        let f0 = (child, j = 0) => {
            return simpleWrapper(h, styles, child)
        }

        let f1 = (item) => {
            return renderComponentItem(this, item)
        }

        if (this.measurements) {
            let f2 = independentf(
                this.measurements,
                f1,
                finalParentWrapper
            )
            let measuredChildren = f2(this.value)

            return simpleWrapper(
                h,
                'full-document',
                measuredChildren
            )
        } else {
            const children = this.value.map(f1)
            return f0(children)
        }
    },

    async mounted() {
        await sleep(250)

        let maxHeight =
            this.height - this.padding * 2 - this.marginBottom
        let store = getElementPartitions(this.$el, maxHeight)
        /** gep **/
        console.log(stringify(store), 'measurements')

        if (store) {
            this.measurements = store
            this.renderCount++
        } else {
            assignStyle(this.$el, 'mb0 h1000')
        }
        await sleep(600)
        if (this.foobar) {
            console.log('got foobar..maybenot')
            fixDocPageHeights()
        }
    },
}

function independentf(measures, childWrapper, parentWrapper) {
    enforce(arguments, 3)
    /* needs all 3 ... */
    let count = 0
    let f2 = (items) => {
        return measures.map((measure, j) => {
            let row = measure.map(() => {
                return childWrapper(items[count], count++)
            })
            return parentWrapper(row, j, measures)
        })
    }
    return f2
}

function renderEmItem(h, item) {
    let Title = h(VTitle, { props: { value: item.title } })
    let Instructions = h(VInstructions, {
        props: { value: item.instructions },
    })
    let Component = getComponent(item.component)
    let props = eval(
        toStringCallable(item.f, ...toArray(item.args))
    )
    let payload = { props }
    let child = h(Component, payload)
    let children = [Title, Instructions, child]
    return simpleWrapper(h, item.key, children)
}

/* this is the main actor */
function renderComponentOrDiv(h, item) {
    if (item.em) {
        return renderEmItem(h, item)
    }
    if (item.component) {
        let Component = getComponent(item.component)
        return h(Component, item.payload)
    } else {
        return renderDiv(h, item.tag, item.attrs, item.value)
    }
}
function renderDiv(h, tag, attrs, value) {
    /* rendering a basic div */
    return h(
        tag,
        {
            class: attrs.class,
            style: cssEvaluator(attrs.style),
        },
        value || ''
    )
}

function renderConnector(component, data, f) {
    return data.map((item) => {
        return {
            component: component,
            payload: {
                props: {
                    value: f ? walk2(item, f) : item,
                },
            },
        }
    })
}
function kvFunctionGetter(key, f) {
    return function lambda(k, v) {
        if (k == key) {
            return f(v)
        }
    }
}

var VerticalArithmetic = {
    name: 'VerticalArithmetic',
    props: ['value'],
    template: `
        <div>
            
        </div>
    `,
}

var VStudentReport = {
    t: 1,
    name: 'VStudentReport',
    props: [
        'title',
        'date',
        'studentName',
        'comments',
        'score',
    ],
    template: `
      <div class="title">{{title}}</div>
      <div class="date">{{date}}</div>
      <div class="student">{{studentName}}</div>
      <div class="score">{{score}}</div>

      <div class="paragraph" v-for="paragraph in comments">
          {{paragraph}}
      </div>
    `,
}

//console.log(voraciousVuetify())
//vuetify('dialogue-item') /* r.render(this.value) */
//vuetify(VerticalArithmetic)
//vuetify(VStudentReport)
//to do it well
//to create additional work

var PropTest = {
    name: 'PropTest',
    props: { value: { default: 'dsfgsdfg' } },
    render(h) {},
    mounted() {
        console.log('hello from PropTest')
        console.log(this.$props)
    },
}

var boogaboogaArray = [
    /** bo **/
    ...cloneFromBase(
        {
            component: 'VGuidedMultiplication',
            props(arg, state) {
                return emGuidedMultiplication2(arg)
            },
            arg: '2345*678',
            skip: 1,
        },
        ['123 * 3445', '13 * 83', '345432 * 123123']
    ),

    {
        name: 'GuessForX',
    },
]
function loremComponentTest(h, Component, child) {
    loremProp(Component)
    if (child) {
        child = [h('div', 'hiiiiiiiiii from child')]
        return h(Component, {}, child)
    } else {
        return h(Component)
    }

    function loremProp(Component) {
        for (let [k, v] of Object.entries(Component.props)) {
            Component.props[k].default = k
        }
    }
}

function renderTest(h, key) {
    const ref = {
        VList: {
            smartexample: true,
            underline: true,
            value: new LoremIpsum().sentences(10),
        },
    }
    let props = ref[key]
    /** rt **/
    let component = getComponent(key)
    return h(component, { props })
}
vboo = [
    {
        wrapperClass: 'v',
        payload: 'hii',
    },

    {
        wrapperClass: 'vdf',
        payload: [
            { wrapperClass: 'dfdfgdfg', payload: 'hiii' },
            { wrapperClass: 'dfdfgdfg', payload: 'hiii' },
            {
                wrapperClass: 'dfdfgdfg',
                payload: [
                    { wrapperClass: 'a', payload: 'hiifffi' },
                    { wrapperClass: 'a', payload: 'hiifffi' },
                ],
            },
        ],
    },
]

images = {
    rocklee: {
        thumbsup: 'sdf',
    },
}
vboo = [
    {
        component: 'VPicture',
        payload: {
            props: {
                image: 'rockleethumbsup',
                title: {
                    above: 'All of you are smart.',
                    below: {
                        value: 'Believe in your dreams! I will prove to you that you can achieve your dreams just by working hard.',
                        author: 'Rock Lee - Konoha Leaf Village Ninja',
                    },
                },
            },
        },
        pageContainer: true,
    },
    {
        component: 'VListicle',
        pageContainer: true,
        pageContainerProps: 'boogabooga',
        payload: {
            props: {
                value: mySmartStudents(),
            },
        },
    },
]
var App = {
    name: 'App',
    render(h) {
        return h(HoverTest)
        return h(vuetify('mainapp'), propIt(vboo))
        //return renderTest(h, 'VList')
        //return h(FullDocument)
        /** ap **/
        return h(
            DocPageContainer,
            propIt(skip(boogaboogaArray))
        )
    },
    mounted: delayedHtmlSkeleton,
}

var VGuidedMultiplication = {
    fullPager: true,
    transform: true,
    data() {
        return {}
    },
    name: 'VGuidedMultiplication',
    props: [
        'bottomAnswers',
        'answerArray',
        'topSingles',
        'questionArray',
        'deltaLength',
        'questionString',
        'answerString',
    ],
    computed: {
        subtitle(s) {
            return this.isShort
                ? ''
                : latex.equality(
                      this.questionString,
                      this.answerString
                  )
        },
        title(s) {
            return 'Big Multiplication'
        },
        instructions() {
            return this.isShort
                ? `Every big multiplication question is just a bunch of smaller multiplication questions pieced together. Answer the first ${
                      this.topSingles.length
                  } questions and then put them together in question ${
                      this.topSingles.length + 1
                  }. Add them up, and that will give you the final answer.`
                : `A super big multiplication question. You can do it!`
        },
        isShort() {
            return len(this.answerString) < 8
        },
    },
    template: `

        <div class="intro">
            <v-title :title="title" :subtitle="subtitle"/>
            <v-bullet-list header="Instructions" icv="instructions"/>
        </div>

       <v-row class="top-singles" v-if="isShort" :items="topSingles">
           <template v-slot="{item, index}">
              <v-numbered :value="index" position="left" 
                template="(1)">
                  <v-katex :value="item" type="vm"/>
              </v-numbered>
           </template>
       </v-row>

        <v-numbered class="main" 
            :value="topSingles.length" position="northwest" template="(1)">
            <v-math-array 
                :style="{'margin-bottom': '30px', 'margin-left': deltaLength * 35}" 
                :value="questionArray"/>

            <v-math-array 
                :style="{'margin-left': deltaLength * 35}" 
                :value="bottomAnswers"/>

            <v-math-array 
                :underline="false"
                :style="{'margin-left': deltaLength * 35}" 
                :value="answerArray"/>
        </v-numbered>

        <v-numbered v-if="isShort"
            :value="topSingles.length + 1" position="left" template="(1)">
            <v-final-answer :answer="answerString">
                <v-katex :value="questionString" class="question"/>
            </v-final-answer>
        </v-numbered>
    `,
    mounted() {},
}
var VArithmeticWrapper = {
    name: 'VArithmeticWrapper',
    props: ['operator', 'type', 'shift'],
    template: `
        <div class="arithmetic-container">
            <slot ref="slot"></slot>
            <div :style="computedOperatorStyle"
                class="operator" 
                v-katex.operator="operator"/>
            </div>
        </div>
    `,
    computed: {
        computedSlotWrapperStyle() {
            return {
                position: 'absolute',
                bottom: 0,
                left: 0,
            }
        },

        computedOperatorStyle() {
            //return cssEvaluator('abs b')
            //position: 'absolute',
            //bottom: 10,
            //left: 10,
            //}
        },
    },
    mounted() {
        console.log(
            type(Object.keys(this.$slots)),
            this.$slots,
            'hi'
        )
        console.log('hello from VArithmeticWrapper')
    },
}
var VNumbered = {
    name: 'VNumbered',
    props: {
        value: { default: true },
        position: { default: 'left' },
        template: { default: '1' },
        format: { default: '1' },
    },

    template: `
        <div :style="styles.container">
           <div :style="styles.index">{{computedIndex}}</div>
           <div>
               <slot></slot>
           </div>
        </div>
    `,
    computed: {
        styles() {
            const style = styleHelper1008(
                this.position,
                this.template
            )
            return style
        },
        computedIndex() {
            let value = this.value
            return indexTemplater(this.template, value)
        },
    },
}

function indexTemplater(s, value) {
    return s.trim().replace(/\b[ija1]\b/i, (x) => {
        if (x == 1) return value + 1
        if (x == 'i') return value + 1
        if (x == 'j') return n2char(value)
        if (x == 'J') return capitalize(n2char(value))
        if (x == 'A') return capitalize(n2char(value))
    })
}

var BaseIcon = {
    name: 'BaseIcon',
    props: {
        viewBox: { type: String, default: '0 0 24 24' },
        iconName: { type: String, default: '' },
        width: { type: [Number, String], default: 18 },
        height: { type: [Number, String], default: 18 },
        iconColor: { type: String, default: 'currentColor' },
    },
    template: `
   <svg xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
  >
    <title :id="iconName" lang="en">{{iconName}}</title>
      <slot/>
  </svg>`,
}

const SvgPathLibrary = {
    iconCheck:
        'M20.7 5.3c-0.4-0.4-1-0.4-1.4 0l-10.3 10.3-4.3-4.3c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l5 5c0.2 0.2 0.4 0.3 0.7 0.3s0.5-0.1 0.7-0.3l11-11c0.4-0.4 0.4-1 0-1.4z',
}

var IconCheck = createSvgComponentFromPath('iconCheck')
function createSvgComponentFromPath(key) {
    function transform(s) {
        return divify('path', { d: s }, '')
    }
    const path = transform(SvgPathLibrary[key])
    const componentOptions = {
        template: path,
        name: toDashCase(key),
    }
    vuetify(componentOptions)
    return componentOptions
}

var VMathArray = {
    name: 'VMathArray',

    props: {
        value: { default: '' },
        /* type = nestedarray */
        underline: { default: true },
    },
    template: `
        <div class="v-math-array" :style="style">
            <div v-for="row in value" class="v-math-array-row">
                <div v-for="el in row" class="v-math-array-el katex" :class="el.class">
                    {{el.value}}
                </div>
            </div>
        </div>
    `,
    computed: {
        style() {
            if (this.underline) {
                return {
                    borderBottom: '1px solid black',
                }
            }
        },
    },
}

var VRow = {
    name: 'VRow',
    props: ['items'],
    template: `
        <div class="v-row" :style="style">
            <slot v-for="item, index in items" 
                :index="index"
                :item="item">
                    <p>{{index}} {{JSON.stringify(item)}}</p>
            </slot>
        </div>
    `,
    computed: {
        style() {
            return cssEvaluator('flexwrap gap150')
        },
    },
}

function vueParentAndChildName(state) {
    return vueName(this.$parent, vueName(this))
}

var VDatestamp = {
    name: 'VDatestamp',
    props: { type: { default: 'long' } },
    render(h) {
        let date = upcomingDate('saturday', Date)
        let s = formatDatestamp(date, this.type)
        let name = vueParentAndChildName(state)
        return simpleWrapper(h, name, s)
    },
}

var VxxTitleAndInstructions = {
    transform: true,
    name: 'VTitleAndInstructions',
    props: ['title', 'instructions'],
    template: `
        <div class="title">{{title}}</div>
        <hr class="doc-line"/>
        <div class="instructions">{{instructions}}</div>
    `,
    mounted() {
        //console.log('hello from VTitleAndInstructions')
        //console.log(this.title, this.instructions)
        //console.log(this.$props, 'goo')
    },
}
function removeHtmlStuff(s) {
    /* for vuetify */
    s = s.replace(/breaker.+/s, '')
    return s
    let spaces = search(/^( *)ignore$/m, s)
    if (spaces) {
        s = s.replace(
            RegExp(
                '^' +
                    spaces +
                    'ignore.+\\n[^]+?\\n' +
                    spaces +
                    '\\S.+',
                'm'
            ),
            ''
        )
        return s
    }
    return s
}
//vuetify(VTitleAndInstructions)
/* when you look at a componentTest item, and u see the padding, it is because componentTest automatically adds 50px of padding to the child items */
/* when you find a comfortable place to be, looking at other things which may disturb that comfort, is unacceptable. */
/* brooklyn learning
 *
 * Brooklyn Learning is
 * The software is hacked together, but it works.
 * The ability to create unique educational materials.
 * Try it out.
 * A real software engineer to turn my hacks into enterprise
 * A school director to turn the
 *
 * I believe the system behind Brooklyn Learning
 * Is flexible and can be adapted to teaching various subjects
 * to be a good soldier
 * to score well on tests
 * they will become parents too
 * maybe -- there is a certain disconnect that is required
 *
 *
 *
 * */

function styleHelper1008(pos, format) {
    /* format  == template */
    let container
    let index

    if (pos == 'left') {
        container = cssEvaluator('flex aic')
        index = cssEvaluator('center mr20')
    } else if (pos == 'top') {
    } else if (pos == 'northwest') {
        container = cssEvaluator('rel')
        index = cssEvaluator('abs northwest')
    }

    Object.assign(index, cssEvaluator('fw600 wh25'))

    if (format == '(1)') {
        Object.assign(index, cssEvaluator('br7 bblack center'))
    } else if (format == '[1]') {
        Object.assign(index, cssEvaluator('white bgblack'))
    }

    //else if (format == '1.') {
    //Object.assign(index, cssEvaluator('white bgblack'))
    //}
    return {
        container,
        index,
    }
}
var VAnswerBox = {
    name: 'VAnswerBox',
    props: {
        answer: { default: '' },
        showAnswer: { default: false },
    },
    template: `
        <div class="v-answer-box">
            <v-math-text v-show="showAnswer" 
                class="v-answer-box-answer" :value="answer" bold="true"/>
        </div>
    `,
    style(s) {
        let length = len(this.value) * 16
        return cssEvaluator('px20 py10 w' + length)
    },
    mounted() {
        //console.log('hello from VAnswerBox')
        //console.log(this.value)
    },
}
var VFinalAnswer = {
    name: 'VFinalAnswer',
    props: ['answer'],
    data() {
        return {
            measuredFontSize: '2rem',
        }
    },
    mounted() {
        vueFixElementSizing(this)
    },
    template: `
        <div class="center-each" style="gap: 30px" :size="measuredFontSize">
            <div :style="computedStyle" class="answer-wrapper">
                <slot></slot>
            </div>
            <div class="middle katex">=</div>
            <v-answer-box :answer="answer" showAnswer="true"/>
        </div>
    `,
    computed: {
        computedStyle() {
            return {
                color: 'black',
            }
        },
    },
}

/* am i supposed to be doing this ... today ... or taking advantage of the weather ... i should be taking advantage of the weather */
function prettyMathQuestion(s) {
    return numberWithCommas(s)
}

//prettyMathQuestion(questionString)
//
function hasSlot(state) {
    return !!len(state.$slots.default)
}
var VTitle = {
    name: 'VTitle',
    props: ['subtitle', 'title'],
    computed: {
        hasSlot() {
            return hasSlot(this)
        },
    },
    mounted() {},
    template: `
    <div>
        <template v-if="hasSlot">
           <v-left-right>
               <template v-slot:left>
                   <v-math-text icv="title" :bold="true"/>
                   <v-math-text icv="subtitle" :bold="true"/>
               </template>
               <template v-slot:right>
                   <slot></slot>
               </template>
           </v-left-right>

           <hr class="doc-line"/>
        </template>
        <template v-else>
           <v-math-text icv="title" :bold="true"/>
           <v-math-text icv="subtitle" :bold="true"/>
           <hr class="doc-line"/>
        </template>
    </div>
    `,
}
var VLeftRight = {
    name: 'VLeftRight',
    computed: {
        className(s) {
            return vueName(this.$parent, vueName(this))
        },
    },
    template: `
        <div :class="className">
            <div :class="className + 'left'">
                <slot name="left"/>
            </div>
    
            <div :class="className + 'right'">
                <slot name="right"/>
            </div>
        </div>
    `,
}

var VMathText = {
    name: 'VMathText',
    props: ['icv', 'value', 'bold', 'fs'],
    /* by using icv ... automatically tags the class */
    render(h) {
        let value = this.value && this.value.toString()
        let className

        if (this.icv) {
            value = this.$parent[this.icv].toString()
            className = vueName(this.$parent, this.icv)
        }

        if (isDefined(value)) {
            if (isMathy(value)) {
                let modifiers = {
                    commas: true,
                    bold: !!this.bold,
                    fontSize: this.fs,
                }
                return renderDirective(
                    this,
                    'katex',
                    modifiers,
                    value,
                    className
                )
            }
            let options = {
                style: {
                    fontWeight: !!this.bold ? 700 : 500,
                },
                staticClass: className,
            }
            return simpleWrapper(h, options, value)
        }
    },
}
var VBulletList = {
    name: 'VBulletList',
    props: ['icv', 'header'],
    computed: {
        items() {
            return splitSentences(this.$parent[this.icv])
        },
    },
    template: `
        <div :class="'v-bullet-list-' + icv">
            <div v-if="header" class="v-bullet-list-header">{{header}}</div>
            <ul class="bullet-container">
                <li v-for="item in items">
                    <v-math-text :value="item"/>
                </li>
            </ul>
        </div>
    `,
    irender(h) {
        let value = this.$parent[this.icv]
        let className = this.icv
        if (!isDefined(value)) {
            return
        }

        return simpleWrapper(h, className, value)
    },
}

function appendMathAnswer(s) {
    let answer = nerdEval(s)
    return s + ' = ' + answer
}
function isPuppeteer(s) {
    return window.hasOwnProperty('puppeteer') === true
}
function fixDocPageHeights() {
    return console.log('not yet fixin g dox pages')
    let pages = document.querySelectorAll(
        '.document-page-container'
    )
    for (let page of pages) {
        fixPageHeight(page)
    }
}

var VTable2 = {
    name: 'VTable2',
    props: [
        'items',
        'layout',
        'columns',
        'numbered',
        'rows',
        'verticalFlow',
        'minHeight',
    ],
    mounted() {
        if (this.minHeight) {
            const { width, height } = getWH(this.$el)
            if (height < 500) {
                const rows = this.items.length / this.columns
                const gap = Math.min(
                    Math.floor(delta(height, 650) / rows),
                    100
                )
                console.log(gap)
                this.$el.style.rowGap = gap + 'px'
            }
        }
    },
    computed: {
        gridStyle(s) {
            const p = toGridTemplateColumns({
                columns: this.columns,
                size: this.items.length,
                verticalFlow: this.verticalFlow,
            })
            return p
            return { ...p, gap: '60px' }
        },
    },
    template: `
    <div :style="gridStyle" :class="parentClass()">

            <div v-for="item,i in items">
                <v-numbered :value="i" template="1.">
                    <slot :item="item">
                        <div>{{item}}</div>
                    </slot>
                </v-numbered>
            </div>
    </div>
    `,
    itemplate: `
    <div :style="gridStyle" :class="parentClass()">
        <template v-if="numbered"
            <div v-for="item,i in items">
                <v-numbered :value="i", template="1." >
                    <slot>
                        {{item}}
                    </slot>
                </v-numbered>
            </div>
        </template>
        <template v-else>
            <div v-for="item,i in items">
                    <div class="grid-item">
                        <slot>
                            {{item}}
                        </slot>
                    </div>
                </v-numbered>
            </div>
        </template>
    </div>
    `,

    tvvemplate: `
        <template v-if="layout=='4by4'">
            <div class="4-by-4-grid" v-for="item,i in items">
                <div>
                    <slot :item="item" index="i"></slot>
                </div>
            </div>
        </template>

        <template v-else-if="layout=='4x4'">
            <div class="">
                <slot v-for="item in items" class=""></slot>
            </div>
        </template>

        <template v-else>
            <div :style="gridStyle" :class="parentClass()">
                <div v-for="item in items" class="centered">
                    <slot>
                        {{item}}
                    </slot>
                </div>
            </div>
        </template>
    `,
}

var GuessForX = {
    name: 'GuessForX',
    props: ['value'],
    template: `
        <v-table2 :items="value" verticalFlow="true" columns="2" numbered="true" minHeight="true">
           <template v-slot="{item}">
                <div class="left-right-close">
                    <v-math-text :value="item.question"/>
                    <v-answer-box class="smaller" :value="item.answer"/>
                </div>
            </template>
        </v-table2>
    `,
}

function parentClass(name) {
    if (!name) name = vueName(this).replace(/^v-?/i, '')
    return vueName(this.$parent, name)
}

function vueFixElementSizing(state) {
    const el = elementgetter(state)
    const key = vueGetMeasurableKeys(state)[0]
    runClockUntil(
        (count) => {
            console.log(count, 'hi')
            const { width, height } = getWH(el)
            if (width > 800) {
                state[key] = cssModifyNumber(state[key], -1)
                return
            }
            return true
        },
        { interval: 5000 }
    )
}
function vueGetMeasurableKeys(state) {
    let keys = Object.keys(state).filter(testf(/size/i))
    return keys
}

function toGridTemplateColumns({
    columns,
    size,
    unit = '1fr',
    verticalFlow = false,
} = {}) {
    if (verticalFlow) {
        return {
            gridTemplateRows: `repeat(${Math.round(
                size / columns
            )}, ${unit})`,
            gridAutoFlow: 'column',
            display: 'grid',
        }
    }
    return {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, ${unit})`,
    }
}

function katexFontSize(value, size) {
    return value
}
function puppeteerBackground() {
    return isPuppeteer() ? null : randomPick(gentleColors)
}
var VWaterMark = {
    transform: true,
    name: 'VWaterMark',
    props: ['value', 'pos', 'icon', 'size'],
    template: `
        <v-img-icon value="watermark" v-pos="pos" :size="size"/>
    `,
}
var SvgComponentLib = {}
var HtmlLib = {
    checkmark: kittyGiraudelHtml,
}

var ImageLib = {
    //checkmark: ''
}
var VImgIcon = {
    transform: true,
    name: 'VImgIcon',
    props: ['value', 'pos', 'icon', 'size'],
    render(h) {
        if (HtmlLib.hasOwnProperty(this.icon)) {
            return h('div', {
                domProps: { innerHTML: HtmlLib[this.icon] },
            })
        }

        if (ImageLib.hasOwnProperty(this.icon)) {
            return h('img', {
                attrs: {
                    src: assetPath(ImageLib[this.icon]),
                },
            })
        }

        if (SvgComponentLib.hasOwnProperty(this.icon)) {
            return h(
                BaseIcon,
                options,
                SvgComponentLib[this.icon]
            )
        }
    },
}
function absoluteFamily(el) {
    el.style.position = 'absolute'
    el.parent.style.position = 'relative'
}
function posDirective(el, binding) {
    absoluteFamily(el)
    el.top = '20px'
    el.right = '20px'
}

var DocFooter = {
    name: 'DocFooter',
    props: ['pageNumber', 'label', 'line'],
    template: `
        <div class="doc-footer">
            <hr v-if="line "class="doc-line"/>
            <div class="computed-label">{{computedLabel}}</div>
        </div>
    `,
    computed: {
        computedLabel: vueComputedStudentLabel,
    },
}

function computePageLabel(s, studentRef) {
    if (!studentRef) {
        s = s.replace(/\$(name|grade|class) */g, '')
    }
    const text = dreplace4(s, (x) => {
        switch (x) {
            case 'emDash':
                return '—'
            case 'name':
            case 'grade':
            case 'class':
                return capitalizeName(studentRef[x])
            case 'date':
                return seasonYear()
            case 'season':
                return getSeason()
            case 'year':
                return getYear()
        }
    })
    return text
}

//There needs to be a consistent level of difficulty increase.
//There needs to be ...

vuetify(VArithmeticWrapper)
vuetify(VGuidedMultiplication)
vuetify(VKatex)
vuetify(VMathArray)
vuetify(VNumbered)
vuetify(VRow)
vuetify(VDatestamp)
vuetify(colorDirective)
vuetify(katexDirective)
//assignChartOptions()
vuetify(DocPageContainer)
vuetify(VFinalAnswer)
vuetify(VAnswerBox)
vuetify(VTitle)
vuetify(VLeftRight)
vuetify(VMathText)
vuetify(VBulletList)
vuetify(GuessForX)
vuetify(VTable2)
vuetify(posDirective)
vuetify(VWaterMark)
vuetify(VImgIcon)
vuetify(DocFooter)
function vueComputedStudentLabel() {
    dfg = 'Page 1 - Grade 4 Math Homework - Autumn 2022'

    let r =
        /(page \d+|-|student|name|grade \d+|quiz|math|homework|(?:autumn|spring|summer|winter) \d+)/

    if (!this.label) return
    if (this.label.length > 10) {
        let student = this.$student || nihanStudent
        function g(s) {
            return smartCapitalize(f(s))
        }
        function f(s) {
            if (/page/i.test(s)) {
                let page = this.$pager && this.$pager()
                if (!page) return
                return `page ${page}`
            }
            if (s == '-') return emDash

            if (/grade/i.test(s)) {
                return 'Grade ' + student.grade
            }

            if (/math/i.test(s)) {
                return student.subject
            }

            if (/hw|homework|quiz/i.test(s)) {
                return student.assignmentType
            }

            if (/autumn|winter|spring|summer/i.test(s)) {
                return seasonYear()
            }
        }

        return smfj(this.label, r, g)
    }

    //let pageNumber = (this.pageNumber && this.$pager)
    //&& this.$pager()

    //let label = this.label && computePageLabel(
    //this.label, this.$student
    //)

    if (!label && !pageNumber) return
    let value = [pageNumber, label].join(emDash)
    return value
}
fontLoader('inconsolata')

function propHelper(state, item) {
    //console.log(item)
    //console.log('rendering component item')
    let h = state.$createElement
    //console.log(type(h))
    let Component = getComponent(item.component || item.name)
    //console.log(type(Component) , 'hi')
    let props = !item.props
        ? propCreator(item.name, item.amount)
        : isObject(item.props)
        ? propFixer(item.props)
        : isFunction(item.props)
        ? item.props(item.arg, state)
        : isString(item.props)
        ? eval(item.props)
        : throwError()

    console.log(props)
    return h(Component, { props })

    function propCreator(name, amount) {
        if (!amount) amount = 10
        const key = 'em' + capitalize(name)
        const argf = window[key + 'Arger']
        const value = emWrapper({ amount, argf, key })
        return { value }
    }

    function propFixer(obj) {
        return obj
        const parentData = state.$parent
        console.log(parentData)
        return transformObject(obj, (v) => {
            return v.replace(templaterRE, (_, x) => {
                return evalFromObject(x, parentData)
            })
        })
    }
}
function vueHeights(state) {
    let el = state.$el
    let height = getElementHeight(el)
    let delta = 1000 - height
    let safe = delta > 0
    if (safe) return { safe, delta }
    let partitions = getElementPartitionsViaHeights(el)

    return {
        //componentPartitions
        partitions,
        //height, childHeights, delta, safe
    }
}

function vueHeight(state) {
    return getElementHeight(state.$el)
}
function sameLength(...args) {
    return args.every((x) => x.length == args[0].length)
}
//vuetify(FullDocument)
//vuetify(FullDocument)
function pixelate(n) {
    return n + 'px'
}
function getElementPartitions(el, max) {
    /** gep **/
    max = 1000
    var vueMax = 1122
    let ignore =
        el.children.length == 1 &&
        getElementHeight(el.children[0]) < max
    if (ignore) return

    const originalMax = max
    const store = runner(el)
    return store

    function push(store, x) {
        if (exists(x)) {
            store.push(x)
        }
    }

    function runner(el) {
        /* el = this.$el of root doc-container */
        let children = el.children /* each of these is an $el */
        let current = 0
        let store = []
        let temp = []

        max = vueMax
        for (let i = 0; i < children.length; i++) {
            let childElement = children[i]
            let bottom = getElementBottom(childElement)
            console.log({ bottom, i, max })
            if (bottom < max) {
                temp.push(i)
            } else {
                /*
                 * max = 1000
                 * bottom = 1300
                 * */
                //max = bottom + originalMax
                max += vueMax
                push(store, temp)
                temp = [i]
            }
        }
        push(store, temp)
        console.log(store, 'hiiiiiiiiiiiiiii')
        return store
    }
}
function getElementPartitionsViaHeights(el) {
    /** gep **/
    let max = 1000
    let children = el.children
    let current = 0
    let store = []
    let indexes = []

    function push() {
        if (!exists(indexes)) {
            return
        }
        let marginBottom = max - current
        store.push({ marginBottom, indexes })
    }

    for (let i = 0; i < children.length; i++) {
        let childElement = children[i]
        let height = getElementHeight(childElement)
        if (current + height < max) {
            indexes.push(i)
        } else {
            /* pagebreak */
            current = 0
            push()
            indexes = [i]
        }
    }

    push()
    return store
}

function vuePartitionElements(partitions, ref) {
    let count = 0
    let componentPartitions = partitions.map((row, i) => {
        const componentValues = row.indexes.map((index) => {
            const value = ref[index]
            /* {component, payload} */
            return value
        })

        return {
            value: componentValues,
            marginBottom: row.marginBottom,
        }
    })
    return componentPartitions
    /* doing the best that i can do currently */
}

function renderArray2(h, Component, items, options, className) {
    const children = items.map((item, i) => {
        const childOptions = {
            ...options,
            props: { value: item },
        }
        return h(Component, childOptions)
    })
    return simpleWrapper(h, className, children)
}
function renderAbsolute(h, items) {
    const children = items.map((item, i) => {})
    return simpleWrapper(h, children)
}
var DialogueItem = {
    name: 'DialogueItem',
    props: ['speaker', 'value'],
    template: `
        <v-left-right>
            <template v-slot:left">
                <div class="speaker">{{speaker}}</div>
            </template>

            <template v-slot:right">
                <component v-bind:is="cc"/>
            </template>
        </v-left-right>
    `,
}
var VPublisher = {
    name: 'VPublisher',
    data() {
        return {
            status: 'BEFORE-MEASURE',
            items: toJSON(new Publisher()),
        }
    },
    render(h) {
        switch (this.status) {
            case 'BEFORE-MEASURE':
                return renderArray2(
                    h,
                    VMeasure,
                    this.items,
                    {
                        refInFor: true,
                        ref: 'beforeMeasure',
                    },
                    'publisher-wrapper'
                )
            case 'MEASURED':
                return renderAbsolute(h, this.measuredItems)
        }
    },
    mounted() {
        if (foo) {
        }
        this.status = 'MEASURED'
    },
}

var Factors1 = {
    name: 'Factors1',
    props: ['value'],
    template: `
        <div class="">
        <v-list 
            smartexample="true"
            underline="true" numbered="true" :value="value">
                <template v-slot="item">
                </template>
        </v-list>
    `,
}

var VList = {
    name: 'VList',
    props: [
        'value',
        'numbered',
        'underline',
        'smartexample',
        'modulateWidth',
    ],

    async mounted() {
        console.log('hello from VList')
        const elements = this.$refs.slotItem
        const width = getLongest(
            elements,
            getElementWidth,
            Number
        )
        pprint(width)

        for (let el of elements) {
            assignStyle(el, { w: width })
        }
    },
    template: `
        <div class="v-list-container">
            <div v-for="item, i in computedValue">
                <v-numbered class="v-list-item" :value="i" template="1.">
                    <div  
                        :style="computedStyle" 
                        ref="slotItem">
                            <slot :item="item">
                                <v-math-text v-color="item.color"
                                    :value="item.value"/>
                            </slot>
                    </div>
                </v-numbered>
            </div>
        </div>
    `,
    computed: {
        ...vueComputedValueFactory('smartexample'),
        ...vueComputedStyleFactory('underline'),
    },
}
function vueComputedStyleFactory(...keys) {
    const cssMap = {
        underline: {},
    }

    let key
    function lambdaComputedStyle() {
        if (key == -1) return
        if (key == null) {
            key = keys.find((key) => this[key])
            if (!key) {
                key = -1
                return
            }
        }

        let styles
        if (cabmap[key]) styles = cssEvaluator(cabmap[key])
        else if (cssMap[key]) styles = cssEvaluator(cssMap[key])
        return styles
    }
    return {
        computedStyle: lambdaComputedStyle,
    }
}

function vueComputedValueFactory(key) {
    function mapPercentage(percent, f) {
        return function lambda(item, i, a) {
            let n = Math.floor((100 * (i + 1)) / a.length)
            if (percent < n) return f(item)
            return item
        }
    }

    function blankIt(item) {
        return { ...item, ...{ color: 'white' } }
        //if (isObject(item)) {
        //return transformObject(item, 'question', '')
        //}
        //return ''
    }
    function toVueValueObject(x) {
        let color = 'black'
        if (isObject(x)) {
            return { ...x, ['color']: color }
        }
        return {
            value: x,
            color,
        }
    }

    function computedValue() {
        if (!this[key]) return
        let value = (this.value || this.items).map(
            toVueValueObject
        )
        switch (key) {
            case 'smartexample':
                let val = value.map(mapPercentage(50, blankIt))
                //pprint(val)
                return val
            default:
                return value
        }
    }
    return {
        computedValue,
    }
}
function info(x) {
    let t = type(x)
    let c = getConstructorName(x)
    console.log({
        type: t,
        constructor: c,
        length: len(x),
        x,
    })
    /* not eating dinner on time. */
}

var VProseBody = {
    name: 'VProseBody',
    props: [''],
    render(h) {},
}
var VHandout = {
    transform: true,
    name: 'VHandout',
    props: ['value', 'title', 'centered', 'body'],
    template: `
        <v-title :value="title" :centered="centered" date="1"/>
        <v-prose-body :value="body"/>
    `,
}

var VPokemon = {
    name: 'VPokemon',
    props: {
        size: { default: 100 },
        name: { default: 'bulbasaur' },
    },
    render(h) {
        const options = {
            props: { size: this.size },
        }
        return h(getComponent(this.name), options)
    },
}
var VPokemonGroup = {
    transform: true,
    name: 'VPokemonGroup',
    props: { value: { default: 150 } },
    data() {
        return {
            pokemon: pokemonList,
            columns: 4,
        }
    },
    computed: {
        computedValue() {
            return slice(this.pokemon, this.value)
        },
    },
    template: `
        <v-table2 :items="computedValue" verticalFlow="true" :columns="columns" numbered="true" minHeight="true">
           <template v-slot="{item}">
                <div>
                    <v-pokemon :name="item"/>
                    <div class="item">{{item}}</div>
                </div>
            </template>
        </v-table2>
    `,
}
var VPicture = {
    transform: true,
    name: 'VPicture',
    props: ['image', 'title'],
    template: `
        <div class="top">
            <div class="above-title">{{title.above}}</div>
        </div>

        <div class="middle">
            <v-image :value="image" :maxsize="400"/>
        </div>

        <div class="bottom">
            <div class="below-title">{{title.below.value}}</div>
            <div class="author">{{title.below.author}}</div>
        </div>
    `,
}
var VImage = {
    name: 'VImage',
    props: ['value'],
    template: `
        <img :style="style" :src="computedSrc" :class="parentClass()"/>
    `,
    computed: {
        style() {
            return cssEvaluator('maxw300')
        },
        computedSrc() {
            return this.value + '.jpg'
            return jspath(this.value, 'jpg')
        },
    },
}
var VListicle = {
    transform: true,
    name: 'VListicle',
    props: ['value'],
    template: `
        <div v-for="item in value" class="item">{{item}}</div>
    `,
}

var VPageContainer = {
    name: 'VPageContainer',
    props: ['layout', 'styleKey'],
    /* can edit it some how  */
    //<v-assignment-header/>
    //<v-assignment-footer/>
    //<doc-footer/>
    template: `
        <div class="v-page-container">
            <slot/>
        </div>
    `,
    data() {
        return {
            fooba: 'hiFromSlot',
            fiiiiiooba: 'hiFromSlot',
        }
    },
    mounted() {
        el = this.$el.children[0] /* v-picture has 3 kids */
        //slot = this.$slots.default[0]
        //slot.$elm = elm
        //console.log(type(slot))
        //console.log(type(slot.$el))
        //console.log(slot.context.$data)
        //console.log(el.innerHTML)
    },
}
vuetify(VPokemon)
vuetify(BaseIcon)
vuetify(VPokemonGroup)
vuetify(VPicture)
vuetify(parentClass)
vuetify(VImage)
//cssLoader('texts.css')

vuetify(VListicle)
vuetify(VPageContainer)

function getElementInfo(el) {
    //const text = pretty(el.outerHTML, 'html')
    //console.log(text)
    console.log(el.outerHTML)
}
/* mainapp */

cssstring = `


.v-page-container {
    padding: 60px;
    height: 1122px;
    background: yellow;
    margin-bottom: 0px;
}

.full-vertical-flow {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    justify-content: space-evenly;
}

.center-aligned-list {
    margin: 0 auto;
    width: fit-content;
}
new Vue({
  el: '#app',
  data: function() {
    return {
      baseFontSize: 1,
      bgHoverColor: "#00cc00",
      hoverContent: "Hovering!"
    }
  },
  computed: {
    cssProps() {
      return {
        '--hover-font-size': (this.baseFontSize * 2) + "em",
        '--bg-hover-color': this.bgHoverColor,
        '--hover-content': JSON.stringify(this.hoverContent)
      }
    }
  }
})
`

var HoverTest = {
    name: 'HoverTest',
    props: ['value'],
    template: `
       <div :style="cssProps">
          <div>Hover text: <input type="text" v-model="hoverContent"></div>
        <div>Hover color: <input type="color" v-model="bgHoverColor"></div>

      <div class="test">Hover over me</div>
    </div> 
    `,
    data() {
        return {
            baseFontSize: 1,
            bgHoverColor: '#00cc00',
            hoverContent: 'Hovering!',
        }
    },
    mounted() {
        console.log('hello from HoverTest')
        console.log()
        s = `
            function foo(s) {
                return {a:1}
            }
            foo()

        `
        console.log('hhhhhhhhh')
        doGoogle(s).then(console.log)
    },
    computed: {
        cssProps() {
            return {
                '--hover-font-size':
                    this.baseFontSize * 2 + 'em',
                '--bg-hover-color': this.bgHoverColor,
                '--hover-content': JSON.stringify(
                    this.hoverContent
                ),
            }
        },
    },
    css: `
        div {
          margin: 1em;
        }
        div.test:hover {
          background-color: var(--bg-hover-color);
          font-size: var(--hover-font-size);
        }
        div.test::after {
          margin-left: 1em;
          color: var(--bg-hover-color);
          content: var(--hover-content);
        }

    `
}
vuetify(HoverTest)
