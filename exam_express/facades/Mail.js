const mailer = require("../config/mailer")

const Mail= {

  to:function(email){
    this.email =email
    return this
  },
  send: async function(body) {
    await mailer.sendMail({
      from: 'fifaatade2020@gmail.com', // sender address
      to: this.email, // list of receivers
      text: body, // plain text body
      subject: "Authentification ✔", // Subject line
    })
    console.log('sending email to '+ this.email)
  }
  
}
module.exports= Mail;
