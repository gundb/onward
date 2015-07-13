# onDeepChange
Be notified when any path on your Document Oriented data changes.

##Demo
http://jsbin.com/zukekabeko/edit?html,console

##API
```javascript
gun.get('some/key').onDeepChange(function(change, path){}, opt)
```

- `change` is the an object with field/value pairs.

- `path` is an array of fields from the root node.

- `opt` as `true` aggregates into an `{full: true}` where

  - `opt.full` is `true` gives you the full node back on every call rather than only what has changed.

##Warning

This is intended for when you are using GUN in a document oriented way, if you use it with graph or relational based data it might result in an infinite loop or loading your entire dataset!
