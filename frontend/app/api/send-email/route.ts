import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { to, subject, html } = await req.json();

        // 1. Check for SMTP credentials
        const smtpHost = process.env.SMTP_HOST;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;

        if (!smtpHost || !smtpUser || !smtpPass) {
            console.error("❌ SMTP CONFIGURATION MISSING:");
            console.error(`- SMTP_HOST: ${smtpHost ? "Set" : "Missing"}`);
            console.error(`- SMTP_USER: ${smtpUser ? "Set" : "Missing"}`);
            console.error(`- SMTP_PASS: ${smtpPass ? "Set" : "Missing"}`);
            console.log("---------------------------------------------------");
            console.log("⚠️  MOCK EMAIL SIMULATION (No SMTP Configured) ⚠️");
            console.log(`TO: ${to}`);
            console.log(`SUBJECT: ${subject}`);
            console.log(`BODY (Preview): ${html.substring(0, 100)}...`);
            console.log("---------------------------------------------------");

            // Return success even in mock mode so frontend doesn't break
            return NextResponse.json({ success: true, message: "Mock email logged to console." });
        }

        // 2. Configure Transporter
        const smtpPort = parseInt(process.env.SMTP_PORT || '587');

        console.log(`📧 Attempting SMTP Connection: ${smtpHost}:${smtpPort} (Secure: ${smtpPort === 465})`);
        console.log(`👤 SMTP User: ${smtpUser}`);

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465, // true for 465, false for other ports
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
            logger: true, // Log to console
            debug: true, // Include debug info
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 5000,    // 5 seconds
            socketTimeout: 10000,     // 10 seconds
        });

        // Verify connection configuration
        try {
            console.log("🔄 Verifying SMTP connection...");
            await transporter.verify();
            console.log("✅ SMTP Connection Verified");
        } catch (verifyError: any) {
            console.error("❌ SMTP Connection Verification Failed:", verifyError);
            // Log full error object for debugging
            console.error(JSON.stringify(verifyError, null, 2));
            return NextResponse.json({
                success: false,
                error: `SMTP Connection Failed: ${verifyError.message || "Unknown Error"}`,
                details: verifyError
            }, { status: 500 });
        }

        // 3. Send Email
        const info = await transporter.sendMail({
            from: `"Prayukti vLab" <${smtpUser}>`,
            to,
            subject,
            html,
        });

        return NextResponse.json({ success: true, messageId: info.messageId });

    } catch (error: any) {
        console.error("Email API Error Full Details:", JSON.stringify(error, null, 2));
        console.error("Email API Error Message:", error.message);

        let errorMessage = error.message;
        if (error.responseCode === 535) {
            errorMessage = "Authentication Failed: Please check your SMTP credentials. If using Gmail, make sure to use an 'App Password', not your main password.";
        }

        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
