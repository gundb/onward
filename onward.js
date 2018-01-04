(function(env){
	root = env.window? env.window : root;
	root.Gun = root.Gun || require('../gun');
}(this));

Gun.chain.onward = function(cb, opt){
	var gun = this;
	cb = cb || function(){};
	opt = (opt === true? {full: true} : opt || {});
	opt.ctx = opt.ctx || {};
	opt.path = opt.path || [];
	gun.on(function(change, field){
		change = Gun.obj.copy(change); // due to the 'leak' bug
		var o = Gun.obj.copy(opt);
		o.path = opt.path.slice(0);
		if(field){ o.path.push(field) }
		Gun.obj.map(change, function(val, field){
			if(Gun._.meta == field){ return }
			if(Gun.obj.is(val)){
				delete change[field];
				var soul = Gun.val.rel.is(val);
				if(opt.ctx[soul + field]){ return } // do not re-subscribe.
				opt.ctx[soul + field] = true; // unique subscribe!
				//this.path(field).onward(cb, o);
				/*
				   path() is not included by default
				   so change to 'get()' or include path.js
				*/
				this.get(field).onward(cb, o); 
				return;
			}
		}, this);
		if(Gun.obj.empty(change, Gun._.meta)){ return }
		if(opt._ === false){ delete change._ }
		cb(change, o.path);
	}, !opt.full);
	return gun;
}
