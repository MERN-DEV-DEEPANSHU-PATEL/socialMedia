import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getStories = (req, res) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders.split(" ")[1];
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT s.*, name FROM stories AS s JOIN users AS u ON (u.username = s.username)
    LEFT JOIN relationships AS r ON (s.username = r.followedUsername AND r.followerUsername= ?) LIMIT 4`;

    db.query(q, [userInfo.username], (err, results) => {
      if (err) {
        console.error("Error fetching stories:", err);
        return res.status(500).json(err);
      }
      return res.status(200).json(results);
    });
  });
};

export const addStory = (req, res) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders.split(" ")[1];
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO stories (`img`, `createdAt`, `username`) VALUES (?, ?, ?)";
    const values = [
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.username,
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Error adding story:", err);
        return res.status(500).json(err);
      }
      return res.status(200).json("Story has been created.");
    });
  });
};

export const deleteStory = (req, res) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders.split(" ")[1];
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM stories WHERE `id` = ? AND `username` = ?";

    db.query(q, [req.params.id, userInfo.username], (err, data) => {
      if (err) {
        console.error("Error deleting story:", err);
        return res.status(500).json(err);
      }
      if (data.affectedRows > 0)
        return res.status(200).json("Story has been deleted.");
      return res.status(403).json("You can delete only your story!");
    });
  });
};
