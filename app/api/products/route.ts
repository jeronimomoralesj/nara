import { NextResponse, type NextRequest } from 'next/server';
import { dbConnect } from '@/lib/agape/db';
import Product from '@/lib/models/AgapeProduct';
import { pingIndexNow } from '@/lib/agape/indexnow';
import { toPublicImages } from '@/lib/agape/products';

function errorDetail(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export const dynamic = 'force-dynamic';

// GET /api/products?all=true
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = request.nextUrl;
    const includeInactive = searchParams.get('all') === 'true';

    const query: Record<string, unknown> = {};
    if (!includeInactive) query.isActive = true;

    const products = await Product.find(query).sort({ createdAt: -1 }).lean();
    // Serve image URLs, never raw base64 — keeps this response tiny
    return NextResponse.json(products.map((p) => toPublicImages(p)));
  } catch (error) {
    console.error('GET /api/products', error);
    return NextResponse.json(
      { error: 'Error al cargar los productos', detail: errorDetail(error) },
      { status: 500 }
    );
  }
}

// POST /api/products — protected by middleware
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const product = await Product.create({
      title: body.title,
      description: body.description,
      price: body.price,
      discount: body.discount ?? 0,
      images: (body.images ?? []).slice(0, 4),
      stock: body.stock ?? 0,
      isActive: body.isActive ?? true,
      productType: body.productType === 'collar' ? 'collar' : 'pulsera',
    });
    await pingIndexNow(['/', `/agape/producto/${product._id}`, '/sitemap.xml']);
    return NextResponse.json(toPublicImages(product.toObject()), { status: 201 });
  } catch (error) {
    console.error('POST /api/products', error);
    return NextResponse.json(
      { error: 'Error al crear el producto', detail: errorDetail(error) },
      { status: 400 }
    );
  }
}
