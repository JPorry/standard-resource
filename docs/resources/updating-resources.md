# Updating Resources

Use `store.update()` and `store.remove()` to change your resource data.

### Updating a Single Attribute

By using the first argument to `update`, you can scope your update to
a single attribute, or even a deeply nested piece of a single attribute.

In the following example, we are updating the English display name for the
book with an ID of 24.

```js
store.update(
  'resources.books.24.attributes.displayNames.en.value',
  'The Lord of the Rings'
);
```

### Updating Multiple Resources at a Time

You can update as many resources as you want with a single call to `update`, even across
different resource types. In the following example, we update two books and an author
with one call.

```js
store.update({
  books: {
    resources: {
      24: {
        attributes: {
          name: 'The Lord of the Rings',
        },
      },
      350: {
        attributes: {
          publishYear: 1998,
        },
      },
    },
  },
  authors: {
    resources: {
      102: {
        attributes: {
          firstName: 'John',
        },
      },
    },
  },
});
```

### Removing an Attribute

You can remove a specific attribute using `store.remove()`. In the following example,
we remove the `releaseYear` attribute from the book with ID of 24.

```js
store.remove('resources.books.24.attributes.releaseYear');
```
