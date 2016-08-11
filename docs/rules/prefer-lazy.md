# Prefer lazy expression

Enforces using a parameterless function which will only be invoked if the predicate is satisfied, allowing for lazy evaluation of inner JSX.

## Rule Details

The following pattern is considered warning, when depth is 2:

```js
renderIf(condition)(
  <div />
);
```

The following patterns are not considered warnings:

```js
renderIf(condition)(() => (
  <div />
));
```

```js
renderIf(condition)(function() {
  return <div />;
});
```
