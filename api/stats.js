import Redis from "ioredis";

const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  tls: {}
});

export default async function handler(req, res) {
  try {
    const total = await redis.get("total_visitors");
    const unique = await redis.scard("unique_visitors");

    // ambil 100 terakhir
    const visitorsRaw = await redis.lrange("visitors", 0, 99);
    const visitors = visitorsRaw.map(v => JSON.parse(v));

    res.status(200).json({
      total_visitors: total || 0,
      unique_visitors: unique || 0,
      visitors,
    });
  } catch (err) {
    console.error("Redis error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

