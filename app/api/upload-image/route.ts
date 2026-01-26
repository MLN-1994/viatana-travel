import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { nanoid } from 'nanoid';

// Permitir solo POST
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    // Leer el form-data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const bucket = formData.get('bucket') as string | null;

    if (!file || !bucket) {
      return NextResponse.json({ error: 'Falta archivo o bucket' }, { status: 400 });
    }

    // Generar nombre único
    const ext = file.name.split('.').pop();
    const fileName = `${nanoid()}.${ext}`;

    // Leer el buffer del archivo
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Subir a Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: 'Error al subir imagen', details: error.message }, { status: 500 });
    }

    // Obtener URL pública
    const publicUrl = supabaseAdmin.storage.from(bucket).getPublicUrl(fileName).data.publicUrl;

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    return NextResponse.json({ error: 'Error inesperado', details: String(err) }, { status: 500 });
  }
}
