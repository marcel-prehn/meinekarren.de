import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function vehicle(req, res) {
  const { uuid } = req.query;
  const { accessToken } = await getAccessToken(req, res);

  if (req.method === "GET") {
    const response = await fetch(`${process.env.API_BASE_URL}/vehicle/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const vehicle = await response.json();
    res.status(response.status).json(vehicle);
  }

  if (req.method === "PUT") {
    const response = await fetch(`${process.env.API_BASE_URL}/vehicle/${uuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: req.body,
    });
    res.status(response.status).json("");
  }

  if (req.method === "DELETE") {
    const response = await fetch(`${process.env.API_BASE_URL}/vehicle/${uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.status(response.status).json("");
  }
});
