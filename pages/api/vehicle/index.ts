import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function vehicle(req, res) {
  const { accessToken } = await getAccessToken(req, res);

  if (req.method === "GET") {
    const response = await fetch(`${process.env.API_BASE_URL}/vehicle`, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const payload = await response.json();
    res.status(response.status).json(payload);
  }

  if (req.method === "POST") {
    const response = await fetch(`${process.env.API_BASE_URL}/vehicle`, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: req.body,
    });
    const payload = await response.json();
    res.status(response.status).json(payload);
  }
});
