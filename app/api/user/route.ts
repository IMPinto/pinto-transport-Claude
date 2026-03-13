import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { User } from "@prisma/client";

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body: User = await request.json();
        const user = await prisma.user.update({
            where: { id: body.id },
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
                role: body.role,
            },
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}

export async function POST(request: Request) {
  try {
    const body: User = await request.json();
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}