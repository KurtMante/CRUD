const express = require("express");
const app = express();
const port = 5000;
const data = require("./data.json");

app.use(express.json());

app.get("/api/member", (req, res) => {
  res.json(data);
});

app.post("/api/member", (req, res) => {
  const { name, address } = req.body;

  let errors = [];

  if (!name) {
    errors.push({
      message: "name is required",
    });
  }
  if (!address) {
    errors.push({
      message: "address is required.",
    });
  }
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  const newMember = {
    id: data.length + 1,
    name,
    address,
  };

  data.push(newMember);

  console.log("New member added:", newMember);
  console.log("Updated data:", data);

  res.status(201).json({
    message: "Member added successfully",
    member: newMember,
  });
});

app.delete("/api/member/:id", (req, res) => {
  const { id } = req.params;
  const memberIndex = data.findIndex((member) => member.id === parseInt(id));

  if (memberIndex === -1) {
    return res.status(404).json({ message: "Member not found" });
  }

  const deleted = data.splice(memberIndex, 1);

  res.status(200).json({
    message: "member has been deleted",
    member: deleted[0],
  });
});

app.put("/api/member/:id", (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  const memberIndex = data.findIndex((member) => member.id === parseInt(id));

  if (memberIndex === -1) {
    return res.status(404).json({ message: "Member not found" });
  }

  // Update fields if provided
  if (name) data[memberIndex].name = name;
  if (address) data[memberIndex].address = address;

  res.status(200).json({
    message: "Member updated successfully",
    member: data[memberIndex],
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

