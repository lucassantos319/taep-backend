import nodemailer from "nodemailer";

class EmailService
{    
    SendEmail(emails: string[], texto: string, titulo: string,type:Number, password:string, professor: string){
        
        if ( emails.length > 0 ){
            
            var transport = {
                host:'mx.inf.ufpr.br',
                port:'587',
                auth:{
                    user:'lss16',
                    pass:'Juc@2308'
                }
            }
    
            var transporter = nodemailer.createTransport(transport);
            transporter.verify((error,sucess) =>{
                if ( error ){
                    throw new Error(error);
                }
                else
                    console.log('congratz');
            });
           
            // Welcome teacher message
            if ( type == 1 )
                Array(emails).forEach(email=>{
                    console.log(email)
                    transporter.sendMail({
                        from:'"TAEP 4.0" <lss16@inf.ufpr.br>',
                        to: email,
                        subject:{titulo},
                        html: '<div style="background-color: #162A52;padding-top:20px;padding-bottom:40px;font-family:Arial, Helvetica, sans-serif;text-align: center;"><div style=""><h1 style="color: white;">Bem vindo ao TAEP 4.0</h1></div><div style="margin-top:20px;"><p style="color:white">Estamos a disposição para apoiar no gerenciamento de seus projetos educacionais baseado no contexto da Educação 4.0. A plataforma TAEP4.0 tem como objetivo principal permitir ao professor trazer o aluno para o centro da aprendizagem, fazendo dele o protagonista na construção do conhecimento e desenvolvimento de habilidades do Século XXI.</p></div></div>'
                   
                    });
                    
                });

            // Welcome student message
            if ( type == 2 )
                Array(emails).forEach(email=>{
                    console.log(email);
                    transporter.sendMail({
                        from:'"TAEP 4.0" <lss16@inf.ufpr.br>',
                        to: email,
                        subject:{titulo},
                        html:'<div style=" background-color: #162A52;padding-top:20px;padding-bottom:70px;font-family:Arial, Helvetica, sans-serif;text-align: center;"><div><h1 style="color: white;">Bem vindo ao TAEP 4.0</h1></div><div style="margin-top:20px;"><p style="color:white">Seja bem vindo a plataforma do TAEP, o professor '+professor+' fez a sua inscrição na plataforma.</p><p style="color:white">Recomendamos que após o primeiro acesso seja realizado a troca da senha. Para seu primeiro acesso o login é o email que recebeu este email e a senha abaixo</p><div style=" margin-top:50px; margin-left:30%; width:40%; padding:5px; background-color:white; border-radius:30px;"><p style="font-size: 40px;">'+password+'</p></div></div></div>'
                    });
                    
                });

        }
    }
}

export {EmailService}