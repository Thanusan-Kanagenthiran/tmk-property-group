import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const { orderId, amount, currency } = await request.json();

  const merchantId = "1227798";
  const merchantSecret = "MTk2OTU2MTU2MTIyNDIzMTc2OTkzMzMxNDM5MTY1MzI2MjE0NjY1Nw==";

  // Generate the hash
  const hash = crypto
    .createHash("md5")
    .update(
      merchantId +
        orderId +
        amount.toFixed(2) +
        currency +
        crypto.createHash("md5").update(merchantSecret).digest("hex").toUpperCase()
    )
    .digest("hex")
    .toUpperCase();

  return NextResponse.json({ hash });
}
