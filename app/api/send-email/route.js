import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, message } = body;

    console.log('Sending email to:', process.env.RECIPIENT_EMAIL);
    
    const { data, error } = await resend.emails.send({
      from: 'Cliente <noreply@dsarquitectura.cl>',
      to: [process.env.RECIPIENT_EMAIL],
      subject: `Nuevo mensaje de ${name} - Arquitectura Portfolio`,
      html: `
        <h2>Nuevo mensaje</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${whatsapp ? `<p><strong>WhatsApp:</strong> ${whatsapp}</p>` : ''}
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}