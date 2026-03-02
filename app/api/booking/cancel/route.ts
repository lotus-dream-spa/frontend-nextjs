import { NextRequest, NextResponse } from "next/server";
import { decryptId } from "@/utils/crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, email, browserInfo } = body;

    if (!token || !email) {
      return NextResponse.json(
        { error: "Token and email are required" },
        { status: 400 }
      );
    }

    // 1. Decifra il token per ottenere il documentId
    const documentId = decryptId(token);

    if (!documentId) {
      return NextResponse.json(
        { error: "Invalid booking token" },
        { status: 400 }
      );
    }

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const strapiToken = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    if (!strapiUrl || !strapiToken) {
      console.error("Strapi configuration missing");
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    // 2. Recupera la prenotazione da Strapi usando il documentId
    const res = await fetch(`${strapiUrl}/api/bookings/${documentId}?populate=customer`, {
      headers: {
        Authorization: `Bearer ${strapiToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error fetching booking from Strapi:", errorData);
      return NextResponse.json(
        { error: "Booking not found or Strapi error" },
        { status: 404 }
      );
    }

    const bookingData = await res.json();
    const booking = bookingData.data;

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // 3. Verifica se l'email coincide
    const customerEmail = booking.customer?.email;

    if (!customerEmail || customerEmail.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json(
        { error: "Verification failed: Email does not match" },
        { status: 403 }
      );
    }

    // 4. Preparazione note di cancellazione
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB"); // dd/mm/yyyy
    const timeStr = now.toLocaleTimeString("en-GB"); // hh:mm:ss
    
    // Get IP address
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    
    const cancellationNotes = [
      `Deleted online from the customer the day ${dateStr} at ${timeStr}.`,
      `IP: ${ip}`,
      browserInfo ? `UA: ${browserInfo.userAgent}` : "",
      browserInfo ? `Lang: ${browserInfo.language}` : "",
      browserInfo ? `Res: ${browserInfo.screenResolution}` : "",
    ].filter(Boolean).join(" | ");

    // 5. Se tutto coincide, aggiorna il bookingStatus a 'cancelled' e aggiungi le note
    const updateRes = await fetch(`${strapiUrl}/api/bookings/${documentId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${strapiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          bookingStatus: "cancelled",
          cancellationNotes: cancellationNotes,
        },
      }),
    });

    if (!updateRes.ok) {
      const errorData = await updateRes.json();
      console.error("Error updating booking in Strapi:", errorData);
      return NextResponse.json(
        { error: "Failed to cancel booking in Strapi" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Booking cancellation error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
