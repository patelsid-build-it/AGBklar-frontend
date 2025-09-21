import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import pdf from 'pdf-parse';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse PDF content
    const pdfData = await pdf(buffer);
    const textContent = pdfData.text;

    if (!textContent || textContent.trim().length === 0) {
      return NextResponse.json({ error: 'No text content found in PDF' }, { status: 400 });
    }

    // Save file temporarily (optional - for debugging)
    const filename = `upload_${Date.now()}.pdf`;
    const path = join('/tmp', filename);
    await writeFile(path, buffer);

    return NextResponse.json({
      success: true,
      filename: file.name,
      textContent: textContent,
      pageCount: pdfData.numpages,
      fileSize: file.size
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
}
