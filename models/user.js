var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;


/* 1st - Creating User Schema attributes / characteristics / fields */

var UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, lowercase: true}, // Giving uniquess to the email by unique and making it lowercase 
    password: String,
    
    
    profile: {
        name: {type: String, default: ''},  // Po defaultu empty string jer ako user zaboravi da unese ime, onda ide empty, isto i za sliku dole
        picture: {type: String, default: ''}
    },
    address: String,
    history: [{  //Purchased products will be here, 
        date: Date,
        paid: {type: Number, default: 0},
    //    item: {type: Schema.Types.ObjectId, ref: ''}
        
    }]
});



/* 2nd - Hashing the password before we even save it to the database */

UserSchema.pre('save', function(next){
    
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, function(er, hash){
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
    
});




/* 3rd - Compare password from the database to the one that is user typing */

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


UserSchema.methods.gravatar = function(size) {
  if (!this.size) size = 200;
  if (!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
}


module.exports = mongoose.model('User', UserSchema);