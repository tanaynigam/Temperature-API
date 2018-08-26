var cache = {};
var mcache = require('memory-cache');

cache.cache = (duration) => {
	return(req, res, next)=>{
		let key = '_express_'+ req.originalUrl || req.originalUrl
		cachedBody = mcache.get(key)
		if(cachedBody){
			res.send(cachedBody)
			return
		}else{
			res.sendResponse = res.send
			res.send = (body)=>{
				mcache.put(key, body, duration * 1000);
				res.sendResponse(body)
			}
		next()
		}
	}
}

module.exports = cache;