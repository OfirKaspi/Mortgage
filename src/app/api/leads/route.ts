import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Resend } from 'resend';

// TypeScript types
interface LeadRequestBody {
  name?: string;
  fullName?: string; // For backward compatibility
  email: string;
  phone: string;
  mortgageType: 'new' | 'refinance' | 'reverse';
}

interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Mortgage type mapping to Hebrew
const mortgageTypeMap: Record<string, string> = {
  new: 'משכנתא חדשה',
  refinance: 'מחזור משכנתא',
  reverse: 'משכנתא הפוכה',
};

// Get Israeli timestamp in Hebrew format
function getIsraeliTimestamp(): string {
  const now = new Date();
  const israelTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }));
  
  const day = String(israelTime.getDate()).padStart(2, '0');
  const month = String(israelTime.getMonth() + 1).padStart(2, '0');
  const year = israelTime.getFullYear();
  const hours = String(israelTime.getHours()).padStart(2, '0');
  const minutes = String(israelTime.getMinutes()).padStart(2, '0');
  const seconds = String(israelTime.getSeconds()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

// Initialize Google Sheets client
async function getGoogleSheetsClient() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const spreadsheetId = process.env.SPREADSHEET_ID;

  if (!serviceAccountEmail || !privateKey || !spreadsheetId) {
    throw new Error('Missing Google Sheets configuration');
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return { sheets, spreadsheetId };
}

// Append lead to Google Sheets
async function appendToGoogleSheets(lead: LeadRequestBody) {
  const { sheets, spreadsheetId } = await getGoogleSheetsClient();
  const name = lead.name || lead.fullName || '';
  const mortgageTypeHebrew = mortgageTypeMap[lead.mortgageType] || lead.mortgageType;
  const timestamp = getIsraeliTimestamp();

  // Column headers in Hebrew
  const headers = ['תאריך ושעה', 'שם', 'אימייל', 'טלפון', 'סוג משכנתא'];
  const row = [timestamp, name, lead.email, lead.phone, mortgageTypeHebrew];

  try {
    // Check if sheet has headers (read first row)
    const firstRow = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A1:E1',
    });

    // If no headers exist, add them
    if (!firstRow.data.values || firstRow.data.values.length === 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'A1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers],
        },
      });
    }

    // Append the lead data
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:E',
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    });

    return true;
  } catch (error: any) {
    console.error('Google Sheets error:', error);
    
    // Provide more specific error messages
    if (error?.code === 403) {
      if (error?.message?.includes('API has not been used') || error?.message?.includes('is disabled')) {
        throw new Error('Google Sheets API לא מופעל. אנא הפעל את ה-API בפרויקט Google Cloud שלך.');
      }
      if (error?.message?.includes('permission') || error?.message?.includes('access')) {
        throw new Error('אין הרשאה לגשת לגיליון האלקטרוני. אנא ודא שחשבון השירות יש לו גישה לגיליון.');
      }
      throw new Error('אין הרשאה לגשת ל-Google Sheets. בדוק את הגדרות ההרשאות.');
    }
    
    if (error?.code === 404) {
      throw new Error('גיליון אלקטרוני לא נמצא. אנא ודא שה-SPREADSHEET_ID נכון.');
    }
    
    if (error?.code === 400) {
      throw new Error('בקשה לא תקינה ל-Google Sheets. בדוק את פרטי הגיליון.');
    }
    
    // Generic error with more context
    const errorMessage = error?.message || 'Unknown error';
    throw new Error(`שגיאה בשמירה ל-Google Sheets: ${errorMessage}`);
  }
}

// Send email notification via Resend
async function sendEmailNotification(lead: LeadRequestBody) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;
  const spreadsheetId = process.env.SPREADSHEET_ID;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@resend.dev';

  if (!resendApiKey || !ownerEmail) {
    throw new Error('Missing email configuration');
  }

  const resend = new Resend(resendApiKey);
  const name = lead.name || lead.fullName || '';
  const mortgageTypeHebrew = mortgageTypeMap[lead.mortgageType] || lead.mortgageType;
  const spreadsheetUrl = spreadsheetId 
    ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}`
    : '';

  const emailHtml = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ליד חדש - ${name}</title>
</head>
<body style="font-family: Arial, sans-serif; direction: rtl; text-align: right; background-color: #f5f5f5; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h1 style="color: #333; margin-bottom: 30px; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
      ליד חדש התקבל
    </h1>
    
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
      <h2 style="color: #555; margin-top: 0;">פרטי הליד:</h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #333; width: 40%;">שם:</td>
          <td style="padding: 10px; color: #666;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #333;">אימייל:</td>
          <td style="padding: 10px; color: #666;">${lead.email || 'לא צוין'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #333;">טלפון:</td>
          <td style="padding: 10px; color: #666;">${lead.phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #333;">סוג משכנתא:</td>
          <td style="padding: 10px; color: #666;">${mortgageTypeHebrew}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #333;">תאריך ושעה:</td>
          <td style="padding: 10px; color: #666;">${getIsraeliTimestamp()}</td>
        </tr>
      </table>
    </div>
    
    ${spreadsheetUrl ? `
    <div style="text-align: center; margin-top: 30px;">
      <a href="${spreadsheetUrl}" 
         style="display: inline-block; background-color: #4CAF50; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
        צפה בגיליון האלקטרוני
      </a>
    </div>
    ` : ''}
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; text-align: center;">
      <p>אימייל זה נשלח אוטומטית ממערכת איסוף לידים</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    await resend.emails.send({
      from: fromEmail,
      to: ownerEmail,
      subject: `ליד חדש: ${name} - ${mortgageTypeHebrew}`,
      html: emailHtml,
    });

    return true;
  } catch (error: any) {
    console.error('Resend email error:', error);
    
    // Provide more specific error messages for email
    if (error?.message?.includes('API key') || error?.message?.includes('Unauthorized')) {
      throw new Error('מפתח API של Resend לא תקין או חסר.');
    }
    
    if (error?.message?.includes('domain') || error?.message?.includes('from')) {
      throw new Error('כתובת האימייל השולח לא מאומתת ב-Resend.');
    }
    
    const errorMessage = error?.message || 'Unknown error';
    throw new Error(`שגיאה בשליחת אימייל: ${errorMessage}`);
  }
}

// Validate request body
function validateLeadData(body: any): LeadRequestBody {
  const name = body.name || body.fullName;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('שם הוא שדה חובה');
  }

  if (!body.phone || typeof body.phone !== 'string' || body.phone.trim().length === 0) {
    throw new Error('טלפון הוא שדה חובה');
  }

  if (!body.mortgageType || !['new', 'refinance', 'reverse'].includes(body.mortgageType)) {
    throw new Error('סוג משכנתא לא תקין');
  }

  return {
    name: body.name,
    fullName: body.fullName,
    email: body.email || '',
    phone: body.phone.trim(),
    mortgageType: body.mortgageType,
  };
}

// POST handler
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request data
    const leadData = validateLeadData(body);

    // Save to Google Sheets
    await appendToGoogleSheets(leadData);

    // Send email notification
    try {
      await sendEmailNotification(leadData);
    } catch (emailError) {
      // Log email error but don't fail the request if Sheets succeeded
      console.error('Email notification failed:', emailError);
      // Continue - the lead was saved to Sheets
    }

    // Return success response
    const response: ApiResponse = {
      success: true,
      message: 'הליד נשמר בהצלחה',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'אירעה שגיאה בעת עיבוד הבקשה';
    
    const response: ApiResponse = {
      success: false,
      message: errorMessage,
      error: error instanceof Error ? error.message : 'Unknown error',
    };

    // Determine appropriate status code
    let statusCode = 500;
    if (errorMessage.includes('שדה חובה') || errorMessage.includes('לא תקין')) {
      statusCode = 400; // Bad Request
    } else if (errorMessage.includes('Missing') || errorMessage.includes('configuration')) {
      statusCode = 500; // Internal Server Error
    }

    return NextResponse.json(response, { status: statusCode });
  }
}

