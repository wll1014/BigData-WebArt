var userdb = require('./userDB.js');
var common = require('./common.js');

exports.getUserByUserId = function(query) {
    var params = {};
    if(!!query.userId) params.userId = query.userId;
    if(!!query.openId) params.openId = query.openId;
    return userdb.open("wx.user").then(function(collection) {
       return collection.find(params).toArray();
    }).catch(function(error) {
        userdb.close();
        console.error(error)
        throw error;
    })
};

exports.updateUserByOpenId = function(user) {
    var userId = user.userId;
    if(!!!userId){
        var uuid = common.toOnlyId(user.openId+new Date().getTime());
        return userdb.open("wx.user").then(function(collection) {
            return collection.find({openId:user.openId}).toArray();
        }).then(function(data) {
            if(!!data && data.length<=0){
                user.userId = uuid;
                return userdb.open("wx.user").then(function(collection) {
                    return collection.insert([user]);
                }).then(function() {
                    userdb.close();
                    return user;
                }).catch(function(error) {
                    userdb.close();
                    console.error(error)
                    throw error;
                })
            }else{
                var userM = data[0];
                userId = userM.userId;
                var setParams = {};
                if(!!user.openId) {
                    setParams.openId = user.openId;
                    userM.openId = user.openId;
                }
                if(!!user.nickName)  {
                    setParams.nickName = user.nickName;
                    userM.nickName = user.nickName;
                }
                if(!!user.gender)  {
                    setParams.gender = user.gender;
                    userM.gender = user.gender;
                }
                if(!!user.language)  {
                    setParams.language = user.language;
                    userM.language = user.language;
                }
                if(!!user.city)  {
                    setParams.city = user.city;
                    userM.city = user.city;
                }
                if(!!user.province)  {
                    setParams.province = user.province;
                    userM.province = user.province;
                }
                if(!!user.country)  {
                    setParams.country = user.country;
                    userM.country = user.country;
                }
                if(!!user.avatarUrl)  {
                    setParams.avatarUrl = user.avatarUrl;
                    userM.avatarUrl = user.avatarUrl;
                }
                if(!!user.watermark)  {
                    setParams.watermark = user.watermark;
                    userM.watermark = user.watermark;
                }
                if(!!user.username){
                    setParams.username = user.username;
                    userM.username = user.username;
                }
                if(!!user.viplevel){
                    setParams.viplevel = user.viplevel;
                    userM.viplevel = user.viplevel;
                }
                if(!!user.identity){
                    setParams.identity = user.identity;
                    userM.identity = user.identity;
                }
                return userdb.open("wx.user").then(function(collection) {
                    return collection.update({
                        "userId" : userId
                    },{$set:setParams});
                }).then(function(data) {
                    console.log(data.result);
                    userdb.close();
                    return userM;
                }).catch(function(error) {
                    userdb.close();
                    console.error(error)
                    throw error;
                })
            }
        }).catch(function(error) {
            userdb.close();
            console.error(error)
            throw error;
        })
    }else{
        //var userM = data[0];
        //userId = userM.userId;
        var setParams = {};
        if(!!user.openId) {
            setParams.openId = user.openId;
            //userM.openId = user.openId;
        }
        if(!!user.nickName)  {
            setParams.nickName = user.nickName;
            //userM.nickName = user.nickName;
        }
        if(!!user.gender)  {
            setParams.gender = user.gender;
            //userM.gender = user.gender;
        }
        if(!!user.language)  {
            setParams.language = user.language;
            //userM.language = user.language;
        }
        if(!!user.city)  {
            setParams.city = user.city;
            //userM.city = user.city;
        }
        if(!!user.province)  {
            setParams.province = user.province;
            //userM.province = user.province;
        }
        if(!!user.country)  {
            setParams.country = user.country;
            //userM.country = user.country;
        }
        if(!!user.avatarUrl)  {
            setParams.avatarUrl = user.avatarUrl;
            //userM.avatarUrl = user.avatarUrl;
        }
        if(!!user.watermark)  {
            setParams.watermark = user.watermark;
            //userM.watermark = user.watermark;
        }
        if(!!user.username){
            setParams.username = user.username;
            //userM.username = user.username;
        }
        if(!!user.viplevel){
            setParams.viplevel = user.viplevel;
            //userM.viplevel = user.viplevel;
        }
        if(!!user.identity){
            setParams.identity = user.identity;
            //userM.identity = user.identity;
        }
        return userdb.open("wx.user").then(function(collection) {
            return collection.update({
                "userId" : userId
            },{$set:setParams});
        }).then(function(data) {
            console.log(data.result);
            userdb.close();
            return userId;
        }).catch(function(error) {
            userdb.close();
            console.error(error)
            throw error;
        })
    }
}

exports.addInviteInfo = function(data) {
    var time = new Date().getTime();
    var uuid = common.toOnlyId(data.fromUserId+time);
    data.id = uuid;
    data.createTime = time;
    return userdb.open("wx.invite").then(function(collection) {
        return collection.insert([data]);
    }).then(function() {
        userdb.close();
        return data;
    }).catch(function(error) {
        userdb.close();
        console.error(error)
        throw error;
    })
}
