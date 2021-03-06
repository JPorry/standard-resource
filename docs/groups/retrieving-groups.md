# Retrieving Groups

Use `store.getGroup()` to access a group from the store:

```js
store.getGroup('selectedBooks');
```

When you retrieve a group, you will be given the full resources back, and not just their IDs.

For instance, the above call may return:

```js
[
  {
    id: 2,
    attributes: {
      name: 'The Lord of the Rings',
      publishYear: 1940,
    },
    meta: {},
    computedAttributes: {},
  },
];
```

If you pass a group name of a group that does not exist to `getGroup`, you will receive an empty array back:

```js
store.getGroup('aGroupThatDoesNotExist');
// => []
```

### Accessing a Group By ID

Although groups are stored as arrays, it is not always the case that the order of that array matters for
your use case. In those situations, it may be preferable to get an object returned from the call to
`getGroup`, rather than an array. The second argument to `getGroup` is an options object that allows you
to specify this behavior:

```js
store.getGroup('selectedBooks', {
  byId: true,
});
```

This would return an object like the following:

```js
{
  2: {
    id: 2,
    attributes: {
      name: 'The Lord of the Rings',
      publishYear: 1940,
    },
    meta: {},
    computedAttributes: {},
  },
};
```

### Tips

* Although you can also use `store.getState()` to retrieve a group by directly accessing the state tree, we
  do not encourage that approach.
