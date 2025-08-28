import Redis from "ioredis";

const redis = new Redis({
  port: process.env.REDIS_PORT,          // misalnya 18321
  host: process.env.REDIS_HOST,          // misalnya redis-12345.c1.ap-southeast-1-1.ec2.cloud.redislabs.com
  password: process.env.REDIS_PASSWORD,  // password redis cloud kamu
  tls: {} // Redis Cloud butuh TLS
});

export default async function handler(req, res) {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      "unknown";
    const page = req.query.page || "home";
    const time = Date.now();

    // simpan visitor baru
    await redis.lpush(
      "visitors",
      JSON.stringify({ ip, page, time })
    );

    // total counter
    await redis.incr("total_visitors");

    // unique IP
    const isNew = await redis.sadd("unique_visitors", ip);

    const total = await redis.get("total_visitors");
    const unique = await redis.scard("unique_visitors");

    res.status(200).json({
      message: "Visitor tracked",
      total_visitors: total,
      unique_visitors: unique,
      new_visitor: isNew === 1,
    });
  } catch (err) {
    console.error("Redis error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

