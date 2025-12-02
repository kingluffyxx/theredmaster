import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, turnstileToken } = body;

    // Validation des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Vérification Cloudflare Turnstile (si configuré)
    if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const turnstileResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: turnstileToken,
          }),
        }
      );

      const turnstileData = await turnstileResponse.json();

      if (!turnstileData.success) {
        return NextResponse.json(
          { error: 'Échec de la vérification de sécurité' },
          { status: 400 }
        );
      }
    }

    // Configuration du transporteur SMTP Ionos
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ionos.fr',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true pour le port 465 (SSL/TLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Envoi de l'email
    const info = await transporter.sendMail({
      from: `"Portfolio The Red Master" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'contact@theredmaster.com',
      replyTo: email, // L'email du visiteur pour pouvoir répondre directement
      subject: `[Portfolio] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #d93030 0%, #c02020 100%);
                color: white;
                padding: 20px;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #d93030;
                margin-bottom: 5px;
              }
              .value {
                padding: 10px;
                background: white;
                border-radius: 4px;
                border-left: 3px solid #d93030;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>📧 Nouveau message depuis le portfolio</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Nom :</div>
                  <div class="value">${name}</div>
                </div>

                <div class="field">
                  <div class="label">📧 Email :</div>
                  <div class="value">${email}</div>
                </div>

                <div class="field">
                  <div class="label">📝 Sujet :</div>
                  <div class="value">${subject}</div>
                </div>

                <div class="field">
                  <div class="label">💬 Message :</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { message: 'Email envoyé avec succès', messageId: info.messageId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}
