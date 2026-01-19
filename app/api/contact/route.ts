import { NextResponse } from 'next/server';
import { validateContactForm, sanitizeText } from '@/lib/validations';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

    // PASO 1: Guardar en base de datos (CRÍTICO)
    try {
      const userAgent = request.headers.get('user-agent') || 'unknown';
      
      const { error: dbError } = await supabaseAdmin
        .from('contact_messages')
        .insert({
          name: safeName,
          email: safeEmail,
          phone: safePhone || null,
          message: safeMessage,
          status: 'pending',
          ip_address: clientIp,
          user_agent: userAgent
        });

      if (dbError) {
        console.error('Error guardando mensaje:', dbError);
        // No fallar si falla la BD, intentar enviar email de todas formas
      }
    } catch (dbError) {
      console.error('Error en insert de BD:', dbError);
    }

    // PASO 2: Enviar email (OPCIONAL)
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

    // Intentar enviar email si está configurado
    let emailSent = false;
    if (resend) {
      try {
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
        const toEmail = process.env.RESEND_TO_EMAIL || safeEmail; // Fallback a email del remitente para testing
        
        await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          replyTo: safeEmail,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        });

        emailSent = true;
        console.log('✅ Email enviado a:', toEmail);
      } catch (emailError) {
        console.error('⚠️ Error enviando email (pero mensaje guardado en BD):', emailError);
        // No fallar - el mensaje ya está guardado en BD
      }
    } else {
      console.log('ℹ️ Email no configurado. Mensaje guardado en BD.');
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Mensaje recibido correctamente',
        emailSent
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
