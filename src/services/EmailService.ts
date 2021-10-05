import nodemailer from "nodemailer";

class EmailService
{
    SendEmail(emails: string[], texto: string, titulo: string){
        var transport = {
            host:'smtp.gmail.com',
            auth:{
                user:'taep.2021.server@gmail.com',
                pass:'taep@2021'
            }
        }

        var transporter = nodemailer.createTransport(transport);
        transporter.verify((error,sucess) =>{
            if ( error )
                console.log(error);
            else
                console.log('congratz');
        })
    }
}

export {EmailService}