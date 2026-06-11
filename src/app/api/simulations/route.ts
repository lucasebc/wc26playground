import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { SimulationModel } from '@/models/Simulation';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectToDatabase();
    const shareCode = nanoid(10);
    await SimulationModel.create({ shareCode, data });
    return NextResponse.json({ shareCode });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save simulation' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');
    if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    await connectToDatabase();
    const simulation = await SimulationModel.findOne({ shareCode: code });
    if (!simulation) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ data: simulation.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load simulation' }, { status: 500 });
  }
}
