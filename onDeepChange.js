(function(env){
	root = env.window? env.window : root;
	root.Gun = root.Gun || require('../gun');
}(this));

Gun.chain.onDeepChange = function(cb, opt){
	var gun = this;
	cb = cb || function(){};
	opt = (opt === true? {full: true} : opt || {});
	opt.ctx = opt.ctx || {};
	opt.path = opt.path || [];
	gun.on(function(change, field){
		var o = Gun.obj.copy(opt);
		o.path = opt.path.slice(0);
		if(field){ o.path.push(field) }
		Gun.obj.map(change, function(val, field){
			if(Gun._.meta == field){ return }
			if(Gun.obj.is(val)){				
				delete change[field];
				var soul = Gun.is.soul(val);
				if(opt.ctx[soul + field]){ return } // do not re-subscribe.
				opt.ctx[soul + field] = true; // unique subscribe!
				this.path(field).onDeepChange(cb, o);
				return;
			}
		}, this);
		if(Gun.obj.empty(change, Gun._.meta)){ return }
		if(opt._ === false){ delete change._ }
		cb(change, o.path);
	}, !opt.full);
	return gun;
}