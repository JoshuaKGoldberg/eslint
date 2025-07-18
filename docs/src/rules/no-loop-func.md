---
title: no-loop-func
rule_type: suggestion
---


Writing functions within loops tends to result in errors due to the way the function creates a closure around the loop. For example:

```js
for (var i = 0; i < 10; i++) {
    funcs[i] = function() {
        return i;
    };
}
```

In this case, you would expect each function created within the loop to return a different number. In reality, each function returns 10, because that was the last value of `i` in the scope.

`let` or `const` mitigate this problem.

```js
for (let i = 0; i < 10; i++) {
    funcs[i] = function() {
        return i;
    };
}
```

In this case, each function created within the loop returns a different number as expected.

## Rule Details

This error is raised to highlight a piece of code that may not work as you expect it to and could also indicate a misunderstanding of how the language works. Your code may run without any problems if you do not fix this error, but in some situations it could behave unexpectedly.

This rule disallows any function within a loop that contains unsafe references (e.g. to modified variables from the outer scope). This rule ignores IIFEs but not async or generator functions.

Examples of **incorrect** code for this rule:

::: incorrect

```js
/*eslint no-loop-func: "error"*/

var i = 0;
while(i < 5) {
    var a = function() { return i; };
    a();

    i++;
}

var i = 0;
do {
    function a() { return i; };
    a();

    i++
} while (i < 5);

let foo = 0;
for (let i = 0; i < 10; ++i) {
    //Bad, `foo` is not in the loop-block's scope and `foo` is modified in/after the loop
    setTimeout(() => console.log(foo));
    foo += 1;
}

for (let i = 0; i < 10; ++i) {
    //Bad, `foo` is not in the loop-block's scope and `foo` is modified in/after the loop
    setTimeout(() => console.log(foo));
}
foo = 100;

var arr = [];

for (var i = 0; i < 5; i++) {
    arr.push((f => f)(() => i));
}

for (var i = 0; i < 5; i++) {
    arr.push((() => {
        return () => i;
    })());
}

for (var i = 0; i < 5; i++) {
    (function fun () {
        if (arr.includes(fun)) return i;
        else arr.push(fun);
    })();
}
```

:::

Examples of **correct** code for this rule:

::: correct

```js
/*eslint no-loop-func: "error"*/

var a = function() {};

for (var i=10; i; i--) {
    a();
}

for (var i=10; i; i--) {
    var a = function() {}; // OK, no references to variables in the outer scopes.
    a();
}

for (let i=10; i; i--) {
    var a = function() { return i; }; // OK, all references are referring to block scoped variables in the loop.
    a();
}

for (const i of foo) {
    var a = function() { return i; }; // OK, all references are referring to block scoped variables in the loop.
    a();
}

for (using i of foo) {
    var a = function() { return i; }; // OK, all references are referring to block scoped variables in the loop.
    a();
}

for (var i=10; i; i--) {
    const foo = getsomething(i);
    var a = function() { return foo; }; // OK, all references are referring to block scoped variables in the loop.
    a();
}

for (var i=10; i; i--) {
    using foo = getsomething(i);
    var a = function() { return foo; }; // OK, all references are referring to block scoped variables in the loop.
    a();
}

for (var i=10; i; i--) {
    await using foo = getsomething(i);
    var a = function() { return foo; }; // OK, all references are referring to block scoped variables in the loop.
    a();
}

var foo = 100;
for (let i=10; i; i--) {
    var a = function() { return foo; }; // OK, all references are referring to never modified variables.
    a();
}
//... no modifications of foo after this loop ...

var arr = [];

for (var i=10; i; i--) {
    (function() { return i; })();
}

for (var i = 0; i < 5; i++) {
    arr.push((f => f)((() => i)()));
}

for (var i = 0; i < 5; i++) {
    arr.push((() => {
        return (() => i)();
    })());
}
```

:::

This rule additionally supports TypeScript type syntax.

Examples of **correct** TypeScript code for this rule:

::: correct

```ts
/*eslint no-loop-func: "error"*/

type MyType = 1;
let someArray: MyType[] = [];
for (let i = 0; i < 10; i += 1) {
	someArray = someArray.filter((item: MyType) => !!item);
}
```

:::

## Known Limitations

The rule cannot identify whether the function instance is just immediately invoked and then discarded, or possibly stored for later use.

```js
const foo = [1, 2, 3, 4];
var i = 0;

while(foo.some(e => e > i)){
    i += 1;
}
```

Here the `some` method immediately executes the callback function for each element in the array and then discards the function instance. The function is not stored or reused beyond the scope of the loop iteration. So, this will work as intended.

`eslint-disable` comments can be used in such cases.
