import { NextResponse } from 'next/server';
import { validateContactForm, sanitizeText } from '@/lib/validations';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    // Rate limiting: 5 mensajes por IP cada 15 minutos
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(clientIp, 5, 15 * 60 * 1000);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Demasiados intentos. Por favor, espera un momento antes de enviar otro mensaje.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.reset - Date.now()) / 1000))
          }
        }
      );
    }

    const { name, email, phone, message } = await request.json();

    // Validar datos del formulario
    const validation = validateContactForm({ name, email, phone, message });
    
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.errors },
        { status: 400 }
      );
    }

    // Sanitizar datos para prevenir XSS
    const safeName = sanitizeText(name.trim());
    const safeEmail = email.trim().toLowerCase();
    const safePhone = phone ? sanitizeText(phone.trim()) : '';
    const safeMessage = sanitizeText(message.trim());

    // Preparar el contenido del email
    const emailSubject = `Nuevo contacto de ${safeName} - Viatana Travel`;
    const emailText = `
Nuevo mensaje de contacto desde Viatana Travel

Nombre: ${safeName}
Email: ${safeEmail}
Teléfono: ${safePhone || 'No proporcionado'}

Mensaje:
${safeMessage}

---
Enviado desde: ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}
    `.trim();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #6A3B76; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Viatana Travel</h1>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #6A3B76; margin-top: 0;">Nuevo mensaje de contacto</h2>
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nombre:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #6A3B76;">${safeEmail}</a></p>
            <p style="margin: 10px 0;"><strong>Teléfono:</strong> ${safePhone || 'No proporcionado'}</p>
          </div>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Mensaje:</h3>
            <p style="white-space: pre-wrap; color: #555;">${safeMessage}</p>
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 12px;">Enviado el ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}</p>
            <p style="color: #999; font-size: 11px; margin-top: 8px;">IP: ${clientIp}</p>
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
          replyTo: safeEmail,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        });

        // Solo en desarrollo
        if (process.env.NODE_ENV === 'development') {
          console.log('Email enviado vía Resend');
        }
        
        return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente' });
      } catch (error) {
        // Log solo en desarrollo
        if (process.env.NODE_ENV === 'development') {
          console.error('Error con Resend:', error);
        }
        // Continuar con el flujo normal si falla el envío
      }
    }

    // Si no hay servicio de email configurado
    if (process.env.NODE_ENV === 'development') {
      console.log('Nuevo mensaje de contacto (simulado):');
      console.log(emailText);
      console.log('\nPara enviar emails reales, configura RESEND_API_KEY en .env');
    }

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
    // Log solo en desarrollo, en producción usa un servicio de logging como Sentry
    if (process.env.NODE_ENV === 'development') {
      console.error('Error al procesar el contacto:', error);
    }
    
    return NextResponse.json(
      { error: 'Error al enviar el mensaje. Por favor, intenta de nuevo.' },
      { status: 500 }
    );
  }
}
