import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function vehicles(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const response = await fetch(`${process.env.API_BASE_URL}/vehicle`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const vehicles = await response.json();
  res.status(200).json(vehicles);
});
