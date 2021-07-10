const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const db = require('./db/index')
const winston = require('winston');


passport.use(new LocalStrategy(async (username, password, callback) => {
        const response = await db.login(username);
        const customerDetails = response[0];
        await bcrypt.compare(password, customerDetails.saltyhash, ((error, res) => {
        console.log(`res is ${res}`)
            if (res) {
                const user = {customer_id: customerDetails.customer_id, email: customerDetails.email, first_name: customerDetails.first_name, surname: customerDetails.surname, address_line1: customerDetails.address_line1, address_line2: customerDetails.address_line2, town: customerDetails.town, county: customerDetails.county, postcode: customerDetails.postcode}
                return callback(null, user);
                  }
            else {
                       return callback(null, false)
                     }
            }))
        })          
    )
      
    passport.serializeUser((user, callback) => {
        console.log('hello')
        return callback(null, user);
      });
      
  