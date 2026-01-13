import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validar campos requeridos
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Preparar el contenido del email
    const emailSubject = `Nuevo contacto de ${name} - Viatana Travel`;
    const emailText = `
Nuevo mensaje de contacto desde Viatana Travel

Nombre: ${name}
Email: ${email}
Teléfono: ${phone || 'No proporcionado'}

Mensaje:
${message}

---
Enviado desde: ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}
    `.trim();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #6A3B76; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">✈️ Viatana Travel</h1>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #6A3B76; margin-top: 0;">Nuevo mensaje de contacto</h2>
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #6A3B76;">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
          </div>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Mensaje:</h3>
            <p style="white-space: pre-wrap; color: #555;">${message}</p>
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 12px;">Enviado el ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}</p>
          </div>
        </div>
      </div>
    `;

    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;

    // Si tienes configurado Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: process.env.CONTACT_EMAIL || 'onboarding@resend.dev',
          to: recipientEmail || 'contacto@viatanatravel.com',
          replyTo: email,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        });

        console.log('✅ Email enviado vía Resend');
        return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente' });
      } catch (error) {
        console.error('⚠️ Error con Resend:', error);
        // Continuar con el flujo normal si falla el envío
      }
    }

    // Si no hay servicio de email configurado, guardar en consola
    console.log('📧 Nuevo mensaje de contacto (simulado):');
    console.log(emailText);
    console.log('\n💡 Para enviar emails reales, configura RESEND_API_KEY en .env');

    // También podrías guardar en la base de datos aquí
    // await supabase.from('contacts').insert({ name, email, phone, message })

    return NextResponse.json(
      { 
        success: true,
        message: 'Mensaje recibido correctamente' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error al procesar el contacto:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
}
