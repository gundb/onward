# onward
Be notified when any path on your Document Oriented data changes.

##Demo

NOTE: The demo is not functional since 'path.js' is not included.
The demo should include 
`<script src="https://rawgit.com/amark/gun/master/lib/path.js"></script>`

http://jsbin.com/qivezenuwu/1/edit?html,console

##API
```javascript
gun.get('some/key').onward(function(change, path){}, opt)
```
- `change` is an object with field/value pairs.

- `path` is an array of fields from the root node.

- `opt` as `true` aggregates into an `{full: true}` where

  - `opt.full` is `true` gives you the full node back on every call rather than only what has changed.

NOTE: onward does work, however for multiple levels it is important on how you put your data in gun.

example 
```
gun.get('home').get('lights').get('light1').put({
  state:'on',
  bri :'50'
})
gun.get('home').onward(function(change, path){}, true);
```
This will fire twice! Once with just the change, a second time as full object.
```
  gun.get('home').get('lights').get('light1').put({state:'on'})
```
This will only fire once with just the change
```
 gun.get('home').get('lights').get('light1').get('state').put('on')
```

##Warning

This is intended for when you are using GUN in a document oriented way, if you use it with graph or relational based data it might result in an infinite loop or loading your entire dataset!
