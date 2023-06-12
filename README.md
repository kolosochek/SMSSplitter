# splitSMS(text, limit=140)
Tiny SMS split library

Can split long text by given limit of chars and include service info into result array
for example:

Usage:

```
splitSMS("Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend consectetur adipiscing elit Nullamconsectetur adipiscing elit Nullamconsectetur adipiscing elit Nullam odio at magna pretium")
```

Result:

```
[
  'Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend consectetur adipiscing elit Nullamconsectetur adipiscing elit 1/2',
  'Nullamconsectetur adipiscing elit Nullam odio at magna pretium 2/2'
]
```
