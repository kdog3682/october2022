function getObjectKeys(s) {
    const store = []
    for (key in s) {
        store.push(key)
    }
    return store
}


function clip(x) {
    console.log(x)
    return download('.clip.js', x)
}

function isCheater(student, classroom) {
    const store = []
    for (let student of students) {
        if (student.score < 50) {
            let classmates = student.getClassmates()
            let f = (classmate) => {
                return deepEqual(
                    student.answers, classmate.answers
                )
            }
            let potentialHelpers = classmates.filter(f)
            if (exists(potentialHelpers)) {
                store.append({
                    cheater: student.name,
                    helpers: potentialHelpers,
                    /* 
                     * but who is the one helper?
                     * you will need locational proximity
                     * */
                })
            }
        }
    }
    let f = (student) => stringRepresentation(student.answers)
    let ref = classroom.students.map(f)
    let c = f(student)

}


function toVueProseObject(o) {
    return {
        tag: 'p',
        attrs: {
            style: o.style,
            class: o.class,
        },
        value: o.value,
    }
}

function lorem(key, arg) {
    return loremIpsum(key, arg, true)
}
var loremIpsumRef = {
    toVueProseObject(i) {
        return {
            style: '2em',
            class: 'vue-prose-item',
            value: lorem('sentence', i)
        }
    },
    sentence(i) {
        return 'sup my nikkas' + i
    }
}
function loremIpsumRunner(key, i) {
    return fparse(loremIpsumRef[key], i)
}
function loremIpsumFunctionRunner(f, i) {
    return f(loremIpsumRunner(f.name, i))
}
function loremIpsum(x, n = 1, singleton = false) {
    function runner(x, i) {
        if (isFunction(x)) {
            return loremIpsumFunctionRunner(x, i)
        }
        return loremIpsumRunner(x, i)
    }
    if (singleton) {
        return runner(x, n)
    }
    const value = smallify(range(n).map((_, i) => runner(x, i)))
    console.log(value)
    return value
}
