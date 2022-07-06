const express = require("express");
const {
  createContact,
  createList,
  publishEmail,
  updateList,
} = require("./requests/requests");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async function (req, res) {
  console.log("put contact ... ", req.query);

  const { email } = req.query;

  if (!email) {
    res.status(200).send("Missing email in query");
    return;
  }

  const contact = await createContact(email);

  if(!contact) {
    res.status(200).send("fail");
    return
  }

  console.log("conatct from response:", contact)

  const list = await createList();

  if(!list) {
    res.status(200).send("fail");
    return
  }

  console.log("list from response:", list)

  await updateList(list, [contact.id])

  await new Promise(resolve => {
    console.log("============ *DELAY 5s* ============")
    setTimeout(() => {
        resolve(null);
    }, 5000)
  });

  const resp = await publishEmail(list.id)

  res.status(200).send(resp);
});

app.get("/sendTest", async function (req, res) {
    console.log("send email test");
    const resp = await publishEmail("0793255026964305275")

    res.status(200).send(resp);
})

console.log("App listen on port", PORT)
app.listen(PORT);
