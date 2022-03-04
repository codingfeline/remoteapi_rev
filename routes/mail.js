const router = require('express').Router()
const verify = require('./verifyToken')
const nodemailer = require('nodemailer')

const username = 'webmaster@nazs.net'
const pw ='w!4x6qO*c@7xQvYttLce'

router.post('/mail2',  (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: username,
      pass: pw
    }
  })

  const mailOptions = {
    from: username,
    replyTo: req.body.email,
    to: 'post@nazs.net',
    subject: 'noRobots captcha form',
    // text: `Hellow world!.
    // // Hello again.`
    text: `${req.body.message}`
    // html: '<h1>Enquiry received</h1>'
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      res.send({error})
      console.log(error)
    } else {
      res.send('Email sent: ' + info.response)
      console.log('Email sent: ' + info.response)
    }
  })
})

router.get('/',  (req, res) => {
  // return res.send('test mail from router')
  const nodemailer = require("nodemailer");
  const name = req.body.name
  const message = req.body.message
  const email = req.body.email
  // async..await is not allowed in global scope, must use a wrapper
  async function main(name, email, message) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'post@nazs.net', // generated ethereal user
        pass: pw, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: email, // sender address
      // from: "'Post Naz' <postnaz@gmail.com>", // list of receivers
      to: "'Post Naz' <postnaz@gmail.com>", // list of receivers
      subject: "Hello again from " + name, // Subject line
      text: message, // plain text body
      // text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  main(name, email, message)
    .then( () => res.send('mail sent <b>ok</b> '))
    .catch( err => {
      console.log(err)
      res.send('error occurred')
    });  
  main().catch(console.error);  
})

module.exports = router