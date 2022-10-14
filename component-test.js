s0929 = `

Student Letters 
Grade 4 Math Class Room 303
---------------------------------
Vincent,

Instead of saying, "this assignment is easy",

Say,

"This assignment was not that hard for me. However, I still have a long way to go. I still have many more things to learn." 
style:center w50p 18 lh1.3

The reason is because when your brain thinks something is easy, it goes into autopilot.

it starts making careless mistakes.
it starts missing little things.

Now is not the time for saying easy or hard.

---------------------------------
Keep learning Vincent style: bold center 16

Grow stronger and stronger and stronger style: bold center 20

`

function runComponentTest(h, key = 'today', root = true) {
    key = numberToDateNumber(key)
    let ref = ComponentTestRef[key]
    let asObject = !!ref.propAsObject
    /* if propAsObject, it means we are not
     * going to change the binding name to :value
     * and rather leave it as it is*/
    let data = getData(ref)
    let componentKey = ref.component || 'DocPageContainer'
    let Component = getComponent(componentKey)
    return h(Component, data)

    function getData(ref) {
        let data
        if (isCallable(ref.data)) {
            data = eval(ref.data)
        } else if (ref.em) {
           let {key, args} = ref.em
           data = easyMathHandler(window[key], args)  
        } else if (isFunction(ref.data)) {
            data = ref.data(getWindowString(key))
        } else {
            data = ref.data
        }
        if (!data.props) data = propIt(data, asObject)
        if (root) {
            data.style = {
                padding: '50px'
            }
            console.log('setting root padding to 50px')
        }
        console.log(data)
        return data
    }
}



var ComponentTestRef = {
    today: {
        component: 'VerticalArithmetic',
        em: {
            key: 'emMysteryAlphabetAddition',
            args: '12 * 1534',
        }
    },
    today: {
        component: 'VGuidedMultiplication',
        propAsObject: true,
        data: 'emGuidedMultiplication2("23*45")',
        em: {
            key: 'emGuidedMultiplication2',
            args: '567 * 1234',
        }
    },
    boo: {
        component: 'VTable',
        data:  [
            ['a', 'b', 'c', 'd'],
            [1, 2, 3, 4],
        ]
    },
    tut: { component: 'VTutorial', },
    geo: { component: 'GeoGebra', },
    foo: {component: 'VMultiplicationFactorTuples',
        data: getClipData 
    },
    mdw: {
        data(s) {
            const dataset = clone(getClipData(), 3)
            const coverPage = coverPageFromData(dataset)
            return merge(coverPage, dataset).map(
                mathDocWrapper
            )
        },
    },
    '0929': {
        data(s) {
            let raw = new LineEdit0929().run(s0929, c0929)
            let tf = kvFunctionGetter('style', cssEvaluator)
            let out = renderConnector('dialogue-item', raw, tf)
            return out
        },
        notes: `
            
            raw is pure array data
            transformer changes any style keys with cssEvaluator
            renderConnector maps the array to component and payload
            propIt sets it to props: {value}
            DocPageContainer takes {
                props: value (Array of payload-component objects)
            }
        
        `
    },
    '0928': {
        data(s) {
            return [4, 5, 6].map((x) => {
                return { value: x, label: numberToWord(x) }
            })
        },
        component: 'VChart'
    },
    '0927': {
        component: 'VMathSequence',
        data: [4, 5, 6, null, 833, 4],
    },

    '0926': {
        component: 'GuidedMultiplication',
        data: getClipData
    },
}



function c0929(s) {
    if (s.newlines) {
        return {tag: 'br', attrs: {style: s}}
    }
    if (s.horizontalLine) {
        return {tag: 'hr', attrs: {class: 'doc-line', style: s.horizontalLine}}
    }
    return {tag: 'p', value: s.value, attrs: s.attrs}
}

function clipComponentNameAndPropData(s, sliceAmount = 5) {
    let [a, b] = getClipData()
    b = b.slice(0, 5)
    return [window[a], propIt(b)]
}


        // HyunMath is a toc-getter essentially
        //return h(HyunMath, {props: {value: outboundData}})
        // Console pretty much works.
        // Doing things to make your life easier
        //const Console = h(ConsoleApp, {props: {show: show}})
        //const props = {props: {items: thomasHyunSAT}}
        //const Interactive = h(InteractiveApp, props)
        //return Interactive
        //return renderWrapper(this, [Console, Interactive])

        //return renderAnything(this, sample0825)
        //return h(DocMeasure, {props: {value: sample0824}})
        //
        //
        //

        //const children = skip(boogaboogaArray).map(
            //(item, i) => {
                //return h(DocPageContainer, propIt([item]))
            //}
        //)
        //return simpleWrapper(h, 'super', children)

        //return loremComponentTest(h, VTitle, 1)
        //return runComponentTest(h, 'today')
        /* DocPageContainer takes an array
         * of {component, payload} items
         * It should be 100% linear
         * It should be 100% flat
         *
         * */
