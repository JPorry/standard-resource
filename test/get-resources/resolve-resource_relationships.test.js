import resolveResource from '../../src/get-resources/resolve-resource';

describe('resolveResource', function() {
  beforeEach(() => {
    this.state = {
      books: {
        resources: {
          1: {
            id: 1,
            resourceType: 'books',
            attributes: {
              name: 'Lord of the Flies',
              publishYear: 1985,
            },
            meta: {
              changedName: 'Lord of da Flies',
            },
            relationships: {
              author: {
                resourceType: 'people',
                data: 'b',
              },
            },
          },
          2: {
            id: 2,
            resourceType: 'books',
            attributes: {
              name: 'Good Book',
              publishYear: 1990,
            },
            relationships: {
              author: {
                resourceType: 'people',
                data: 'c',
              },
            },
          },
        },
      },
      people: {
        resources: {
          b: {
            id: 'b',
            resourceType: 'people',
            attributes: {
              name: 'Pls Ty',
            },
          },
          c: {
            id: 'c',
            resourceType: 'people',
            relationships: {
              firstBook: {
                resourceType: 'books',
                data: 2,
              },
            },
          },
        },
      },
    };
  });

  it('should return the full resource', () => {
    const resource = {
      id: 1,
      resourceType: 'books',
      attributes: {
        name: 'Lord of the Flies',
        publishYear: 1985,
      },
      meta: {
        changedName: 'Lord of da Flies',
      },
      relationships: {
        author: {
          resourceType: 'people',
          data: 'b',
        },
      },
    };

    const resolved = resolveResource(this.state, resource, {
      relationships: true,
    });

    expect(resolved).toEqual({
      id: 1,
      resourceType: 'books',
      attributes: {
        name: 'Lord of the Flies',
        publishYear: 1985,
      },
      meta: {
        changedName: 'Lord of da Flies',
      },
      computedAttributes: {},
      relationships: {
        author: {
          id: 'b',
          resourceType: 'people',
          computedAttributes: {},
          relationships: {},
          meta: {},
          attributes: {
            name: 'Pls Ty',
          },
        },
      },
    });
  });

  it('should return the full resource', () => {
    const resource = {
      id: 'a',
      resourceType: 'books',
      attributes: {
        name: 'Lord of the Flies',
        publishYear: 1985,
      },
      meta: {
        changedName: 'Lord of da Flies',
      },
      relationships: {
        author: {
          resourceType: 'people',
          data: 'b',
        },
      },
    };

    const resolved = resolveResource(this.state, resource, {
      relationships: {
        author: true,
      },
    });

    expect(resolved).toEqual({
      id: 'a',
      resourceType: 'books',
      attributes: {
        name: 'Lord of the Flies',
        publishYear: 1985,
      },
      meta: {
        changedName: 'Lord of da Flies',
      },
      computedAttributes: {},
      relationships: {
        author: {
          id: 'b',
          resourceType: 'people',
          computedAttributes: {},
          relationships: {},
          meta: {},
          attributes: {
            name: 'Pls Ty',
          },
        },
      },
    });
  });
});